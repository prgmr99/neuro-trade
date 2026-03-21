import { useLanguageStore } from '../store/useLanguageStore';

export const translations = {
  en: {
    app: {
      title: "NeuroTrade",
      subtitle: "Master the art of information.",
      modeSelect: "Select Game Mode",
      classicTitle: "Classic",
      classicDesc: "5 days, 5 stocks. Quick and focused.",
      classicDetail: "Perfect for beginners or a quick session.",
      advancedTitle: "Advanced",
      advancedDesc: "30 days, 10 stocks. Deep interconnected storylines.",
      advancedDetail: "Navigate complex market events across diverse sectors.",
      instruction1Classic: "1. Every day, you will receive 5 news articles.",
      instruction1Advanced: "1. Every day, you will receive 3-5 news articles across 10 sectors.",
      instruction2: "2. Analyze the news to find hidden correlations with the market.",
      instruction3Classic: "3. Build your portfolio and maximize your returns within 5 days.",
      instruction3Advanced: "3. Navigate 30 days of interconnected market events to maximize returns.",
      start: "Start Trading",
      flashTitle: "Flash Round",
      flashDesc: "1 stock, 1 news, instant decision.",
      flashDetail: "Make a snap call in under 60 seconds.",
      socialProofTraders: "{count} traders",
      socialProofAvgReturn: "Avg return today: {pct}",
      socialProofGamesToday: "games today",
      dailyTitle: "Daily Challenge",
      dailyDesc: "Same scenario for everyone. One attempt.",
      dailyDetail: "Compete with traders worldwide on today's market."
    },
    daily: {
      title: "Daily Challenge",
      date: "Today's Market",
      subtitle: "Same market, same news, same chance.",
      disclaimer: "You have one attempt. Choose wisely.",
      start: "Start Challenge",
      completed: "Challenge Completed",
      yourResult: "Your Result",
      leaderboard: "Today's Leaderboard",
      percentile: "You beat {pct}% of today's traders",
      alreadyPlayed: "Already played today",
      comeBackTomorrow: "Come back tomorrow for a new challenge!",
      rank: "#",
      name: "Name",
      returnRate: "Return",
      back: "Back to Menu"
    },
    duel: {
      createTitle: "Challenge a Friend",
      createDesc: "Create a duel and share the link with a friend.",
      enterName: "Enter your name",
      copyLink: "Copy Link",
      copied: "Copied!",
      startGame: "Start My Game",
      back: "Back",
      challenged: "You've Been Challenged!",
      accept: "Accept & Play",
      yourResult: "Your Result",
      waiting: "Waiting for opponent...",
      shareReminder: "Share the link so your opponent can join.",
      versus: "VS",
      winner: "Winner",
      draw: "Draw!",
      challengeAgain: "Challenge Again"
    },
    nav: {
      news: "News",
      market: "Market",
      portfolio: "Portfolio"
    },
    layout: {
      day: "Day",
      cashBalance: "Cash Balance",
      finishGame: "Finish Game",
      endDay: "End Day"
    },
    market: {
      overview: "Market Overview",
      showChart: "Show Chart",
      hideChart: "Hide Chart",
      qtyPlaceholder: "Qty",
      buy: "Buy",
      sell: "Sell",
      estimatedCost: "Estimated Cost: $",
      youOwn: "You own: {qty} shares"
    },
    portfolio: {
      title: "Your Portfolio",
      availableCash: "Available Cash",
      totalValue: "Total Value",
      currentHoldings: "Current Holdings",
      emptyState: "You don't own any stocks yet. Go to the Market to make your first trade.",
      symbol: "Symbol",
      quantity: "Quantity",
      avgPrice: "Avg Price",
      currentPrice: "Current Price",
      return: "Return"
    },
    newsfeed: {
      title: "Global Financial News",
      marketDay: "Market Day",
      breaking: "BREAKING",
      new: "NEW",
      sourceGfn: "Source: GFN News Desk",
      sourceMarketWatch: "Source: Market Watch",
      readFull: "Read Full Story",
      readLess: "Read Less"
    },
    summary: {
      daySummary: "Day {day} Summary",
      intro: "Here is how the day's news impacted the market:",
      advance: "Advance to Next Day",
      finish: "Finish"
    },
    gameOver: {
      title: "Simulation Complete",
      finalBalance: "Final Portfolio Value",
      returnRate: "Total Return",
      playAgain: "Return to Title",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your name",
      messageLabel: "Leave a Message",
      messagePlaceholder: "Share your strategy or thoughts...",
      submitAndRank: "Submit & View Rankings",
      skipToRank: "Skip & View Rankings"
    },
    ranking: {
      title: "Leaderboard",
      rank: "#",
      name: "Name",
      returnRate: "Return",
      finalValue: "Final Value",
      mode: "Mode",
      date: "Date",
      message: "Message",
      classic: "Classic",
      advanced: "Advanced",
      all: "All",
      empty: "No rankings yet. Be the first to play!",
      you: "YOU",
      viewRankings: "View Rankings",
      back: "Back"
    },
    achievements: {
      return5: { name: "First Gains", desc: "Achieve a +5% return." },
      return10: { name: "On the Rise", desc: "Achieve a +10% return." },
      return20: { name: "Bull Run", desc: "Achieve a +20% return." },
      return30: { name: "Moonshot", desc: "Achieve a +30% return." },
      return50: { name: "Rocket Fuel", desc: "Achieve a +50% return." },
      return75: { name: "Eagle Eye", desc: "Achieve a +75% return." },
      return100: { name: "Double Down", desc: "Double your initial portfolio value." },
      return150: { name: "Diamond Returns", desc: "Achieve a +150% return." },
      return200: { name: "Legend", desc: "Achieve a +200% return." },
      breakeven: { name: "Breakeven Artist", desc: "Finish within 1% of your starting value." },
      loss5: { name: "Ouch", desc: "Suffer a -5% loss." },
      loss10: { name: "Red Day", desc: "Suffer a -10% loss." },
      loss20: { name: "Margin Call", desc: "Suffer a -20% loss." },
      loss30: { name: "Wipeout", desc: "Suffer a -30% loss." },
      loss50: { name: "Rekt", desc: "Lose more than half your portfolio." },
      bigPortfolio: { name: "High Roller", desc: "Finish with a portfolio worth $20,000 or more." },
      giantPortfolio: { name: "Wall Street", desc: "Finish with a portfolio worth $50,000 or more." },
      steadyGrowth: { name: "Steady Hand", desc: "Grow your portfolio every single day without a down day." },
      diamondHands: { name: "Diamond Hands", desc: "Hold a stock for every day of the game without selling." },
      paperHands: { name: "Paper Hands", desc: "Sell a stock within one day of buying it." },
      newsJunkie: { name: "News Junkie", desc: "Read every news article in the game." },
      allIn: { name: "All In", desc: "Put more than 90% of your portfolio into a single stock." },
      diversified: { name: "Diversified", desc: "Hold 3 or more different stocks at the end." },
      cashKing: { name: "Cash King", desc: "Finish with more than 50% of your value in cash." },
      pennyPincher: { name: "Penny Pincher", desc: "Complete the game without buying a single stock." },
      perfectRead: { name: "Perfect Read", desc: "Read all news and finish with a positive return." },
      contrarian: { name: "Contrarian", desc: "Hold 2+ stocks and still beat +20% return." },
      minimalist: { name: "Minimalist", desc: "Hold exactly one stock and finish in profit." },
      comebackKid: { name: "Comeback Kid", desc: "Drop below 90% of starting value, then finish in profit." },
      quickStudy: { name: "Quick Study", desc: "Read at least half of all available news." },
      classicClear: { name: "Classic Clear", desc: "Complete a Classic mode game." },
      advancedClear: { name: "Advanced Clear", desc: "Complete an Advanced mode game." },
      flashMaster: { name: "Flash Master", desc: "Win 10 Flash rounds." },
      dualMode: { name: "Dual Mode", desc: "Complete both Classic and Advanced mode." },
      totalGames10: { name: "Getting Started", desc: "Play 10 games total." },
      totalGames50: { name: "Veteran Trader", desc: "Play 50 games total." },
      totalGames100: { name: "Market Elder", desc: "Play 100 games total." },
      streak3: { name: "Hat Trick", desc: "Play 3 consecutive days." },
      streak7: { name: "Week Warrior", desc: "Play 7 consecutive days." },
      streak14: { name: "Fortnight Grind", desc: "Play 14 consecutive days." },
      streak30: { name: "Monthly Devotion", desc: "Play 30 consecutive days." },
      flashWinStreak3: { name: "Hot Hand", desc: "Win 3 Flash rounds in a row." },
      flashWinStreak5: { name: "On Fire", desc: "Win 5 Flash rounds in a row." },
      flashWinStreak10: { name: "Unstoppable", desc: "Win 10 Flash rounds in a row." },
      flashWins10: { name: "Flash Rookie", desc: "Win 10 Flash rounds total." },
      flashWins50: { name: "Flash Pro", desc: "Win 50 Flash rounds total." },
      flashWins100: { name: "Flash Champion", desc: "Win 100 Flash rounds total." },
      flashWins200: { name: "Flash Legend", desc: "Win 200 Flash rounds total." },
      flashPlays10: { name: "Flash Curious", desc: "Play 10 Flash rounds." },
      flashPlays50: { name: "Flash Regular", desc: "Play 50 Flash rounds." },
      flashPlays100: { name: "Flash Addict", desc: "Play 100 Flash rounds." },
      flashPlays200: { name: "Flash Obsessed", desc: "Play 200 Flash rounds." },
    }
  },
  ko: {
    app: {
      title: "NeuroTrade",
      subtitle: "정보의 기술을 마스터하세요.",
      modeSelect: "게임 모드 선택",
      classicTitle: "클래식",
      classicDesc: "5일, 5종목. 빠르고 집중적인 플레이.",
      classicDetail: "초보자나 빠른 한 판에 적합합니다.",
      advancedTitle: "어드밴스드",
      advancedDesc: "30일, 10종목. 깊이 있는 연결된 스토리라인.",
      advancedDetail: "다양한 섹터에 걸친 복잡한 시장 이벤트를 헤쳐나가세요.",
      instruction1Classic: "1. 매일 5개의 뉴스 기사가 도착합니다.",
      instruction1Advanced: "1. 매일 10개 섹터에 걸쳐 3~5개의 뉴스 기사가 도착합니다.",
      instruction2: "2. 뉴스를 분석하여 시장과의 숨겨진 상관관계를 찾으세요.",
      instruction3Classic: "3. 5일 안에 포트폴리오를 구성하고 수익을 극대화하세요.",
      instruction3Advanced: "3. 30일간의 연결된 시장 이벤트를 탐색하며 수익을 극대화하세요.",
      start: "거래 시작",
      flashTitle: "플래시 라운드",
      flashDesc: "1종목, 1뉴스, 즉각 결정.",
      flashDetail: "60초 안에 빠르게 판단하세요.",
      socialProofTraders: "{count}명의 트레이더",
      socialProofAvgReturn: "오늘 평균 수익률: {pct}",
      socialProofGamesToday: "판 플레이",
      dailyTitle: "오늘의 도전",
      dailyDesc: "모두 같은 시나리오. 단 한 번의 기회.",
      dailyDetail: "오늘의 시장에서 전 세계 트레이더와 경쟁하세요."
    },
    daily: {
      title: "오늘의 도전",
      date: "오늘의 시장",
      subtitle: "같은 시장, 같은 뉴스, 같은 기회.",
      disclaimer: "단 한 번의 기회입니다. 신중하게 선택하세요.",
      start: "도전 시작",
      completed: "도전 완료",
      yourResult: "내 결과",
      leaderboard: "오늘의 순위",
      percentile: "오늘 트레이더의 {pct}%를 이겼습니다",
      alreadyPlayed: "오늘은 이미 도전했습니다",
      comeBackTomorrow: "내일 새로운 도전이 기다립니다!",
      rank: "#",
      name: "이름",
      returnRate: "수익률",
      back: "메뉴로 돌아가기"
    },
    duel: {
      createTitle: "친구에게 도전하기",
      createDesc: "듀얼을 만들고 친구에게 링크를 공유하세요.",
      enterName: "이름을 입력하세요",
      copyLink: "링크 복사",
      copied: "복사됨!",
      startGame: "게임 시작",
      back: "돌아가기",
      challenged: "도전을 받았습니다!",
      accept: "수락하고 플레이",
      yourResult: "내 결과",
      waiting: "상대방을 기다리는 중...",
      shareReminder: "링크를 공유하여 상대방이 참가할 수 있게 하세요.",
      versus: "VS",
      winner: "승자",
      draw: "무승부!",
      challengeAgain: "다시 도전"
    },
    nav: {
      news: "뉴스",
      market: "시장",
      portfolio: "포트폴리오"
    },
    layout: {
      day: "일차",
      cashBalance: "현금 잔고",
      finishGame: "게임 종료",
      endDay: "다음 날 진행"
    },
    market: {
      overview: "시장 개요",
      showChart: "차트 보기",
      hideChart: "차트 숨기기",
      qtyPlaceholder: "수량",
      buy: "매수",
      sell: "매도",
      estimatedCost: "예상 비용: $",
      youOwn: "보유량: {qty}주"
    },
    portfolio: {
      title: "내 포트폴리오",
      availableCash: "가용 현금",
      totalValue: "총 가치",
      currentHoldings: "현재 보유 주식",
      emptyState: "아직 주식을 보유하고 있지 않습니다. 시장으로 가서 첫 거래를 시작해보세요.",
      symbol: "종목",
      quantity: "수량",
      avgPrice: "평균가",
      currentPrice: "현재가",
      return: "수익률"
    },
    newsfeed: {
      title: "글로벌 금융 뉴스",
      marketDay: "Day",
      breaking: "속보",
      new: "NEW",
      sourceGfn: "출처: GFN 뉴스 데스크",
      sourceMarketWatch: "출처: 마켓 워치",
      readFull: "전체 기사 읽기",
      readLess: "기사 접기"
    },
    summary: {
      daySummary: "{day}일차 요약",
      intro: "오늘의 뉴스가 시장에 미친 영향은 다음과 같습니다:",
      advance: "다음 날로 이동",
      finish: "게임 종료"
    },
    gameOver: {
      title: "시뮬레이션 종료",
      finalBalance: "최종 포트폴리오 가치",
      returnRate: "총 수익률",
      playAgain: "처음으로 돌아가기",
      nameLabel: "이름",
      namePlaceholder: "이름을 입력하세요",
      messageLabel: "한마디 남기기",
      messagePlaceholder: "전략이나 소감을 공유해보세요...",
      submitAndRank: "제출하고 랭킹 보기",
      skipToRank: "건너뛰고 랭킹 보기"
    },
    ranking: {
      title: "랭킹 보드",
      rank: "#",
      name: "이름",
      returnRate: "수익률",
      finalValue: "최종 자산",
      mode: "모드",
      date: "날짜",
      message: "한마디",
      classic: "클래식",
      advanced: "어드밴스드",
      all: "전체",
      empty: "아직 랭킹이 없습니다. 첫 번째 플레이어가 되어보세요!",
      you: "나",
      viewRankings: "랭킹 보기",
      back: "돌아가기"
    },
    achievements: {
      return5: { name: "첫 수익", desc: "+5% 수익률을 달성하세요." },
      return10: { name: "상승세", desc: "+10% 수익률을 달성하세요." },
      return20: { name: "강세장", desc: "+20% 수익률을 달성하세요." },
      return30: { name: "문샷", desc: "+30% 수익률을 달성하세요." },
      return50: { name: "로켓 연료", desc: "+50% 수익률을 달성하세요." },
      return75: { name: "매의 눈", desc: "+75% 수익률을 달성하세요." },
      return100: { name: "더블 다운", desc: "초기 포트폴리오 가치를 두 배로 만드세요." },
      return150: { name: "다이아몬드 수익", desc: "+150% 수익률을 달성하세요." },
      return200: { name: "전설", desc: "+200% 수익률을 달성하세요." },
      breakeven: { name: "손익분기점", desc: "시작 가치의 ±1% 이내로 게임을 마치세요." },
      loss5: { name: "아야", desc: "-5% 손실을 입으세요." },
      loss10: { name: "빨간 날", desc: "-10% 손실을 입으세요." },
      loss20: { name: "마진 콜", desc: "-20% 손실을 입으세요." },
      loss30: { name: "전멸", desc: "-30% 손실을 입으세요." },
      loss50: { name: "청산", desc: "포트폴리오의 절반 이상을 잃으세요." },
      bigPortfolio: { name: "큰손", desc: "$20,000 이상의 포트폴리오로 게임을 마치세요." },
      giantPortfolio: { name: "월가의 제왕", desc: "$50,000 이상의 포트폴리오로 게임을 마치세요." },
      steadyGrowth: { name: "안정된 손", desc: "단 하루도 하락 없이 포트폴리오를 성장시키세요." },
      diamondHands: { name: "다이아몬드 손", desc: "게임 내내 주식을 팔지 않고 보유하세요." },
      paperHands: { name: "종이 손", desc: "산 지 하루 만에 주식을 파세요." },
      newsJunkie: { name: "뉴스 중독자", desc: "게임의 모든 뉴스를 읽으세요." },
      allIn: { name: "올인", desc: "포트폴리오의 90% 이상을 한 종목에 투자하세요." },
      diversified: { name: "분산 투자", desc: "게임 종료 시 3개 이상의 종목을 보유하세요." },
      cashKing: { name: "현금왕", desc: "포트폴리오의 50% 이상을 현금으로 보유한 채 게임을 마치세요." },
      pennyPincher: { name: "구두쇠", desc: "주식을 한 주도 사지 않고 게임을 완료하세요." },
      perfectRead: { name: "완벽한 독해", desc: "모든 뉴스를 읽고 플러스 수익으로 게임을 마치세요." },
      contrarian: { name: "역발상 투자자", desc: "2개 이상의 종목을 보유하고 +20% 수익을 달성하세요." },
      minimalist: { name: "미니멀리스트", desc: "딱 한 종목만 보유하고 수익을 내세요." },
      comebackKid: { name: "역전의 용사", desc: "시작 가치의 90% 아래로 떨어진 후 흑자로 게임을 마치세요." },
      quickStudy: { name: "빠른 학습자", desc: "전체 뉴스 중 절반 이상을 읽으세요." },
      classicClear: { name: "클래식 클리어", desc: "클래식 모드 게임을 완료하세요." },
      advancedClear: { name: "어드밴스드 클리어", desc: "어드밴스드 모드 게임을 완료하세요." },
      flashMaster: { name: "플래시 마스터", desc: "플래시 라운드를 10회 승리하세요." },
      dualMode: { name: "듀얼 모드", desc: "클래식과 어드밴스드 모드를 모두 완료하세요." },
      totalGames10: { name: "첫 발걸음", desc: "게임을 총 10회 플레이하세요." },
      totalGames50: { name: "베테랑 트레이더", desc: "게임을 총 50회 플레이하세요." },
      totalGames100: { name: "시장의 원로", desc: "게임을 총 100회 플레이하세요." },
      streak3: { name: "해트트릭", desc: "3일 연속으로 플레이하세요." },
      streak7: { name: "주간 전사", desc: "7일 연속으로 플레이하세요." },
      streak14: { name: "2주 질주", desc: "14일 연속으로 플레이하세요." },
      streak30: { name: "한 달 헌신", desc: "30일 연속으로 플레이하세요." },
      flashWinStreak3: { name: "뜨거운 손", desc: "플래시 라운드를 3연승하세요." },
      flashWinStreak5: { name: "불타오르네", desc: "플래시 라운드를 5연승하세요." },
      flashWinStreak10: { name: "무적", desc: "플래시 라운드를 10연승하세요." },
      flashWins10: { name: "플래시 루키", desc: "플래시 라운드를 총 10회 승리하세요." },
      flashWins50: { name: "플래시 프로", desc: "플래시 라운드를 총 50회 승리하세요." },
      flashWins100: { name: "플래시 챔피언", desc: "플래시 라운드를 총 100회 승리하세요." },
      flashWins200: { name: "플래시 전설", desc: "플래시 라운드를 총 200회 승리하세요." },
      flashPlays10: { name: "플래시 입문", desc: "플래시 라운드를 10회 플레이하세요." },
      flashPlays50: { name: "플래시 단골", desc: "플래시 라운드를 50회 플레이하세요." },
      flashPlays100: { name: "플래시 중독자", desc: "플래시 라운드를 100회 플레이하세요." },
      flashPlays200: { name: "플래시 집착러", desc: "플래시 라운드를 200회 플레이하세요." },
    }
  }
};

export type TranslationKeys = typeof translations.en;

type PathImpl<T, K extends keyof T> =
  K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

export type Path<T> = PathImpl<T, keyof T> | keyof T;

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  
  const t = (path: Path<TranslationKeys>, values?: Record<string, string | number>) => {
    const keys = path.split('.');
    let value: any = translations[language];
    
    for (const key of keys) {
      if (value[key] === undefined) return path; // Fallback to path if not found
      value = value[key];
    }

    if (typeof value === 'string' && values) {
      return Object.entries(values).reduce(
        (acc, [key, val]) => acc.replace(new RegExp(`{${key}}`, 'g'), String(val)),
        value
      );
    }
    
    return value as string;
  };

  return { t, language };
}
