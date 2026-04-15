import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface StockInfo {
  symbol: string;
  name: { en: string; ko: string };
  price: number;
  previousPrice: number;
}

interface MarketContext {
  stocks: Record<string, StockInfo>;
  currentDay: number;
  maxDays: number;
  previousEvents: string[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI service not configured' });
  }

  try {
    const context: MarketContext = req.body;

    if (!context.stocks || typeof context.currentDay !== 'number') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const stockSummary = Object.values(context.stocks)
      .map((s) => {
        const change =
          s.previousPrice > 0
            ? ((s.price - s.previousPrice) / s.previousPrice * 100).toFixed(1)
            : '0.0';
        return `- ${s.symbol} (${s.name.en}): $${s.price.toFixed(2)} (${Number(change) >= 0 ? '+' : ''}${change}% today)`;
      })
      .join('\n');

    const prevEvents =
      context.previousEvents.length > 0
        ? `\n\nPrevious events:\n${context.previousEvents.map((e, i) => `Day ${i + 1}: ${e}`).join('\n')}`
        : '';

    const prompt = `You are a financial news generator for an extreme futures trading simulation game called "트레이딩 고수방" (Pro Trading Room).

CURRENT MARKET STATE:
${stockSummary}

Day: ${context.currentDay + 1} of ${context.maxDays}
${prevEvents}

Generate exactly 2-3 news items that will affect these stocks. Rules:
1. **UNPREDICTABLE**: Don't follow obvious patterns. If markets went up, don't automatically make them go down. Real markets are chaotic.
2. **REALISTIC**: Base news on real-world market dynamics (earnings, regulations, geopolitics, supply chains, macro economics, sector rotation)
3. **CORRELATED**: Each news item MUST have a clear logical connection to the stocks it affects. The effects must make economic sense.
4. **EXTREME VOLATILITY**: This is a pro futures trading room. Effects should be significant — individual stock effects between 0.85 and 1.20 (±15-20%). At least one news item should cause a major move (>10%).
5. **BILINGUAL**: All text in both English and Korean. Korean should be natural financial news language, not translation-style.
6. **INTERCONNECTED**: Some news should affect multiple stocks in different ways (e.g., tech regulation hurts TECH but helps competitors)

IMPORTANT: Effects are multipliers. 1.0 = no change, 1.15 = +15%, 0.85 = -15%.
Each news item should affect 1-4 stocks (not necessarily all 5).

Respond with ONLY valid JSON, no markdown fences:
{
  "news": [
    {
      "title": { "en": "headline in English", "ko": "한국어 헤드라인" },
      "content": { "en": "2-3 sentence article body in English", "ko": "한국어 기사 본문 2-3문장" },
      "effects": { "TECH": 1.12, "ECOM": 0.94 }
    }
  ],
  "marketSentiment": "volatile"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const jsonStr = text
      .replace(/^```json?\s*\n?/i, '')
      .replace(/\n?```\s*$/i, '')
      .trim();
    const parsed = JSON.parse(jsonStr);

    if (!Array.isArray(parsed.news) || parsed.news.length === 0) {
      return res.status(502).json({ error: 'Invalid AI response structure' });
    }

    for (const item of parsed.news) {
      for (const sym of Object.keys(item.effects)) {
        item.effects[sym] = Math.max(0.75, Math.min(1.30, item.effects[sym]));
      }
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(502).json({ error: 'AI generation failed' });
  }
}
