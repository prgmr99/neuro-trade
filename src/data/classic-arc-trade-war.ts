import { ClassicScenarioArc } from './classic-arcs';

export const TRADE_WAR_ARC: ClassicScenarioArc = {
  id: 'trade-war',
  name: { en: 'Trade War', ko: '무역전쟁' },
  news: [
    // Day 1: Major country announces sweeping tariffs on tech imports
    {
      id: 'tw-1-1',
      dayIdx: 1,
      title: {
        en: 'US Slaps Sweeping Tariffs on Tech Imports',
        ko: '미국, 기술 수입품에 전면적 관세 부과 발표',
      },
      content: {
        en: 'The administration announced 25% tariffs on a broad range of technology imports, citing national security concerns. Semiconductor and consumer electronics sectors brace for impact.',
        ko: '행정부가 국가 안보를 이유로 다양한 기술 수입품에 25% 관세를 부과한다고 발표했다. 반도체 및 소비가전 업종이 직격탄을 맞을 것으로 예상된다.',
      },
      read: false,
      effect: { TECH: 0.88, ECOM: 0.92 },
    },
    {
      id: 'tw-1-2',
      dayIdx: 1,
      title: {
        en: 'Airlines Fear Supply Chain Disruptions from Tariff Shock',
        ko: '항공업계, 관세 충격에 공급망 차질 우려',
      },
      content: {
        en: 'Aviation manufacturers warn that new tariffs on foreign components will delay aircraft deliveries and inflate production costs, sending sector stocks lower.',
        ko: '항공기 제조업체들은 외국산 부품에 대한 신규 관세로 항공기 납품이 지연되고 생산 비용이 오를 것이라고 경고했다. 관련 주가가 하락세를 보이고 있다.',
      },
      read: false,
      effect: { AERO: 0.90 },
    },
    {
      id: 'tw-1-3',
      dayIdx: 1,
      title: {
        en: 'Healthcare Stocks Rise as Safe-Haven Demand Surges',
        ko: '무역 불안에 헬스케어 주, 안전자산으로 부상',
      },
      content: {
        en: 'Investors rotated into defensive healthcare names as trade war fears escalated. Analysts note the sector\'s domestic revenue base insulates it from tariff exposure.',
        ko: '무역전쟁 우려가 고조되면서 투자자들이 방어주인 헬스케어 종목으로 대거 이동했다. 애널리스트들은 내수 매출 비중이 높아 관세 영향에서 상대적으로 자유롭다고 분석했다.',
      },
      read: false,
      effect: { HEALTH: 1.08 },
    },
    {
      id: 'tw-1-4',
      dayIdx: 1,
      title: {
        en: 'Green Energy Firms Eye Domestic Manufacturing Boost',
        ko: '친환경 에너지 기업, 국내 제조 확대 기회 포착',
      },
      content: {
        en: 'The tariff package includes provisions promoting domestic clean-energy production. Solar panel and wind turbine makers rallied as investors priced in a potential manufacturing windfall.',
        ko: '이번 관세 패키지에는 국내 청정에너지 생산을 장려하는 조항이 포함됐다. 태양광 패널과 풍력 터빈 제조업체들의 주가가 강세를 보이며 투자자들의 기대감을 반영했다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },
    {
      id: 'tw-1-5',
      dayIdx: 1,
      title: {
        en: 'E-Commerce Giants Warn of Higher Consumer Prices',
        ko: '이커머스 대기업, 소비자 가격 인상 불가피 경고',
      },
      content: {
        en: 'Leading e-commerce platforms cautioned that tariffs on imported goods will translate directly into higher prices for shoppers, potentially dampening sales volumes.',
        ko: '주요 이커머스 플랫폼들은 수입품 관세가 소비자 가격 인상으로 직결돼 판매량 감소로 이어질 수 있다고 경고했다.',
      },
      read: false,
      effect: { ECOM: 0.91 },
    },

    // Day 2: Retaliatory tariffs hit
    {
      id: 'tw-2-1',
      dayIdx: 2,
      title: {
        en: 'China Retaliates with Tariffs on US Semiconductors',
        ko: '중국, 미국산 반도체에 보복 관세 발동',
      },
      content: {
        en: 'Beijing announced counter-tariffs targeting American semiconductor exports. Tech firms that rely on overseas chip fabrication face a double squeeze on margins.',
        ko: '베이징이 미국산 반도체 수출을 겨냥한 보복 관세를 발동했다. 해외 반도체 생산에 의존하는 기술 기업들은 마진 압박이 이중으로 가중될 전망이다.',
      },
      read: false,
      effect: { TECH: 0.87 },
    },
    {
      id: 'tw-2-2',
      dayIdx: 2,
      title: {
        en: 'Green Energy Surges on "Buy Domestic" Policy Signals',
        ko: '"국산 우선" 정책 신호에 친환경 에너지 급등',
      },
      content: {
        en: 'Lawmakers signaled bipartisan support for subsidizing domestic renewable energy as an alternative to imported goods. Green energy stocks led the market higher.',
        ko: '여야 의원들이 수입품 대체 수단으로 국내 재생에너지 보조금 지원에 초당적 지지를 보냈다. 친환경 에너지 주가가 시장 상승을 주도했다.',
      },
      read: false,
      effect: { GREEN: 1.10 },
    },
    {
      id: 'tw-2-3',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Pivots to Local Suppliers, Shares Rebound',
        ko: '이커머스, 국내 공급사 전환 가속… 주가 반등',
      },
      content: {
        en: 'Several major e-commerce operators announced partnerships with domestic suppliers to offset the tariff impact. Investors responded positively to the strategic pivot.',
        ko: '주요 이커머스 기업들이 관세 충격을 상쇄하기 위해 국내 공급사와 파트너십을 체결했다고 발표했다. 투자자들은 이 전략적 전환에 긍정적으로 반응했다.',
      },
      read: false,
      effect: { ECOM: 1.05 },
    },
    {
      id: 'tw-2-4',
      dayIdx: 2,
      title: {
        en: 'Healthcare Holds Steady as Trade Tensions Deepen',
        ko: '무역 갈등 심화에도 헬스케어, 안정세 유지',
      },
      content: {
        en: 'Pharmaceutical and medical device companies reported steady demand despite the broader market turmoil, reinforcing the sector\'s defensive credentials.',
        ko: '제약 및 의료기기 기업들은 전반적인 시장 혼란 속에서도 안정적인 수요를 보고했다. 이는 헬스케어 업종의 방어적 성격을 재확인시켜 줬다.',
      },
      read: false,
      effect: { HEALTH: 1.03 },
    },
    {
      id: 'tw-2-5',
      dayIdx: 2,
      title: {
        en: 'Aerospace Parts Shortfall Looms as Import Bans Widen',
        ko: '수입 금지 확대에 항공우주 부품 부족 우려 가시화',
      },
      content: {
        en: 'Trade restrictions now cover key titanium alloys and avionics components, raising fears of production bottlenecks at major aerospace manufacturers.',
        ko: '무역 규제가 주요 티타늄 합금과 항공전자 부품까지 확대되면서 대형 항공우주 제조업체의 생산 병목 우려가 현실화되고 있다.',
      },
      read: false,
      effect: { AERO: 0.91 },
    },

    // Day 3: Emergency trade summit called, cautious optimism
    {
      id: 'tw-3-1',
      dayIdx: 3,
      title: {
        en: 'G20 Emergency Trade Summit Convenes in Geneva',
        ko: 'G20 긴급 무역 정상회담, 제네바에서 개막',
      },
      content: {
        en: 'World leaders gathered for an emergency summit to address escalating trade tensions. Opening statements struck a cautiously constructive tone, lifting markets broadly.',
        ko: '세계 지도자들이 고조되는 무역 갈등 해소를 위해 긴급 정상회담에 집결했다. 개막 성명이 신중하지만 건설적인 기조를 취하며 시장 전반이 상승했다.',
      },
      read: false,
      effect: { TECH: 1.04, AERO: 1.03 },
    },
    {
      id: 'tw-3-2',
      dayIdx: 3,
      title: {
        en: 'Partial De-escalation Proposal Floated at Summit',
        ko: '정상회담서 부분적 긴장 완화 방안 제시',
      },
      content: {
        en: 'Negotiators floated a proposal to suspend the most punitive tariffs pending a 90-day review. Markets interpreted the news as a positive step toward resolution.',
        ko: '협상단이 90일간의 검토를 조건으로 가장 강력한 관세를 유예하는 방안을 제시했다. 시장은 이를 갈등 해소를 향한 긍정적 조치로 해석했다.',
      },
      read: false,
      effect: { ECOM: 1.04, GREEN: 1.02 },
    },
    {
      id: 'tw-3-3',
      dayIdx: 3,
      title: {
        en: 'Tech Sector Cautious Despite Summit Optimism',
        ko: '정상회담 낙관론에도 기술주 신중한 행보',
      },
      content: {
        en: 'Technology companies warned that structural supply chain changes cannot be reversed overnight even if tariffs are lifted, tempering enthusiasm in the sector.',
        ko: '기술 기업들은 관세가 철폐되더라도 구조적인 공급망 변화가 하루아침에 되돌려질 수 없다며 업종 내 낙관론을 억눌렀다.',
      },
      read: false,
      effect: { TECH: 0.97 },
    },
    {
      id: 'tw-3-4',
      dayIdx: 3,
      title: {
        en: 'Healthcare Drugmakers Signal Export Expansion Plans',
        ko: '헬스케어 제약사, 수출 확대 계획 공식화',
      },
      content: {
        en: 'Several pharmaceutical companies announced plans to expand exports under a proposed pharmaceutical carve-out from the tariff regime, boosting sector sentiment.',
        ko: '다수의 제약사가 관세 체계의 의약품 예외 조항 활용을 통한 수출 확대 계획을 발표했다. 업종 투자심리가 개선됐다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'tw-3-5',
      dayIdx: 3,
      title: {
        en: 'Green Energy Sector Mixed on Summit Outcomes',
        ko: '친환경 에너지 업종, 정상회담 결과에 엇갈린 반응',
      },
      content: {
        en: 'Investors were divided over whether a trade resolution would sustain or erode the domestic manufacturing premium that has driven green energy gains this week.',
        ko: '투자자들은 무역 협상 타결이 이번 주 친환경 에너지 주가 상승을 이끈 국내 제조 프리미엄을 유지시킬지 아니면 희석시킬지를 놓고 의견이 엇갈렸다.',
      },
      read: false,
      effect: { GREEN: 0.98 },
    },

    // Day 4: Surprise bilateral deal on tech exports
    {
      id: 'tw-4-1',
      dayIdx: 4,
      title: {
        en: 'Surprise Bilateral Tech Export Deal Announced',
        ko: '깜짝 양자 기술 수출 협정 전격 발표',
      },
      content: {
        en: 'The US and its key trading partner signed a surprise bilateral agreement lifting tariffs on technology exports. Tech stocks surged on the news in after-hours trading.',
        ko: '미국과 주요 교역국이 기술 수출 관세를 철폐하는 깜짝 양자 협정에 서명했다. 시간외 거래에서 기술주가 급등세를 나타냈다.',
      },
      read: false,
      effect: { TECH: 1.12 },
    },
    {
      id: 'tw-4-2',
      dayIdx: 4,
      title: {
        en: 'Aerospace Sector Soars on Reopened Component Supply Lines',
        ko: '부품 공급망 재개에 항공우주 업종 급반등',
      },
      content: {
        en: 'The bilateral deal reopened critical aerospace component supply lines. Manufacturers confirmed order backlogs will now be cleared faster than previously expected.',
        ko: '양자 협정으로 핵심 항공우주 부품 공급망이 재개됐다. 제조업체들은 기존 예상보다 빠르게 주문 적체가 해소될 것이라고 확인했다.',
      },
      read: false,
      effect: { AERO: 1.11 },
    },
    {
      id: 'tw-4-3',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Cheers Lower Shipping and Import Costs',
        ko: '이커머스, 운송·수입 비용 하락에 환호',
      },
      content: {
        en: 'Reduced tariffs on consumer goods translated into immediate cost savings for e-commerce platforms. Analysts upgraded sector price targets citing improved margin outlook.',
        ko: '소비재 관세 인하로 이커머스 플랫폼들의 비용이 즉각 절감됐다. 애널리스트들은 마진 개선 전망을 이유로 업종 목표 주가를 일제히 상향 조정했다.',
      },
      read: false,
      effect: { ECOM: 1.09 },
    },
    {
      id: 'tw-4-4',
      dayIdx: 4,
      title: {
        en: 'Green Energy Dips as Crisis Premium Unwinds',
        ko: '위기 프리미엄 해소에 친환경 에너지 소폭 하락',
      },
      content: {
        en: 'As trade tensions eased, investors unwound positions in domestic-manufacturing plays. Green energy stocks pulled back from their recent highs on profit-taking.',
        ko: '무역 긴장이 완화되면서 투자자들이 국내 제조 테마 포지션을 청산했다. 친환경 에너지 주가는 최근 고점에서 차익 실현 매물이 나오며 소폭 하락했다.',
      },
      read: false,
      effect: { GREEN: 0.93 },
    },
    {
      id: 'tw-4-5',
      dayIdx: 4,
      title: {
        en: 'Healthcare Maintains Momentum on Strong Earnings Guidance',
        ko: '헬스케어, 호실적 가이던스로 상승 흐름 유지',
      },
      content: {
        en: 'Major healthcare companies raised full-year earnings guidance, citing both the pharmaceutical export carve-out and stable domestic demand as key drivers.',
        ko: '주요 헬스케어 기업들이 의약품 수출 예외 조항과 안정적인 내수 수요를 핵심 동인으로 꼽으며 연간 실적 가이던스를 상향했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },

    // Day 5: New trade framework ratified, broad optimism
    {
      id: 'tw-5-1',
      dayIdx: 5,
      title: {
        en: 'New Multilateral Trade Framework Ratified',
        ko: '다자 무역 프레임워크 공식 비준… 새 시대 개막',
      },
      content: {
        en: 'A comprehensive new trade framework has been ratified by 14 nations, replacing the conflicting bilateral tariffs with a unified, lower-duty structure. Markets surged on the news.',
        ko: '14개국이 포괄적인 신규 무역 프레임워크를 공식 비준했다. 상충하는 양자 관세를 통합·저율의 단일 체계로 대체하는 내용이며 시장이 급등했다.',
      },
      read: false,
      effect: { TECH: 1.10, AERO: 1.07 },
    },
    {
      id: 'tw-5-2',
      dayIdx: 5,
      title: {
        en: 'E-Commerce Volumes Hit Record Highs on Freed Trade',
        ko: '무역 자유화에 이커머스 거래량 사상 최고치',
      },
      content: {
        en: 'The removal of import barriers triggered a surge in cross-border e-commerce activity. Platform operators reported record daily transaction volumes in early data.',
        ko: '수입 장벽 철폐로 국경간 이커머스 거래가 급증했다. 플랫폼 운영사들은 초기 데이터에서 일일 거래량이 사상 최고치를 기록했다고 발표했다.',
      },
      read: false,
      effect: { ECOM: 1.13 },
    },
    {
      id: 'tw-5-3',
      dayIdx: 5,
      title: {
        en: 'Green Energy Recovers as Long-Term Subsidies Confirmed',
        ko: '장기 보조금 확정에 친환경 에너지 반등',
      },
      content: {
        en: 'The new trade framework includes a long-term domestic clean energy subsidy package, reassuring investors that green energy tailwinds extend well beyond the trade war.',
        ko: '신규 무역 프레임워크에 장기 국내 청정에너지 보조금 패키지가 포함되면서 친환경 에너지의 성장 동력이 무역전쟁을 넘어 지속될 것이라는 투자자 신뢰가 회복됐다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'tw-5-4',
      dayIdx: 5,
      title: {
        en: 'Healthcare Rides Confidence Wave into New Quarter',
        ko: '헬스케어, 신뢰 회복 흐름 타고 신분기 도약',
      },
      content: {
        en: 'With trade uncertainty resolved, healthcare stocks extended gains as institutional investors increased allocations. Sector index hit a fresh 52-week high.',
        ko: '무역 불확실성이 해소되면서 기관 투자자들의 비중 확대로 헬스케어 주가가 추가 상승했다. 업종 지수가 52주 신고가를 경신했다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },
    {
      id: 'tw-5-5',
      dayIdx: 5,
      title: {
        en: 'Economists Declare Trade War Over, Growth Forecasts Revised Up',
        ko: '경제학자들 "무역전쟁 종전" 선언… 성장률 전망 상향',
      },
      content: {
        en: 'Leading economists declared the trade war effectively over, revising up global growth forecasts by 0.4 percentage points. Business confidence indices jumped to two-year highs.',
        ko: '주요 경제학자들이 무역전쟁의 사실상 종전을 선언하며 세계 성장률 전망을 0.4%포인트 상향 조정했다. 기업 신뢰지수는 2년 만에 최고치로 껑충 뛰었다.',
      },
      read: false,
      effect: { TECH: 1.06, ECOM: 1.04, AERO: 1.05 },
    },
  ],
};
