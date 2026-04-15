import type { News, Stock } from '../types';

export interface MarketContext {
  stocks: Record<string, Stock>;
  currentDay: number;
  maxDays: number;
  previousEvents: string[];
}

interface GeneratedNewsItem {
  title: { en: string; ko: string };
  content: { en: string; ko: string };
  effects: Record<string, number>;
}

interface GeminiNewsResponse {
  news: GeneratedNewsItem[];
  marketSentiment: 'bullish' | 'bearish' | 'volatile' | 'mixed';
}

export async function generateDayNews(context: MarketContext): Promise<{ news: News[]; effects: Record<string, number> }> {
  try {
    // Call our server-side API route (keeps Gemini key secure)
    const res = await fetch('/api/generate-news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stocks: Object.fromEntries(
          Object.entries(context.stocks).map(([sym, s]) => [
            sym,
            { symbol: s.symbol, name: s.name, price: s.price, previousPrice: s.previousPrice },
          ])
        ),
        currentDay: context.currentDay,
        maxDays: context.maxDays,
        previousEvents: context.previousEvents,
      }),
    });

    if (!res.ok) {
      console.warn(`API returned ${res.status}, using fallback`);
      return generateFallbackNews(context);
    }

    const parsed: GeminiNewsResponse = await res.json();

    if (!Array.isArray(parsed.news) || parsed.news.length === 0) {
      return generateFallbackNews(context);
    }

    // Transform to News[] format
    const combinedEffects: Record<string, number> = {};
    const newsItems: News[] = parsed.news.map((item, idx) => {
      const clampedEffects: Record<string, number> = {};
      for (const [sym, mult] of Object.entries(item.effects)) {
        const clamped = Math.max(0.75, Math.min(1.30, mult));
        clampedEffects[sym] = clamped;
        combinedEffects[sym] = (combinedEffects[sym] ?? 1) * clamped;
      }

      return {
        id: `ai-${context.currentDay + 1}-${idx + 1}`,
        dayIdx: context.currentDay + 1,
        title: item.title,
        content: item.content,
        read: false,
        effect: clampedEffects,
      };
    });

    return { news: newsItems, effects: combinedEffects };
  } catch (error) {
    console.warn('AI news generation failed, using fallback:', error);
    return generateFallbackNews(context);
  }
}

// Fallback when API is unavailable — generates basic random events
function generateFallbackNews(context: MarketContext): { news: News[]; effects: Record<string, number> } {
  const symbols = Object.keys(context.stocks);
  const day = context.currentDay + 1;

  const hash = (s: number) => {
    let h = s | 0;
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };

  const newsItems: News[] = [];
  const combinedEffects: Record<string, number> = {};

  for (let i = 0; i < 2; i++) {
    const seed = day * 1000 + i * 100;
    const targetSymbol = symbols[Math.floor(hash(seed) * symbols.length)];
    const isPositive = hash(seed + 1) > 0.45;
    const magnitude = 0.05 + hash(seed + 2) * 0.15;
    const effect = isPositive ? 1 + magnitude : 1 - magnitude;

    const effects: Record<string, number> = { [targetSymbol]: effect };
    const secondarySymbol = symbols[Math.floor(hash(seed + 3) * symbols.length)];
    if (secondarySymbol !== targetSymbol) {
      effects[secondarySymbol] = isPositive ? 1 + magnitude * 0.3 : 1 - magnitude * 0.3;
    }

    for (const [sym, mult] of Object.entries(effects)) {
      combinedEffects[sym] = (combinedEffects[sym] ?? 1) * mult;
    }

    newsItems.push({
      id: `fb-${day}-${i + 1}`,
      dayIdx: day,
      title: {
        en: isPositive
          ? `${context.stocks[targetSymbol].name.en} Reports Strong Growth`
          : `${context.stocks[targetSymbol].name.en} Faces Unexpected Headwinds`,
        ko: isPositive
          ? `${context.stocks[targetSymbol].name.ko}, 강력한 성장세 보고`
          : `${context.stocks[targetSymbol].name.ko}, 예상치 못한 역풍 직면`,
      },
      content: {
        en: isPositive
          ? `Analysts raise price targets as ${context.stocks[targetSymbol].name.en} demonstrates robust fundamentals and market positioning.`
          : `Market concerns mount as ${context.stocks[targetSymbol].name.en} reports challenging conditions and revised outlook.`,
        ko: isPositive
          ? `${context.stocks[targetSymbol].name.ko}의 탄탄한 펀더멘털과 시장 포지셔닝에 애널리스트들이 목표가를 상향 조정했다.`
          : `${context.stocks[targetSymbol].name.ko}가 어려운 시장 환경과 전망 하향을 보고하며 시장 우려가 커지고 있다.`,
      },
      read: false,
      effect: effects,
    });
  }

  return { news: newsItems, effects: combinedEffects };
}

// Check if AI news generation is available (try the API endpoint)
export function isGeminiAvailable(): boolean {
  // In production, the API route handles the key check server-side
  // Always return true — the fetch call will fallback gracefully if unavailable
  return true;
}

// Generate a summary of what happened on a given day (for context in next API call)
export function summarizeDayEvents(news: News[], stocks: Record<string, Stock>): string {
  const summaries = news.map(n => n.title.en);
  const bigMovers = Object.values(stocks)
    .filter(s => Math.abs((s.price - s.previousPrice) / s.previousPrice) > 0.05)
    .map(s => {
      const pct = ((s.price - s.previousPrice) / s.previousPrice * 100).toFixed(1);
      return `${s.symbol} ${Number(pct) >= 0 ? '+' : ''}${pct}%`;
    });
  return `${summaries.join('; ')}${bigMovers.length > 0 ? ` | Big movers: ${bigMovers.join(', ')}` : ''}`;
}
