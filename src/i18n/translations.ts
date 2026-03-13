import { useLanguageStore } from '../store/useLanguageStore';

export const translations = {
  en: {
    app: {
      title: "NeuroTrade",
      subtitle: "Master the art of information.",
      instruction1: "1. Every day, you will receive 5 news emails.",
      instruction2: "2. Analyze the news to find hidden correlations with the market.",
      instruction3: "3. Build your portfolio and maximize your returns within 5 days.",
      start: "Start Trading"
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
      playAgain: "Return to Title"
    }
  },
  ko: {
    app: {
      title: "NeuroTrade",
      subtitle: "정보의 기술을 마스터하세요.",
      instruction1: "1. 매일 5개의 뉴스 이메일이 도착합니다.",
      instruction2: "2. 뉴스를 분석하여 시장과의 숨겨진 상관관계를 찾으세요.",
      instruction3: "3. 5일 안에 포트폴리오를 구성하고 수익을 극대화하세요.",
      start: "거래 시작"
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
      marketDay: "시장",
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
      playAgain: "처음으로 돌아가기"
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
