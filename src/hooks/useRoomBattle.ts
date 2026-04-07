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
  broadcastPortfolio: (value: number, returnPct: number) => void;
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

  const channelRef = useRef<RealtimeChannel | null>(null);
  const dbChannelRef = useRef<RealtimeChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Store latest broadcast portfolio values keyed by playerId
  const portfolioMapRef = useRef<Map<string, { portfolioValue: number; returnPct: number }>>(new Map());

  // Keep roomState in a ref for timer callback access
  const roomStateRef = useRef<RoomState | null>(null);
  roomStateRef.current = roomState;

  // Keep playerName in a ref (set at join/create time)
  const playerNameRef = useRef<string>('');
  const joinedAtRef = useRef<number>(Date.now());

  // Day timer
  const dayEndsAtRef = useRef<number | null>(null);
  const playerCountRef = useRef(0);
  const isAdvancingDayRef = useRef(false);

  // --- Broadcast portfolio ---
  const broadcastPortfolio = useCallback(
    (value: number, returnPct: number) => {
      if (!userId) return;
      portfolioMapRef.current.set(userId, { portfolioValue: value, returnPct });

      channelRef.current?.send({
        type: 'broadcast',
        event: 'portfolio_update',
        payload: {
          playerId: userId,
          playerName: playerNameRef.current,
          portfolioValue: value,
          returnPct,
        },
      });

      // Also update presence so new joiners see current values without needing broadcasts
      channelRef.current?.track({
        playerId: userId,
        playerName: playerNameRef.current,
        portfolioValue: value,
        returnPct,
        joinedAt: joinedAtRef.current,
      });
    },
    [userId],
  );

  // --- Leave ---
  const leave = useCallback(() => {
    const channel = channelRef.current;
    const currentRoom = roomStateRef.current;

    if (channel) {
      channel.untrack();
      supabase.removeChannel(channel);
      channelRef.current = null;
    }
    const dbChannel = dbChannelRef.current;
    if (dbChannel) {
      supabase.removeChannel(dbChannel);
      dbChannelRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // If host leaves during 'waiting', delete the room (requires DELETE RLS policy)
    if (currentRoom && userId && currentRoom.hostId === userId && currentRoom.status === 'waiting') {
      supabase.from('battle_rooms').delete().eq('room_code', currentRoom.roomCode)
        .then(({ error }) => {
          if (error) console.warn('[RoomBattle] Failed to delete room:', error.message);
        });
    }

    setIsConnected(false);
    setPlayers([]);
    setRoomState(null);
    setTimeToNextRefresh(60);
    portfolioMapRef.current.clear();
    dayEndsAtRef.current = null;
  }, [userId]);

  // --- Subscribe to room channel ---
  const subscribeToRoom = useCallback(
    (roomCode: string, hostId: string) => {
      // DB channel: listen for battle_rooms updates
      const dbChannel = supabase
        .channel(`room-battle-db-${roomCode}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'battle_rooms',
            filter: `room_code=eq.${roomCode}`,
          },
          (payload) => {
            const row = payload.new as {
              room_code: string;
              host_id: string;
              host_name: string;
              max_players: number;
              status: 'waiting' | 'playing' | 'finished';
              seed: number;
              day: number;
              max_days: number;
              day_ends_at: string | null;
            };
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
              dayEndsAtRef.current = new Date(row.day_ends_at).getTime();
            }
          },
        )
        .subscribe();
      dbChannelRef.current = dbChannel;

      // Presence + broadcast channel
      const channel = supabase.channel(`room-battle-${roomCode}`);
      channelRef.current = channel;

      // Presence sync -> rebuild player list
      channel.on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<{
          playerId: string;
          playerName: string;
          portfolioValue: number;
          returnPct: number;
          joinedAt: number;
        }>();

        const flat: RoomPlayer[] = [];
        const seen = new Set<string>();

        for (const presences of Object.values(state)) {
          for (const p of presences) {
            if (seen.has(p.playerId)) continue;
            seen.add(p.playerId);

            const broadcast = portfolioMapRef.current.get(p.playerId);
            flat.push({
              playerId: p.playerId,
              playerName: p.playerName,
              portfolioValue: broadcast?.portfolioValue ?? p.portfolioValue,
              returnPct: broadcast?.returnPct ?? p.returnPct,
              isHost: p.playerId === hostId,
              joinedAt: p.joinedAt,
            });
          }
        }

        flat.sort((a, b) => b.returnPct - a.returnPct);
        setPlayers(flat);
        playerCountRef.current = flat.length;
      });

      // Broadcast: portfolio_update
      channel.on('broadcast', { event: 'portfolio_update' }, ({ payload }) => {
        portfolioMapRef.current.set(payload.playerId as string, {
          portfolioValue: payload.portfolioValue as number,
          returnPct: payload.returnPct as number,
        });

        setPlayers((prev) => {
          const updated = prev.map((p) =>
            p.playerId === payload.playerId
              ? {
                  ...p,
                  portfolioValue: payload.portfolioValue as number,
                  returnPct: payload.returnPct as number,
                  playerName: payload.playerName as string,
                }
              : p,
          );
          return updated.sort((a, b) => b.returnPct - a.returnPct);
        });
      });

      // Subscribe and track presence
      channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          joinedAtRef.current = Date.now();
          await channel.track({
            playerId: userId,
            playerName: playerNameRef.current,
            portfolioValue: 0,
            returnPct: 0,
            joinedAt: joinedAtRef.current,
          });
        }
        if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
        }
      });

      // Timer: countdown + host-gated day advancement
      timerRef.current = setInterval(() => {
        if (!dayEndsAtRef.current) {
          setTimeToNextRefresh(60);
          return;
        }

        const remaining = Math.max(0, Math.ceil((dayEndsAtRef.current - Date.now()) / 1000));
        setTimeToNextRefresh(remaining);

        const current = roomStateRef.current;
        if (!current || current.status !== 'playing') return;

        // Only the host advances the day, with guard flag to prevent race condition
        if (remaining <= 0 && userId === current.hostId && playerCountRef.current > 0 && !isAdvancingDayRef.current) {
          isAdvancingDayRef.current = true;
          const newDay = current.day + 1;
          const newEndsAt = Date.now() + 60000;
          dayEndsAtRef.current = newEndsAt;

          if (newDay > current.maxDays) {
            // Game over — optimistic lock: only update if day matches (prevents double advance)
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
            // Optimistic lock: .eq('day', current.day) ensures no double advancement
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
      const channel = channelRef.current;
      if (channel) {
        channel.untrack();
        supabase.removeChannel(channel);
        channelRef.current = null;
      }
      const dbChannel = dbChannelRef.current;
      if (dbChannel) {
        supabase.removeChannel(dbChannel);
        dbChannelRef.current = null;
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

      // Generate room code using crypto API (not Math.random) with collision retry
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
          insertError = null;
          break;
        }
        // Retry on unique constraint violation (room code collision)
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

      const { data, error: fetchError } = await supabase
        .from('battle_rooms')
        .select('*')
        .eq('room_code', roomCode.toUpperCase())
        .single();

      if (fetchError || !data) {
        setError(fetchError?.message?.includes('permission') ? 'Permission denied — contact support' : 'Room not found');
        return false;
      }

      if (data.status !== 'waiting') {
        setError('Room is not accepting players');
        return false;
      }

      playerNameRef.current = playerName;

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
        dayEndsAtRef.current = new Date(data.day_ends_at as string).getTime();
      }

      setError(null);
      subscribeToRoom(data.room_code as string, data.host_id as string);
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
