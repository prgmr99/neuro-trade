import { ClassicScenarioArc } from './classic-arcs';

export const OIL_PRICE_WAR_ARC: ClassicScenarioArc = {
  id: 'oil-price-war',
  name: { en: 'Oil Price War', ko: '석유 가격 전쟁' },
  news: [
    // Day 1: Major oil cartel collapses as two leading producers refuse to cut output
    {
      id: 'opw-1-1',
      dayIdx: 1,
      title: {
        en: 'OPEX Cartel Talks Collapse as Two Producers Walk Out',
        ko: 'OPEX 카르텔 협상 결렬, 양대 산유국 퇴장',
      },
      content: {
        en: 'Negotiations between the world\'s two largest oil-producing nations broke down after neither side agreed to production cuts. Energy analysts warn of an imminent price war that could flood global markets with cheap crude.',
        ko: '세계 최대 산유국 두 나라 간의 협상이 양측 모두 감산을 거부하면서 결렬되었다. 에너지 전문가들은 저가 원유가 시장에 넘쳐나는 가격 전쟁이 임박했다고 경고하고 있다.',
      },
      read: false,
      effect: { GREEN: 0.93, AERO: 0.96 },
    },
    {
      id: 'opw-1-2',
      dayIdx: 1,
      title: {
        en: 'Energy Stocks Tumble on Supply Glut Fears',
        ko: '공급 과잉 우려에 에너지 관련주 급락',
      },
      content: {
        en: 'Traditional energy and fossil fuel-adjacent sectors sold off sharply as traders priced in months of oversupply. Renewable energy firms also fell on broader energy sector contagion fears.',
        ko: '트레이더들이 수개월간의 공급 과잉을 선반영하면서 전통 에너지 및 화석연료 관련 섹터가 급락했다. 재생에너지 기업들도 에너지 업종 전반의 동반 하락 공포에 하락세를 보였다.',
      },
      read: false,
      effect: { GREEN: 0.91 },
    },
    {
      id: 'opw-1-3',
      dayIdx: 1,
      title: {
        en: 'Airlines Eye Cheaper Fuel but Demand Outlook Murky',
        ko: '항공업계 저유가 기대감, 그러나 수요 전망은 불투명',
      },
      content: {
        en: 'Aviation executives expressed cautious optimism about falling jet fuel costs, but warned that geopolitical instability from the oil dispute could dampen travel demand.',
        ko: '항공업계 경영진은 항공유 가격 하락에 조심스러운 기대감을 표했으나, 석유 분쟁으로 인한 지정학적 불안이 여행 수요를 위축시킬 수 있다고 경고했다.',
      },
      read: false,
      effect: { AERO: 1.04 },
    },
    {
      id: 'opw-1-4',
      dayIdx: 1,
      title: {
        en: 'E-Commerce Logistics Costs Set to Decline',
        ko: '이커머스 물류 비용 하락 전망',
      },
      content: {
        en: 'Shipping and logistics firms signaled that lower fuel prices would reduce delivery costs significantly. E-commerce platforms stand to benefit from improved margins on last-mile delivery.',
        ko: '물류 기업들은 유가 하락이 배송 비용을 크게 줄일 것이라고 전망했다. 이커머스 플랫폼들은 라스트마일 배송 마진 개선의 수혜를 입을 것으로 기대된다.',
      },
      read: false,
      effect: { ECOM: 1.05 },
    },
    {
      id: 'opw-1-5',
      dayIdx: 1,
      title: {
        en: 'Investors Rotate into Defensive Healthcare Plays',
        ko: '투자자들, 방어주 헬스케어로 자금 이동',
      },
      content: {
        en: 'With energy markets in turmoil, institutional investors shifted capital into pharmaceutical stocks as a hedge against commodity volatility. VitaPharma led the sector higher.',
        ko: '에너지 시장이 혼란에 빠지면서 기관 투자자들이 원자재 변동성 헤지 수단으로 제약주에 자금을 이동시켰다. 비타파마가 업종 상승을 이끌었다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },

    // Day 2: Oil prices crash 30%, energy stocks devastated, green energy benefits
    {
      id: 'opw-2-1',
      dayIdx: 2,
      title: {
        en: 'Oil Prices Plunge 30% in Single-Day Crash',
        ko: '유가, 하루 만에 30% 폭락',
      },
      content: {
        en: 'Crude oil futures collapsed by 30% in the worst single-day decline since the 1991 conflict, as both major producers ramped up output to maximum capacity in a bid to crush rivals.',
        ko: '양대 산유국이 경쟁국을 압박하기 위해 생산량을 최대로 끌어올리면서 원유 선물이 1991년 분쟁 이후 최악의 하루 낙폭인 30% 급락을 기록했다.',
      },
      read: false,
      effect: { AERO: 1.08, ECOM: 1.04 },
    },
    {
      id: 'opw-2-2',
      dayIdx: 2,
      title: {
        en: 'Renewable Energy Stocks Surge as Fossil Fuel Case Weakens',
        ko: '화석연료 투자 매력 감소에 재생에너지주 급등',
      },
      content: {
        en: 'Investors poured capital into renewable energy companies as the oil crash exposed the volatility risks of fossil fuel dependence. Solar and wind stocks posted double-digit gains.',
        ko: '유가 폭락이 화석연료 의존의 변동성 리스크를 부각시키면서 투자자들이 재생에너지 기업에 자금을 쏟아부었다. 태양광과 풍력 관련주가 두 자릿수 상승률을 기록했다.',
      },
      read: false,
      effect: { GREEN: 1.12 },
    },
    {
      id: 'opw-2-3',
      dayIdx: 2,
      title: {
        en: 'Tech Sector Holds Steady Amid Oil Chaos',
        ko: '유가 혼란 속 기술주 안정세 유지',
      },
      content: {
        en: 'Technology companies with minimal energy exposure proved resilient during the oil crash. Cloud computing and AI firms actually attracted safe-haven flows from panicked energy investors.',
        ko: '에너지 노출이 적은 기술 기업들이 유가 폭락 속에서도 견고한 모습을 보였다. 클라우드 컴퓨팅과 AI 기업에는 에너지 투자자들의 안전자산 자금이 유입됐다.',
      },
      read: false,
      effect: { TECH: 1.04 },
    },
    {
      id: 'opw-2-4',
      dayIdx: 2,
      title: {
        en: 'Petrochemical Supply Chain Disruptions Hit Manufacturing',
        ko: '석유화학 공급망 혼란, 제조업 직격탄',
      },
      content: {
        en: 'The sudden oil price collapse disrupted petrochemical supply chains, causing raw material shortages for plastics and packaging. Several consumer goods manufacturers warned of production delays.',
        ko: '갑작스러운 유가 폭락이 석유화학 공급망을 교란시켜 플라스틱과 포장재 원자재 부족 사태가 발생했다. 다수의 소비재 제조업체가 생산 지연을 경고했다.',
      },
      read: false,
      effect: { ECOM: 0.95 },
    },
    {
      id: 'opw-2-5',
      dayIdx: 2,
      title: {
        en: 'Pharmaceutical Companies Unaffected by Energy Turmoil',
        ko: '제약사들, 에너지 혼란에서 무풍지대',
      },
      content: {
        en: 'Major pharmaceutical companies reported that drug manufacturing and distribution remain unaffected by oil market volatility, reinforcing the sector\'s defensive positioning.',
        ko: '주요 제약사들은 의약품 제조와 유통이 유가 변동성의 영향을 받지 않고 있다고 밝혀 헬스케어 업종의 방어적 성격을 재확인시켰다.',
      },
      read: false,
      effect: { HEALTH: 1.03 },
    },

    // Day 3: Airlines and aerospace benefit from cheap fuel, but demand uncertainty remains
    {
      id: 'opw-3-1',
      dayIdx: 3,
      title: {
        en: 'Airlines Lock in Rock-Bottom Fuel Contracts',
        ko: '항공사들, 초저가 항공유 선물 계약 체결 러시',
      },
      content: {
        en: 'Major airlines rushed to lock in long-term fuel contracts at historically low prices, projecting billions in cost savings over the next two years.',
        ko: '주요 항공사들이 역사적 저점의 항공유 가격에 장기 선물 계약을 서두르면서 향후 2년간 수십억 달러의 비용 절감을 전망했다.',
      },
      read: false,
      effect: { AERO: 1.10 },
    },
    {
      id: 'opw-3-2',
      dayIdx: 3,
      title: {
        en: 'Green Energy Momentum Continues Despite Oil Bargains',
        ko: '저유가에도 친환경 에너지 상승 모멘텀 지속',
      },
      content: {
        en: 'Despite cheap oil making fossil fuels more competitive, institutional investors maintained their green energy positions, citing long-term regulatory tailwinds and ESG mandates.',
        ko: '저유가로 화석연료의 경쟁력이 높아졌음에도 기관 투자자들은 장기적인 규제 순풍과 ESG 의무를 근거로 친환경 에너지 포지션을 유지했다.',
      },
      read: false,
      effect: { GREEN: 1.05 },
    },
    {
      id: 'opw-3-3',
      dayIdx: 3,
      title: {
        en: 'Global Recession Fears Emerge from Oil Price Chaos',
        ko: '유가 혼란에서 글로벌 경기침체 우려 대두',
      },
      content: {
        en: 'Economists warned that the oil price war signals deeper geopolitical fractures that could trigger a global economic slowdown. Consumer confidence indices dropped sharply across major economies.',
        ko: '경제학자들은 석유 가격 전쟁이 글로벌 경기침체를 촉발할 수 있는 더 깊은 지정학적 균열의 신호라고 경고했다. 주요 경제권의 소비자 신뢰지수가 급락했다.',
      },
      read: false,
      effect: { TECH: 0.94, ECOM: 0.93 },
    },
    {
      id: 'opw-3-4',
      dayIdx: 3,
      title: {
        en: 'Defense Contractors See Increased Budget Requests',
        ko: '방위산업체, 국방 예산 증액 수혜 전망',
      },
      content: {
        en: 'Rising geopolitical tensions from the oil dispute led several governments to accelerate defense spending plans. Aerospace defense divisions reported a surge in contract inquiries.',
        ko: '석유 분쟁에서 비롯된 지정학적 긴장 고조로 여러 정부가 국방비 증액 계획을 앞당겼다. 항공우주 방위 부문에 계약 문의가 급증했다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'opw-3-5',
      dayIdx: 3,
      title: {
        en: 'Pharma Sector Benefits from Risk-Off Sentiment',
        ko: '위험회피 심리 확산에 제약 섹터 수혜',
      },
      content: {
        en: 'Healthcare stocks continued their rally as the risk-off trade intensified. Analysts noted that pharmaceutical revenue streams are almost entirely uncorrelated with energy prices.',
        ko: '위험회피 매매가 심화되면서 헬스케어 주가가 랠리를 이어갔다. 애널리스트들은 제약사 매출이 에너지 가격과 거의 무관하다는 점을 강조했다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },

    // Day 4: Emergency OPEX meeting called, production cut rumors swirl
    {
      id: 'opw-4-1',
      dayIdx: 4,
      title: {
        en: 'Emergency OPEX Summit Called to End Price War',
        ko: '긴급 OPEX 정상회담 소집, 가격 전쟁 종식 논의',
      },
      content: {
        en: 'The oil cartel announced an emergency virtual summit after pressure from consumer nations and international financial institutions. Markets rallied on hopes of a production cut agreement.',
        ko: '소비국과 국제 금융기관의 압력을 받은 석유 카르텔이 긴급 화상 정상회담을 소집했다. 감산 합의 기대감에 시장이 반등했다.',
      },
      read: false,
      effect: { TECH: 1.05, ECOM: 1.06 },
    },
    {
      id: 'opw-4-2',
      dayIdx: 4,
      title: {
        en: 'Leaked Draft Agreement Shows Historic Production Cuts',
        ko: '유출된 합의 초안에 역대급 감산 규모 담겨',
      },
      content: {
        en: 'A leaked draft of the proposed OPEX agreement revealed production cuts of 10 million barrels per day, the largest coordinated reduction in history. Oil futures surged 15% on the news.',
        ko: 'OPEX 합의안 초안이 유출되어 하루 1,000만 배럴의 역사상 최대 규모 협조 감산이 드러났다. 원유 선물이 이 소식에 15% 급등했다.',
      },
      read: false,
      effect: { GREEN: 0.95, AERO: 0.97 },
    },
    {
      id: 'opw-4-3',
      dayIdx: 4,
      title: {
        en: 'Tech Giants Announce Cost Savings from Low Energy Bills',
        ko: '빅테크, 에너지 비용 절감 효과 공개',
      },
      content: {
        en: 'Major technology companies reported that data center electricity costs had fallen substantially during the oil price war, boosting quarterly profit margins above expectations.',
        ko: '주요 기술 기업들은 석유 가격 전쟁 기간 중 데이터센터 전력 비용이 크게 감소해 분기 이익률이 예상치를 상회했다고 발표했다.',
      },
      read: false,
      effect: { TECH: 1.06 },
    },
    {
      id: 'opw-4-4',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Posts Strong Quarter on Lower Shipping Costs',
        ko: '이커머스, 배송비 절감 효과로 호실적 발표',
      },
      content: {
        en: 'GlobalMart reported better-than-expected quarterly earnings driven by dramatically lower fuel surcharges on shipping. Same-day delivery volumes reached an all-time high.',
        ko: '글로벌마트가 배송 연료 할증료 대폭 감소에 힘입어 기대 이상의 분기 실적을 발표했다. 당일 배송 물량도 사상 최고치를 달성했다.',
      },
      read: false,
      effect: { ECOM: 1.07 },
    },
    {
      id: 'opw-4-5',
      dayIdx: 4,
      title: {
        en: 'Healthcare Consolidates Gains as Market Recovers',
        ko: '시장 회복세에 헬스케어 상승분 공고화',
      },
      content: {
        en: 'As broader market sentiment improved on summit hopes, healthcare stocks consolidated their recent gains. Portfolio managers noted the sector proved its worth as a volatility buffer.',
        ko: '정상회담 기대감으로 시장 심리가 개선되면서 헬스케어 주가가 최근 상승분을 공고히 했다. 포트폴리오 매니저들은 변동성 완충재로서의 가치가 입증됐다고 평가했다.',
      },
      read: false,
      effect: { HEALTH: 1.03 },
    },

    // Day 5: New production agreement reached, oil stabilizes, broad market relief
    {
      id: 'opw-5-1',
      dayIdx: 5,
      title: {
        en: 'Historic OPEX Deal Ends Oil Price War',
        ko: '역사적 OPEX 합의로 석유 가격 전쟁 종결',
      },
      content: {
        en: 'After marathon negotiations, OPEX members agreed to the largest production cut in history. Oil prices stabilized immediately, and global markets rallied on the resolution of weeks of uncertainty.',
        ko: '마라톤 협상 끝에 OPEX 회원국들이 역사상 최대 규모의 감산에 합의했다. 유가는 즉각 안정을 되찾았고, 수주간의 불확실성이 해소되며 글로벌 시장이 반등했다.',
      },
      read: false,
      effect: { TECH: 1.06, AERO: 1.05 },
    },
    {
      id: 'opw-5-2',
      dayIdx: 5,
      title: {
        en: 'Green Energy Keeps Long-Term Investor Loyalty',
        ko: '친환경 에너지, 장기 투자자 신뢰 유지',
      },
      content: {
        en: 'Despite oil price stabilization, major pension funds reaffirmed their commitment to renewable energy investments, stating the crisis only reinforced the case for energy diversification.',
        ko: '유가 안정에도 불구하고 주요 연기금들은 이번 위기가 에너지 다변화의 필요성을 재확인시켰다며 재생에너지 투자 의지를 재천명했다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'opw-5-3',
      dayIdx: 5,
      title: {
        en: 'Aviation Sector Poised for Post-Crisis Boom',
        ko: '항공 업종, 위기 후 호황 기대감 고조',
      },
      content: {
        en: 'With fuel costs locked in at historic lows and geopolitical tensions easing, airline executives projected record profitability for the coming fiscal year.',
        ko: '역사적 저점에 고정된 연료비와 지정학적 긴장 완화로 항공사 경영진은 다가오는 회계연도에 사상 최고 수익성을 전망했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'opw-5-4',
      dayIdx: 5,
      title: {
        en: 'Consumer Confidence Rebounds on Economic Stability',
        ko: '경제 안정에 소비자 신뢰지수 반등',
      },
      content: {
        en: 'Consumer confidence surveys showed a sharp rebound following the OPEX deal. Retail analysts upgraded e-commerce spending forecasts for the remainder of the year.',
        ko: 'OPEX 합의 이후 소비자 신뢰 조사에서 급격한 반등이 나타났다. 유통 애널리스트들은 하반기 이커머스 소비 전망치를 상향 조정했다.',
      },
      read: false,
      effect: { ECOM: 1.06 },
    },
    {
      id: 'opw-5-5',
      dayIdx: 5,
      title: {
        en: 'Markets Close Week with Broad-Based Rally',
        ko: '주간 마감, 전 업종에 걸친 폭넓은 반등',
      },
      content: {
        en: 'All major indices closed the tumultuous week in positive territory as the oil price war resolution combined with strong corporate earnings lifted sentiment across every sector.',
        ko: '석유 가격 전쟁 해결과 양호한 기업 실적이 맞물리면서 격동의 한 주를 모든 주요 지수가 상승 마감했다. 전 업종에 걸쳐 투자 심리가 개선됐다.',
      },
      read: false,
      effect: { TECH: 1.04, HEALTH: 1.03 },
    },
  ],
};
