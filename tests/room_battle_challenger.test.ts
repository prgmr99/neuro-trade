import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoomBattle } from '../src/hooks/useRoomBattle';
import { supabase } from '../src/lib/supabase';

// Mock Supabase
vi.mock('../src/lib/supabase', () => ({
  supabase: {
    channel: vi.fn(),
    removeChannel: vi.fn(),
    from: vi.fn(),
  }
}));

describe('Challenger Verification: useRoomBattle.ts and RoomBattle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Oracle: Host disconnect during waiting deletes the room', async () => {
    const mockDelete = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockResolvedValue({ error: null });

    const mockFrom = {
      insert: vi.fn().mockResolvedValue({ error: null }),
      delete: mockDelete,
      eq: mockEq,
    };
    (supabase.from as any).mockReturnValue(mockFrom);

    const { result } = renderHook(() => useRoomBattle('host1'));

    await act(async () => {
      await result.current.createRoom('HostName', 4);
    });

    expect(result.current.roomState?.status).toBe('waiting');
    expect(result.current.isHost).toBe(true);

    // Act: Leave the room
    act(() => {
      result.current.leave();
    });

    // Verify DB delete was called for the room_code
    expect(mockDelete).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith('room_code', expect.any(String));
  });

  it('Oracle: Disconnected players are kept as inactive and retain score', async () => {
    let presenceCallback: any;

    const mockChannel = {
      on: vi.fn().mockImplementation((type, filter, cb) => {
        if (type === 'presence' && filter.event === 'sync') presenceCallback = cb;
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

    // Both players present
    mockChannel.presenceState.mockReturnValue({
      'user1': [{ playerId: 'user1', playerName: 'Player1', portfolioValue: 1000, returnPct: 0, joinedAt: 100 }],
      'user2': [{ playerId: 'user2', playerName: 'Player2', portfolioValue: 1500, returnPct: 50, joinedAt: 101 }]
    });

    act(() => {
      presenceCallback();
    });

    expect(result.current.players).toHaveLength(2);
    expect(result.current.players.find(p => p.playerId === 'user2')?.isActive).toBe(true);

    // Player 2 drops
    mockChannel.presenceState.mockReturnValue({
      'user1': [{ playerId: 'user1', playerName: 'Player1', portfolioValue: 1000, returnPct: 0, joinedAt: 100 }]
    });

    act(() => {
      presenceCallback();
    });

    expect(result.current.players).toHaveLength(2);
    const u2 = result.current.players.find(p => p.playerId === 'user2');
    expect(u2?.isActive).toBe(false);
    expect(u2?.portfolioValue).toBe(1500);
  });
});
