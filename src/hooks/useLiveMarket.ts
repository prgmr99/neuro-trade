import { useState, useEffect, useRef, useCallback } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

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

export interface UseLiveMarketReturn {
  players: LivePlayer[];
  currentTimeSlot: number;
  dayInCycle: number;
  cycleNumber: number;
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
  const [timeToNextRefresh, setTimeToNextRefresh] = useState(computeTimeToNextRefresh);
  const [isConnected, setIsConnected] = useState(false);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Store latest broadcast portfolio values keyed by playerId
  const portfolioMapRef = useRef<Map<string, { portfolioValue: number; returnPct: number }>>(new Map());

  const { timeSlot, cycleNumber, dayInCycle } = getSlotInfo();

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
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsConnected(false);
    setPlayers([]);
    portfolioMapRef.current.clear();
  }, []);

  // --- Channel setup ---
  useEffect(() => {
    if (!userId) return;

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

    // Timer: update timeToNextRefresh every second
    timerRef.current = setInterval(() => {
      setTimeToNextRefresh(computeTimeToNextRefresh());
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      channel.untrack();
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, playerName]);

  return {
    players,
    currentTimeSlot: timeSlot,
    dayInCycle,
    cycleNumber,
    timeToNextRefresh,
    isConnected,
    broadcastPortfolio,
    leave,
  };
}
