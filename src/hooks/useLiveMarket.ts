import { useState, useEffect, useRef, useCallback } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { hashSeed } from '../lib/prng';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LivePlayer {
  playerId: string;
  playerName: string;
  portfolioValue: number;
  returnPct: number;
  joinedAt: number;
}

export interface LiveMarketState {
  cycleNumber: number;
  day: number;
  seed: number;
}

export interface UseLiveMarketReturn {
  players: LivePlayer[];
  marketState: LiveMarketState | null; // null while loading
  timeToNextRefresh: number;
  isConnected: boolean;
  broadcastPortfolio: (value: number, returnPct: number) => void;
  leave: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeSeed(cycleNumber: number): number {
  return hashSeed(String(cycleNumber));
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLiveMarket(
  userId: string | null,
  playerName: string,
): UseLiveMarketReturn {
  const [players, setPlayers] = useState<LivePlayer[]>([]);
  const [marketState, setMarketState] = useState<LiveMarketState | null>(null);
  const [timeToNextRefresh, setTimeToNextRefresh] = useState(60);
  const [isConnected, setIsConnected] = useState(false);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const dbChannelRef = useRef<RealtimeChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Store latest broadcast portfolio values keyed by playerId
  const portfolioMapRef = useRef<Map<string, { portfolioValue: number; returnPct: number }>>(new Map());

  // Keep marketState in a ref for timer callback access
  const marketStateRef = useRef<LiveMarketState | null>(null);
  marketStateRef.current = marketState;

  // Keep playerName in a ref to avoid channel reconnection on name changes
  const playerNameRef = useRef(playerName);
  playerNameRef.current = playerName;

  // Presence-driven timer state
  const dayEndsAtRef = useRef<number | null>(null); // epoch ms
  const playerCountRef = useRef(0);

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
        joinedAt: Date.now(),
      });
    },
    [userId],
  );

  // --- Leave ---
  const leave = useCallback(() => {
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
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsConnected(false);
    setPlayers([]);
    setMarketState(null);
    portfolioMapRef.current.clear();
  }, []);

  // --- Channel setup ---
  useEffect(() => {
    if (!userId) return;

    // 1. Fetch current state from DB and resume timer
    supabase
      .from('live_market_state')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (!data) return;

        const state: LiveMarketState = {
          cycleNumber: data.cycle_number,
          day: data.day,
          seed: data.seed || computeSeed(data.cycle_number),
        };
        setMarketState(state);
        marketStateRef.current = state;

        if (data.day_ends_at) {
          const endsAt = new Date(data.day_ends_at).getTime();
          if (endsAt > Date.now()) {
            // Timer still running (other players present)
            dayEndsAtRef.current = endsAt;
          } else {
            // Timer expired while no players — resume with time_remaining
            const remaining = data.time_remaining || 60;
            const newEndsAt = Date.now() + remaining * 1000;
            dayEndsAtRef.current = newEndsAt;
            supabase.from('live_market_state').update({
              day_ends_at: new Date(newEndsAt).toISOString(),
              updated_at: new Date().toISOString(),
            }).eq('id', 1);
          }
        } else {
          // Paused (no day_ends_at) — resume with time_remaining
          const remaining = data.time_remaining || 60;
          const newEndsAt = Date.now() + remaining * 1000;
          dayEndsAtRef.current = newEndsAt;
          supabase.from('live_market_state').update({
            day_ends_at: new Date(newEndsAt).toISOString(),
            updated_at: new Date().toISOString(),
          }).eq('id', 1);
        }
      });

    // 2. Subscribe to Realtime changes on live_market_state
    const dbChannel = supabase
      .channel('live-market-db')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'live_market_state' },
        (payload) => {
          const row = payload.new as {
            cycle_number: number; day: number; seed: number; day_ends_at: string | null;
          };
          const newState = {
            cycleNumber: row.cycle_number,
            day: row.day,
            seed: row.seed,
          };
          setMarketState(newState);
          marketStateRef.current = newState;
          if (row.day_ends_at) {
            dayEndsAtRef.current = new Date(row.day_ends_at).getTime();
          }
        },
      )
      .subscribe();
    dbChannelRef.current = dbChannel;

    // 3. Subscribe to live-competition channel for Presence + Broadcast
    const channel = supabase.channel('live-competition');
    channelRef.current = channel;

    // Presence sync -> rebuild player list + track count
    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState<{
        playerId: string;
        playerName: string;
        portfolioValue: number;
        returnPct: number;
        joinedAt: number;
      }>();

      const flat: LivePlayer[] = [];
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
      portfolioMapRef.current.set(payload.playerId, {
        portfolioValue: payload.portfolioValue,
        returnPct: payload.returnPct,
      });

      setPlayers((prev) => {
        const updated = prev.map((p) =>
          p.playerId === payload.playerId
            ? { ...p, portfolioValue: payload.portfolioValue, returnPct: payload.returnPct, playerName: payload.playerName }
            : p,
        );
        return updated.sort((a, b) => b.returnPct - a.returnPct);
      });
    });

    // Subscribe and track presence
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        setIsConnected(true);
        await channel.track({
          playerId: userId,
          playerName: playerNameRef.current,
          portfolioValue: 0,
          returnPct: 0,
          joinedAt: Date.now(),
        });
      }
      if (status === 'CHANNEL_ERROR') {
        setIsConnected(false);
      }
    });

    // 4. Timer: countdown + presence-gated day advancement
    timerRef.current = setInterval(() => {
      if (!dayEndsAtRef.current) {
        setTimeToNextRefresh(60);
        return;
      }

      const remaining = Math.max(0, Math.ceil((dayEndsAtRef.current - Date.now()) / 1000));
      setTimeToNextRefresh(remaining);

      // Advance day only when timer expires AND players are present
      if (remaining <= 0 && playerCountRef.current > 0) {
        const current = marketStateRef.current;
        if (!current) return;

        const newDay = current.day + 1;
        // Generate a new seed every 5-day phase for news variety
        const phase = Math.floor((newDay - 1) / 5);
        const prevPhase = Math.floor((current.day - 1) / 5);
        const newSeed = phase !== prevPhase ? computeSeed(phase) : current.seed;

        const newState = { cycleNumber: current.cycleNumber, day: newDay, seed: newSeed };
        setMarketState(newState);
        marketStateRef.current = newState;

        const newEndsAt = Date.now() + 60000;
        dayEndsAtRef.current = newEndsAt;

        supabase.from('live_market_state').update({
          cycle_number: newState.cycleNumber,
          day: newDay,
          seed: newSeed,
          day_ends_at: new Date(newEndsAt).toISOString(),
          time_remaining: 60,
          updated_at: new Date().toISOString(),
        }).eq('id', 1);
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Save remaining time on disconnect so next joiner can resume
      if (dayEndsAtRef.current) {
        const remaining = Math.max(1, Math.ceil((dayEndsAtRef.current - Date.now()) / 1000));
        supabase.from('live_market_state').update({
          time_remaining: remaining,
          updated_at: new Date().toISOString(),
        }).eq('id', 1);
      }
      channel.untrack();
      supabase.removeChannel(channel);
      channelRef.current = null;
      supabase.removeChannel(dbChannel);
      dbChannelRef.current = null;
    };
    // playerName is tracked via playerNameRef to avoid channel reconnection on name changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    players,
    marketState,
    timeToNextRefresh,
    isConnected,
    broadcastPortfolio,
    leave,
  };
}
