const SITE_URL = 'https://neuro-game.yeomniverse.com';
const HASHTAG = '#NeuroTrade';

function getBar(returnPct: number): string {
  if (returnPct > 20) return '█████';
  if (returnPct > 10) return '████░';
  if (returnPct > 5)  return '███░░';
  if (returnPct > 0)  return '██░░░';
  if (returnPct > -5) return '█░░░░';
  return '░░░░░';
}

function getArrow(returnPct: number): string {
  if (returnPct > 0) return '📈';
  if (returnPct < 0) return '📉';
  return '➡️';
}

function getResultEmoji(returnPct: number): string {
  if (returnPct >= 50)  return '🚀';
  if (returnPct >= 20)  return '🔥';
  if (returnPct >= 10)  return '💪';
  if (returnPct >= 0)   return '✅';
  if (returnPct >= -10) return '😬';
  if (returnPct >= -20) return '📉';
  return '💀';
}

// Provocative CTAs grouped by result tone.
// Random selection happens at share-time so each share has a different vibe.
const CTAS_KO = {
  win: [
    '이 수익률 이길 수 있어? 도전해봐 👇',
    '주식을 잘한다면 증명해보세요 👇',
    '나보다 잘할 자신 있어? 👇',
    '뉴스 분석력 인정? 너도 해봐 👇',
    '이 정도는 우습다고? 직접 해봐 👇',
    '월스트리트는 이런 사람을 찾는다 👇',
    '감으로 한 거 아님. 직접 해보면 앎 👇',
  ],
  even: [
    '본전은 지켰다. 너는? 👇',
    '나보다 잘할 수 있을까? 👇',
    '뉴스 읽는 감각, 테스트해봐 👇',
    '주식 센스 시험해볼래? 👇',
    '이 게임 한 번 해봐. 생각보다 어려움 👇',
  ],
  lose: [
    '나는 망했다. 너는 할 수 있어? 👇',
    '리딩방보다 못함. 직접 증명해봐 👇',
    '주식 잘하는 사람만 들어와 👇',
    '내 수익률 이기면 인정 👇',
    '쉬워 보이지? 직접 해보면 다름 👇',
    '나도 망했으니까 너도 와봐 👇',
  ],
};

const CTAS_EN = {
  win: [
    'Think you can beat me? 👇',
    'If you\'re good at stocks, prove it 👇',
    'Bet you can\'t top this 👇',
    'Wall Street is hiring. Show them 👇',
    'Skill, not luck. Try it 👇',
    'I read the news. Did you? 👇',
  ],
  even: [
    'I broke even. Can you do better? 👇',
    'Test your market instinct 👇',
    'Looks easy? Try it yourself 👇',
    'Read the news. Beat the market 👇',
  ],
  lose: [
    'I tanked. Think you can do better? 👇',
    'Worse than a coin flip. Beat me 👇',
    'Embarrassing result. Your turn 👇',
    'I lost. Prove you\'re smarter 👇',
    'Easier said than done. Try it 👇',
  ],
};

function pickCta(returnPct: number, language: 'en' | 'ko'): string {
  const pool = language === 'ko' ? CTAS_KO : CTAS_EN;
  const bucket = returnPct >= 5 ? pool.win : returnPct >= -5 ? pool.even : pool.lose;
  return bucket[Math.floor(Math.random() * bucket.length)];
}

export function getTitle(returnPct: number, language: 'en' | 'ko'): string {
  if (language === 'ko') {
    if (returnPct >= 50)  return '전설의 트레이더';
    if (returnPct >= 30)  return '월가의 늑대';
    if (returnPct >= 10)  return '감 잡는 분석가';
    if (returnPct >= 0)   return '본전치기 장인';
    if (returnPct >= -10) return '수업료 내는 중';
    if (returnPct >= -30) return '뉴스를 거꾸로 읽는 자';
    return '역대급 역투자자';
  }
  if (returnPct >= 50)  return 'Legendary Trader';
  if (returnPct >= 30)  return 'Wolf of Wall Street';
  if (returnPct >= 10)  return 'Sharp Analyst';
  if (returnPct >= 0)   return 'Break-Even Master';
  if (returnPct >= -10) return 'Learning the Ropes';
  if (returnPct >= -30) return 'Reads News Backwards';
  return 'Legendary Reverse Trader';
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
  const resultEmoji = getResultEmoji(returnPct);

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
    const arrow = getArrow(stockReturn);
    const sign = stockReturn >= 0 ? '+' : '';
    const pct = `${sign}${stockReturn.toFixed(1)}%`;
    const paddedSymbol = symbol.padEnd(6, ' ');
    return `${arrow} ${paddedSymbol} ${bar}  ${pct}`;
  });

  const title = getTitle(returnPct, language);
  const finalLabel = language === 'ko' ? '최종 수익' : 'Return';
  const finalLine =
    `${resultEmoji} ${finalLabel}: ${returnSign}${returnPct.toFixed(1)}%  ($${finalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })})`;
  const titleLine = `🏷️ ${title}`;

  const ctaLine = pickCta(returnPct, language);

  return [header, divider, ...stockLines, divider, finalLine, titleLine, '', ctaLine, `${SITE_URL}  ${HASHTAG}`].join('\n');
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

  // Flash CTA tone is based on win/loss rather than return %
  const ctaLine = pickCta(won ? 10 : -10, language);

  if (language === 'ko') {
    const choiceLabel = choice === 'allin' ? '전부 투자' : '패스';
    const streakLabel = streak > 1 ? `\n🔥 ${streak}연승 달성!` : '';
    return [
      `NeuroTrade 플래시 ⚡`,
      `${stockSymbol}: ${choiceLabel} → ${pct} ${outcome}${streakLabel}`,
      '',
      ctaLine,
      `${SITE_URL}  ${HASHTAG}`,
    ].join('\n');
  }

  const choiceLabel = choice === 'allin' ? 'ALL IN' : 'PASS';
  const streakLabel = streak > 1 ? `\n🔥 ${streak}-win streak!` : '';
  return [
    `NeuroTrade Flash ⚡`,
    `${stockSymbol}: ${choiceLabel} → ${pct} ${outcome}${streakLabel}`,
    '',
    ctaLine,
    `${SITE_URL}  ${HASHTAG}`,
  ].join('\n');
}
