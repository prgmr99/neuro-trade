import { ClassicScenarioArc } from './classic-arcs';

export const FINANCIAL_CRISIS_ARC: ClassicScenarioArc = {
  id: 'financial-crisis',
  name: { en: 'Financial Crisis', ko: '금융 위기' },
  news: [
    // Day 1: Major bank reveals massive hidden losses, credit freeze begins
    {
      id: 'fc-1-1',
      dayIdx: 1,
      title: {
        en: 'Megabank Reveals $120 Billion in Hidden Derivative Losses',
        ko: '메가뱅크, 1,200억 달러 규모 파생상품 숨겨진 손실 공개',
      },
      content: {
        en: 'The world\'s third-largest bank disclosed $120 billion in previously unreported derivative losses, triggering an immediate credit freeze across interbank lending markets.',
        ko: '세계 3위 규모 은행이 그동안 보고되지 않았던 1,200억 달러의 파생상품 손실을 공개하며 은행 간 대출 시장이 즉각 경색됐다.',
      },
      read: false,
      effect: { TECH: 0.90, ECOM: 0.92 },
    },
    {
      id: 'fc-1-2',
      dayIdx: 1,
      title: {
        en: 'Stock Markets Plunge as Credit Markets Freeze',
        ko: '신용시장 마비에 증시 폭락',
      },
      content: {
        en: 'Global equity markets suffered their worst single-day decline in five years as the credit freeze spread from banks to corporate bond markets, cutting off business financing.',
        ko: '신용 경색이 은행에서 회사채 시장으로 확산되며 기업 자금 조달이 막히면서 글로벌 증시가 5년 만에 최악의 일일 낙폭을 기록했다.',
      },
      read: false,
      effect: { AERO: 0.91, GREEN: 0.93 },
    },
    {
      id: 'fc-1-3',
      dayIdx: 1,
      title: {
        en: 'Healthcare Stocks Hold as Investors Seek Defensive Shelter',
        ko: '방어주 피신 수요에 헬스케어 주 선방',
      },
      content: {
        en: 'Healthcare stocks outperformed the broader market as investors sought defensive positions, recognizing the sector\'s stable cash flows and inelastic demand.',
        ko: '투자자들이 안정적 현금흐름과 비탄력적 수요를 인정하며 방어적 포지션을 취하면서 헬스케어 주가 전체 시장 대비 선방했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'fc-1-4',
      dayIdx: 1,
      title: {
        en: 'Tech Startups Face Funding Crisis as Venture Capital Retreats',
        ko: '벤처캐피털 후퇴에 기술 스타트업 자금난 직면',
      },
      content: {
        en: 'Venture capital firms announced a freeze on new investments as they reassessed portfolio risk, leaving dozens of technology startups scrambling for bridge financing.',
        ko: '벤처캐피털들이 포트폴리오 리스크 재평가를 위해 신규 투자를 중단하면서 수십 개 기술 스타트업이 브릿지 파이낸싱을 찾아 분주히 움직이고 있다.',
      },
      read: false,
      effect: { TECH: 0.93 },
    },
    {
      id: 'fc-1-5',
      dayIdx: 1,
      title: {
        en: 'E-Commerce Consumer Spending Drops on Financial Uncertainty',
        ko: '금융 불확실성에 이커머스 소비 지출 급감',
      },
      content: {
        en: 'Real-time consumer spending data showed an immediate 12% drop in online retail purchases as households cut discretionary spending in response to financial market turmoil.',
        ko: '실시간 소비 데이터에서 금융시장 혼란에 대응해 가계가 재량 지출을 줄이면서 온라인 소매 구매가 즉각 12% 감소한 것으로 나타났다.',
      },
      read: false,
      effect: { ECOM: 0.90 },
    },

    // Day 2: Contagion spreads to other banks, market-wide panic
    {
      id: 'fc-2-1',
      dayIdx: 2,
      title: {
        en: 'Three More Banks Disclose Significant Derivative Exposure',
        ko: '3개 은행 추가로 대규모 파생상품 익스포저 공개',
      },
      content: {
        en: 'Three additional major banks revealed substantial derivative exposure linked to the initial collapse, raising fears of systemic contagion across the entire financial system.',
        ko: '3개 대형 은행이 최초 붕괴와 연결된 상당한 파생상품 익스포저를 추가 공개하며 전체 금융 시스템으로의 시스템적 전염 우려가 고조됐다.',
      },
      read: false,
      effect: { TECH: 0.91, ECOM: 0.93 },
    },
    {
      id: 'fc-2-2',
      dayIdx: 2,
      title: {
        en: 'Market-Wide Panic: Circuit Breakers Triggered Twice',
        ko: '시장 전반 패닉: 서킷브레이커 하루 두 번 발동',
      },
      content: {
        en: 'Stock exchanges triggered circuit breakers twice in a single session as panic selling overwhelmed buy orders. Trading volumes hit all-time records across every major exchange.',
        ko: '공매도가 매수 주문을 압도하면서 증권거래소가 하루 만에 서킷브레이커를 두 번 발동했다. 주요 거래소 전체에서 거래량이 사상 최고치를 기록했다.',
      },
      read: false,
      effect: { AERO: 0.88, GREEN: 0.90 },
    },
    {
      id: 'fc-2-3',
      dayIdx: 2,
      title: {
        en: 'Healthcare and Defense: Last Standing Safe Havens',
        ko: '헬스케어·방위산업, 최후의 안전지대로 부상',
      },
      content: {
        en: 'Amid the market-wide carnage, healthcare and defense-related aerospace stocks were the only sectors posting gains as institutional investors piled into defensive positions.',
        ko: '시장 전반의 대학살 속에서 헬스케어와 방위 관련 항공우주 주만이 유일하게 상승세를 기록했다. 기관 투자자들이 방어적 포지션에 집중 매수했다.',
      },
      read: false,
      effect: { HEALTH: 1.08, AERO: 1.05 },
    },
    {
      id: 'fc-2-4',
      dayIdx: 2,
      title: {
        en: 'Green Energy Projects Face Financing Drought',
        ko: '친환경 에너지 프로젝트, 자금 조달 가뭄 직면',
      },
      content: {
        en: 'Renewable energy developers reported that project financing has completely dried up as banks pulled back all non-essential lending, threatening multiple construction-stage projects.',
        ko: '은행들이 비필수 대출을 전면 회수하면서 재생에너지 개발사들의 프로젝트 파이낸싱이 완전히 고갈됐다. 건설 단계의 다수 프로젝트가 위기에 처했다.',
      },
      read: false,
      effect: { GREEN: 0.89 },
    },
    {
      id: 'fc-2-5',
      dayIdx: 2,
      title: {
        en: 'Central Banks Issue Joint Statement Pledging Liquidity Support',
        ko: '주요국 중앙은행, 유동성 지원 공동 성명 발표',
      },
      content: {
        en: 'The Federal Reserve, ECB, and Bank of Japan issued a joint statement pledging unlimited liquidity support to prevent a complete financial system breakdown.',
        ko: '연방준비제도, 유럽중앙은행, 일본은행이 금융시스템의 전면 붕괴를 막기 위해 무제한 유동성 지원을 약속하는 공동 성명을 발표했다.',
      },
      read: false,
      effect: { TECH: 1.03, ECOM: 1.02 },
    },

    // Day 3: Government announces emergency measures, healthcare/defense as safe havens
    {
      id: 'fc-3-1',
      dayIdx: 3,
      title: {
        en: 'Government Unveils $2 Trillion Emergency Stabilization Package',
        ko: '정부, 2조 달러 긴급 안정화 패키지 발표',
      },
      content: {
        en: 'The administration unveiled a $2 trillion emergency package including bank recapitalization, deposit guarantees, and a temporary ban on short selling of financial stocks.',
        ko: '행정부가 은행 자본 확충, 예금 보장, 금융주 공매도 임시 금지를 포함한 2조 달러 규모의 긴급 패키지를 공개했다.',
      },
      read: false,
      effect: { TECH: 1.05, ECOM: 1.04 },
    },
    {
      id: 'fc-3-2',
      dayIdx: 3,
      title: {
        en: 'Healthcare Sector Upgraded to Overweight Across Wall Street',
        ko: '월스트리트 전반, 헬스케어 업종 비중확대 상향',
      },
      content: {
        en: 'Every major investment bank upgraded the healthcare sector to overweight, citing recession-proof demand characteristics and strong balance sheets across leading pharmaceutical companies.',
        ko: '모든 주요 투자은행이 불황에도 끄떡없는 수요 특성과 주요 제약사들의 견고한 재무제표를 근거로 헬스케어 업종을 비중확대로 상향했다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },
    {
      id: 'fc-3-3',
      dayIdx: 3,
      title: {
        en: 'Aerospace Defense Spending Protected in Emergency Budget',
        ko: '긴급 예산안에 항공우주 방위비 보호 조항 포함',
      },
      content: {
        en: 'Congressional leaders confirmed that defense spending will be fully protected in the emergency budget, with aerospace contracts designated as critical national infrastructure.',
        ko: '의회 지도부가 긴급 예산안에서 방위비를 전액 보호하며 항공우주 계약을 핵심 국가 인프라로 지정한다고 확인했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'fc-3-4',
      dayIdx: 3,
      title: {
        en: 'Green Energy Emergency Loan Facility Announced',
        ko: '친환경 에너지 긴급 대출 제도 신설 발표',
      },
      content: {
        en: 'The government established a dedicated emergency lending facility for renewable energy projects, preventing a wave of construction-stage defaults that threatened the sector.',
        ko: '정부가 재생에너지 프로젝트 전용 긴급 대출 제도를 신설해 업종을 위협하던 건설 단계 대규모 부도 사태를 방지했다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'fc-3-5',
      dayIdx: 3,
      title: {
        en: 'Tech Giants Tap Cash Reserves to Weather Credit Storm',
        ko: '기술 대기업, 현금 보유고 활용해 신용 위기 돌파',
      },
      content: {
        en: 'Large technology companies with massive cash reserves announced they would self-fund operations and even acquire distressed competitors, demonstrating surprising financial resilience.',
        ko: '막대한 현금 보유고를 가진 대형 기술 기업들이 자체 자금으로 운영을 지속하고 부실 경쟁사 인수까지 나서겠다고 발표하며 놀라운 재무 건전성을 과시했다.',
      },
      read: false,
      effect: { TECH: 1.06 },
    },

    // Day 4: Bailout package approved, cautious recovery begins
    {
      id: 'fc-4-1',
      dayIdx: 4,
      title: {
        en: 'Congress Approves Historic Bailout Package by Wide Margin',
        ko: '의회, 역사적 구제금융 패키지 압도적 표차로 승인',
      },
      content: {
        en: 'Congress approved the $2 trillion stabilization package with bipartisan support, including provisions for bank stress tests and executive compensation limits.',
        ko: '의회가 은행 스트레스 테스트와 경영진 보수 제한 조항을 포함한 2조 달러 안정화 패키지를 초당적 지지로 승인했다.',
      },
      read: false,
      effect: { TECH: 1.07, ECOM: 1.06, AERO: 1.04 },
    },
    {
      id: 'fc-4-2',
      dayIdx: 4,
      title: {
        en: 'Interbank Lending Resumes as Confidence Returns',
        ko: '신뢰 회복에 은행 간 대출 재개',
      },
      content: {
        en: 'Interbank lending rates dropped sharply as the bailout package restored confidence in counterparty solvency. Corporate bond markets also showed signs of thawing.',
        ko: '구제금융이 거래상대방 지급 능력에 대한 신뢰를 회복시키면서 은행 간 대출 금리가 급락했다. 회사채 시장에도 해빙 조짐이 나타났다.',
      },
      read: false,
      effect: { GREEN: 1.08, ECOM: 1.05 },
    },
    {
      id: 'fc-4-3',
      dayIdx: 4,
      title: {
        en: 'Bargain Hunters Drive Tech Stock Recovery',
        ko: '저가 매수세 유입에 기술주 반등',
      },
      content: {
        en: 'Value investors poured into beaten-down technology stocks, arguing that cash-rich tech giants were fundamentally undervalued after the panic-driven selloff.',
        ko: '가치 투자자들이 현금이 풍부한 기술 대기업들이 패닉성 매도 후 펀더멘털 대비 저평가돼 있다고 판단하며 급락한 기술주에 대거 매수에 나섰다.',
      },
      read: false,
      effect: { TECH: 1.08 },
    },
    {
      id: 'fc-4-4',
      dayIdx: 4,
      title: {
        en: 'VitaPharma Raises Dividend, Signals Sector Strength',
        ko: '비타파마 배당 인상, 업종 건전성 과시',
      },
      content: {
        en: 'VitaPharma announced a 15% dividend increase during the crisis, sending a powerful signal of financial health that lifted the entire healthcare sector.',
        ko: '비타파마가 위기 한복판에서 15% 배당 인상을 발표하며 강력한 재무 건전성 신호를 보냈다. 헬스케어 업종 전체가 동반 상승했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'fc-4-5',
      dayIdx: 4,
      title: {
        en: 'Aerospace Orders Remain Robust Despite Financial Turmoil',
        ko: '금융 혼란에도 항공우주 수주 견조',
      },
      content: {
        en: 'Major aerospace companies reported that government defense orders remain fully on track and commercial aviation backlog provides multi-year revenue visibility.',
        ko: '주요 항공우주 기업들이 정부 방위 주문은 전혀 차질이 없으며 민간 항공 수주잔고가 수년간의 매출 가시성을 제공한다고 보고했다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },

    // Day 5: New financial regulations, markets find footing
    {
      id: 'fc-5-1',
      dayIdx: 5,
      title: {
        en: 'Sweeping Financial Reform Bill Passed to Prevent Future Crises',
        ko: '향후 위기 방지 위한 전면적 금융 개혁법 통과',
      },
      content: {
        en: 'Congress passed comprehensive financial reform legislation mandating stricter capital requirements, derivative transparency, and enhanced regulatory oversight of systemically important institutions.',
        ko: '의회가 더 엄격한 자본 요건, 파생상품 투명성, 시스템적으로 중요한 기관에 대한 강화된 규제 감독을 의무화하는 포괄적 금융 개혁법을 통과시켰다.',
      },
      read: false,
      effect: { TECH: 1.04, ECOM: 1.03 },
    },
    {
      id: 'fc-5-2',
      dayIdx: 5,
      title: {
        en: 'Markets Find Footing as Volatility Index Returns to Normal',
        ko: '변동성 지수 정상 복귀… 시장 안정 기반 확보',
      },
      content: {
        en: 'The VIX volatility index fell below 20 for the first time since the crisis began, signaling that market participants believe the worst of the financial turmoil has passed.',
        ko: 'VIX 변동성 지수가 위기 발생 이후 처음으로 20 아래로 하락하며 시장 참여자들이 금융 혼란의 최악의 시기가 지났다고 판단하고 있음을 보여줬다.',
      },
      read: false,
      effect: { AERO: 1.05, GREEN: 1.04 },
    },
    {
      id: 'fc-5-3',
      dayIdx: 5,
      title: {
        en: 'Healthcare Sector Posts Best Weekly Performance in a Decade',
        ko: '헬스케어 업종, 10년 만에 최고 주간 성과',
      },
      content: {
        en: 'The healthcare sector index closed the week with its strongest performance in ten years, as the crisis cemented its status as the market\'s premier defensive play.',
        ko: '헬스케어 업종 지수가 10년 만에 최강의 주간 성과를 기록하며 마감했다. 이번 위기가 시장 최고의 방어주로서의 지위를 확고히 했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },
    {
      id: 'fc-5-4',
      dayIdx: 5,
      title: {
        en: 'Green Energy Benefits from Crisis-Driven Policy Acceleration',
        ko: '위기발 정책 가속에 친환경 에너지 수혜',
      },
      content: {
        en: 'The financial reform package included provisions directing bank lending toward sustainable infrastructure, creating a permanent funding advantage for green energy projects.',
        ko: '금융 개혁 패키지에 은행 대출을 지속가능 인프라로 유도하는 조항이 포함돼 친환경 에너지 프로젝트에 영구적인 자금 조달 우위가 생겼다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },
    {
      id: 'fc-5-5',
      dayIdx: 5,
      title: {
        en: 'Economists: Crisis Contained, Recovery Trajectory Established',
        ko: '경제학자들 "위기 봉쇄 성공, 회복 궤도 진입"',
      },
      content: {
        en: 'Leading economists declared the financial crisis effectively contained, projecting a V-shaped recovery driven by pent-up demand and restored credit availability.',
        ko: '저명한 경제학자들이 금융 위기의 효과적 봉쇄를 선언하며 억눌린 수요와 신용 회복에 힘입은 V자형 경기 반등을 전망했다.',
      },
      read: false,
      effect: { TECH: 1.05, ECOM: 1.06 },
    },
  ],
};
