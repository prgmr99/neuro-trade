import { ClassicScenarioArc } from './classic-arcs';

export const SUPPLY_CHAIN_SHOCK_ARC: ClassicScenarioArc = {
  id: 'supply-chain-shock',
  name: { en: 'Supply Chain Shock', ko: '공급망 대란' },
  news: [
    // Day 1: Mega container ship blocks world's busiest shipping strait
    {
      id: 'scs-1-1',
      dayIdx: 1,
      title: {
        en: 'Mega Container Ship Runs Aground, Blocks Meridian Strait',
        ko: '초대형 컨테이너선 좌초, 메리디안 해협 완전 봉쇄',
      },
      content: {
        en: 'The Ever Horizon, one of the world\'s largest container ships, ran aground in the Meridian Strait, completely blocking the waterway that handles 12% of global trade. Salvage teams have been dispatched but warn the operation could take weeks.',
        ko: '세계 최대 컨테이너선 중 하나인 에버 호라이즌호가 메리디안 해협에서 좌초해 전 세계 무역의 12%가 통과하는 수로를 완전히 차단했다. 구조팀이 투입됐으나 작업에 수주가 걸릴 수 있다고 경고했다.',
      },
      read: false,
      effect: { ECOM: 0.90, AERO: 0.94 },
    },
    {
      id: 'scs-1-2',
      dayIdx: 1,
      title: {
        en: 'Global Shipping Rates Jump on Strait Blockage',
        ko: '해협 봉쇄에 글로벌 해운 운임 급등',
      },
      content: {
        en: 'Spot container shipping rates surged 50% within hours of the blockage announcement as carriers scrambled to reroute vessels around the southern cape, adding 10-14 days to transit times.',
        ko: '봉쇄 발표 수 시간 만에 컨테이너 운임이 50% 급등했다. 선사들이 남쪽 곶으로 우회 항로를 잡으면서 운항 시간이 10~14일 늘어날 전망이다.',
      },
      read: false,
      effect: { ECOM: 0.93 },
    },
    {
      id: 'scs-1-3',
      dayIdx: 1,
      title: {
        en: 'Tech Companies Brace for Component Shortages',
        ko: '기술 기업들, 부품 부족 사태 대비 착수',
      },
      content: {
        en: 'Major technology manufacturers warned that critical semiconductor and display components shipped through the strait face indefinite delays. Several firms activated emergency inventory protocols.',
        ko: '주요 기술 제조업체들은 해협을 통해 운송되는 핵심 반도체와 디스플레이 부품의 지연이 불가피하다고 경고했다. 여러 기업이 비상 재고 프로토콜을 가동했다.',
      },
      read: false,
      effect: { TECH: 0.92 },
    },
    {
      id: 'scs-1-4',
      dayIdx: 1,
      title: {
        en: 'Pharmaceutical Supply Lines Largely Unaffected',
        ko: '제약 공급망, 대부분 영향 없어',
      },
      content: {
        en: 'Major pharmaceutical companies reassured investors that most drug ingredients are transported by air freight rather than sea. Stocks edged higher as the sector was viewed as a safe haven.',
        ko: '주요 제약사들은 대부분의 원료 의약품이 해상이 아닌 항공 화물로 운송된다며 투자자들을 안심시켰다. 안전자산으로 인식되며 주가가 소폭 상승했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },
    {
      id: 'scs-1-5',
      dayIdx: 1,
      title: {
        en: 'Green Energy Firms Face Solar Panel Delivery Delays',
        ko: '친환경 에너지 기업, 태양광 패널 납품 지연 직면',
      },
      content: {
        en: 'Renewable energy installers reported that shipments of solar panels and wind turbine components from overseas factories are stranded behind the blockage. Project timelines face significant pushback.',
        ko: '재생에너지 설치업체들은 해외 공장에서 출발한 태양광 패널과 풍력 터빈 부품이 봉쇄 뒤에 발이 묶였다고 보고했다. 프로젝트 일정이 상당히 지연될 전망이다.',
      },
      read: false,
      effect: { GREEN: 0.92 },
    },

    // Day 2: Global shipping costs surge 400%, manufacturing delays cascade
    {
      id: 'scs-2-1',
      dayIdx: 2,
      title: {
        en: 'Shipping Costs Explode 400% as Blockage Enters Day 3',
        ko: '봉쇄 3일째, 해운 운임 400% 폭등',
      },
      content: {
        en: 'Container shipping rates have now quadrupled from pre-crisis levels as the maritime chokepoint remains blocked. Over 300 vessels are queued on both sides of the strait, creating the worst shipping backup in modern history.',
        ko: '해상 병목 지점이 계속 막혀 있는 가운데 컨테이너 운임이 위기 전 대비 4배로 치솟았다. 해협 양측에 300척 이상의 선박이 대기하며 현대 해운 사상 최악의 적체를 기록했다.',
      },
      read: false,
      effect: { ECOM: 0.88, TECH: 0.94 },
    },
    {
      id: 'scs-2-2',
      dayIdx: 2,
      title: {
        en: 'Auto and Electronics Factories Halt Production Lines',
        ko: '자동차·전자 공장, 생산 라인 가동 중단',
      },
      content: {
        en: 'Just-in-time manufacturing systems buckled as component inventories ran dry. Several major electronics and automobile factories announced temporary production halts across three continents.',
        ko: '적시 생산 시스템이 부품 재고 고갈로 무너졌다. 3개 대륙에서 다수의 대형 전자·자동차 공장이 임시 생산 중단을 발표했다.',
      },
      read: false,
      effect: { TECH: 0.91 },
    },
    {
      id: 'scs-2-3',
      dayIdx: 2,
      title: {
        en: 'Defense Procurement Unaffected by Commercial Disruption',
        ko: '국방 조달, 상업 물류 혼란에 영향 없어',
      },
      content: {
        en: 'Aerospace defense divisions confirmed that military supply chains operate on separate logistics networks with strategic reserves. Defense-related revenues remain fully on track.',
        ko: '항공우주 방위 부문은 군사 공급망이 전략 비축분을 갖춘 별도 물류 네트워크로 운영된다고 확인했다. 방위 관련 매출은 예정대로 진행 중이다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'scs-2-4',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Platforms Warn of Weeks-Long Delivery Delays',
        ko: '이커머스 플랫폼, 수주간 배송 지연 경고',
      },
      content: {
        en: 'Major e-commerce operators issued customer notifications warning of significant delivery delays on imported goods. Some platforms temporarily suspended cross-border shipping guarantees.',
        ko: '주요 이커머스 업체들이 수입품의 상당한 배송 지연을 경고하는 고객 알림을 발송했다. 일부 플랫폼은 일시적으로 국제 배송 보장을 중단했다.',
      },
      read: false,
      effect: { ECOM: 0.92 },
    },
    {
      id: 'scs-2-5',
      dayIdx: 2,
      title: {
        en: 'VitaPharma Expands Air Freight Capacity as Precaution',
        ko: '비타파마, 예방 차원 항공 화물 수송 능력 확대',
      },
      content: {
        en: 'VitaPharma proactively chartered additional cargo aircraft to ensure uninterrupted drug deliveries worldwide. The move was praised by health authorities and boosted investor confidence.',
        ko: '비타파마가 전 세계 의약품 공급 중단 없이 유지하기 위해 선제적으로 화물기를 추가 전세했다. 보건당국의 호평과 함께 투자자 신뢰가 강화됐다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },

    // Day 3: Insurance claims mount, alternative routes add weeks to deliveries
    {
      id: 'scs-3-1',
      dayIdx: 3,
      title: {
        en: 'Maritime Insurance Claims Reach Billions',
        ko: '해상 보험 청구액, 수십억 달러 돌파',
      },
      content: {
        en: 'Insurance companies disclosed that claims related to the blockage have exceeded $4 billion, covering cargo damage, spoilage of perishable goods, and breach-of-contract penalties.',
        ko: '보험사들은 봉쇄 관련 청구액이 화물 손상, 부패성 상품 손실, 계약 위반 위약금 등을 포함해 40억 달러를 초과했다고 공시했다.',
      },
      read: false,
      effect: { ECOM: 0.94, AERO: 0.93 },
    },
    {
      id: 'scs-3-2',
      dayIdx: 3,
      title: {
        en: 'Alternative Shipping Routes Overwhelmed',
        ko: '대체 해운 경로도 한계에 봉착',
      },
      content: {
        en: 'Ships rerouted around the southern cape are now facing congestion at alternative ports. Transit times have increased by an average of 12 days, adding an estimated $1 million per vessel in fuel costs.',
        ko: '남쪽 곶을 우회하는 선박들이 대체 항구에서도 혼잡에 직면하고 있다. 평균 운항 시간이 12일 늘어나며 선박당 약 100만 달러의 추가 연료비가 발생하고 있다.',
      },
      read: false,
      effect: { GREEN: 0.95, TECH: 0.96 },
    },
    {
      id: 'scs-3-3',
      dayIdx: 3,
      title: {
        en: 'Reshoring Debate Ignites in Capital Markets',
        ko: '자본시장에서 리쇼어링 논쟁 본격 점화',
      },
      content: {
        en: 'Investment banks released reports urging companies to diversify supply chains away from single maritime chokepoints. Domestic manufacturing stocks surged on reshoring expectations.',
        ko: '투자은행들이 단일 해상 병목에 대한 공급망 의존도를 줄이라는 보고서를 잇달아 발표했다. 리쇼어링 기대감에 국내 제조 관련주가 급등했다.',
      },
      read: false,
      effect: { TECH: 1.04, GREEN: 1.06 },
    },
    {
      id: 'scs-3-4',
      dayIdx: 3,
      title: {
        en: 'Healthcare Supply Chain Resilience Praised',
        ko: '헬스케어 공급망 회복력, 찬사 받다',
      },
      content: {
        en: 'Industry analysts highlighted that pharmaceutical companies\' investment in redundant supply chains proved prescient during the crisis. Healthcare stocks reached new highs.',
        ko: '산업 분석가들은 제약사들의 이중 공급망 투자가 이번 위기에서 선견지명이었다고 평가했다. 헬스케어 주가가 신고가를 경신했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },
    {
      id: 'scs-3-5',
      dayIdx: 3,
      title: {
        en: 'Aerospace Commercial Division Warns of Delivery Pushbacks',
        ko: '항공우주 민항 부문, 납품 지연 경고',
      },
      content: {
        en: 'While defense operations remain unaffected, the commercial aviation division of major aerospace firms warned that engine and avionics deliveries face 8-week delays due to rerouted shipments.',
        ko: '방위 사업은 영향이 없지만, 대형 항공우주 기업의 민항 부문은 우회 운송으로 엔진과 항공전자 장비 납품이 8주 지연될 수 있다고 경고했다.',
      },
      read: false,
      effect: { AERO: 0.96 },
    },

    // Day 4: Ship freed after 6 days, backlog of hundreds of vessels begins clearing
    {
      id: 'scs-4-1',
      dayIdx: 4,
      title: {
        en: 'Ever Horizon Freed After 6-Day Salvage Operation',
        ko: '에버 호라이즌호, 6일 만에 구조 작업 완료',
      },
      content: {
        en: 'A fleet of tugboats and dredgers successfully freed the stranded mega container ship after a grueling six-day operation. Maritime authorities confirmed two-way traffic will resume within 24 hours.',
        ko: '예인선과 준설선 함대가 6일간의 고된 작업 끝에 좌초된 초대형 컨테이너선의 이초에 성공했다. 해양 당국은 24시간 내 양방향 통행이 재개될 것이라고 확인했다.',
      },
      read: false,
      effect: { ECOM: 1.10, TECH: 1.06 },
    },
    {
      id: 'scs-4-2',
      dayIdx: 4,
      title: {
        en: 'Hundreds of Queued Vessels Begin Transiting Strait',
        ko: '대기 중이던 수백 척의 선박, 해협 통과 시작',
      },
      content: {
        en: 'Over 400 vessels that had been queued began moving through the strait in a carefully managed convoy system. Logistics experts estimate the full backlog will take 10 days to clear.',
        ko: '대기 중이던 400척 이상의 선박이 체계적인 호송 시스템을 통해 해협 통과를 시작했다. 물류 전문가들은 전체 적체 해소에 10일이 소요될 것으로 추산했다.',
      },
      read: false,
      effect: { AERO: 1.07, GREEN: 1.04 },
    },
    {
      id: 'scs-4-3',
      dayIdx: 4,
      title: {
        en: 'Tech Manufacturers Rush to Rebuild Inventories',
        ko: '기술 제조사, 재고 재건에 총력',
      },
      content: {
        en: 'Technology companies placed expedited orders for delayed components, driving a surge in air freight bookings. Production lines are expected to resume full capacity within two weeks.',
        ko: '기술 기업들이 지연된 부품에 대해 긴급 주문을 넣으며 항공 화물 예약이 급증했다. 생산 라인은 2주 내 완전 가동이 재개될 전망이다.',
      },
      read: false,
      effect: { TECH: 1.05 },
    },
    {
      id: 'scs-4-4',
      dayIdx: 4,
      title: {
        en: 'Shipping Rates Begin Sharp Retreat',
        ko: '해운 운임, 급격한 하락세 전환',
      },
      content: {
        en: 'Container shipping spot rates dropped 25% from their crisis peak as the strait reopened. Analysts expect rates to normalize within three weeks as the vessel backlog clears.',
        ko: '해협 재개통과 함께 컨테이너 운임이 위기 최고점 대비 25% 하락했다. 애널리스트들은 선박 적체가 해소되면서 3주 내 운임이 정상화될 것으로 전망했다.',
      },
      read: false,
      effect: { ECOM: 1.06 },
    },
    {
      id: 'scs-4-5',
      dayIdx: 4,
      title: {
        en: 'Pharma Stocks Hold Gains as Crisis Winds Down',
        ko: '위기 마무리 국면에서도 제약주 상승분 유지',
      },
      content: {
        en: 'Healthcare stocks maintained their elevated levels even as the crisis resolved, as investors recognized the sector\'s proven supply chain resilience as a permanent valuation premium.',
        ko: '위기가 해소되는 가운데서도 헬스케어 주가는 높은 수준을 유지했다. 입증된 공급망 회복력이 영구적인 밸류에이션 프리미엄으로 인식됐기 때문이다.',
      },
      read: false,
      effect: { HEALTH: 1.03 },
    },

    // Day 5: Supply chains normalize but reshoring debate intensifies permanently
    {
      id: 'scs-5-1',
      dayIdx: 5,
      title: {
        en: 'Global Supply Chains Return to Near-Normal Operations',
        ko: '글로벌 공급망, 거의 정상 수준으로 복귀',
      },
      content: {
        en: 'Major shipping lines confirmed that schedules are returning to pre-crisis patterns. Retail and manufacturing sectors reported that component and inventory flows have largely stabilized.',
        ko: '주요 선사들이 운항 일정이 위기 이전 수준으로 복귀하고 있다고 확인했다. 유통과 제조 업종은 부품 및 재고 흐름이 대체로 안정됐다고 보고했다.',
      },
      read: false,
      effect: { ECOM: 1.08, TECH: 1.05 },
    },
    {
      id: 'scs-5-2',
      dayIdx: 5,
      title: {
        en: 'Reshoring Investment Wave Announced by Tech Giants',
        ko: '빅테크, 리쇼어링 대규모 투자 계획 발표',
      },
      content: {
        en: 'Three major technology companies announced plans to build domestic manufacturing facilities worth a combined $15 billion, citing the strait blockage as a wake-up call for supply chain diversification.',
        ko: '3개 대형 기술 기업이 해협 봉쇄를 공급망 다변화의 경종으로 삼아 총 150억 달러 규모의 국내 제조 시설 건설 계획을 발표했다.',
      },
      read: false,
      effect: { TECH: 1.08 },
    },
    {
      id: 'scs-5-3',
      dayIdx: 5,
      title: {
        en: 'Green Energy Domestic Manufacturing Gets Policy Boost',
        ko: '친환경 에너지 국내 제조, 정책적 지원 확대',
      },
      content: {
        en: 'Legislators fast-tracked subsidies for domestic solar panel and battery manufacturing, arguing the crisis proved the danger of relying on overseas supply chains for critical energy infrastructure.',
        ko: '의원들이 이번 위기가 핵심 에너지 인프라의 해외 공급망 의존 위험성을 입증했다며 국내 태양광 패널과 배터리 제조 보조금을 신속 처리했다.',
      },
      read: false,
      effect: { GREEN: 1.10 },
    },
    {
      id: 'scs-5-4',
      dayIdx: 5,
      title: {
        en: 'Aerospace Orders Rebound as Logistics Normalize',
        ko: '물류 정상화에 항공우주 수주 반등',
      },
      content: {
        en: 'Aerospace manufacturers reported that delayed component shipments are now arriving and production schedules have been restored. New commercial jet orders exceeded pre-crisis levels.',
        ko: '항공우주 제조업체들은 지연됐던 부품이 도착하기 시작하며 생산 일정이 복구됐다고 보고했다. 신규 상업용 항공기 수주가 위기 이전 수준을 넘어섰다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'scs-5-5',
      dayIdx: 5,
      title: {
        en: 'Markets Close Crisis Week with Optimistic Outlook',
        ko: '시장, 위기의 한 주를 낙관적 전망으로 마감',
      },
      content: {
        en: 'Economists noted that while the supply chain crisis caused short-term disruption, the reshoring and diversification investments it triggered will strengthen the global economy long-term.',
        ko: '경제학자들은 공급망 위기가 단기적 혼란을 야기했지만, 이를 계기로 촉발된 리쇼어링과 다변화 투자가 장기적으로 세계 경제를 강화할 것이라고 평가했다.',
      },
      read: false,
      effect: { HEALTH: 1.04, ECOM: 1.03 },
    },
  ],
};
