import { ClassicScenarioArc } from './classic-arcs';

export const NUCLEAR_DISASTER_ARC: ClassicScenarioArc = {
  id: 'nuclear-disaster',
  name: { en: 'Nuclear Disaster', ko: '원전 사고' },
  news: [
    // Day 1: Massive earthquake triggers nuclear plant meltdown
    {
      id: 'nd-1-1',
      dayIdx: 1,
      title: {
        en: 'Magnitude 9.1 Earthquake Triggers Reactor Meltdown in Torano',
        ko: '규모 9.1 대지진, 토라노 원전 노심용융 유발',
      },
      content: {
        en: 'A devastating magnitude 9.1 earthquake struck the industrial heartland of Torano, triggering a reactor meltdown at the Kasumi Nuclear Power Station. Authorities declared a 30-kilometer exclusion zone as radiation levels climbed above safe thresholds.',
        ko: '토라노 산업 중심지를 강타한 규모 9.1의 대지진이 카스미 원자력 발전소에서 노심용융을 유발했다. 방사선 수치가 안전 기준을 넘어서면서 당국이 반경 30km 출입금지 구역을 선포했다.',
      },
      read: false,
      effect: { GREEN: 1.10 },
    },
    {
      id: 'nd-1-2',
      dayIdx: 1,
      title: {
        en: 'Aviation Halted Across East Meridian Region',
        ko: '동부 메리디안 지역 전 항공편 운항 중단',
      },
      content: {
        en: 'Civil aviation authorities grounded all flights within 500 kilometers of the disaster zone due to radiation concerns. Airlines reported immediate cancellation of over 2,000 daily flights, devastating regional air travel.',
        ko: '민간 항공 당국이 방사선 우려로 재난 지역 반경 500km 내 모든 항공편 운항을 중단시켰다. 항공사들은 일일 2,000편 이상의 즉시 결항을 보고하며 역내 항공 여행이 마비됐다.',
      },
      read: false,
      effect: { AERO: 0.87 },
    },
    {
      id: 'nd-1-3',
      dayIdx: 1,
      title: {
        en: 'Global Supply Chains Severed by Torano Factory Shutdowns',
        ko: '토라노 공장 가동 중단에 글로벌 공급망 단절',
      },
      content: {
        en: 'Hundreds of factories in the Torano industrial corridor shut down, severing supply chains for electronics, automotive, and precision manufacturing. NeoTech Industries warned of critical component shortages within two weeks.',
        ko: '토라노 산업 회랑의 수백 개 공장이 가동을 중단하면서 전자, 자동차, 정밀 제조 공급망이 단절됐다. 네오텍 인더스트리즈는 2주 내 핵심 부품 부족 사태를 경고했다.',
      },
      read: false,
      effect: { TECH: 0.89 },
    },
    {
      id: 'nd-1-4',
      dayIdx: 1,
      title: {
        en: 'Healthcare Stocks Surge on Emergency Response Demand',
        ko: '긴급 대응 수요에 헬스케어주 급등',
      },
      content: {
        en: 'Pharmaceutical and medical equipment companies surged as governments placed massive orders for radiation treatment drugs, protective equipment, and diagnostic devices. VitaPharma\'s radiation therapy division received emergency procurement contracts.',
        ko: '정부들이 방사선 치료약, 보호 장비, 진단 기기를 대량 주문하면서 제약·의료기기 기업 주가가 급등했다. 비타파마의 방사선 치료 사업부가 긴급 조달 계약을 수주했다.',
      },
      read: false,
      effect: { HEALTH: 1.12 },
    },
    {
      id: 'nd-1-5',
      dayIdx: 1,
      title: {
        en: 'E-Commerce Disrupted by Torano Logistics Hub Damage',
        ko: '토라노 물류 허브 피해에 이커머스 차질',
      },
      content: {
        en: 'The earthquake destroyed key logistics infrastructure in the Torano region, disrupting e-commerce fulfillment networks across the continent. GlobalMart suspended next-day delivery guarantees for an indefinite period.',
        ko: '대지진이 토라노 지역의 핵심 물류 인프라를 파괴하면서 대륙 전역의 이커머스 배송 네트워크에 차질이 빚어졌다. 글로벌마트가 무기한으로 익일 배송 보장을 중단했다.',
      },
      read: false,
      effect: { ECOM: 0.91 },
    },

    // Day 2: Radiation fears, energy policy questioned
    {
      id: 'nd-2-1',
      dayIdx: 2,
      title: {
        en: 'Radiation Plume Detected 200km from Kasumi Plant',
        ko: '카스미 원전에서 200km 떨어진 곳에서 방사능 검출',
      },
      content: {
        en: 'Monitoring stations detected elevated radiation levels 200 kilometers from the Kasumi plant, far exceeding initial containment projections. The expanded contamination zone triggered mass evacuations affecting 3 million residents.',
        ko: '카스미 원전에서 200km 떨어진 관측소에서 초기 차단 예상을 크게 초과하는 방사선 수치가 감지됐다. 오염 구역 확대로 300만 주민에 영향을 미치는 대규모 대피가 시작됐다.',
      },
      read: false,
      effect: { AERO: 0.90 },
    },
    {
      id: 'nd-2-2',
      dayIdx: 2,
      title: {
        en: 'Nations Worldwide Announce Nuclear Safety Reviews',
        ko: '전 세계 원전 안전성 재점검 돌입',
      },
      content: {
        en: 'Over 30 nations ordered immediate safety reviews of their nuclear power plants. Several countries announced preliminary plans to accelerate nuclear phase-outs, sending renewable energy stocks soaring on expected demand shifts.',
        ko: '30개국 이상이 자국 원자력 발전소에 대한 즉각적인 안전성 검토를 지시했다. 일부 국가들이 원전 폐기 가속화 예비 계획을 발표하면서 수요 변화 기대에 재생에너지 주가가 급등했다.',
      },
      read: false,
      effect: { GREEN: 1.12 },
    },
    {
      id: 'nd-2-3',
      dayIdx: 2,
      title: {
        en: 'Tech Manufacturing Exodus Begins from Torano Region',
        ko: '기술 제조업, 토라노 지역 이탈 시작',
      },
      content: {
        en: 'Major technology manufacturers announced plans to relocate production away from the contaminated Torano corridor. The transition will take months and cost billions, creating prolonged component supply uncertainty.',
        ko: '주요 기술 제조업체들이 오염된 토라노 회랑에서 생산 시설을 이전하겠다는 계획을 발표했다. 수개월의 기간과 수십억 달러의 비용이 소요되며 장기적 부품 공급 불확실성이 예상된다.',
      },
      read: false,
      effect: { TECH: 0.92 },
    },
    {
      id: 'nd-2-4',
      dayIdx: 2,
      title: {
        en: 'VitaPharma Deploys Emergency Medical Teams',
        ko: '비타파마, 긴급 의료팀 현장 투입',
      },
      content: {
        en: 'VitaPharma deployed 500 medical professionals and mobile diagnostic units to the disaster zone under a government emergency contract. The company\'s stock rose further as its crisis response capabilities drew international praise.',
        ko: '비타파마가 정부 긴급 계약에 따라 500명의 의료 전문인력과 이동식 진단 장비를 재난 지역에 투입했다. 위기 대응 역량이 국제적 찬사를 받으면서 주가가 추가 상승했다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },
    {
      id: 'nd-2-5',
      dayIdx: 2,
      title: {
        en: 'Online Retailers Reroute Logistics Around Disaster Zone',
        ko: '온라인 유통, 재난 지역 우회 물류 가동',
      },
      content: {
        en: 'E-commerce platforms activated contingency logistics networks to bypass the Torano region. The workaround added 3-5 days to delivery times but prevented a complete fulfillment shutdown across the continent.',
        ko: '이커머스 플랫폼들이 토라노 지역을 우회하는 비상 물류 네트워크를 가동했다. 배송 기간이 3~5일 추가됐지만 대륙 전역의 배송 완전 마비는 방지할 수 있었다.',
      },
      read: false,
      effect: { ECOM: 1.03 },
    },

    // Day 3: Nuclear phase-out plans, green energy surges
    {
      id: 'nd-3-1',
      dayIdx: 3,
      title: {
        en: 'Five Major Economies Announce Nuclear Phase-Out by 2035',
        ko: '주요 5개국, 2035년까지 탈원전 선언',
      },
      content: {
        en: 'Five of the world\'s top ten economies announced binding commitments to phase out nuclear power by 2035, representing a seismic shift in global energy policy. The combined capacity gap of 180GW must be filled by alternative sources.',
        ko: '세계 10대 경제대국 중 5개국이 2035년까지 원자력 발전을 단계적으로 폐지하겠다는 구속력 있는 약속을 발표하며 글로벌 에너지 정책에 지각 변동을 일으켰다. 합산 180GW의 용량 공백을 대체 에너지원으로 채워야 한다.',
      },
      read: false,
      effect: { GREEN: 1.14 },
    },
    {
      id: 'nd-3-2',
      dayIdx: 3,
      title: {
        en: 'Aerospace Firms Develop Radiation Monitoring Drones',
        ko: '항공우주 기업, 방사선 모니터링 드론 개발 착수',
      },
      content: {
        en: 'AeroSpace Dynamics received fast-tracked government contracts to develop autonomous drones for radiation monitoring and disaster assessment. The pivot to emergency technology applications partially offset the aviation downturn.',
        ko: '에어로스페이스 다이내믹스가 방사선 모니터링 및 재난 평가용 자율 드론 개발을 위한 정부 긴급 계약을 수주했다. 비상 기술 활용으로의 전환이 항공 산업 침체를 일부 상쇄했다.',
      },
      read: false,
      effect: { AERO: 1.05 },
    },
    {
      id: 'nd-3-3',
      dayIdx: 3,
      title: {
        en: 'Tech Sector Finds Silver Lining in Relocation Wave',
        ko: '기술 업종, 생산 이전 물결 속 호재 발견',
      },
      content: {
        en: 'Technology analysts noted that factory relocations away from Torano are accelerating automation investments. NeoTech Industries announced a next-generation smart factory initiative that could ultimately lower production costs by 15%.',
        ko: '기술 분석가들은 토라노 이탈 공장 이전이 자동화 투자를 가속화시키고 있다고 지적했다. 네오텍 인더스트리즈가 궁극적으로 생산 비용을 15% 낮출 수 있는 차세대 스마트 팩토리 구상을 발표했다.',
      },
      read: false,
      effect: { TECH: 1.04 },
    },
    {
      id: 'nd-3-4',
      dayIdx: 3,
      title: {
        en: 'Decontamination Demand Drives Healthcare Higher',
        ko: '제염 수요 급증에 헬스케어 추가 상승',
      },
      content: {
        en: 'The massive decontamination effort generated unprecedented demand for specialized pharmaceutical products and medical monitoring equipment. VitaPharma\'s environmental health division reported order backlogs stretching into next year.',
        ko: '대규모 제염 작업이 특수 의약품과 의료 모니터링 장비에 대한 전례 없는 수요를 창출했다. 비타파마 환경보건 사업부는 내년까지 이어지는 주문 적체를 보고했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'nd-3-5',
      dayIdx: 3,
      title: {
        en: 'E-Commerce Adapts with New Regional Fulfillment Centers',
        ko: '이커머스, 신규 지역 물류센터로 적응',
      },
      content: {
        en: 'Major e-commerce platforms announced emergency construction of new fulfillment centers outside the contamination zone. GlobalMart committed $2 billion to build redundant logistics infrastructure within six months.',
        ko: '주요 이커머스 플랫폼들이 오염 구역 외부에 신규 물류센터 긴급 건설을 발표했다. 글로벌마트가 6개월 내 이중화 물류 인프라 구축에 20억 달러를 투입하겠다고 약속했다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },

    // Day 4: Containment progress, healthcare stocks rally
    {
      id: 'nd-4-1',
      dayIdx: 4,
      title: {
        en: 'Kasumi Reactor Containment Breakthrough Achieved',
        ko: '카스미 원전 격납 작업 돌파구 마련',
      },
      content: {
        en: 'Engineers achieved a critical breakthrough in containing the Kasumi reactor, successfully sealing the primary containment vessel. Radiation levels in the exclusion zone began dropping for the first time since the disaster.',
        ko: '기술진이 카스미 원자로 격납에서 결정적 돌파구를 마련하며 1차 격납 용기 밀봉에 성공했다. 출입금지 구역의 방사선 수치가 사고 이후 처음으로 하락하기 시작했다.',
      },
      read: false,
      effect: { TECH: 1.06, AERO: 1.06 },
    },
    {
      id: 'nd-4-2',
      dayIdx: 4,
      title: {
        en: 'Healthcare Stocks Rally on Long-Term Monitoring Contracts',
        ko: '장기 모니터링 계약에 헬스케어주 랠리',
      },
      content: {
        en: 'Governments awarded 20-year health monitoring contracts to pharmaceutical companies for ongoing radiation exposure tracking of affected populations. VitaPharma secured the largest contract worth $4.5 billion over two decades.',
        ko: '정부들이 피폭 주민의 지속적인 방사선 노출 추적을 위해 제약사들에 20년 장기 건강 모니터링 계약을 발주했다. 비타파마가 20년간 45억 달러 규모의 최대 계약을 확보했다.',
      },
      read: false,
      effect: { HEALTH: 1.09 },
    },
    {
      id: 'nd-4-3',
      dayIdx: 4,
      title: {
        en: 'Renewable Energy Investment Pledges Reach $2 Trillion',
        ko: '재생에너지 투자 약속, 2조 달러 돌파',
      },
      content: {
        en: 'Cumulative government and private-sector commitments to renewable energy investment surpassed $2 trillion as the nuclear phase-out accelerated. EcoEnergy Corp announced plans to triple its solar panel production capacity.',
        ko: '탈원전이 가속화되면서 정부 및 민간 부문의 재생에너지 투자 약속 누적액이 2조 달러를 돌파했다. 에코에너지가 태양광 패널 생산 능력을 3배로 확대하겠다는 계획을 발표했다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'nd-4-4',
      dayIdx: 4,
      title: {
        en: 'Regional Air Travel Partially Resumes',
        ko: '역내 항공 운항 부분 재개',
      },
      content: {
        en: 'Aviation authorities reopened airspace outside the reduced exclusion zone, allowing roughly 60% of regional flights to resume. Airlines reported immediate booking surges as pent-up travel demand was released.',
        ko: '항공 당국이 축소된 출입금지 구역 외부 영공을 개방하며 역내 항공편의 약 60%가 운항을 재개했다. 억눌린 여행 수요가 분출하면서 항공사들은 즉각적인 예약 급증을 보고했다.',
      },
      read: false,
      effect: { AERO: 1.04 },
    },
    {
      id: 'nd-4-5',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Recovery Accelerates on New Infrastructure',
        ko: '신규 인프라에 이커머스 회복 가속',
      },
      content: {
        en: 'The new fulfillment centers outside the disaster zone came online ahead of schedule, restoring near-normal delivery capabilities. GlobalMart reinstated its delivery guarantees for 85% of its service area.',
        ko: '재난 지역 외부의 신규 물류센터가 예정보다 빠르게 가동을 시작하며 거의 정상 수준의 배송 역량을 회복했다. 글로벌마트가 서비스 지역의 85%에서 배송 보장을 재개했다.',
      },
      read: false,
      effect: { ECOM: 1.06 },
    },

    // Day 5: Energy policy permanently shifted, reconstruction boom
    {
      id: 'nd-5-1',
      dayIdx: 5,
      title: {
        en: 'Global Energy Accord Permanently Shifts to Renewables',
        ko: '글로벌 에너지 협약, 재생에너지로 영구 전환',
      },
      content: {
        en: 'Forty-two nations signed a binding Global Energy Accord committing to 80% renewable energy by 2040. The agreement, directly catalyzed by the Kasumi disaster, represents the most ambitious clean energy commitment in history.',
        ko: '42개국이 2040년까지 재생에너지 비중 80%를 약속하는 구속력 있는 글로벌 에너지 협약에 서명했다. 카스미 사고가 직접 촉발한 이 합의는 역사상 가장 야심 찬 청정에너지 약속이다.',
      },
      read: false,
      effect: { GREEN: 1.13 },
    },
    {
      id: 'nd-5-2',
      dayIdx: 5,
      title: {
        en: 'Massive Reconstruction Program Lifts All Sectors',
        ko: '대규모 재건 프로그램, 전 업종 견인',
      },
      content: {
        en: 'Torano announced a $300 billion reconstruction program spanning infrastructure, housing, and industrial facilities. The program\'s scale and multi-year timeline are expected to provide sustained economic stimulus across the region.',
        ko: '토라노가 인프라, 주택, 산업 시설을 아우르는 3,000억 달러 규모의 재건 프로그램을 발표했다. 대규모 다년간 사업이 역내 경제에 지속적인 부양 효과를 제공할 전망이다.',
      },
      read: false,
      effect: { TECH: 1.09, ECOM: 1.07 },
    },
    {
      id: 'nd-5-3',
      dayIdx: 5,
      title: {
        en: 'Aerospace Wins Disaster Response Fleet Contracts',
        ko: '항공우주, 재난 대응 항공단 계약 수주',
      },
      content: {
        en: 'AeroSpace Dynamics secured contracts to build a permanent fleet of disaster-response aircraft and monitoring drones. The multi-billion-dollar program establishes the company as a leader in emergency aviation technology.',
        ko: '에어로스페이스 다이내믹스가 상설 재난 대응 항공기 및 모니터링 드론 편대를 구축하는 계약을 수주했다. 수십억 달러 규모의 프로그램으로 비상 항공 기술 분야 선도 기업 지위를 확립했다.',
      },
      read: false,
      effect: { AERO: 1.10 },
    },
    {
      id: 'nd-5-4',
      dayIdx: 5,
      title: {
        en: 'VitaPharma Establishes Global Radiation Medicine Center',
        ko: '비타파마, 글로벌 방사선 의학 센터 설립',
      },
      content: {
        en: 'VitaPharma announced the establishment of a global center of excellence for radiation medicine, funded by government grants and private investment. The initiative positions the company as the world leader in nuclear emergency healthcare.',
        ko: '비타파마가 정부 보조금과 민간 투자를 기반으로 방사선 의학 글로벌 센터 오브 엑설런스 설립을 발표했다. 이 사업으로 원자력 비상 의료 분야에서 세계 선도 기업으로서의 입지를 굳혔다.',
      },
      read: false,
      effect: { HEALTH: 1.08 },
    },
    {
      id: 'nd-5-5',
      dayIdx: 5,
      title: {
        en: 'Markets Close at Record Highs on Reconstruction Optimism',
        ko: '재건 낙관론에 시장 사상 최고치 마감',
      },
      content: {
        en: 'Global markets closed at record highs as investors priced in the transformative reconstruction spending and energy transition. Economists noted that the tragedy, while devastating, has catalyzed a new era of sustainable economic growth.',
        ko: '투자자들이 변혁적 재건 지출과 에너지 전환을 반영하면서 글로벌 시장이 사상 최고치로 마감했다. 경제학자들은 이번 비극이 파괴적이었지만 지속 가능한 경제 성장의 새 시대를 촉발했다고 평가했다.',
      },
      read: false,
      effect: { TECH: 1.04, GREEN: 1.05, ECOM: 1.03 },
    },
  ],
};
