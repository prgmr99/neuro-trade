import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoomBattle } from '../src/hooks/useRoomBattle';
import { supabase } from '../src/lib/supabase';

// Deep mock for Supabase
vi.mock('../src/lib/supabase', () => ({
  supabase: {
    channel: vi.fn(),
    removeChannel: vi.fn(),
    from: vi.fn(),
  }
}));

describe('Empirical Verification: useRoomBattle.ts', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Oracle: Player disconnects retain score and become inactive', async () => {
    let presenceCallback: any;
    let broadcastCallback: any;

    const mockChannel = {
      on: vi.fn().mockImplementation((type, filter, cb) => {
        if (type === 'presence' && filter.event === 'sync') presenceCallback = cb;
        if (type === 'broadcast' && filter.event === 'portfolio_update') broadcastCallback = cb;
        return mockChannel;
      }),
      subscribe: vi.fn().mockImplementation((cb) => {
        cb('SUBSCRIBED');
        return mockChannel;
      }),
      track: vi.fn(),
      untrack: vi.fn(),
      presenceState: vi.fn(),
    };

    const mockDbChannel = {
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn(),
    };

    (supabase.channel as any).mockImplementation((name: string) => {
      if (name.includes('db')) return mockDbChannel;
      return mockChannel;
    });

    const mockFrom = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: {
          room_code: 'TEST12', host_id: 'host1', status: 'waiting', day: 1, max_days: 5
        }
      }),
    };
    (supabase.from as any).mockReturnValue(mockFrom);

    const { result } = renderHook(() => useRoomBattle('user1'));

    await act(async () => {
      await result.current.joinRoom('TEST12', 'Player1');
    });

    // Generator: Simulate players joining
    mockChannel.presenceState.mockReturnValue({
      'user1': [{ playerId: 'user1', playerName: 'Player1', portfolioValue: 1000, returnPct: 0, joinedAt: 100 }],
      'user2': [{ playerId: 'user2', playerName: 'Player2', portfolioValue: 1000, returnPct: 0, joinedAt: 101 }]
    });

    act(() => {
      presenceCallback();
    });

    expect(result.current.players).toHaveLength(2);
    expect(result.current.players.find(p => p.playerId === 'user2')?.isActive).toBe(true);

    // Generator: Simulate user2 broadcasting an update
    act(() => {
      broadcastCallback({
        payload: { playerId: 'user2', playerName: 'Player2', portfolioValue: 1500, returnPct: 50 }
      });
    });

    expect(result.current.players.find(p => p.playerId === 'user2')?.portfolioValue).toBe(1500);

    // Oracle: user2 drops from presence
    mockChannel.presenceState.mockReturnValue({
      'user1': [{ playerId: 'user1', playerName: 'Player1', portfolioValue: 1000, returnPct: 0, joinedAt: 100 }]
    });

    act(() => {
      presenceCallback();
    });

    // Assertion: user2 is still in the list, isActive is false, score is retained
    expect(result.current.players).toHaveLength(2);
    const u2 = result.current.players.find(p => p.playerId === 'user2');
    expect(u2?.isActive).toBe(false);
    expect(u2?.portfolioValue).toBe(1500); // score retained
  });

  it('Stress Harness: Non-host can advance the day using optimistic locking', async () => {
    let dbCallback: any;

    const mockDbChannel = {
      on: vi.fn().mockImplementation((type, filter, cb) => {
        if (type === 'postgres_changes') dbCallback = cb;
        return mockDbChannel;
      }),
      subscribe: vi.fn(),
    };

    const mockChannel = {
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockImplementation((cb) => { cb('SUBSCRIBED'); return mockChannel; }),
      track: vi.fn(),
      presenceState: vi.fn().mockReturnValue({
        'user1': [{ playerId: 'user1', playerName: 'Player1', portfolioValue: 1000, returnPct: 0, joinedAt: 100 }]
      }),
    };

    (supabase.channel as any).mockImplementation((name: string) => {
      if (name.includes('db')) return mockDbChannel;
      return mockChannel;
    });

    const mockUpdate = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockFrom = {
      select: vi.fn().mockReturnThis(),
      update: mockUpdate,
      eq: mockEq,
      single: vi.fn().mockResolvedValue({
        data: {
          room_code: 'TEST12', host_id: 'host1', status: 'waiting', day: 1, max_days: 5
        }
      }),
    };
    (supabase.from as any).mockReturnValue(mockFrom);

    const { result } = renderHook(() => useRoomBattle('user1')); // user1 is NOT the host (host is host1)

    await act(async () => {
      await result.current.joinRoom('TEST12', 'Player1');
    });

    // Inject room state playing
    act(() => {
      dbCallback({
        new: { room_code: 'TEST12', host_id: 'host1', status: 'playing', day: 1, max_days: 5, day_ends_at: new Date(Date.now() + 5000).toISOString() }
      });
    });

    // Advance time past the end of the day
    act(() => {
      vi.advanceTimersByTime(6000);
    });

    // Oracle: Verify that the non-host user attempted to update the DB to advance the day
    expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
      day: 2,
    }));
    // Oracle: Verify optimistic locking was used (.eq('day', 1))
    expect(mockEq).toHaveBeenCalledWith('day', 1);
  });
});
