import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runTween } from '../../src/lib/tweenAnimation';

// jsdom is not configured in this workspace, so we polyfill only the globals
// the tween implementation touches. This keeps the test hermetic.
describe('runTween', () => {
  const originalWindow = (globalThis as { window?: unknown }).window;
  const originalDocument = (globalThis as { document?: unknown }).document;
  const originalPerformance = (globalThis as { performance?: unknown }).performance;

  beforeEach(() => {
    // Fresh mocks per test.
    vi.restoreAllMocks();
  });

  afterEach(() => {
    (globalThis as { window?: unknown }).window = originalWindow;
    (globalThis as { document?: unknown }).document = originalDocument;
    (globalThis as { performance?: unknown }).performance = originalPerformance;
  });

  it('resolves immediately with target frame when prefers-reduced-motion is set', async () => {
    (globalThis as { window?: unknown }).window = {
      matchMedia: (q: string) => ({
        matches: q.includes('reduce'),
        media: q,
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
      requestAnimationFrame: (cb: FrameRequestCallback) => setTimeout(() => cb(0), 0) as unknown as number,
      cancelAnimationFrame: (id: number) => clearTimeout(id as unknown as NodeJS.Timeout),
    };
    (globalThis as { document?: unknown }).document = {
      addEventListener: () => {},
      removeEventListener: () => {},
      hidden: false,
    };

    const frames: Record<string, number>[] = [];
    await runTween({
      from: { TECH: 100 },
      to: { TECH: 110 },
      durationMs: 1000,
      seed: 42,
      onFrame: (f) => frames.push(f),
    });

    expect(frames).toHaveLength(1);
    expect(frames[0]).toEqual({ TECH: 110 });
  });

  it('resolves immediately when window is unavailable (SSR guard)', async () => {
    (globalThis as { window?: unknown }).window = undefined;

    const frames: Record<string, number>[] = [];
    await runTween({
      from: { TECH: 100 },
      to: { TECH: 110 },
      durationMs: 1000,
      seed: 42,
      onFrame: (f) => frames.push(f),
    });

    expect(frames).toHaveLength(1);
    expect(frames[0]).toEqual({ TECH: 110 });
  });

  it('respects an already-aborted signal', async () => {
    (globalThis as { window?: unknown }).window = {
      matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
      requestAnimationFrame: () => 0,
      cancelAnimationFrame: () => {},
    };

    const controller = new AbortController();
    controller.abort();
    const frames: Record<string, number>[] = [];
    await runTween({
      from: { TECH: 100 },
      to: { TECH: 110 },
      durationMs: 1000,
      seed: 42,
      onFrame: (f) => frames.push(f),
      signal: controller.signal,
    });

    expect(frames).toHaveLength(0);
  });

  it('produces deterministic final frame equal to `to` given the same seed', async () => {
    (globalThis as { window?: unknown }).window = {
      matchMedia: (q: string) => ({
        matches: q.includes('reduce'),
        media: q,
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
      requestAnimationFrame: (cb: FrameRequestCallback) => setTimeout(() => cb(0), 0) as unknown as number,
      cancelAnimationFrame: (id: number) => clearTimeout(id as unknown as NodeJS.Timeout),
    };
    (globalThis as { document?: unknown }).document = {
      addEventListener: () => {},
      removeEventListener: () => {},
      hidden: false,
    };

    const framesA: Record<string, number>[] = [];
    const framesB: Record<string, number>[] = [];
    await runTween({
      from: { TECH: 100 }, to: { TECH: 110 },
      durationMs: 500, seed: 7,
      onFrame: (f) => framesA.push(f),
    });
    await runTween({
      from: { TECH: 100 }, to: { TECH: 110 },
      durationMs: 500, seed: 7,
      onFrame: (f) => framesB.push(f),
    });
    // Final frame always snaps to `to`.
    expect(framesA[framesA.length - 1]).toEqual({ TECH: 110 });
    expect(framesB[framesB.length - 1]).toEqual({ TECH: 110 });
  });
});
