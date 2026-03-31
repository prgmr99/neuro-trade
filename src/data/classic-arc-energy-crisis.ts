import { ClassicScenarioArc } from './classic-arcs';

export const ENERGY_CRISIS_ARC: ClassicScenarioArc = {
  id: 'energy-crisis',
  name: { en: 'Energy Crisis', ko: '에너지 위기' },
  news: [
    // Day 1: Major oil pipeline explosion causes global supply shock
    {
      id: 'ec-1-1',
      dayIdx: 1,
      title: {
        en: 'Massive Pipeline Explosion Disrupts Global Oil Supply',
        ko: '대형 송유관 폭발, 글로벌 원유 공급에 심각한 차질',
      },
      content: {
        en: 'A catastrophic explosion at a major transcontinental pipeline has knocked out 15% of global crude oil transit capacity. Energy futures surged to multi-year highs within hours of the incident.',
        ko: '대륙 횡단 주요 송유관에서 대형 폭발이 발생해 전 세계 원유 수송 용량의 15%가 마비됐다. 에너지 선물 가격이 사고 발생 수시간 만에 수년 래 최고치로 치솟았다.',
      },
      read: false,
      effect: { GREEN: 1.12, AERO: 0.93 },
    },
    {
      id: 'ec-1-2',
      dayIdx: 1,
      title: {
        en: 'Manufacturing Sector Braces for Energy Cost Surge',
        ko: '제조업계, 에너지 비용 급등에 비상',
      },
      content: {
        en: 'Industrial manufacturers warned that spiking energy costs will squeeze margins and potentially force temporary production halts. Logistics-heavy sectors face the steepest cost increases.',
        ko: '산업 제조업체들은 에너지 비용 급등이 마진을 압박하고 일시적 생산 중단까지 초래할 수 있다고 경고했다. 물류 비중이 높은 업종이 가장 큰 비용 상승에 직면해 있다.',
      },
      read: false,
      effect: { ECOM: 0.93, TECH: 0.96 },
    },
    {
      id: 'ec-1-3',
      dayIdx: 1,
      title: {
        en: 'Renewable Energy Stocks Rally on Supply Shock',
        ko: '공급 충격에 재생에너지 주 일제히 급등',
      },
      content: {
        en: 'Solar and wind energy companies saw their stocks jump as investors bet the pipeline crisis will accelerate the transition to renewable energy sources.',
        ko: '태양광과 풍력 에너지 기업 주가가 급등했다. 투자자들은 이번 송유관 위기가 재생에너지 전환을 앞당길 것이라고 판단했다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'ec-1-4',
      dayIdx: 1,
      title: {
        en: 'Healthcare Supply Chains Vulnerable to Fuel Shortages',
        ko: '연료 부족으로 의료 공급망도 위험 신호',
      },
      content: {
        en: 'Hospital networks and pharmaceutical distributors reported concerns about fuel-dependent cold-chain logistics for temperature-sensitive medications and vaccines.',
        ko: '병원 네트워크와 제약 유통업체들이 온도 민감 의약품 및 백신의 연료 의존적 콜드체인 물류에 대한 우려를 표명했다.',
      },
      read: false,
      effect: { HEALTH: 0.96 },
    },
    {
      id: 'ec-1-5',
      dayIdx: 1,
      title: {
        en: 'Airlines Cancel Flights Amid Jet Fuel Price Spike',
        ko: '항공유 가격 폭등에 항공사 대규모 결항',
      },
      content: {
        en: 'Major airlines announced widespread flight cancellations as jet fuel prices spiked 40% overnight. Aviation analysts downgraded the sector across the board.',
        ko: '항공유 가격이 하룻밤 사이에 40% 급등하면서 주요 항공사들이 대규모 결항을 발표했다. 항공 애널리스트들은 업종 전반에 걸쳐 투자의견을 하향 조정했다.',
      },
      read: false,
      effect: { AERO: 0.88 },
    },

    // Day 2: Energy prices surge, green energy alternatives boom, manufacturing hit
    {
      id: 'ec-2-1',
      dayIdx: 2,
      title: {
        en: 'Oil Prices Breach Historic Highs as Shortage Deepens',
        ko: '원유 가격, 공급난 심화로 역사적 고점 돌파',
      },
      content: {
        en: 'Crude oil prices broke through the $150-per-barrel mark for the first time as repair crews reported the pipeline damage is far worse than initially assessed.',
        ko: '복구팀이 송유관 피해가 초기 평가보다 훨씬 심각하다고 보고하면서 국제 유가가 사상 처음으로 배럴당 150달러를 돌파했다.',
      },
      read: false,
      effect: { AERO: 0.92, ECOM: 0.94 },
    },
    {
      id: 'ec-2-2',
      dayIdx: 2,
      title: {
        en: 'EcoEnergy Signs Emergency Grid Supply Contracts',
        ko: '에코에너지, 긴급 전력망 공급 계약 체결',
      },
      content: {
        en: 'Governments across three continents signed emergency contracts with renewable energy providers to backfill power generation gaps left by the fossil fuel shortage.',
        ko: '3개 대륙의 정부들이 화석연료 부족으로 발생한 발전 공백을 메우기 위해 재생에너지 공급업체들과 긴급 계약을 체결했다.',
      },
      read: false,
      effect: { GREEN: 1.14 },
    },
    {
      id: 'ec-2-3',
      dayIdx: 2,
      title: {
        en: 'Tech Data Centers Face Power Rationing Threat',
        ko: '기술 기업 데이터센터, 전력 배급 위기에 직면',
      },
      content: {
        en: 'Several governments announced potential power rationing for non-essential industrial consumers. Tech giants with massive data center operations warned of service disruptions.',
        ko: '여러 정부가 비필수 산업 소비자에 대한 전력 배급 가능성을 발표했다. 대규모 데이터센터를 운영하는 기술 대기업들은 서비스 차질을 경고했다.',
      },
      read: false,
      effect: { TECH: 0.91 },
    },
    {
      id: 'ec-2-4',
      dayIdx: 2,
      title: {
        en: 'Pharmaceutical Companies Stockpile Critical Supplies',
        ko: '제약사들, 핵심 원자재 비축에 총력',
      },
      content: {
        en: 'Major pharmaceutical firms began aggressively stockpiling raw materials and securing alternative logistics routes, reassuring investors about supply chain resilience.',
        ko: '주요 제약사들이 원자재를 공격적으로 비축하고 대체 물류 경로를 확보하기 시작하면서 공급망 회복력에 대한 투자자 신뢰가 회복됐다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },
    {
      id: 'ec-2-5',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Delivery Costs Skyrocket on Fuel Surcharges',
        ko: '연료 할증료 폭등에 이커머스 배송비 급상승',
      },
      content: {
        en: 'Logistics providers imposed emergency fuel surcharges of up to 30%, forcing e-commerce platforms to either absorb losses or pass costs to consumers.',
        ko: '물류업체들이 최대 30%의 긴급 연료 할증료를 부과하면서 이커머스 플랫폼들이 손실 감수와 소비자 전가 사이에서 어려운 선택에 몰렸다.',
      },
      read: false,
      effect: { ECOM: 0.90 },
    },

    // Day 3: Government emergency measures, strategic reserves released
    {
      id: 'ec-3-1',
      dayIdx: 3,
      title: {
        en: 'Nations Coordinate Massive Strategic Oil Reserve Release',
        ko: '주요국, 전략 비축유 대규모 공동 방출 결정',
      },
      content: {
        en: 'The US, EU, Japan, and South Korea announced a coordinated release of 200 million barrels from strategic petroleum reserves, the largest such action in history.',
        ko: '미국, EU, 일본, 한국이 전략비축유 2억 배럴을 공동 방출한다고 발표했다. 역사상 최대 규모의 비축유 방출이다.',
      },
      read: false,
      effect: { AERO: 1.06, ECOM: 1.04 },
    },
    {
      id: 'ec-3-2',
      dayIdx: 3,
      title: {
        en: 'Emergency Energy Subsidies Ease Industrial Pressure',
        ko: '긴급 에너지 보조금으로 산업계 부담 완화',
      },
      content: {
        en: 'Governments rolled out emergency energy subsidies for critical industries including healthcare and transportation, helping stabilize operations at key manufacturers.',
        ko: '정부가 헬스케어와 운송 등 핵심 산업에 긴급 에너지 보조금을 지급하면서 주요 제조업체들의 운영이 안정을 되찾기 시작했다.',
      },
      read: false,
      effect: { HEALTH: 1.06, TECH: 1.03 },
    },
    {
      id: 'ec-3-3',
      dayIdx: 3,
      title: {
        en: 'Green Energy Legislation Fast-Tracked Through Congress',
        ko: '친환경 에너지 법안, 의회서 신속 처리 결정',
      },
      content: {
        en: 'Lawmakers fast-tracked a comprehensive green energy infrastructure bill, citing the crisis as proof of over-reliance on fossil fuels. The bill includes $500B in renewable investments.',
        ko: '의원들이 이번 위기를 화석연료 과잉 의존의 증거로 꼽으며 포괄적 친환경 에너지 인프라 법안을 신속 처리하기로 했다. 법안에는 5,000억 달러 규모의 재생에너지 투자가 포함됐다.',
      },
      read: false,
      effect: { GREEN: 1.10 },
    },
    {
      id: 'ec-3-4',
      dayIdx: 3,
      title: {
        en: 'Aerospace Firms Pivot to Fuel-Efficient Aircraft Programs',
        ko: '항공우주 기업, 고연비 항공기 프로그램 전면 전환',
      },
      content: {
        en: 'Major aerospace companies announced accelerated development timelines for next-generation fuel-efficient aircraft, drawing renewed investor interest in the sector.',
        ko: '주요 항공우주 기업들이 차세대 고연비 항공기의 개발 일정을 앞당긴다고 발표하며 업종에 대한 투자자들의 관심이 되살아났다.',
      },
      read: false,
      effect: { AERO: 1.05 },
    },
    {
      id: 'ec-3-5',
      dayIdx: 3,
      title: {
        en: 'Tech Companies Announce Renewable-Powered Data Centers',
        ko: '기술 기업들, 100% 재생에너지 데이터센터 계획 발표',
      },
      content: {
        en: 'Leading tech firms announced aggressive plans to transition all data centers to renewable energy within 18 months, turning the crisis into a long-term cost advantage.',
        ko: '주요 기술 기업들이 18개월 내 모든 데이터센터를 재생에너지로 전환하겠다는 공격적인 계획을 발표하며 이번 위기를 장기적 비용 우위로 전환시키겠다고 선언했다.',
      },
      read: false,
      effect: { TECH: 1.05, GREEN: 1.04 },
    },

    // Day 4: Diplomatic breakthrough with oil-producing nations
    {
      id: 'ec-4-1',
      dayIdx: 4,
      title: {
        en: 'Diplomatic Breakthrough: OPEC+ Agrees to Emergency Output Increase',
        ko: '외교적 돌파구: OPEC+, 긴급 증산 합의',
      },
      content: {
        en: 'After intense diplomatic negotiations, OPEC+ nations agreed to an immediate 3 million barrel-per-day production increase to stabilize global markets.',
        ko: '고강도 외교 협상 끝에 OPEC+ 국가들이 글로벌 시장 안정을 위해 일일 300만 배럴의 즉각적인 증산에 합의했다.',
      },
      read: false,
      effect: { AERO: 1.10, ECOM: 1.07 },
    },
    {
      id: 'ec-4-2',
      dayIdx: 4,
      title: {
        en: 'Oil Prices Retreat Sharply on Supply Relief',
        ko: '공급 안정 기대에 유가 급락',
      },
      content: {
        en: 'Crude oil prices tumbled 20% from their peak as the combined effect of reserve releases and OPEC+ production increases flooded the market with supply.',
        ko: '비축유 방출과 OPEC+ 증산의 복합 효과로 시장에 공급이 넘치면서 국제 유가가 고점 대비 20% 급락했다.',
      },
      read: false,
      effect: { TECH: 1.06, ECOM: 1.05 },
    },
    {
      id: 'ec-4-3',
      dayIdx: 4,
      title: {
        en: 'Airlines Resume Full Schedules, Bookings Surge',
        ko: '항공사 정상 운항 재개, 예약 급증',
      },
      content: {
        en: 'With jet fuel prices normalizing, airlines restored full flight schedules. Pent-up travel demand drove booking volumes to 130% of pre-crisis levels.',
        ko: '항공유 가격이 정상화되면서 항공사들이 전체 운항을 재개했다. 억눌렸던 여행 수요가 폭발해 예약량이 위기 이전 대비 130%에 달했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'ec-4-4',
      dayIdx: 4,
      title: {
        en: 'VitaPharma Reports Minimal Disruption from Energy Crisis',
        ko: '비타파마, 에너지 위기 영향 미미하다고 발표',
      },
      content: {
        en: 'VitaPharma announced that its proactive stockpiling and diversified logistics network allowed it to maintain 98% on-time delivery throughout the crisis.',
        ko: '비타파마는 선제적 비축과 다변화된 물류망 덕분에 위기 기간에도 98%의 정시 배송률을 유지했다고 발표했다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },
    {
      id: 'ec-4-5',
      dayIdx: 4,
      title: {
        en: 'Green Energy Valuations Hit Record on Policy Tailwinds',
        ko: '정책 수혜에 친환경 에너지 밸류에이션 사상 최고치',
      },
      content: {
        en: 'Renewable energy stocks reached all-time high valuations as analysts priced in the permanent policy shift toward clean energy triggered by the crisis.',
        ko: '애널리스트들이 이번 위기로 촉발된 청정에너지 정책의 영구적 전환을 반영하면서 재생에너지 주 밸류에이션이 사상 최고치를 기록했다.',
      },
      read: false,
      effect: { GREEN: 0.97 },
    },

    // Day 5: Market stabilization, green energy policy permanently strengthened
    {
      id: 'ec-5-1',
      dayIdx: 5,
      title: {
        en: 'Markets Rally as Energy Crisis Declared Officially Over',
        ko: '에너지 위기 공식 종결 선언에 시장 전반 랠리',
      },
      content: {
        en: 'The International Energy Agency declared the acute phase of the energy crisis over, citing restored supply levels and stabilized prices across all fuel categories.',
        ko: '국제에너지기구(IEA)가 모든 연료 부문의 공급 회복과 가격 안정을 근거로 에너지 위기의 급성기가 종결됐다고 공식 선언했다.',
      },
      read: false,
      effect: { AERO: 1.05, ECOM: 1.04 },
    },
    {
      id: 'ec-5-2',
      dayIdx: 5,
      title: {
        en: 'Historic Clean Energy Act Signed into Law',
        ko: '역사적 청정에너지법 최종 서명',
      },
      content: {
        en: 'The President signed the most comprehensive clean energy legislation in history, mandating 60% renewable energy by 2035 and allocating unprecedented funding to green infrastructure.',
        ko: '대통령이 2035년까지 재생에너지 비중 60% 의무화와 전례 없는 규모의 녹색 인프라 투자를 담은 역대 최대 규모의 청정에너지 법안에 최종 서명했다.',
      },
      read: false,
      effect: { GREEN: 1.09 },
    },
    {
      id: 'ec-5-3',
      dayIdx: 5,
      title: {
        en: 'Tech Sector Rebounds on Lower Operating Costs',
        ko: '운영비 정상화에 기술주 힘찬 반등',
      },
      content: {
        en: 'Technology companies reported that energy costs have returned to pre-crisis levels while their new renewable energy contracts lock in even lower long-term rates.',
        ko: '기술 기업들은 에너지 비용이 위기 이전 수준으로 복귀했으며 신규 재생에너지 계약으로 장기적으로 더 낮은 요율이 확보됐다고 발표했다.',
      },
      read: false,
      effect: { TECH: 1.07 },
    },
    {
      id: 'ec-5-4',
      dayIdx: 5,
      title: {
        en: 'Healthcare Sector Posts Resilient Quarterly Results',
        ko: '헬스케어 업종, 위기 속에서도 견고한 분기 실적',
      },
      content: {
        en: 'Healthcare companies beat earnings expectations across the board, with analysts praising the sector\'s crisis-proof supply chain management and defensive demand characteristics.',
        ko: '헬스케어 기업들이 일제히 어닝 서프라이즈를 기록했다. 애널리스트들은 위기에도 끄떡없는 공급망 관리와 방어적 수요 특성을 높이 평가했다.',
      },
      read: false,
      effect: { HEALTH: 1.04 },
    },
    {
      id: 'ec-5-5',
      dayIdx: 5,
      title: {
        en: 'Economists: Energy Crisis Accelerated Green Transition by a Decade',
        ko: '경제학자들 "에너지 위기가 녹색 전환 10년 앞당겼다"',
      },
      content: {
        en: 'Leading economists concluded that the crisis permanently shifted global energy policy, estimating the green transition timeline was compressed by roughly ten years.',
        ko: '저명한 경제학자들은 이번 위기가 글로벌 에너지 정책을 영구적으로 바꿨으며, 녹색 전환 일정이 약 10년 앞당겨졌다고 분석했다.',
      },
      read: false,
      effect: { GREEN: 1.06, TECH: 1.03 },
    },
  ],
};
