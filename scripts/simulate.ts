/**
 * Advanced mode return simulation
 * Run: npx tsx scripts/simulate.ts
 */

import { ADVANCED_STOCKS } from '../src/data/advanced/stocks';
import { ADVANCED_NEWS } from '../src/data/advanced/news';
import { News, Stock, StockSymbol } from '../src/types';

// Mulberry32 PRNG (same as game)
function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

interface SimResult {
  seed: number;
  finalValue: number;
  returnPct: number;
}

function cloneStocks(stocks: Record<StockSymbol, Stock>): Record<StockSymbol, Stock> {
  const result: Record<StockSymbol, Stock> = {};
  for (const [sym, s] of Object.entries(stocks)) {
    result[sym] = { ...s, priceHistory: [...s.priceHistory] };
  }
  return result;
}

function initStocks(seed: number): Record<StockSymbol, Stock> {
  const rng = mulberry32(seed);
  const stocks = cloneStocks(ADVANCED_STOCKS);
  for (const symbol of Object.keys(stocks)) {
    const stock = stocks[symbol];
    let currentSimPrice = stock.price * 0.8;
    const history = [];
    for (let i = -5; i <= 0; i++) {
      const noise = 1 + (rng() - 0.5) * stock.volatility;
      const openPrice = currentSimPrice;
      const closePrice = openPrice * noise;
      const highPrice = Math.max(openPrice, closePrice) * (1 + rng() * stock.volatility);
      const lowPrice = Math.min(openPrice, closePrice) * (1 - rng() * stock.volatility);
      history.push({ day: i, open: openPrice, close: closePrice, high: highPrice, low: lowPrice });
      currentSimPrice = closePrice;
    }
    stock.price = currentSimPrice;
    stock.previousPrice = history[history.length - 2]?.close || currentSimPrice;
    stock.priceHistory = history;
  }
  return stocks;
}

function getPreApplyRatio(): number {
  return (globalThis as any).__PRE_APPLY_RATIO ?? 0.8;
}

function getMarketGravity(): number {
  return (globalThis as any).__MARKET_GRAVITY ?? 0.7;
}

function getEffectScale(): number {
  return (globalThis as any).__EFFECT_SCALE ?? 0.3;
}

function preApplyEffects(stocks: Record<StockSymbol, Stock>, news: News[]): void {
  const ratio = getPreApplyRatio();
  const scale = getEffectScale();
  for (const n of news) {
    for (const [symbol, multiplier] of Object.entries(n.effect)) {
      if (stocks[symbol]) {
        let preEffect = 1 + (multiplier - 1) * scale * ratio;
        const res = stocks[symbol].resilience ?? 0;
        if (preEffect < 1 && res > 0) {
          preEffect = 1 + (preEffect - 1) * (1 - res);
        }
        stocks[symbol].price = Math.max(0.01, stocks[symbol].price * preEffect);
      }
    }
  }
}

function simulateDay(
  stocks: Record<StockSymbol, Stock>,
  dailyNews: News[],
  nextDayNews: News[],
  currentDay: number,
  prngState: number
): void {
  const rng = mulberry32(prngState + currentDay * 1000);
  const affectedStocks = new Set<string>();
  const effectScale = getEffectScale();
  const remainingRatio = 1 - getPreApplyRatio();

  // Snapshot previousPrice
  for (const symbol of Object.keys(stocks)) {
    stocks[symbol].previousPrice = stocks[symbol].price;
  }

  // Whipsaw from today's news (5x effectScale — traps hurt more)
  const whipsawScale = Math.min(1, getEffectScale() * 5);
  for (const news of dailyNews) {
    if (news.whipsaw) {
      for (const [symbol, multiplier] of Object.entries(news.whipsaw.nextDayEffect)) {
        if (stocks[symbol]) {
          affectedStocks.add(symbol);
          const scaledMult = 1 + (multiplier - 1) * whipsawScale;
          const noise = 1 + (rng() - 0.5) * stocks[symbol].volatility;
          stocks[symbol].price = Math.max(0.01, stocks[symbol].price * scaledMult * noise);
        }
      }
    }
  }

  // News effects — only remaining fraction (pre-apply already done)
  for (const news of dailyNews) {
    for (const [symbol, multiplier] of Object.entries(news.effect)) {
      if (stocks[symbol]) {
        affectedStocks.add(symbol);
        let baseChange = 1 + (multiplier - 1) * effectScale * remainingRatio;
        const resilience = stocks[symbol].resilience ?? 0;
        if (baseChange < 1 && resilience > 0) {
          baseChange = 1 + (baseChange - 1) * (1 - resilience);
        }
        const noise = 1 + (rng() - 0.5) * stocks[symbol].volatility;
        stocks[symbol].price = Math.max(0.01, stocks[symbol].price * baseChange * noise);
      }
    }
  }

  // Noise for unaffected stocks
  for (const symbol of Object.keys(stocks)) {
    if (!affectedStocks.has(symbol)) {
      const noise = 1 + (rng() - 0.5) * stocks[symbol].volatility * 0.5;
      stocks[symbol].price = Math.max(0.01, stocks[symbol].price * noise);
    }
  }

  // Market gravity: mean reversion
  const gravity = getMarketGravity();
  if (gravity > 0) {
    const symbols = Object.keys(stocks);
    const avgChange = symbols.reduce((sum, s) =>
      sum + stocks[s].price / stocks[s].previousPrice, 0) / symbols.length;
    const drift = avgChange - 1;
    const gravityForce = 1 - drift * gravity;
    symbols.forEach(s => {
      stocks[s].price = Math.max(0.01, stocks[s].price * gravityForce);
    });
  }

  // Pre-apply next day's effects
  preApplyEffects(stocks, nextDayNews);
}

