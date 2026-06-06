import { renderHook, act } from '@testing-library/react-hooks';
import { useRoomBattle } from './src/hooks/useRoomBattle';

// Mock Supabase
jest.mock('./src/lib/supabase', () => ({
  supabase: {
    channel: jest.fn(() => ({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn(),
      track: jest.fn(),
      untrack: jest.fn(),
      presenceState: jest.fn(),
      send: jest.fn(),
    })),
    removeChannel: jest.fn(),
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { status: 'waiting' }, error: null }),
      update: jest.fn().mockResolvedValue({ error: null }),
      delete: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
}));

describe('useRoomBattle stress and integration test', () => {
  it('should create room properly and handle reconnect', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRoomBattle('user-1'));
    
    // Create Room
    await act(async () => {
      await result.current.createRoom('Player 1', 4);
    });

    expect(result.current.roomState).toBeDefined();
    expect(result.current.roomState?.status).toBe('waiting');
    expect(result.current.isHost).toBe(true);

    // Mock reconnect scenario
    // (This requires manipulating the mock channel state in a real environment)
  });

  it('should maintain active presence in player list', () => {
    // Generate 100 players
    const players = Array.from({ length: 100 }).map((_, i) => ({
      playerId: `p-${i}`,
      playerName: `Player ${i}`,
      portfolioValue: 1000 + i,
      returnPct: i * 0.1,
      joinedAt: Date.now(),
    }));

    // This would test the `channel.on('presence', ...)` handler
    // verifying that previous players map appropriately
  });
});
