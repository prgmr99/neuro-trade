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

function getSlotInfo() {
  const now = Date.now();
  const timeSlot = Math.floor(now / 60000);
  const cycleNumber = Math.floor(timeSlot / 5);
  const dayInCycle = (timeSlot % 5) + 1;
  return { timeSlot, cycleNumber, dayInCycle };
}

function computeTimeToNextRefresh(): number {
  return 60 - (Math.floor(Date.now() / 1000) % 60);
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLiveMarket(
  userId: string | null,
  playerName: string,
): UseLiveMarketReturn {
  const [players, setPlayers] = useState<LivePlayer[]>([]);
  // Initialize immediately from wall-clock — no waiting for DB
  const [marketState, setMarketState] = useState<LiveMarketState | null>(() => {
    const { cycleNumber, dayInCycle } = getSlotInfo();
    return {
      cycleNumber,
      day: dayInCycle,
      seed: hashSeed(String(cycleNumber)),
    };
  });
  const [timeToNextRefresh, setTimeToNextRefresh] = useState(computeTimeToNextRefresh);
  const [isConnected, setIsConnected] = useState(false);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const dbChannelRef = useRef<RealtimeChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastAdvancedSlotRef = useRef<number>(-1);

  // Store latest broadcast portfolio values keyed by playerId
  const portfolioMapRef = useRef<Map<string, { portfolioValue: number; returnPct: number }>>(new Map());

  // Keep marketState in a ref for timer callback access
  const marketStateRef = useRef<LiveMarketState | null>(null);
  marketStateRef.current = marketState;

  // --- Broadcast portfolio ---
  const broadcastPortfolio = useCallback(
    (value: number, returnPct: number) => {
      if (!userId) return;
      // Update local map immediately
      portfolioMapRef.current.set(userId, { portfolioValue: value, returnPct });

      channelRef.current?.send({
        type: 'broadcast',
        event: 'portfolio_update',
        payload: {
          playerId: userId,
          playerName,
          portfolioValue: value,
          returnPct,
        },
      });
    },
    [userId, playerName],
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
    lastAdvancedSlotRef.current = -1;
  }, []);

  // --- Channel setup ---
  useEffect(() => {
    if (!userId) return;

    // 1. Fetch current state — if DB is stale, compute and update
    const { timeSlot, cycleNumber: currentCycle, dayInCycle: currentDay } = getSlotInfo();
    const currentSeed = currentDay === 1 || true
      ? hashSeed(String(currentCycle))
      : 0;

    supabase
      .from('live_market_state')
      .select('cycle_number, day, seed')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        // Compute what the state SHOULD be based on wall clock
        const expectedState: LiveMarketState = {
          cycleNumber: currentCycle,
          day: currentDay,
          seed: currentSeed,
        };

        if (!data || data.cycle_number !== currentCycle || data.day !== currentDay) {
          // DB is stale or empty — use computed state and update DB
          setMarketState(expectedState);
          marketStateRef.current = expectedState;
          lastAdvancedSlotRef.current = timeSlot;

          supabase.from('live_market_state').update({
            cycle_number: currentCycle,
            day: currentDay,
            seed: currentSeed,
            updated_at: new Date().toISOString(),
          }).eq('id', 1);
        } else {
          // DB is current — use it
          setMarketState({
            cycleNumber: data.cycle_number,
            day: data.day,
            seed: data.seed,
          });
          lastAdvancedSlotRef.current = timeSlot;
        }
      });

    // 2. Subscribe to Realtime changes on live_market_state
    const dbChannel = supabase
      .channel('live-market-db')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'live_market_state' },
        (payload) => {
          const row = payload.new as { cycle_number: number; day: number; seed: number };
          setMarketState({
            cycleNumber: row.cycle_number,
            day: row.day,
            seed: row.seed,
          });
        },
      )
      .subscribe();
    dbChannelRef.current = dbChannel;

    // 3. Subscribe to live-competition channel for Presence + Broadcast
    const channel = supabase.channel('live-competition');
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

      const flat: LivePlayer[] = [];
      const seen = new Set<string>();

      for (const presences of Object.values(state)) {
        for (const p of presences) {
          if (seen.has(p.playerId)) continue;
          seen.add(p.playerId);

          // Merge with latest broadcast data if available
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
          playerName,
          portfolioValue: 0,
          returnPct: 0,
          joinedAt: Date.now(),
        });
      }
      if (status === 'CHANNEL_ERROR') {
        setIsConnected(false);
      }
    });

    // 4. Timer: countdown + day advancement attempt
    timerRef.current = setInterval(() => {
      const remaining = computeTimeToNextRefresh();
      setTimeToNextRefresh(remaining);

      // When countdown crosses 0, attempt to advance the day
      const { timeSlot, cycleNumber, dayInCycle } = getSlotInfo();
      if (lastAdvancedSlotRef.current !== -1 && timeSlot !== lastAdvancedSlotRef.current) {
        const currentSeed = marketStateRef.current?.seed ?? 0;
        const seed = dayInCycle === 1 ? hashSeed(String(cycleNumber)) : currentSeed;

        const newState = {
          cycleNumber,
          day: dayInCycle,
          seed,
        };

        // Update local state immediately (don't wait for Realtime)
        setMarketState(newState);
        marketStateRef.current = newState;

        // Persist to Supabase (idempotent — multiple clients can attempt)
        supabase.from('live_market_state').update({
          cycle_number: cycleNumber,
          day: dayInCycle,
          seed: seed,
          updated_at: new Date().toISOString(),
        }).eq('id', 1).then(({ error }) => {
          if (error) console.warn('Failed to update live_market_state:', error.message);
        });
      }
      lastAdvancedSlotRef.current = timeSlot;
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      channel.untrack();
      supabase.removeChannel(channel);
      channelRef.current = null;
      supabase.removeChannel(dbChannel);
      dbChannelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, playerName]);

  return {
    players,
    marketState,
    timeToNextRefresh,
    isConnected,
    broadcastPortfolio,
    leave,
  };
}
