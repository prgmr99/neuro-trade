const SITE_URL = 'neuro-game.yeomniverse.com';
const HASHTAG = '#NeuroTrade';

function getBar(returnPct: number): string {
  if (returnPct > 20) return '█████';
  if (returnPct > 10) return '████░';
  if (returnPct > 5)  return '███░░';
  if (returnPct > 0)  return '██░░░';
  if (returnPct > -5) return '█░░░░';
  return '░░░░░';
}

export function generateGameShareText(params: {
  mode: string;
  maxDays: number;
  stocks: Record<string, { symbol: string; priceHistory: { day: number; open: number; close: number }[] }>;
  finalValue: number;
  initialValue: number;
  language: 'en' | 'ko';
}): string {
  const { mode, maxDays, stocks, finalValue, initialValue, language } = params;

  const returnPct = ((finalValue - initialValue) / initialValue) * 100;
  const returnSign = returnPct >= 0 ? '+' : '';

  const modeLabel =
    language === 'ko'
      ? mode === 'classic' ? '클래식' : '어드밴스드'
      : mode === 'classic' ? 'Classic' : 'Advanced';

  const header =
    language === 'ko'
      ? `NeuroTrade ${maxDays}일차 ${modeLabel} 🧠`
      : `NeuroTrade Day ${maxDays} ${modeLabel} 🧠`;

  const divider = '───────────────';

  const stockLines = Object.values(stocks).map((stock) => {
    const symbol = stock.symbol;
    // Find the earliest and latest price history entries within game days (day >= 1)
    const gameDays = stock.priceHistory.filter((d) => d.day >= 1);
    let stockReturn = 0;
    if (gameDays.length >= 1) {
      const firstOpen = gameDays[0].open;
      const lastClose = gameDays[gameDays.length - 1].close;
      if (firstOpen > 0) {
        stockReturn = ((lastClose - firstOpen) / firstOpen) * 100;
      }
    }
    const bar = getBar(stockReturn);
    const sign = stockReturn >= 0 ? '+' : '';
    const pct = `${sign}${stockReturn.toFixed(1)}%`;
    // Pad symbol to 6 chars for alignment
    const paddedSymbol = symbol.padEnd(6, ' ');
    return `${paddedSymbol} ${bar}  ${pct}`;
  });

  const finalLabel = language === 'ko' ? '최종' : 'Final';
  const finalLine = `${finalLabel}: $${finalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} (${returnSign}${returnPct.toFixed(1)}%)`;

  const trophyLine = language === 'ko' ? `🏆 ${HASHTAG}` : `🏆 ${HASHTAG}`;

  return [header, divider, ...stockLines, divider, finalLine, trophyLine, SITE_URL].join('\n');
}

export function generateFlashShareText(params: {
  stockSymbol: string;
  choice: 'allin' | 'pass';
  resultPct: number;
  won: boolean;
  streak: number;
  language: 'en' | 'ko';
}): string {
  const { stockSymbol, choice, resultPct, won, streak, language } = params;

  const sign = resultPct >= 0 ? '+' : '';
  const pct = `${sign}${resultPct.toFixed(1)}%`;
  const outcome = won ? '✅' : '❌';

  if (language === 'ko') {
    const choiceLabel = choice === 'allin' ? '전부 투자' : '패스';
    const streakLabel = streak > 1 ? `\n연승: 🔥${streak}` : '';
    return [
      `NeuroTrade 플래시 ⚡`,
      `${stockSymbol}: ${choiceLabel} → ${pct} ${outcome}${streakLabel}`,
      HASHTAG,
      SITE_URL,
    ].join('\n');
  }

  const choiceLabel = choice === 'allin' ? 'ALL IN' : 'PASS';
  const streakLabel = streak > 1 ? `\nStreak: 🔥${streak}` : '';
  return [
    `NeuroTrade Flash ⚡`,
    `${stockSymbol}: ${choiceLabel} → ${pct} ${outcome}${streakLabel}`,
    HASHTAG,
    SITE_URL,
  ].join('\n');
}