type Strategy = 'naive' | 'skilled' | 'hold';

function runSimulation(seed: number, strategy: Strategy): SimResult {
  const stocks = initStocks(seed);
  const startingCash = 50000;
  let cash = startingCash;
  const holdings: Record<string, { qty: number; avgPrice: number }> = {};
  const maxDays = 10;

  // Pre-apply day 1 effects (prices already moved before player sees news)
  const day1News = ADVANCED_NEWS.filter(n => n.dayIdx === 1);
  preApplyEffects(stocks, day1News);

  for (let day = 1; day <= maxDays; day++) {
    const dailyNews = ADVANCED_NEWS.filter(n => n.dayIdx === day);

    // --- Trading decision (player buys at already-moved prices) ---
    if (strategy === 'naive') {
      // Buy any stock with positive-looking news effect > 1.03
      for (const news of dailyNews) {
        for (const [symbol, mult] of Object.entries(news.effect)) {
          if (mult > 1.03 && stocks[symbol] && cash > 0) {
            const budget = Math.min(cash, 5000);
            const qty = Math.floor(budget / stocks[symbol].price);
            if (qty > 0) {
              const cost = qty * stocks[symbol].price;
              cash -= cost;
              const h = holdings[symbol] || { qty: 0, avgPrice: 0 };
              const newQty = h.qty + qty;
              h.avgPrice = ((h.qty * h.avgPrice) + cost) / newQty;
              h.qty = newQty;
              holdings[symbol] = h;
            }
          }
        }
      }
    } else if (strategy === 'skilled') {
      // Avoid prePriced and whipsaw news; only buy genuine signals
      for (const news of dailyNews) {
        if (news.prePriced) continue;
        if (news.whipsaw) continue;
        for (const [symbol, mult] of Object.entries(news.effect)) {
          if (mult > 1.04 && stocks[symbol] && cash > 0) {
            const budget = Math.min(cash, 6000);
            const qty = Math.floor(budget / stocks[symbol].price);
            if (qty > 0) {
              const cost = qty * stocks[symbol].price;
              cash -= cost;
              const h = holdings[symbol] || { qty: 0, avgPrice: 0 };
              const newQty = h.qty + qty;
              h.avgPrice = ((h.qty * h.avgPrice) + cost) / newQty;
              h.qty = newQty;
              holdings[symbol] = h;
            }
          }
        }
      }
      // Sell before whipsaw hits
      for (const news of dailyNews) {
        if (news.whipsaw) {
          for (const symbol of Object.keys(news.whipsaw.nextDayEffect)) {
            if (holdings[symbol] && holdings[symbol].qty > 0) {
              cash += holdings[symbol].qty * stocks[symbol].price;
              delete holdings[symbol];
            }
          }
        }
      }
    }
    // 'hold' strategy: do nothing

    // Advance day (apply remaining effects + pre-apply next day)
    if (day < maxDays) {
      const nextDayNews = ADVANCED_NEWS.filter(n => n.dayIdx === day + 1);
      simulateDay(stocks, dailyNews, nextDayNews, day, seed);
    }
  }

  // Calculate final portfolio value
  let finalValue = cash;
  for (const [symbol, h] of Object.entries(holdings)) {
    finalValue += h.qty * stocks[symbol].price;
  }

  return {
    seed,
    finalValue,
    returnPct: ((finalValue - startingCash) / startingCash) * 100,
  };
}

// --- Run simulations across multiple preApplyRatio values ---
const NUM_SEEDS = 200;
const strategies: Strategy[] = ['naive', 'skilled', 'hold'];
const testConfigs = [
  { scale: 0.08, gravity: 0.85, label: 'scale=0.08, gravity=0.85 (whipsaw 5x)' },
  { scale: 0.10, gravity: 0.85, label: 'scale=0.10, gravity=0.85 (whipsaw 5x)' },
  { scale: 0.12, gravity: 0.85, label: 'scale=0.12, gravity=0.85 (whipsaw 5x)' },
  { scale: 0.10, gravity: 0.70, label: 'scale=0.10, gravity=0.70 (whipsaw 5x)' },
];

for (const cfg of testConfigs) {
  (globalThis as any).__PRE_APPLY_RATIO = 0.8;
  (globalThis as any).__MARKET_GRAVITY = cfg.gravity;
  (globalThis as any).__EFFECT_SCALE = cfg.scale;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎮 ${cfg.label} (${NUM_SEEDS} games per strategy)`);
  console.log('='.repeat(60));

  for (const strategy of strategies) {
    const results: SimResult[] = [];
    for (let i = 0; i < NUM_SEEDS; i++) {
      results.push(runSimulation(1000 + i * 137, strategy));
    }

    const returns = results.map(r => r.returnPct);
    const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
    const positive = returns.filter(r => r > 0).length;
    const min = Math.min(...returns);
    const max = Math.max(...returns);
    const sorted = [...returns].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];

    const label = strategy === 'naive' ? '초보 (호재=매수)'
      : strategy === 'skilled' ? '숙련 (함정 회피)'
      : '홀드 (무거래)';

    console.log(`\n📊 ${label} (${strategy})`);
    console.log(`   평균 수익률: ${avg >= 0 ? '+' : ''}${avg.toFixed(2)}%`);
    console.log(`   중간값:     ${median >= 0 ? '+' : ''}${median.toFixed(2)}%`);
    console.log(`   최소/최대:  ${min.toFixed(2)}% ~ +${max.toFixed(2)}%`);
    console.log(`   수익 게임:  ${positive}/${NUM_SEEDS} (${((positive / NUM_SEEDS) * 100).toFixed(1)}%)`);
  }
}

console.log('\n' + '='.repeat(60));
