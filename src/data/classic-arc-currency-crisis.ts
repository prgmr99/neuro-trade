import { ClassicScenarioArc } from './classic-arcs';

export const CURRENCY_CRISIS_ARC: ClassicScenarioArc = {
  id: 'currency-crisis',
  name: { en: 'Currency Crisis', ko: '외환 위기' },
  news: [
    // Day 1: Major emerging economy abandons currency peg
    {
      id: 'cc-1-1',
      dayIdx: 1,
      title: {
        en: 'Vantara Abandons Currency Peg, Won Plunges 30% Overnight',
        ko: '반타라, 환율 고정 포기… 자국 통화 하룻밤 새 30% 폭락',
      },
      content: {
        en: 'The Central Bank of Vantara shocked global markets by abandoning its decade-old currency peg to the dollar, triggering a 30% devaluation overnight. Foreign reserves had been secretly depleted defending the unsustainable peg for months.',
        ko: '반타라 중앙은행이 10년간 유지해온 달러 고정환율제를 전격 포기하며 하룻밤 새 자국 통화 가치가 30% 폭락했다. 지속 불가능한 환율 방어로 외환보유고가 수개월간 비밀리에 고갈된 것으로 밝혀졌다.',
      },
      read: false,
      effect: { TECH: 0.90, ECOM: 0.89 },
    },
    {
      id: 'cc-1-2',
      dayIdx: 1,
      title: {
        en: 'Export-Dependent Tech Firms Face Revenue Shock',
        ko: '수출 의존 기술 기업, 매출 충격 직면',
      },
      content: {
        en: 'Technology companies with significant operations in Vantara warned of severe revenue impacts as the currency collapse erased profit margins on local contracts. NeoTech Industries disclosed that 18% of its revenue originates from the affected region.',
        ko: '반타라에 대규모 사업을 운영하는 기술 기업들이 통화 붕괴로 현지 계약 이익률이 소멸하면서 심각한 매출 타격을 경고했다. 네오텍 인더스트리즈는 매출의 18%가 피해 지역에서 발생한다고 공시했다.',
      },
      read: false,
      effect: { TECH: 0.91 },
    },
    {
      id: 'cc-1-3',
      dayIdx: 1,
      title: {
        en: 'E-Commerce Cross-Border Sales Collapse in Region',
        ko: '역내 국경간 이커머스 거래 붕괴',
      },
      content: {
        en: 'Cross-border e-commerce transactions plummeted as Vantaran consumers lost 30% of their purchasing power overnight. GlobalMart reported a 65% drop in regional orders within the first 12 hours of the devaluation.',
        ko: '반타라 소비자들의 구매력이 하룻밤 새 30% 감소하면서 국경간 이커머스 거래가 급감했다. 글로벌마트는 평가절하 후 12시간 만에 역내 주문이 65% 감소했다고 보고했다.',
      },
      read: false,
      effect: { ECOM: 0.91 },
    },
    {
      id: 'cc-1-4',
      dayIdx: 1,
      title: {
        en: 'Aerospace Contracts Denominated in Dollars Hold Firm',
        ko: '달러 표시 항공우주 계약, 안정세 유지',
      },
      content: {
        en: 'Defense and aerospace companies reported minimal direct impact as their contracts are predominantly dollar-denominated. AeroSpace Dynamics confirmed all existing procurement agreements remain unaffected by the Vantaran currency collapse.',
        ko: '방위·항공우주 기업들은 계약 대부분이 달러 표시여서 직접적 영향이 미미하다고 보고했다. 에어로스페이스 다이내믹스는 기존 조달 계약이 반타라 통화 붕괴에 영향받지 않는다고 확인했다.',
      },
      read: false,
      effect: { AERO: 1.04 },
    },
    {
      id: 'cc-1-5',
      dayIdx: 1,
      title: {
        en: 'Healthcare Stocks Surge on Safe-Haven Flows',
        ko: '안전자산 이동에 헬스케어주 급등',
      },
      content: {
        en: 'Investors rotated aggressively into pharmaceutical stocks as the currency crisis heightened global uncertainty. VitaPharma\'s domestically-focused revenue profile made it a top pick for portfolio protection.',
        ko: '외환 위기가 글로벌 불확실성을 키우면서 투자자들이 제약주로 공격적으로 자금을 이동시켰다. 비타파마의 내수 중심 매출 구조가 포트폴리오 방어 최우선 종목으로 부각됐다.',
      },
      read: false,
      effect: { HEALTH: 1.08 },
    },

    // Day 2: Contagion spreads to neighboring economies
    {
      id: 'cc-2-1',
      dayIdx: 2,
      title: {
        en: 'Currency Contagion Sweeps Three Neighboring Economies',
        ko: '통화 위기 전염, 인접 3개국 덮쳐',
      },
      content: {
        en: 'The currencies of Kaspia, Nordelia, and Sethos fell 12-18% as speculators attacked emerging-market currencies across the region. Central banks burned through billions in reserves attempting to defend their exchange rates.',
        ko: '투기 세력이 역내 신흥국 통화를 공격하면서 카스피아, 노르델리아, 세토스 통화가 12~18% 급락했다. 각국 중앙은행이 환율 방어를 위해 수십억 달러의 외환보유고를 소진했다.',
      },
      read: false,
      effect: { TECH: 0.92, ECOM: 0.90 },
    },
    {
      id: 'cc-2-2',
      dayIdx: 2,
      title: {
        en: 'Global Shipping Lines Demand Dollar Payments Only',
        ko: '글로벌 해운사, 달러 결제만 수용 선언',
      },
      content: {
        en: 'Major international shipping companies announced they would only accept dollar-denominated payments for routes serving the affected region. The policy shift added immediate cost pressure to manufacturers and retailers with regional supply chains.',
        ko: '주요 국제 해운사들이 피해 지역 경유 노선에 대해 달러 표시 결제만 수용하겠다고 발표했다. 이 정책 변화가 역내 공급망을 가진 제조업체와 유통업체에 즉각적 비용 압박을 가했다.',
      },
      read: false,
      effect: { ECOM: 0.93 },
    },
    {
      id: 'cc-2-3',
      dayIdx: 2,
      title: {
        en: 'Green Energy Projects Stalled by Financing Freeze',
        ko: '자금 동결에 친환경 에너지 프로젝트 중단',
      },
      content: {
        en: 'Several large-scale renewable energy projects in the affected region were suspended as international lenders froze project financing. EcoEnergy Corp delayed two solar farm developments citing unacceptable currency risk.',
        ko: '국제 대출기관들이 프로젝트 파이낸싱을 동결하면서 피해 지역의 대규모 재생에너지 사업 다수가 중단됐다. 에코에너지가 감수할 수 없는 환율 리스크를 이유로 태양광 발전 단지 2곳의 개발을 연기했다.',
      },
      read: false,
      effect: { GREEN: 0.93 },
    },
    {
      id: 'cc-2-4',
      dayIdx: 2,
      title: {
        en: 'Defense Budgets Untouched as Security Concerns Rise',
        ko: '안보 우려 고조에 국방 예산 유지',
      },
      content: {
        en: 'Regional governments reaffirmed defense spending commitments despite the economic turmoil, citing heightened security risks from currency-driven social instability. Aerospace stocks held steady on the guaranteed revenue floor.',
        ko: '역내 정부들이 통화 불안에 따른 사회 불안정의 안보 위험 고조를 이유로 경제 혼란에도 국방비 지출 약속을 재확인했다. 항공우주주가 보장된 매출 하한에 힘입어 안정세를 유지했다.',
      },
      read: false,
      effect: { AERO: 1.03 },
    },
    {
      id: 'cc-2-5',
      dayIdx: 2,
      title: {
        en: 'Pharma Sector Becomes Most Crowded Defensive Trade',
        ko: '제약 업종, 가장 혼잡한 방어적 트레이드로 부상',
      },
      content: {
        en: 'Fund managers reported record overweight positions in healthcare stocks as the currency crisis expanded. Analysts warned that the crowded trade could lead to a sharp reversal once the crisis stabilizes.',
        ko: '외환 위기 확산에 펀드 매니저들의 헬스케어주 비중 확대가 사상 최대를 기록했다. 애널리스트들은 과도하게 쏠린 거래가 위기 안정 시 급격한 되돌림을 초래할 수 있다고 경고했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },

    // Day 3: International monetary fund emergency stabilization
    {
      id: 'cc-3-1',
      dayIdx: 3,
      title: {
        en: 'Global Monetary Authority Deploys $120B Stabilization Package',
        ko: '글로벌 통화 기구, 1,200억 달러 안정화 패키지 투입',
      },
      content: {
        en: 'The Global Monetary Authority announced a $120 billion emergency stabilization package for the affected nations, conditional on structural economic reforms. Currency markets immediately rallied on the intervention announcement.',
        ko: '글로벌 통화 기구가 구조적 경제 개혁을 조건으로 피해국에 1,200억 달러의 긴급 안정화 패키지를 발표했다. 개입 발표에 외환시장이 즉각 반등했다.',
      },
      read: false,
      effect: { TECH: 1.06, ECOM: 1.07 },
    },
    {
      id: 'cc-3-2',
      dayIdx: 3,
      title: {
        en: 'Currency Speculators Retreat After Intervention',
        ko: '개입 후 환율 투기 세력 후퇴',
      },
      content: {
        en: 'Speculative short positions against regional currencies were unwound rapidly as the stabilization package removed the profit opportunity. Vantara\'s currency recovered 12% from its post-peg low in a single trading session.',
        ko: '안정화 패키지가 수익 기회를 제거하면서 역내 통화에 대한 투기적 공매도 포지션이 빠르게 청산됐다. 반타라 통화가 단일 거래 세션에서 고정환율 포기 후 저점 대비 12% 회복했다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },
    {
      id: 'cc-3-3',
      dayIdx: 3,
      title: {
        en: 'Green Energy Financing Resumes on IMF Guarantees',
        ko: '통화 기구 보증에 친환경 에너지 파이낸싱 재개',
      },
      content: {
        en: 'International lenders resumed project financing for renewable energy developments after the Global Monetary Authority provided currency risk guarantees. EcoEnergy Corp reactivated its suspended solar farm projects.',
        ko: '글로벌 통화 기구가 환율 리스크 보증을 제공하면서 국제 대출기관들이 재생에너지 개발 프로젝트 파이낸싱을 재개했다. 에코에너지가 중단됐던 태양광 발전 단지 프로젝트를 재가동했다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'cc-3-4',
      dayIdx: 3,
      title: {
        en: 'Aerospace Benefits from Regional Security Upgrades',
        ko: '역내 안보 강화에 항공우주 수혜',
      },
      content: {
        en: 'The stabilization package included provisions for enhanced regional security infrastructure. AeroSpace Dynamics won preliminary approval for radar systems and coastal patrol aircraft orders from three nations.',
        ko: '안정화 패키지에 역내 안보 인프라 강화 조항이 포함됐다. 에어로스페이스 다이내믹스가 3개국으로부터 레이더 시스템과 해안 초계기 주문에 대한 예비 승인을 획득했다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'cc-3-5',
      dayIdx: 3,
      title: {
        en: 'Healthcare Stocks Flat as Defensive Rotation Pauses',
        ko: '방어적 자금 이동 멈추며 헬스케어주 횡보',
      },
      content: {
        en: 'Pharmaceutical stocks traded flat as the stabilization package reduced the need for defensive positioning. Analysts noted that VitaPharma remains fairly valued despite the pause in safe-haven inflows.',
        ko: '안정화 패키지가 방어적 포지셔닝 필요성을 줄이면서 제약주가 횡보했다. 애널리스트들은 안전자산 유입이 멈추었음에도 비타파마의 밸류에이션이 적정하다고 평가했다.',
      },
      read: false,
      effect: { HEALTH: 1.01 },
    },

    // Day 4: Capital controls, defensive sectors outperform
    {
      id: 'cc-4-1',
      dayIdx: 4,
      title: {
        en: 'Vantara Imposes Strict Capital Controls',
        ko: '반타라, 엄격한 자본 통제 시행',
      },
      content: {
        en: 'Vantara imposed temporary capital controls limiting foreign currency outflows to prevent further reserve depletion. While controversial, economists noted the measure successfully halted the currency\'s decline and buying time for reforms.',
        ko: '반타라가 추가 외환보유고 유출 방지를 위해 외화 유출을 제한하는 임시 자본 통제를 시행했다. 논란에도 불구하고 경제학자들은 이 조치가 통화 하락을 성공적으로 저지하고 개혁 시간을 벌었다고 평가했다.',
      },
      read: false,
      effect: { TECH: 1.03 },
    },
    {
      id: 'cc-4-2',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Pivots to Local Currency Pricing Models',
        ko: '이커머스, 현지 통화 가격 모델로 전환',
      },
      content: {
        en: 'GlobalMart introduced dynamic local currency pricing to restore competitiveness in affected markets. The strategy sacrificed short-term margins but preserved market share and customer relationships for the long run.',
        ko: '글로벌마트가 피해 시장 경쟁력 회복을 위해 현지 통화 동적 가격 책정을 도입했다. 단기 마진을 희생하지만 장기적으로 시장 점유율과 고객 관계를 보전하는 전략이다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },
    {
      id: 'cc-4-3',
      dayIdx: 4,
      title: {
        en: 'Green Energy Sector Upgraded on Reform Agenda',
        ko: '개혁 의제에 친환경 에너지 업종 등급 상향',
      },
      content: {
        en: 'The structural reform conditions attached to the stabilization package include mandatory clean energy transitions for recipient nations. Analysts upgraded the renewable energy sector citing a guaranteed multi-decade demand pipeline.',
        ko: '안정화 패키지의 구조 개혁 조건에 수혜국의 청정에너지 전환 의무가 포함됐다. 애널리스트들이 수십 년간 보장된 수요 파이프라인을 근거로 재생에너지 업종 등급을 상향했다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'cc-4-4',
      dayIdx: 4,
      title: {
        en: 'Defense Contractors Win Border Security Contracts',
        ko: '방위 계약업체, 국경 보안 계약 수주',
      },
      content: {
        en: 'Three nations in the crisis zone awarded accelerated border security contracts to aerospace firms amid concerns about smuggling and capital flight. AeroSpace Dynamics secured surveillance drone orders worth $800 million.',
        ko: '위기 지역 3개국이 밀수와 자본 유출 우려 속에 항공우주 기업에 국경 보안 계약을 신속 발주했다. 에어로스페이스 다이내믹스가 8억 달러 규모의 감시 드론 주문을 확보했다.',
      },
      read: false,
      effect: { AERO: 1.07 },
    },
    {
      id: 'cc-4-5',
      dayIdx: 4,
      title: {
        en: 'Healthcare Dips on Capital Rotation to Growth Sectors',
        ko: '성장 업종 자금 이동에 헬스케어 소폭 하락',
      },
      content: {
        en: 'As crisis fears eased, investors began rotating out of crowded healthcare positions into beaten-down growth sectors. VitaPharma pulled back 3% but remained well above pre-crisis levels on resilient fundamentals.',
        ko: '위기 우려가 완화되면서 투자자들이 과밀한 헬스케어 포지션에서 낙폭 과대 성장 업종으로 자금을 이동하기 시작했다. 비타파마가 3% 하락했지만 견조한 펀더멘털에 위기 이전 수준을 크게 웃돌고 있다.',
      },
      read: false,
      effect: { HEALTH: 0.96 },
    },

    // Day 5: Currency stabilizes, restructuring begins, selective recovery
    {
      id: 'cc-5-1',
      dayIdx: 5,
      title: {
        en: 'Vantaran Currency Stabilizes, Restructuring Plan Unveiled',
        ko: '반타라 통화 안정화, 구조조정 계획 공개',
      },
      content: {
        en: 'Vantara\'s currency stabilized at a new equilibrium 15% below pre-crisis levels as the government unveiled a comprehensive economic restructuring plan. International investors cautiously welcomed the reform blueprint.',
        ko: '반타라 정부가 포괄적 경제 구조조정 계획을 공개하면서 통화가 위기 이전보다 15% 낮은 새로운 균형점에서 안정을 찾았다. 국제 투자자들이 개혁 청사진을 조심스럽게 환영했다.',
      },
      read: false,
      effect: { TECH: 1.08, ECOM: 1.06 },
    },
    {
      id: 'cc-5-2',
      dayIdx: 5,
      title: {
        en: 'Tech Firms Find Export Advantage in Weaker Currencies',
        ko: '기술 기업, 약세 통화에서 수출 이점 발견',
      },
      content: {
        en: 'Technology companies with manufacturing operations in the crisis region discovered that the weaker currencies dramatically reduced their production costs. NeoTech Industries upgraded its margin guidance citing a 20% labor cost reduction.',
        ko: '위기 지역에 제조 거점을 둔 기술 기업들이 통화 약세로 생산 비용이 극적으로 감소했음을 확인했다. 네오텍 인더스트리즈가 20% 인건비 절감을 근거로 마진 가이던스를 상향했다.',
      },
      read: false,
      effect: { TECH: 1.07 },
    },
    {
      id: 'cc-5-3',
      dayIdx: 5,
      title: {
        en: 'E-Commerce Volumes Rebound as Purchasing Power Returns',
        ko: '구매력 회복에 이커머스 거래량 반등',
      },
      content: {
        en: 'Online retail volumes in the affected region rebounded sharply as currency stabilization restored consumer confidence. GlobalMart reported that its local pricing strategy captured market share from competitors who withdrew during the crisis.',
        ko: '통화 안정으로 소비자 신뢰가 회복되면서 피해 지역 온라인 유통 거래량이 급반등했다. 글로벌마트는 현지 가격 전략으로 위기 중 철수한 경쟁사 시장 점유율을 흡수했다고 보고했다.',
      },
      read: false,
      effect: { ECOM: 1.08 },
    },
    {
      id: 'cc-5-4',
      dayIdx: 5,
      title: {
        en: 'Green Energy Boom as Reform Nations Embrace Renewables',
        ko: '개혁 국가들 재생에너지 수용에 친환경 에너지 호황',
      },
      content: {
        en: 'All four crisis-affected nations committed to ambitious renewable energy targets as part of their restructuring programs. EcoEnergy Corp announced $3 billion in new regional projects, calling it the company\'s largest expansion in history.',
        ko: '위기 영향 4개국 모두 구조조정 프로그램의 일환으로 야심 찬 재생에너지 목표를 약속했다. 에코에너지가 30억 달러 규모의 신규 역내 프로젝트를 발표하며 창사 이래 최대 확장이라고 밝혔다.',
      },
      read: false,
      effect: { GREEN: 1.10 },
    },
    {
      id: 'cc-5-5',
      dayIdx: 5,
      title: {
        en: 'Markets Rally on "Stronger After Crisis" Narrative',
        ko: '"위기 후 더 강해진다" 내러티브에 시장 랠리',
      },
      content: {
        en: 'Global markets rallied broadly as investors embraced the narrative that the crisis produced stronger economic foundations through reform. All five sectors closed above pre-crisis levels as confidence was fully restored.',
        ko: '위기가 개혁을 통해 더 강한 경제적 토대를 만들었다는 내러티브를 투자자들이 수용하면서 글로벌 시장이 전반적으로 랠리했다. 5개 업종 모두 신뢰 완전 회복과 함께 위기 이전 수준을 상회하며 마감했다.',
      },
      read: false,
      effect: { AERO: 1.06, HEALTH: 1.04 },
    },
  ],
};
