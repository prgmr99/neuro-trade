import { ClassicScenarioArc } from './classic-arcs';

export const REAL_ESTATE_COLLAPSE_ARC: ClassicScenarioArc = {
  id: 'real-estate-collapse',
  name: { en: 'Real Estate Collapse', ko: '부동산 붕괴' },
  news: [
    // Day 1: Nation's largest property developer misses bond payment
    {
      id: 'rec-1-1',
      dayIdx: 1,
      title: {
        en: 'Titan Properties Misses $300M Bond Payment',
        ko: '타이탄 부동산, 3억 달러 채권 이자 지급 불이행',
      },
      content: {
        en: 'Titan Properties, the nation\'s largest real estate developer with $300 billion in liabilities, failed to make a scheduled bond payment, triggering default warnings across the financial sector.',
        ko: '부채 3,000억 달러 규모의 최대 부동산 개발업체 타이탄 부동산이 예정된 채권 이자 지급에 실패해 금융 업종 전반에 디폴트 경고가 발령됐다.',
      },
      read: false,
      effect: { TECH: 0.94, ECOM: 0.93 },
    },
    {
      id: 'rec-1-2',
      dayIdx: 1,
      title: {
        en: 'Banking Stocks Plunge on Real Estate Contagion Fears',
        ko: '부동산 전이 우려에 은행주 폭락',
      },
      content: {
        en: 'Major banks with significant real estate loan exposure saw their shares plummet as investors feared a wave of defaults could cascade through the financial system.',
        ko: '부동산 대출 비중이 높은 주요 은행 주가가 급락했다. 투자자들은 디폴트 연쇄 반응이 금융 시스템 전반으로 확산될 수 있다고 우려했다.',
      },
      read: false,
      effect: { ECOM: 0.92 },
    },
    {
      id: 'rec-1-3',
      dayIdx: 1,
      title: {
        en: 'Tech Sector Hit by Risk-Off Sentiment',
        ko: '위험회피 심리에 기술주도 타격',
      },
      content: {
        en: 'Technology stocks fell in sympathy with the broader market sell-off as institutional investors reduced overall equity exposure. Liquidity concerns drove indiscriminate selling across growth sectors.',
        ko: '기관 투자자들이 전반적인 주식 비중을 줄이면서 기술주도 시장 전체 매도세에 동반 하락했다. 유동성 우려가 성장 섹터 전반에 무차별적인 매도를 유발했다.',
      },
      read: false,
      effect: { TECH: 0.93 },
    },
    {
      id: 'rec-1-4',
      dayIdx: 1,
      title: {
        en: 'Investors Flee to Healthcare and Defense as Safe Havens',
        ko: '투자자들, 헬스케어·방위로 안전자산 피신',
      },
      content: {
        en: 'Capital flowed into pharmaceutical and defense stocks as investors sought shelter from real estate contagion. Both sectors are seen as largely immune to property market turmoil.',
        ko: '투자자들이 부동산 전이 위험을 피해 제약주와 방위주로 자금을 이동시켰다. 두 섹터 모두 부동산 시장 혼란으로부터 대체로 면역이 있다고 평가됐다.',
      },
      read: false,
      effect: { HEALTH: 1.07, AERO: 1.05 },
    },
    {
      id: 'rec-1-5',
      dayIdx: 1,
      title: {
        en: 'Green Energy Projects Frozen as Credit Markets Tighten',
        ko: '신용시장 경색에 친환경 에너지 프로젝트 동결',
      },
      content: {
        en: 'Banks pulled back lending across all sectors as the property crisis tightened credit conditions. Several renewable energy projects lost financing commitments, sending green stocks lower.',
        ko: '부동산 위기로 신용 여건이 경색되면서 은행들이 전 업종에 걸쳐 대출을 축소했다. 여러 재생에너지 프로젝트가 자금 약정을 잃으며 친환경주가 하락했다.',
      },
      read: false,
      effect: { GREEN: 0.90 },
    },

    // Day 2: Banking sector exposure revealed, construction stocks plunge
    {
      id: 'rec-2-1',
      dayIdx: 2,
      title: {
        en: 'Banking Exposure to Real Estate Worse Than Expected',
        ko: '은행권 부동산 노출, 예상보다 심각한 것으로 드러나',
      },
      content: {
        en: 'Regulatory filings revealed that major banks hold $1.2 trillion in real estate-linked assets, far exceeding previous estimates. Credit default swap spreads widened dramatically on systemic risk fears.',
        ko: '규제 보고서에서 주요 은행들이 보유한 부동산 연계 자산이 이전 추정치를 크게 초과하는 1.2조 달러에 달한다고 밝혀졌다. 시스템 리스크 우려에 신용부도스와프 스프레드가 급격히 확대됐다.',
      },
      read: false,
      effect: { TECH: 0.91, ECOM: 0.90 },
    },
    {
      id: 'rec-2-2',
      dayIdx: 2,
      title: {
        en: 'Construction Material Stocks in Freefall',
        ko: '건설자재주 폭락세 지속',
      },
      content: {
        en: 'Companies supplying cement, steel, and building materials to the property sector saw shares collapse as analysts projected a 60% drop in new construction starts over the next year.',
        ko: '부동산 업계에 시멘트, 철강, 건자재를 공급하는 기업들의 주가가 폭락했다. 애널리스트들은 내년 신규 착공이 60% 감소할 것으로 전망했다.',
      },
      read: false,
      effect: { GREEN: 0.92 },
    },
    {
      id: 'rec-2-3',
      dayIdx: 2,
      title: {
        en: 'Aerospace Defense Division Sees Surge in Orders',
        ko: '항공우주 방위 부문 수주 급증',
      },
      content: {
        en: 'As financial markets tumbled, governments accelerated defense procurement to stimulate domestic industry. AeroSpace Dynamics reported a 30% increase in defense contract inquiries.',
        ko: '금융시장이 혼란에 빠지자 각국 정부가 국내 산업 부양을 위해 방위 조달을 가속화했다. 에어로스페이스 다이내믹스는 방위 계약 문의가 30% 증가했다고 발표했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'rec-2-4',
      dayIdx: 2,
      title: {
        en: 'Healthcare Demand Proves Recession-Proof',
        ko: '헬스케어 수요, 경기침체 면역 입증',
      },
      content: {
        en: 'Pharmaceutical companies reported that prescription drug demand remained completely stable despite the economic turmoil. The sector\'s non-cyclical nature attracted a fresh wave of institutional buyers.',
        ko: '제약사들은 경제 혼란에도 불구하고 처방약 수요가 완전히 안정적이라고 보고했다. 비경기순환적 성격이 부각되며 새로운 기관 매수세가 유입됐다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'rec-2-5',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Braces for Consumer Spending Downturn',
        ko: '이커머스, 소비 침체에 대비 태세',
      },
      content: {
        en: 'Online retailers warned that the wealth effect from falling property values would weigh on consumer spending. Several platforms preemptively slashed marketing budgets.',
        ko: '온라인 유통업체들은 부동산 가치 하락에 따른 역자산효과가 소비지출을 압박할 것이라고 경고했다. 여러 플랫폼이 선제적으로 마케팅 예산을 삭감했다.',
      },
      read: false,
      effect: { ECOM: 0.94 },
    },

    // Day 3: Government signals selective support, prevents disorderly collapse
    {
      id: 'rec-3-1',
      dayIdx: 3,
      title: {
        en: 'Government Pledges Selective Support for Property Sector',
        ko: '정부, 부동산 부문 선별적 지원 공약',
      },
      content: {
        en: 'The finance ministry announced a targeted support package to prevent a disorderly collapse of the property sector, including guarantees for homebuyer deposits and selective credit lines for viable developers.',
        ko: '재무부가 주택 구매자 보증금 보장과 건전한 개발업체에 대한 선별적 신용 공여를 포함한 부동산 부문의 질서 있는 구조조정을 위한 맞춤형 지원 패키지를 발표했다.',
      },
      read: false,
      effect: { TECH: 1.05, ECOM: 1.06 },
    },
    {
      id: 'rec-3-2',
      dayIdx: 3,
      title: {
        en: 'Central Bank Injects Emergency Liquidity',
        ko: '중앙은행, 긴급 유동성 공급 단행',
      },
      content: {
        en: 'The central bank injected $200 billion in emergency liquidity into the banking system and lowered reserve requirements to prevent a credit freeze from spreading beyond the property sector.',
        ko: '중앙은행이 은행 시스템에 2,000억 달러의 긴급 유동성을 공급하고 지급준비율을 인하해 부동산 부문을 넘어선 신용 경색 확산을 방지했다.',
      },
      read: false,
      effect: { GREEN: 1.06, TECH: 1.04 },
    },
    {
      id: 'rec-3-3',
      dayIdx: 3,
      title: {
        en: 'Markets Rally on Bailout Hopes',
        ko: '구제금융 기대감에 시장 반등',
      },
      content: {
        en: 'Broad market indices surged 3% as government intervention calmed panic selling. Investors interpreted the selective support as a signal that authorities would not allow systemic contagion.',
        ko: '정부 개입이 패닉 매도를 진정시키면서 주요 지수가 3% 급등했다. 투자자들은 선별적 지원을 당국이 시스템적 전이를 허용하지 않겠다는 신호로 해석했다.',
      },
      read: false,
      effect: { ECOM: 1.05 },
    },
    {
      id: 'rec-3-4',
      dayIdx: 3,
      title: {
        en: 'Healthcare Continues Steady Climb',
        ko: '헬스케어, 꾸준한 상승세 지속',
      },
      content: {
        en: 'Even with the broader market recovery, healthcare stocks continued their upward trend as investors maintained defensive positions pending confirmation that the crisis is truly contained.',
        ko: '시장 전체의 회복세에도 헬스케어 주가는 위기 봉쇄 확인 전까지 방어적 포지션을 유지하려는 투자자들의 수요에 힘입어 상승 흐름을 이어갔다.',
      },
      read: false,
      effect: { HEALTH: 1.04 },
    },
    {
      id: 'rec-3-5',
      dayIdx: 3,
      title: {
        en: 'Aerospace Stocks Hold Gains on Mixed Signals',
        ko: '혼재된 신호 속 항공우주 주가 상승분 유지',
      },
      content: {
        en: 'Aerospace stocks consolidated recent gains as defense demand remained strong but commercial aviation outlook clouded by economic uncertainty from the property crisis.',
        ko: '방위 수요는 강세를 유지하지만 부동산 위기의 경제적 불확실성이 민항 전망을 흐리게 하면서 항공우주 주가가 최근 상승분을 공고히 했다.',
      },
      read: false,
      effect: { AERO: 1.03 },
    },

    // Day 4: Restructuring plan announced, contagion fears ease
    {
      id: 'rec-4-1',
      dayIdx: 4,
      title: {
        en: 'Titan Properties Announces Comprehensive Restructuring Plan',
        ko: '타이탄 부동산, 포괄적 구조조정 계획 발표',
      },
      content: {
        en: 'Titan Properties unveiled a court-supervised restructuring plan that includes asset sales, debt-to-equity swaps, and a commitment to complete all pre-sold housing units. Creditors expressed cautious support.',
        ko: '타이탄 부동산이 자산 매각, 출자전환, 사전 분양 주택 완공 약속을 포함한 법원 감독 하의 포괄적 구조조정 계획을 공개했다. 채권단은 조심스러운 지지 입장을 표명했다.',
      },
      read: false,
      effect: { TECH: 1.06, ECOM: 1.07 },
    },
    {
      id: 'rec-4-2',
      dayIdx: 4,
      title: {
        en: 'Credit Markets Begin Thawing After Government Backstop',
        ko: '정부 보증에 신용시장 해빙 시작',
      },
      content: {
        en: 'Interbank lending rates fell sharply as the government backstop restored confidence in the financial system. Banks cautiously resumed lending to non-property sectors.',
        ko: '정부 보증이 금융 시스템에 대한 신뢰를 회복시키면서 은행 간 대출 금리가 급락했다. 은행들이 비부동산 부문 대출을 조심스럽게 재개했다.',
      },
      read: false,
      effect: { GREEN: 1.08, ECOM: 1.04 },
    },
    {
      id: 'rec-4-3',
      dayIdx: 3,
      title: {
        en: 'Tech Firms Report Minimal Direct Property Exposure',
        ko: '기술 기업들, 직접적 부동산 노출 미미하다고 보고',
      },
      content: {
        en: 'Major technology companies reassured investors that their balance sheets carry minimal real estate exposure and that operations are fully funded through cash reserves and recurring revenue.',
        ko: '주요 기술 기업들은 대차대조표상 부동산 노출이 극히 미미하며 운영 자금이 현금 보유액과 반복 매출로 완전히 충당된다고 투자자들을 안심시켰다.',
      },
      read: false,
      effect: { TECH: 1.05 },
    },
    {
      id: 'rec-4-4',
      dayIdx: 4,
      title: {
        en: 'Defense Spending Unaffected by Financial Turbulence',
        ko: '금융 혼란에도 국방비 지출 영향 없어',
      },
      content: {
        en: 'Government officials confirmed that defense budgets will not be reduced despite the fiscal cost of the property sector bailout. Aerospace defense stocks reached new all-time highs.',
        ko: '정부 관계자들은 부동산 구제금융의 재정 부담에도 불구하고 국방 예산을 삭감하지 않을 것이라고 확인했다. 항공우주 방위주가 사상 최고가를 경신했다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'rec-4-5',
      dayIdx: 4,
      title: {
        en: 'VitaPharma Expands into Medical Real Estate',
        ko: '비타파마, 의료 부동산으로 사업 확장',
      },
      content: {
        en: 'VitaPharma announced the acquisition of distressed hospital and research facility properties at significant discounts, turning the real estate crisis into an expansion opportunity.',
        ko: '비타파마가 부동산 위기를 기회로 삼아 병원과 연구시설 부동산을 대폭 할인된 가격에 인수한다고 발표했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },

    // Day 5: Property sector reforms launched, market finds new equilibrium
    {
      id: 'rec-5-1',
      dayIdx: 5,
      title: {
        en: 'Government Launches Comprehensive Property Sector Reforms',
        ko: '정부, 부동산 부문 포괄적 개혁안 발표',
      },
      content: {
        en: 'The government unveiled sweeping reforms including developer leverage limits, pre-sale escrow requirements, and a new regulatory body for real estate finance. Markets welcomed the structural overhaul.',
        ko: '정부가 개발업체 레버리지 제한, 사전 분양 에스크로 의무화, 부동산 금융 규제 기관 신설을 포함한 전면적 개혁안을 발표했다. 시장은 구조적 개편을 환영했다.',
      },
      read: false,
      effect: { TECH: 1.07, ECOM: 1.05 },
    },
    {
      id: 'rec-5-2',
      dayIdx: 5,
      title: {
        en: 'Green Energy Benefits from Construction Sector Pivot',
        ko: '건설업 전환으로 친환경 에너지 수혜',
      },
      content: {
        en: 'Reform guidelines encouraged converting stalled property developments into renewable energy installations. Green energy companies reported a surge in partnership inquiries from former property developers.',
        ko: '개혁 가이드라인이 중단된 부동산 개발 부지를 재생에너지 설비로 전환하도록 장려했다. 친환경 에너지 기업들은 전직 부동산 개발업체들의 파트너십 문의가 급증했다고 밝혔다.',
      },
      read: false,
      effect: { GREEN: 1.09 },
    },
    {
      id: 'rec-5-3',
      dayIdx: 5,
      title: {
        en: 'Consumer Confidence Recovers on Reform Clarity',
        ko: '개혁안 명확화에 소비자 신뢰 회복',
      },
      content: {
        en: 'Consumer confidence surveys showed a sharp rebound as the comprehensive reform package provided clarity on the path forward. Retail spending data ticked upward for the first time in weeks.',
        ko: '포괄적 개혁안이 앞으로의 방향을 명확히 하면서 소비자 신뢰 조사에서 급반등이 나타났다. 소매 지출 데이터도 수주 만에 처음으로 상승 전환했다.',
      },
      read: false,
      effect: { ECOM: 1.06 },
    },
    {
      id: 'rec-5-4',
      dayIdx: 5,
      title: {
        en: 'Aerospace Rides Stability Wave Higher',
        ko: '안정화 흐름 타고 항공우주 추가 상승',
      },
      content: {
        en: 'With financial system risk now contained, aerospace stocks benefited from both a relief rally and continued strong defense demand. Commercial aviation orders also began recovering.',
        ko: '금융 시스템 리스크가 봉쇄되면서 항공우주 주가가 안도 랠리와 지속적인 방위 수요 양쪽 모두의 수혜를 입었다. 민항기 주문도 회복세를 보이기 시작했다.',
      },
      read: false,
      effect: { AERO: 1.07 },
    },
    {
      id: 'rec-5-5',
      dayIdx: 5,
      title: {
        en: 'Markets Find New Equilibrium After Property Storm',
        ko: '부동산 폭풍 이후 시장, 새로운 균형점 도달',
      },
      content: {
        en: 'Economists declared that the worst of the property crisis has passed, with structural reforms providing a foundation for sustainable growth. All major indices closed the week at levels above the pre-crisis baseline.',
        ko: '경제학자들은 부동산 위기의 최악은 지났으며 구조적 개혁이 지속 가능한 성장의 토대를 마련했다고 선언했다. 모든 주요 지수가 위기 전 기준선 위에서 주간 마감했다.',
      },
      read: false,
      effect: { HEALTH: 1.04, TECH: 1.03 },
    },
  ],
};
