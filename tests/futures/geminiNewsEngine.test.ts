import { describe, it, expect, vi, beforeEach } from 'vitest';

// We test the module's fallback behavior and API call logic
// by mocking fetch (no real Gemini calls in tests)

describe('geminiNewsEngine', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateDayNews', () => {
    const mockContext = {
      stocks: {
        TECH: {
          symbol: 'TECH',
          name: { en: 'NeoTech', ko: '네오테크' },
          price: 155.00,
          previousPrice: 150.00,
          priceHistory: [],
          volatility: 0.18,
          description: { en: 'Tech company', ko: '테크 기업' },
        },
        ECOM: {
          symbol: 'ECOM',
          name: { en: 'GlobalCart', ko: '글로벌카트' },
          price: 82.00,
          previousPrice: 85.50,
          priceHistory: [],
          volatility: 0.15,
          description: { en: 'E-commerce', ko: '이커머스' },
        },
      },
      currentDay: 1,
      maxDays: 5,
      previousEvents: [],
    };

    it('falls back gracefully when API returns error', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      }));

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result = await generateDayNews(mockContext);

      expect(result.news).toHaveLength(2);
      expect(result.news[0].dayIdx).toBe(2); // currentDay + 1
      expect(result.news[0].title.en).toBeTruthy();
      expect(result.news[0].title.ko).toBeTruthy();
      expect(result.effects).toBeDefined();
    });

    it('falls back gracefully when fetch throws', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result = await generateDayNews(mockContext);

      expect(result.news).toHaveLength(2);
      result.news.forEach(n => {
        expect(n.id).toMatch(/^fb-/);
        expect(n.effect).toBeDefined();
        expect(Object.keys(n.effect).length).toBeGreaterThan(0);
      });
    });

    it('parses valid API response correctly', async () => {
      const mockApiResponse = {
        news: [
          {
            title: { en: 'Tech Rally', ko: '테크 랠리' },
            content: { en: 'Markets surge on AI optimism.', ko: 'AI 낙관론에 시장 급등.' },
            effects: { TECH: 1.15, ECOM: 1.05 },
          },
          {
            title: { en: 'Energy Crisis', ko: '에너지 위기' },
            content: { en: 'Oil prices spike.', ko: '유가 급등.' },
            effects: { ECOM: 0.92 },
          },
        ],
        marketSentiment: 'volatile',
      };

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      }));

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result = await generateDayNews(mockContext);

      expect(result.news).toHaveLength(2);
      expect(result.news[0].id).toBe('ai-2-1');
      expect(result.news[0].title.en).toBe('Tech Rally');
      expect(result.news[0].title.ko).toBe('테크 랠리');
      expect(result.news[0].effect['TECH']).toBe(1.15);
      expect(result.news[1].effect['ECOM']).toBe(0.92);
    });

    it('clamps extreme effects to safe range [0.75, 1.30]', async () => {
      const mockApiResponse = {
        news: [
          {
            title: { en: 'Extreme News', ko: '극단 뉴스' },
            content: { en: 'Wild market move.', ko: '폭등폭락.' },
            effects: { TECH: 2.50, ECOM: 0.10 }, // Way out of range
          },
        ],
        marketSentiment: 'volatile',
      };

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      }));

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result = await generateDayNews(mockContext);

      expect(result.news[0].effect['TECH']).toBe(1.30); // clamped from 2.50
      expect(result.news[0].effect['ECOM']).toBe(0.75); // clamped from 0.10
    });

    it('falls back when API returns empty news array', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ news: [], marketSentiment: 'mixed' }),
      }));

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result = await generateDayNews(mockContext);

      // Should fall back to generated news
      expect(result.news).toHaveLength(2);
      expect(result.news[0].id).toMatch(/^fb-/);
    });

    it('sends correct request to API endpoint', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          news: [{
            title: { en: 'Test', ko: '테스트' },
            content: { en: 'Content', ko: '내용' },
            effects: { TECH: 1.05 },
          }],
          marketSentiment: 'bullish',
        }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      await generateDayNews(mockContext);

      expect(mockFetch).toHaveBeenCalledWith('/api/generate-news', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }));

      // Verify the body contains stock data (only essential fields, not full Stock objects)
      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.currentDay).toBe(1);
      expect(callBody.maxDays).toBe(5);
      expect(callBody.stocks.TECH.price).toBe(155.00);
      expect(callBody.stocks.TECH.symbol).toBe('TECH');
    });

    it('combines effects from multiple news items', async () => {
      const mockApiResponse = {
        news: [
          {
            title: { en: 'News 1', ko: '뉴스 1' },
            content: { en: 'Content 1', ko: '내용 1' },
            effects: { TECH: 1.10 },
          },
          {
            title: { en: 'News 2', ko: '뉴스 2' },
            content: { en: 'Content 2', ko: '내용 2' },
            effects: { TECH: 0.90 },
          },
        ],
        marketSentiment: 'mixed',
      };

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      }));

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result = await generateDayNews(mockContext);

      // Combined effect: 1.10 * 0.90 = 0.99
      expect(result.effects['TECH']).toBeCloseTo(0.99, 2);
    });
  });

  describe('fallback news generation', () => {
    it('produces deterministic output for same day', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

      const context = {
        stocks: {
          TECH: {
            symbol: 'TECH',
            name: { en: 'NeoTech', ko: '네오테크' },
            price: 150, previousPrice: 150, priceHistory: [], volatility: 0.18,
            description: { en: 'Tech', ko: '테크' },
          },
          ECOM: {
            symbol: 'ECOM',
            name: { en: 'GlobalCart', ko: '글로벌카트' },
            price: 85, previousPrice: 85, priceHistory: [], volatility: 0.15,
            description: { en: 'Ecom', ko: '이커머스' },
          },
        },
        currentDay: 3,
        maxDays: 5,
        previousEvents: [],
      };

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result1 = await generateDayNews(context);
      const result2 = await generateDayNews(context);

      // Same day + same stocks = same fallback output
      expect(result1.news[0].title.en).toBe(result2.news[0].title.en);
      expect(result1.effects).toEqual(result2.effects);
    });

    it('produces bilingual titles and content', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

      const context = {
        stocks: {
          TECH: {
            symbol: 'TECH',
            name: { en: 'NeoTech', ko: '네오테크' },
            price: 150, previousPrice: 150, priceHistory: [], volatility: 0.18,
            description: { en: 'Tech', ko: '테크' },
          },
        },
        currentDay: 1,
        maxDays: 5,
        previousEvents: [],
      };

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result = await generateDayNews(context);

      result.news.forEach(n => {
        expect(n.title.en).toBeTruthy();
        expect(n.title.ko).toBeTruthy();
        expect(n.content.en).toBeTruthy();
        expect(n.content.ko).toBeTruthy();
      });
    });

    it('generates effects in valid range', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

      const context = {
        stocks: {
          TECH: {
            symbol: 'TECH',
            name: { en: 'NeoTech', ko: '네오테크' },
            price: 150, previousPrice: 150, priceHistory: [], volatility: 0.18,
            description: { en: 'Tech', ko: '테크' },
          },
          ECOM: {
            symbol: 'ECOM',
            name: { en: 'GlobalCart', ko: '글로벌카트' },
            price: 85, previousPrice: 85, priceHistory: [], volatility: 0.15,
            description: { en: 'Ecom', ko: '이커머스' },
          },
        },
        currentDay: 2,
        maxDays: 5,
        previousEvents: [],
      };

      const { generateDayNews } = await import('../../src/lib/geminiNewsEngine');
      const result = await generateDayNews(context);

      for (const n of result.news) {
        for (const mult of Object.values(n.effect)) {
          expect(mult).toBeGreaterThan(0.5);
          expect(mult).toBeLessThan(1.5);
        }
      }
    });
  });

  describe('isGeminiAvailable', () => {
    it('returns true (API availability checked server-side)', async () => {
      const { isGeminiAvailable } = await import('../../src/lib/geminiNewsEngine');
      // After refactor, always returns true — server handles key check
      expect(isGeminiAvailable()).toBe(true);
    });
  });

  describe('summarizeDayEvents', () => {
    it('summarizes news titles and big movers', async () => {
      const { summarizeDayEvents } = await import('../../src/lib/geminiNewsEngine');

      const news = [
        { id: '1', dayIdx: 1, title: { en: 'Tech Rally', ko: '테크 랠리' }, content: { en: '', ko: '' }, read: false, effect: {} },
        { id: '2', dayIdx: 1, title: { en: 'Energy Drop', ko: '에너지 하락' }, content: { en: '', ko: '' }, read: false, effect: {} },
      ];

      const stocks = {
        TECH: { symbol: 'TECH', name: { en: 'NeoTech', ko: '네오테크' }, price: 165, previousPrice: 150, priceHistory: [], volatility: 0.18, description: { en: '', ko: '' } },
        ECOM: { symbol: 'ECOM', name: { en: 'GlobalCart', ko: '글로벌카트' }, price: 86, previousPrice: 85, priceHistory: [], volatility: 0.15, description: { en: '', ko: '' } },
      };

      const summary = summarizeDayEvents(news, stocks);

      expect(summary).toContain('Tech Rally');
      expect(summary).toContain('Energy Drop');
      expect(summary).toContain('TECH'); // 10% move = big mover
      expect(summary).not.toContain('ECOM'); // ~1% move = not big
    });
  });
});
