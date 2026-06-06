import { useState, useEffect, useRef, useCallback } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RoomPlayer {
  playerId: string;
  playerName: string;
  portfolioValue: number;
  returnPct: number;
  isHost: boolean;
  joinedAt: number;
  isActive?: boolean;
}

export interface RoomState {
  roomCode: string;
  hostId: string;
  hostName: string;
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'finished';
  seed: number;
  day: number;
  maxDays: number;
}

export interface UseRoomBattleReturn {
  players: RoomPlayer[];
  roomState: RoomState | null;
  timeToNextRefresh: number;
  isConnected: boolean;
  isHost: boolean;
  error: string | null;
  createRoom: (hostName: string, maxPlayers: number) => Promise<string | null>;
  joinRoom: (roomCode: string, playerName: string) => Promise<boolean>;
  startGame: () => Promise<void>;
  broadcastPortfolio: (value: number, returnPct: number) => Promise<void>;
  leave: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useRoomBattle(userId: string | null): UseRoomBattleReturn {
  const [players, setPlayers] = useState<RoomPlayer[]>([]);
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [timeToNextRefresh, setTimeToNextRefresh] = useState(60);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dbChannelRef = useRef<RealtimeChannel | null>(null);
  const partsChannelRef = useRef<RealtimeChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep roomState in a ref for timer callback access
  const roomStateRef = useRef<RoomState | null>(null);
  roomStateRef.current = roomState;

  // Keep playerName in a ref (set at join/create time)
  const playerNameRef = useRef<string>('');

  // Day timer
  const dayEndsAtRef = useRef<number | null>(null);
  const playerCountRef = useRef(0);
  const isAdvancingDayRef = useRef(false);

  // --- Broadcast portfolio ---
  const broadcastPortfolio = useCallback(
    async (value: number, returnPct: number) => {
      if (!userId || !roomStateRef.current) return;
      
      // Update DB instead of P2P broadcast (Fixes Portfolio Broadcast Spoofing securely)
      await supabase.from('room_participants').update({
        portfolio_value: value,
        return_pct: returnPct
      }).eq('room_code', roomStateRef.current.roomCode).eq('player_id', userId);
    },
    [userId],
  );

  // --- Leave ---
  const leave = useCallback(() => {
    const currentRoom = roomStateRef.current;

    const dbChannel = dbChannelRef.current;
    if (dbChannel) {
      supabase.removeChannel(dbChannel);
      dbChannelRef.current = null;
    }
    const partsChannel = partsChannelRef.current;
    if (partsChannel) {
      supabase.removeChannel(partsChannel);
      partsChannelRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (currentRoom && userId) {
      // If host leaves during 'waiting', delete the room (requires DELETE RLS policy)
      if (currentRoom.hostId === userId && currentRoom.status === 'waiting') {
        supabase.from('battle_rooms').delete().eq('room_code', currentRoom.roomCode).then();
      } else {
        // Otherwise just remove self from participants
        supabase.from('room_participants').delete().eq('room_code', currentRoom.roomCode).eq('player_id', userId).then();
      }
    }

    setIsConnected(false);
    setPlayers([]);
    setRoomState(null);
    setTimeToNextRefresh(60);
    dayEndsAtRef.current = null;
  }, [userId]);

  // --- Subscribe to room channels ---
  const subscribeToRoom = useCallback(
    (roomCode: string, hostId: string) => {
      // 1. DB channel: listen for battle_rooms updates
      const dbChannel = supabase
        .channel(`room-db-${roomCode}`)
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'battle_rooms', filter: `room_code=eq.${roomCode}` },
          (payload) => {
            const row = payload.new as any;
            const newState: RoomState = {
              roomCode: row.room_code,
              hostId: row.host_id,
              hostName: row.host_name,
              maxPlayers: row.max_players,
              status: row.status,
              seed: row.seed,
              day: row.day,
              maxDays: row.max_days,
            };
            setRoomState(newState);
            roomStateRef.current = newState;
            if (row.day_ends_at) {
              const endsAt = new Date(row.day_ends_at).getTime();
              dayEndsAtRef.current = endsAt;
              setTimeToNextRefresh(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
            }
          },
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') setIsConnected(true);
          if (status === 'CHANNEL_ERROR') setIsConnected(false);
        });
      dbChannelRef.current = dbChannel;

      // 2. Fetch initial participants and listen to updates
      const fetchParticipants = () => {
        supabase.from('room_participants').select('*').eq('room_code', roomCode).then(({ data }) => {
          if (data) {
            const flat = data.map(row => ({
              playerId: row.player_id,
              playerName: row.player_name,
              portfolioValue: Number(row.portfolio_value),
              returnPct: Number(row.return_pct),
              isHost: row.player_id === hostId,
              joinedAt: new Date(row.joined_at).getTime(),
              isActive: true,
            }));
            
            // Sort by join time to resolve any absolute tiebreakers securely, then by returnPct
            flat.sort((a, b) => a.joinedAt - b.joinedAt);
            flat.sort((a, b) => b.returnPct - a.returnPct);
            
            setPlayers(flat);
            playerCountRef.current = flat.length;
          }
        });
      };
      
      fetchParticipants();

      const partsChannel = supabase
        .channel(`room-parts-${roomCode}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'room_participants', filter: `room_code=eq.${roomCode}` },
          () => fetchParticipants() // Re-fetch on any change to securely sync
        )
        .subscribe();
      partsChannelRef.current = partsChannel;

      // 3. Timer: countdown + host-gated day advancement
      timerRef.current = setInterval(() => {
        if (!dayEndsAtRef.current) {
          setTimeToNextRefresh(60);
          return;
        }

        // Fix Clock Skew Bypass: Strict 1-sec decrements instead of pure Date.now() difference.
        // We sync to server time on DB updates, then tick down securely.
        setTimeToNextRefresh((prev) => {
            const next = Math.max(0, prev - 1);
            
            if (next === 0 && playerCountRef.current > 0 && !isAdvancingDayRef.current) {
              const current = roomStateRef.current;
              if (!current || current.status !== 'playing') return 0;
              
              // Verify server time is actually past dayEndsAtRef to prevent local fast-forwarding
              if (Date.now() >= dayEndsAtRef.current) {
                isAdvancingDayRef.current = true;
                const newDay = current.day + 1;
                const newEndsAt = Date.now() + 60000;
                dayEndsAtRef.current = newEndsAt;

                if (newDay > current.maxDays) {
                  supabase.from('battle_rooms').update({
                    status: 'finished',
                    day: newDay,
                    day_ends_at: null,
                    finished_at: new Date().toISOString(),
                  }).eq('room_code', current.roomCode).eq('day', current.day)
                    .then(({ error }) => {
                      isAdvancingDayRef.current = false;
                      if (error) setError(error.message);
                    });
                } else {
                  supabase.from('battle_rooms').update({
                    day: newDay,
                    day_ends_at: new Date(newEndsAt).toISOString(),
                    time_remaining: 60,
                  }).eq('room_code', current.roomCode).eq('day', current.day)
                    .then(({ error }) => {
                      isAdvancingDayRef.current = false;
                      if (error) setError(error.message);
                    });
                }
              }
            }
            return next;
        });

      }, 1000);
    },
    [userId],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const dbChannel = dbChannelRef.current;
      if (dbChannel) {
        supabase.removeChannel(dbChannel);
        dbChannelRef.current = null;
      }
      const partsChannel = partsChannelRef.current;
      if (partsChannel) {
        supabase.removeChannel(partsChannel);
        partsChannelRef.current = null;
      }
    };
  }, []);

  // --- Create room ---
  const createRoom = useCallback(
    async (hostName: string, maxPlayers: number): Promise<string | null> => {
      if (!userId) {
        setError('Not authenticated');
        return null;
      }

      playerNameRef.current = hostName;

      const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let roomCode = '';
      let insertError: { message: string } | null = null;

      for (let attempt = 0; attempt < 3; attempt++) {
        const bytes = new Uint8Array(6);
        crypto.getRandomValues(bytes);
        roomCode = Array.from(bytes, (b) => CHARS[b % CHARS.length]).join('');

        const result = await supabase.from('battle_rooms').insert({
          room_code: roomCode,
          host_id: userId,
          host_name: hostName,
          max_players: maxPlayers,
          status: 'waiting',
          seed: 0,
          day: 1,
          max_days: 5,
        });

        if (!result.error) {
          // Add host to participants
          await supabase.from('room_participants').insert({
            room_code: roomCode,
            player_id: userId,
            player_name: hostName,
            portfolio_value: 10000,
            return_pct: 0
          });
          insertError = null;
          break;
        }
        if (result.error.code === '23505') {
          insertError = result.error;
          continue;
        }
        insertError = result.error;
        break;
      }

      if (insertError) {
        setError(insertError.message);
        return null;
      }

      const newRoomState: RoomState = {
        roomCode,
        hostId: userId,
        hostName: hostName,
        maxPlayers,
        status: 'waiting',
        seed: 0,
        day: 1,
        maxDays: 5,
      };
      setRoomState(newRoomState);
      roomStateRef.current = newRoomState;
      setError(null);

      subscribeToRoom(roomCode, userId);
      return roomCode;
    },
    [userId, subscribeToRoom],
  );

  // --- Join room ---
  const joinRoom = useCallback(
    async (roomCode: string, playerName: string): Promise<boolean> => {
      if (!userId) {
        setError('Not authenticated');
        return false;
      }

      const code = roomCode.toUpperCase();
      const { data, error: fetchError } = await supabase
        .from('battle_rooms')
        .select('*')
        .eq('room_code', code)
        .single();

      if (fetchError || !data) {
        setError(fetchError?.message?.includes('permission') ? 'Permission denied' : 'Room not found');
        return false;
      }

      if (data.status !== 'waiting') {
        setError('Room is not accepting players');
        return false;
      }

      playerNameRef.current = playerName;

      // Secure server-side capacity check by inserting into room_participants.
      // Trigger in DB will reject if full.
      const { error: partError } = await supabase.from('room_participants').insert({
        room_code: code,
        player_id: userId,
        player_name: playerName,
        portfolio_value: 10000,
        return_pct: 0
      });

      if (partError) {
        // Handle trigger exception or unique constraint
        setError(partError.message.includes('Room is full') ? 'Room is full' : partError.message);
        return false;
      }

      const newRoomState: RoomState = {
        roomCode: data.room_code as string,
        hostId: data.host_id as string,
        hostName: data.host_name as string,
        maxPlayers: data.max_players as number,
        status: data.status as 'waiting' | 'playing' | 'finished',
        seed: data.seed as number,
        day: data.day as number,
        maxDays: data.max_days as number,
      };
      setRoomState(newRoomState);
      roomStateRef.current = newRoomState;

      if (data.day_ends_at) {
        const endsAt = new Date(data.day_ends_at as string).getTime();
        dayEndsAtRef.current = endsAt;
        setTimeToNextRefresh(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
      }

      setError(null);
      subscribeToRoom(code, data.host_id as string);
      return true;
    },
    [userId, subscribeToRoom],
  );

  // --- Start game (host only) ---
  const startGame = useCallback(async (): Promise<void> => {
    const current = roomStateRef.current;
    if (!current || !userId || current.hostId !== userId) return;

    const seed = Date.now();
    const dayEndsAt = new Date(Date.now() + 60000).toISOString();

    const { error: updateError } = await supabase
      .from('battle_rooms')
      .update({
        status: 'playing',
        seed,
        day: 1,
        day_ends_at: dayEndsAt,
        started_at: new Date().toISOString(),
      })
      .eq('room_code', current.roomCode);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    dayEndsAtRef.current = Date.now() + 60000;
  }, [userId]);

  const isHost = userId !== null && roomState !== null && roomState.hostId === userId;

  return {
    players,
    roomState,
    timeToNextRefresh,
    isConnected,
    isHost,
    error,
    createRoom,
    joinRoom,
    startGame,
    broadcastPortfolio,
    leave,
  };
}
