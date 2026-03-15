import { News } from '../../types';

export const BOOST_DAYS_21_30: News[] = [
  // Day 21 — 3 additional items
  {
    id: 'd21-1', dayIdx: 21,
    title: { en: 'NeoTech Prometheus 3.0 Rolls Out Enterprise Licensing with Revenue Share', ko: '네오테크 프로메테우스 3.0, 수익 공유 기반 기업 라이선스 출시' },
    content: { en: 'NeoTech launched Prometheus 3.0 under a novel revenue-share licensing model, allowing enterprise clients to deploy AGI capabilities at zero upfront cost. Early adopters span logistics, banking, and e-commerce verticals. However, analysts flagged that the sector is now trading at 45x forward P/E, raising bubble concerns as valuations stretch beyond historical norms.', ko: '네오테크가 기업 고객이 초기 비용 없이 AGI 역량을 배포할 수 있는 새로운 수익 공유 라이선스 모델로 프로메테우스 3.0을 출시했습니다. 초기 채택자는 물류, 금융, 전자상거래 분야에 걸쳐 있습니다. 그러나 애널리스트들은 해당 섹터가 현재 선행 P/E 45배에 거래되고 있어 밸류에이션이 역사적 기준을 넘어 버블 우려가 제기된다고 지적했습니다.' },
    read: false, effect: { TECH: 1.08, ECOM: 1.03 },
  },
  {
    id: 'd21-2', dayIdx: 21,
    title: { en: 'Green Energy Grid Interconnect Treaty Signed by 31 Nations', ko: '31개국, 친환경 에너지 그리드 상호연결 조약 서명' },
    content: { en: 'A landmark international grid-sharing treaty was signed by 31 nations, establishing a cross-border renewable energy corridor that will allow excess solar and wind capacity to be traded in real time. Grid infrastructure developers and clean energy producers are positioned as the largest beneficiaries, with combined transmission investment estimated at $520 billion over a decade.', ko: '31개국이 과잉 태양광 및 풍력 용량을 실시간으로 거래할 수 있는 국경을 초월한 재생에너지 회랑을 구축하는 획기적인 국제 그리드 공유 조약에 서명했습니다. 그리드 인프라 개발업체와 청정에너지 생산업체가 최대 수혜자로 자리잡았으며, 10년간 합산 송전 투자액은 5,200억 달러로 추정됩니다.' },
    read: false, effect: { GREEN: 1.07, BANK: 1.02 },
  },
  {
    id: 'd21-3', dayIdx: 21,
    title: { en: 'Crypto Stablecoin Reserve Audit Confirms Full Backing; Markets Rally', ko: '암호화폐 스테이블코인 준비금 감사, 완전 담보 확인…시장 급등' },
    content: { en: 'An independent audit of the three largest stablecoins confirmed 100% reserve backing with high-quality liquid assets, resolving months of regulatory uncertainty that had weighed on digital asset markets. Institutional capital that had been parked in money markets re-entered crypto positions within hours of the announcement, lifting exchange volumes to a six-month high.', ko: '독립 감사에서 3대 스테이블코인이 고품질 유동 자산으로 100% 준비금을 보유하고 있음을 확인해 디지털 자산 시장을 짓눌러온 수개월간의 규제 불확실성이 해소됐습니다. 단기금융시장에 머물던 기관 자본이 발표 수 시간 내에 암호화폐 포지션에 재진입하며 거래소 거래량이 6개월 최고치로 치솟았습니다.' },
    read: false, effect: { CRYPTO: 1.07, BANK: 1.02 },
  },

  // Day 22 — 4 additional items
  {
    id: 'd22-1', dayIdx: 22,
    title: { en: 'Aerospace Supercycle Confirmed as Defense Budgets Hit Post-Cold War Highs', ko: '항공우주 슈퍼사이클 확인…국방 예산 냉전 이후 최고치 돌파' },
    content: { en: 'A comprehensive NATO burden-sharing review resulted in twelve member states raising defense budgets above 3% of GDP, triggering a wave of long-term contracts with aerospace and defense manufacturers. Order backlogs for next-generation fighter platforms and missile defense systems now extend through 2034, giving major contractors exceptional revenue visibility.', ko: 'NATO 방위비 분담 검토에서 12개 회원국이 국방 예산을 GDP의 3% 이상으로 상향하면서 항공우주 및 방위 제조업체와의 장기 계약 물결이 시작됐습니다. 차세대 전투기 플랫폼과 미사일 방어 시스템의 수주 잔고가 2034년까지 연장되어 주요 계약업체들에게 탁월한 수익 가시성을 제공하고 있습니다.' },
    read: false, effect: { AERO: 1.08 },
  },
  {
    id: 'd22-2', dayIdx: 22,
    title: { en: 'REALTY Sector Bottoms Out as Distressed Asset Sales Clear Market Overhang', ko: '부동산 섹터, 부실 자산 매각으로 시장 과잉 물량 소화하며 바닥 확인' },
    content: { en: 'A coordinated auction of $210 billion in distressed commercial real estate loans cleared at prices 8–12% above floor estimates, signaling that the market has found a credible bottom after two years of valuation pressure. REITs with diversified industrial and residential portfolios led a broad sector recovery, while lenders reported marked improvement in credit quality metrics.', ko: '2,100억 달러 규모의 부실 상업용 부동산 대출이 하한가 추정치보다 8~12% 높은 가격에 낙찰되는 조율된 경매가 진행돼 2년간의 평가 압박 끝에 시장이 신뢰할 수 있는 바닥을 찾았음을 시사했습니다. 다각화된 산업용 및 주거용 포트폴리오를 가진 리츠가 섹터 전반의 회복을 이끌었으며, 대출기관들은 신용 품질 지표의 뚜렷한 개선을 보고했습니다.' },
    read: false, effect: { REALTY: 1.06, BANK: 1.04 },
  },
  {
    id: 'd22-3', dayIdx: 22,
    title: { en: 'Global Food Security Index Improves as Drought Relief Programs Take Hold', ko: '가뭄 구호 프로그램 효과로 글로벌 식량 안보 지수 개선' },
    content: { en: 'The UN Food and Agriculture Organization reported the sharpest single-quarter improvement in the Global Food Security Index since 2015, driven by drought-resistant crop deployments and strategic grain reserve releases. Major food processors revised earnings guidance upward as input cost pressures that had plagued the sector for three consecutive quarters finally began to ease.', ko: 'UN 식량농업기구가 가뭄 저항성 작물 배치와 전략적 곡물 비축량 방출에 힘입어 2015년 이후 단일 분기 최대 폭의 글로벌 식량 안보 지수 개선을 보고했습니다. 주요 식품 가공업체들은 3분기 연속 섹터를 괴롭혔던 투입 비용 압박이 마침내 완화되기 시작하면서 이익 가이던스를 상향 조정했습니다.' },
    read: false, effect: { FOOD: 1.06 },
  },
  {
    id: 'd22-4', dayIdx: 22,
    title: { en: 'Streaming Giants Consolidate Into Three Mega-Platforms in Historic M&A Wave', ko: '스트리밍 대기업, 역사적 M&A 물결 속 3대 메가 플랫폼으로 통합' },
    content: { en: 'The media landscape was reshaped as three major acquisition deals were announced simultaneously, effectively consolidating the fragmented streaming industry into three global mega-platforms controlling over 85% of paid subscriptions. The deals are expected to generate $9 billion in annual cost synergies through content library overlap elimination and shared technology infrastructure.', ko: '세 건의 대형 인수 딜이 동시에 발표되면서 미디어 환경이 재편됐으며, 파편화된 스트리밍 산업이 유료 구독의 85% 이상을 점유하는 3개의 글로벌 메가 플랫폼으로 사실상 통합됐습니다. 이번 딜은 콘텐츠 라이브러리 중복 제거 및 공유 기술 인프라를 통해 연간 90억 달러의 비용 시너지를 창출할 것으로 예상됩니다.' },
    read: false, effect: { MEDIA: 1.07 },
  },

  // Day 23 — 1 additional item
  {
    id: 'd23-1', dayIdx: 23,
    title: { en: 'Central Bank Digital Currency Pilots Expand to Cross-Border Settlements', ko: '중앙은행 디지털화폐 파일럿, 국경 간 결제로 확대' },
    content: { en: 'Eight central banks announced a joint CBDC interoperability pilot that will process real-value cross-border corporate payments using a shared settlement layer, with go-live targeted for Q2 next year. Banks with established correspondent network infrastructure stand to lose fee revenue while fintech-aligned institutions are positioned to capture new transaction volume at significantly lower processing costs.', ko: '8개 중앙은행이 공유 결제 레이어를 활용해 실제 가치의 국경 간 기업 결제를 처리하는 CBDC 상호운용성 공동 파일럿을 발표했으며, 내년 2분기 가동을 목표로 하고 있습니다. 기존 환거래 네트워크 인프라를 갖춘 은행들은 수수료 수익을 잃게 되는 반면, 핀테크와 연계된 기관들은 상당히 낮은 처리 비용으로 새로운 거래량을 확보할 위치에 있습니다.' },
    read: false, effect: { BANK: 1.05, CRYPTO: 0.94 },
  },

  // Day 24 — 4 additional items
  {
    id: 'd24-1', dayIdx: 24,
    title: { en: 'Health Insurers Post Record Underwriting Profits as AI Claims Processing Scales', ko: '건강보험사, AI 청구 처리 확대로 기록적 언더라이팅 수익 달성' },
    content: { en: 'Major health insurance groups reported underwriting margins expanding to 14–17%, the highest in industry history, as AI-powered claims adjudication systems reduced fraud-related payouts by an estimated $31 billion annually. The efficiency gains are triggering a competitive premium repricing cycle that could drive membership growth by an additional 8% over the next twelve months.', ko: '주요 건강보험 그룹이 AI 기반 청구 심사 시스템이 연간 약 310억 달러의 사기 관련 지급액을 줄이면서 업계 역사상 최고인 14~17%의 언더라이팅 마진을 보고했습니다. 이러한 효율성 향상은 향후 12개월간 가입자 수를 추가로 8% 성장시킬 수 있는 경쟁적 보험료 재조정 사이클을 촉발하고 있습니다.' },
    read: false, effect: { HEALTH: 1.07, TECH: 1.02 },
  },
  {
    id: 'd24-2', dayIdx: 24,
    title: { en: 'E-Commerce Platforms Launch Same-Hour Delivery in 50 Cities via Drone Networks', ko: '전자상거래 플랫폼, 드론 네트워크로 50개 도시에서 당일 1시간 이내 배송 시작' },
    content: { en: 'Two competing e-commerce giants simultaneously activated urban drone delivery networks across 50 major cities, achieving sub-60-minute delivery times for packages under 5 kg. Consumer satisfaction scores for same-day delivery jumped by 38 percentage points, and analysts revised GMV growth estimates upward by $85 billion as the service drives basket size expansion and repeat purchase frequency.', ko: '경쟁하는 두 전자상거래 대기업이 50개 주요 도시에서 도시 드론 배송 네트워크를 동시에 가동해 5kg 미만 패키지의 60분 미만 배송을 실현했습니다. 당일 배송에 대한 소비자 만족도가 38퍼센트 포인트 상승했으며, 이 서비스가 장바구니 크기 확대와 재구매 빈도를 높임에 따라 애널리스트들은 GMV 성장 예상치를 850억 달러 상향 조정했습니다.' },
    read: false, effect: { ECOM: 1.07, AERO: 1.03 },
  },
  {
    id: 'd24-3', dayIdx: 24,
    title: { en: 'Labor Dispute Resolution Clears Port Backlogs; Supply Chain Normalizes', ko: '노동 분쟁 해결로 항만 적체 해소…공급망 정상화' },
    content: { en: 'A landmark three-year labor agreement was ratified at 14 major ports, ending a months-long work-to-rule slowdown that had inflated container shipping rates by 34%. Freight forwarding platforms reported booking volumes recovering to pre-dispute levels within 48 hours, while consumer goods companies reassessed upward the inventory replenishment orders that had been deferred during the disruption.', ko: '14개 주요 항만에서 3년짜리 획기적인 노사 협약이 비준돼 컨테이너 운임을 34% 올렸던 수개월간의 준법 파업이 종료됐습니다. 화물 운송 플랫폼은 분쟁 전 수준으로 예약량이 48시간 내에 회복됐다고 보고했으며, 소비재 기업들은 혼란 기간 미뤄졌던 재고 보충 주문을 상향 재검토했습니다.' },
    read: false, effect: { ECOM: 1.05, FOOD: 1.04 },
  },
  {
    id: 'd24-4', dayIdx: 24,
    title: { en: 'Sovereign Wealth Funds Increase Real Asset Allocations; REITs Benefit', ko: '국부 펀드, 실물 자산 배분 확대…리츠 수혜' },
    content: { en: 'A coordinated policy shift among six of the world\'s ten largest sovereign wealth funds saw alternative real asset allocations increase by an average of 4 percentage points, directing an estimated $380 billion into infrastructure REITs, logistics parks, and data center property. The demand surge is reducing cap rates in prime industrial property markets to cycle lows, driving net asset value appreciation across the REIT sector.', ko: '세계 10대 국부 펀드 중 6개의 조율된 정책 전환으로 대안 실물 자산 배분이 평균 4퍼센트 포인트 증가하며 약 3,800억 달러가 인프라 리츠, 물류 단지, 데이터 센터 부동산으로 유입됐습니다. 이러한 수요 급증으로 핵심 산업용 부동산 시장의 캡률이 사이클 최저치로 낮아지며 리츠 섹터 전반의 순자산가치 상승을 이끌고 있습니다.' },
    read: false, effect: { REALTY: 1.07, BANK: 1.03 },
  },

  // Day 25 — 3 additional items
  {
    id: 'd25-1', dayIdx: 25,
    title: { en: 'Tech Antitrust Resolution Unlocks $60B in Deferred M&A Activity', ko: '기술 반독점 해결로 600억 달러 규모 지연 M&A 활동 해제' },
    content: { en: 'Regulators and major tech firms reached a comprehensive antitrust settlement framework, including behavioral remedies and data portability mandates, that effectively cleared a two-year backlog of pending acquisitions and strategic partnerships. Investors welcomed the certainty, pricing in a wave of deal closings that had been in limbo, and analyst price targets across large-cap tech were revised upward by an average of 7%.', ko: '규제 당국과 주요 기술 기업들이 행동 구제책과 데이터 이동성 명령을 포함한 포괄적인 반독점 합의 프레임워크에 도달해 2년간 쌓인 인수 및 전략적 파트너십 대기 물량이 사실상 해소됐습니다. 투자자들은 확실성을 환영하며 교착 상태였던 딜 마무리 물결을 가격에 반영했고, 대형 기술주 전반의 애널리스트 목표주가가 평균 7% 상향됐습니다.' },
    read: false, effect: { TECH: 1.07, ECOM: 1.03 },
  },
  {
    id: 'd25-2', dayIdx: 25,
    title: { en: 'Bank Stress Tests Show Strongest Capital Buffers in Fifteen Years', ko: '은행 스트레스 테스트, 15년 만에 최강 자본 완충력 확인' },
    content: { en: 'Annual regulatory stress tests revealed that the top 30 global banks maintain Tier 1 capital ratios averaging 16.2% under severe adverse scenarios, the highest reading since modern stress testing was introduced. The results are expected to unlock $140 billion in previously restricted shareholder returns through accelerated buyback programs and dividend increases over the next four quarters.', ko: '연간 규제 스트레스 테스트에서 상위 30개 글로벌 은행이 심각한 역경 시나리오에서 평균 16.2%의 기본자본 비율을 유지해 현대 스트레스 테스트 도입 이후 최고치를 기록했습니다. 이 결과로 향후 4분기간 가속화된 자사주 매입 프로그램과 배당 인상을 통해 이전에 제한됐던 1,400억 달러의 주주 환원이 해제될 것으로 예상됩니다.' },
    read: false, effect: { BANK: 1.06 },
  },
  {
    id: 'd25-3', dayIdx: 25,
    title: { en: 'Precision Agriculture Rollout Cuts Crop Waste by 28%; Food Margins Recover', ko: '정밀 농업 확산, 작물 낭비 28% 절감…식품 마진 회복' },
    content: { en: 'A consortium of agri-tech firms reported that AI-guided precision agriculture systems deployed across 180 million hectares have reduced post-harvest crop waste by 28% compared to conventional methods, dramatically improving raw material availability for food processors. The margin recovery is accelerating as upstream input costs normalize, with major food companies guiding for gross margin expansion of 150–220 basis points in the next reporting period.', ko: '농업 기술 기업 컨소시엄이 1억 8,000만 헥타르에 걸쳐 배치된 AI 가이드 정밀 농업 시스템이 기존 방식 대비 수확 후 작물 낭비를 28% 줄여 식품 가공업체의 원자재 가용성을 극적으로 개선했다고 보고했습니다. 상류 투입 비용이 정상화되면서 마진 회복이 가속화되고 있으며, 주요 식품 기업들은 다음 보고 기간에 150~220 베이시스 포인트의 매출총이익률 확대를 가이던스로 제시했습니다.' },
    read: false, effect: { FOOD: 1.06, TECH: 1.02 },
  },

  // Day 26 — 4 additional items
  {
    id: 'd26-1', dayIdx: 26,
    title: { en: 'Year-End Portfolio Rebalancing Drives Broad Market Rally', ko: '연말 포트폴리오 리밸런싱, 광범위한 시장 강세 견인' },
    content: { en: 'Institutional asset managers executing mandatory year-end rebalancing poured an estimated $220 billion into equities to restore target allocations after a strong fixed-income rally compressed stock weightings. Technology and growth sectors captured the largest inflows, with program trading desks noting the highest single-day buy volume since the post-pandemic recovery period.', ko: '의무적인 연말 리밸런싱을 실행하는 기관 자산운용사들이 강한 채권 랠리로 주식 비중이 줄어든 것을 복원하기 위해 약 2,200억 달러를 주식에 쏟아부었습니다. 기술주와 성장 섹터가 가장 큰 자금 유입을 포착했으며, 프로그램 트레이딩 데스크는 팬데믹 이후 회복기 이후 가장 높은 단일 일 매수 거래량을 기록했습니다.' },
    read: false, effect: { TECH: 1.06, ECOM: 1.04 },
  },
  {
    id: 'd26-2', dayIdx: 26,
    title: { en: 'Strong Dollar Crushes Overseas Earnings; Exporters Warn on Currency Headwinds', ko: '강달러, 해외 수익 압박…수출 기업들 환율 역풍 경고' },
    content: { en: 'The U.S. dollar index surged to a two-year high, with analysts warning that multinationals with significant overseas revenues face a meaningful FX translation drag into year-end earnings reports. Technology and aerospace exporters are most exposed, as each 5% dollar appreciation typically reduces reported EPS by 2–3% for globally diversified companies.', ko: '달러 인덱스가 2년 최고치로 급등하면서 해외 매출 비중이 높은 다국적 기업들이 연말 실적 보고에서 상당한 환율 환산 부담에 직면할 것이라고 애널리스트들이 경고했습니다. 기술 및 항공우주 수출 기업들이 가장 큰 영향을 받으며, 달러가 5% 절상될 때마다 글로벌 다각화 기업의 보고 EPS가 2~3% 감소하는 것이 일반적입니다.' },
    read: false, effect: { TECH: 0.96, AERO: 0.95 },
  },
  {
    id: 'd26-3', dayIdx: 26,
    title: { en: 'Green Infrastructure Bonds Hit $1T Issuance Milestone for the Year', ko: '친환경 인프라 채권, 연간 발행 1조 달러 이정표 달성' },
    content: { en: 'Global green bond issuance crossed the $1 trillion mark for the first calendar year on record, driven by sovereign and corporate issuers funding solar, wind, and grid modernization projects. The milestone is reinforcing favorable long-term financing conditions for renewable energy developers, with secondary market spreads on investment-grade green bonds compressing to within 5 basis points of conventional equivalents.', ko: '전 세계 녹색 채권 발행이 태양광, 풍력, 그리드 현대화 프로젝트에 자금을 조달하는 국가 및 기업 발행자에 의해 사상 처음으로 연간 1조 달러를 돌파했습니다. 이 이정표는 재생에너지 개발업체에게 유리한 장기 금융 조건을 강화하고 있으며, 투자등급 녹색 채권의 유통 시장 스프레드가 일반 채권과 5 베이시스 포인트 이내로 좁혀졌습니다.' },
    read: false, effect: { GREEN: 1.06, BANK: 1.03 },
  },
  {
    id: 'd26-4', dayIdx: 26,
    title: { en: 'Media Ad Revenue Upgrades Follow Holiday Season Spending Surge', ko: '연휴 시즌 소비 급증에 따른 미디어 광고 수익 전망 상향' },
    content: { en: 'Preliminary holiday season retail data showing a 14% year-over-year surge in consumer discretionary spending prompted major advertising networks and content platforms to issue Q4 revenue guidance upgrades averaging 9% above prior consensus. Connected TV and social commerce formats captured disproportionate share, with CPM rates for premium video inventory hitting record levels in the final weeks of December.', ko: '소비자 임의지출이 전년 동기 대비 14% 급증한 것으로 나타난 예비 연휴 시즌 소매 데이터가 주요 광고 네트워크와 콘텐츠 플랫폼이 이전 컨센서스 대비 평균 9% 높은 4분기 매출 가이던스를 발표하도록 촉진했습니다. 커넥티드 TV와 소셜 커머스 포맷이 불균형적인 점유율을 차지했으며, 프리미엄 비디오 인벤토리의 CPM 요율이 12월 마지막 주에 기록적 수준에 달했습니다.' },
    read: false, effect: { MEDIA: 1.06, ECOM: 1.04 },
  },

  // Day 27 — 4 additional items
  {
    id: 'd27-1', dayIdx: 27,
    title: { en: 'Geopolitical Ceasefire Agreement Restores Key Shipping Lane Access', ko: '지정학적 휴전 협정, 핵심 해상 통로 접근 복원' },
    content: { en: 'A UN-brokered ceasefire agreement between regional powers reopened two critical shipping corridors that had disrupted global trade flows for seven months, immediately lowering spot container freight rates by 22%. Airlines and aerospace component manufacturers reliant on just-in-time parts delivery were among the first to benefit, as logistics normalization reduced operational buffer costs across the supply chain.', ko: '유엔이 중재한 지역 강대국들 간의 휴전 협정으로 7개월간 세계 교역 흐름을 방해했던 두 개의 중요 해상 통로가 재개통되면서 현물 컨테이너 운임이 즉시 22% 하락했습니다. 적시 부품 배송에 의존하는 항공사와 항공우주 부품 제조업체들이 공급망 전반의 운영 완충 비용을 줄이는 물류 정상화로 가장 먼저 혜택을 받았습니다.' },
    read: false, effect: { AERO: 1.05, ECOM: 1.05 },
  },
  {
    id: 'd27-2', dayIdx: 27,
    title: { en: 'Breakthrough Cancer Immunotherapy Achieves 78% Remission Rate in Late-Stage Trial', ko: '획기적인 암 면역치료, 말기 임상시험에서 78% 관해율 달성' },
    content: { en: 'Phase 3 clinical trial results for a next-generation CAR-T cell therapy showed a 78% complete remission rate in treatment-resistant hematologic cancers, a result described by oncologists as "transformational" compared to the 31% industry benchmark. The FDA fast-tracked a Priority Review designation, and the therapy\'s developer is in advanced licensing discussions with four major pharmaceutical groups for global commercialization rights.', ko: '차세대 CAR-T 세포 치료제의 3상 임상시험 결과에서 치료 저항성 혈액암 환자의 78%가 완전 관해를 보여 종양학자들이 업계 기준치 31% 대비 "변혁적"이라고 평가했습니다. FDA는 우선 심사 지정을 신속 승인했으며, 치료제 개발사는 글로벌 상업화 권리를 위해 4개 주요 제약 그룹과 고급 라이선스 협상 중에 있습니다.' },
    read: false, effect: { HEALTH: 1.09 },
  },
  {
    id: 'd27-3', dayIdx: 27,
    title: { en: 'Residential Real Estate Prices Surge as Inventory Shortage Intensifies', ko: '주거용 부동산 가격, 재고 부족 심화로 급등' },
    content: { en: 'National housing inventory data showed the months-of-supply metric fell to 1.8, the tightest reading in recorded history, triggering double-digit price appreciation in 73% of metropolitan markets. Mortgage REITs and property developers accelerated new project approvals, while construction technology firms reported record order intake for prefabricated and modular housing systems.', ko: '전국 주택 재고 데이터에서 공급 월수 지표가 역대 최저인 1.8개월로 떨어지면서 73%의 대도시 시장에서 두 자릿수 가격 상승이 촉발됐습니다. 모기지 리츠와 부동산 개발업체들이 신규 프로젝트 승인을 가속화했으며, 건설 기술 기업들은 조립식 및 모듈형 주택 시스템에 대한 기록적인 수주를 보고했습니다.' },
    read: false, effect: { REALTY: 1.07, BANK: 1.03 },
  },
  {
    id: 'd27-4', dayIdx: 27,
    title: { en: 'Consumer Sentiment Index Hits 18-Year High on Inflation Normalization', ko: '소비자 심리 지수, 인플레이션 정상화로 18년 최고치 달성' },
    content: { en: 'The composite consumer sentiment index rose to its highest level since 2006, with the "current conditions" sub-index surging on the back of cooling inflation, rising real wages, and improved household balance sheets. Discretionary retail, restaurant, and entertainment companies are revising Q4 and full-year guidance upward, with consumer confidence readings historically correlating strongly with forward spending acceleration.', ko: '종합 소비자 심리 지수가 2006년 이후 최고치로 상승했으며, 냉각된 인플레이션, 실질 임금 상승, 개선된 가계 재무 상태에 힘입어 "현재 상황" 하위 지수가 급등했습니다. 임의소비재 소매, 레스토랑, 엔터테인먼트 기업들이 4분기 및 연간 가이던스를 상향 조정하고 있으며, 소비자 신뢰도 수치는 역사적으로 향후 지출 가속화와 강한 상관관계를 가집니다.' },
    read: false, effect: { FOOD: 1.05, MEDIA: 1.04 },
  },

  // Day 28 — 4 additional items (2 positive, 2 negative)
  {
    id: 'd28-1', dayIdx: 28,
    title: { en: 'Tech Earnings Beat EPS — But Guidance Cut Sends Stocks Tumbling', ko: '기술 실적 EPS 상회했지만 가이던스 하향에 주가 급락' },
    content: { en: 'Several major tech firms beat Q4 EPS estimates by 8–12%, but simultaneously lowered forward guidance citing slowing enterprise AI spending and dollar headwinds from overseas operations. Stocks fell sharply on the guidance miss, reminding investors that beating past results means little when the outlook deteriorates — a classic case of "buy the rumor, sell the news" as the strong earnings had already been priced in.', ko: '주요 기술 기업들이 4분기 EPS 추정치를 8~12% 상회했지만, 기업 AI 지출 둔화와 해외 사업 달러 역풍을 이유로 선행 가이던스를 동시에 하향했습니다. 주가는 가이던스 미달에 급락했으며, 과거 실적 상회는 전망이 악화될 때 의미가 없다는 점을 투자자들에게 상기시켰습니다. 이미 강한 실적이 주가에 반영돼 있었기에 전형적인 "소문에 사고 뉴스에 팔라"의 사례가 됐습니다.' },
    read: false, effect: { TECH: 0.94, ECOM: 0.96 },
  },
  {
    id: 'd28-2', dayIdx: 28,
    title: { en: 'Renewable Energy M&A Activity Reaches Decade High as Utilities Consolidate', ko: '재생에너지 M&A 활동, 유틸리티 통합으로 10년 최고치 기록' },
    content: { en: 'Year-end figures confirmed that renewable energy sector M&A reached $310 billion for the calendar year, a decade-high driven by utility companies acquiring independent solar and wind operators to accelerate their own decarbonization mandates. The consolidation is creating vertically integrated clean energy majors with scale advantages that analysts project will compress the levelized cost of energy by a further 18% over four years.', ko: '연말 수치에서 재생에너지 섹터 M&A가 자체 탈탄소화 의무를 가속화하기 위해 독립 태양광 및 풍력 운영사를 인수하는 유틸리티 기업들에 의해 3,100억 달러로 10년 최고치에 달했습니다. 이 통합으로 규모 우위를 가진 수직 통합 청정에너지 대형사가 만들어지고 있으며, 애널리스트들은 4년 내에 균등화 에너지 비용이 추가로 18% 압축될 것으로 전망합니다.' },
    read: false, effect: { GREEN: 1.07, BANK: 1.03 },
  },
  {
    id: 'd28-3', dayIdx: 28,
    title: { en: 'Regulator Launches Surprise Crackdown on Crypto Exchanges; Trading Halted Briefly', ko: '규제당국, 암호화폐 거래소 기습 단속…잠시 거래 중단' },
    content: { en: 'A major financial regulator announced unannounced audits of three large crypto exchanges, triggering a circuit-breaker-style trading halt on two platforms for approximately 90 minutes as compliance teams scrambled to respond. The news rattled digital asset markets broadly, and although trading resumed, sentiment shifted as investors grew wary of the increased regulatory scrutiny heading into year-end.', ko: '주요 금융 규제당국이 3개 대형 암호화폐 거래소에 대한 불시 감사를 발표해 준법 팀이 대응에 나서는 동안 두 플랫폼에서 약 90분간 서킷 브레이커 방식의 거래 중단이 발생했습니다. 이 소식은 디지털 자산 시장 전반을 흔들었으며, 거래가 재개됐지만 투자자들이 연말을 앞두고 강화된 규제 감시에 경계심을 갖게 되면서 시장 심리가 악화됐습니다.' },
    read: false, effect: { CRYPTO: 0.93 },
  },
  {
    id: 'd28-4', dayIdx: 28,
    title: { en: 'Aerospace Firms Announce Strategic Alliance for Hypersonic Passenger Transport', ko: '항공우주 기업들, 극초음속 여객 운송 전략 동맹 발표' },
    content: { en: 'Four leading aerospace manufacturers announced a landmark joint-development program targeting a hypersonic passenger aircraft capable of flying from New York to Tokyo in under three hours, with a prototype scheduled for unveiling in 2027. The program, backed by $22 billion in combined R&D commitments, is expected to redefine premium long-haul travel economics and generate a new product category with an estimated $400 billion total addressable market.', ko: '4대 항공우주 제조업체가 뉴욕에서 도쿄까지 3시간 이내에 비행할 수 있는 극초음속 여객기를 목표로 하는 획기적인 공동 개발 프로그램을 발표했으며, 2027년 프로토타입 공개를 예정하고 있습니다. 총 220억 달러의 R&D 약속으로 지원되는 이 프로그램은 프리미엄 장거리 여행 경제학을 재정의하고 약 4,000억 달러의 총 잠재 시장 규모를 가진 새로운 제품 카테고리를 창출할 것으로 기대됩니다.' },
    read: false, effect: { AERO: 1.08, TECH: 1.02 },
  },

  // Day 29 — 3 additional items (2 positive, 1 mixed/negative)
  {
    id: 'd29-1', dayIdx: 29,
    title: { en: 'Full-Year Economic Growth Revised Upward to 4.1%; Equity Outlook Brightens', ko: '연간 경제 성장률, 4.1%로 상향…주식 전망 밝아져' },
    content: { en: 'The IMF issued an unscheduled upward revision to global GDP growth for the current calendar year, raising the estimate from 3.4% to 4.1% on the strength of AI-driven productivity gains and energy transition investment. The revision triggered broad buying across cyclical sectors as fixed-income strategists recalibrated interest rate cut expectations, lending further support to equity multiples entering the new year.', ko: 'IMF가 AI 주도 생산성 향상과 에너지 전환 투자의 강세를 바탕으로 현재 회계연도 세계 GDP 성장 추정치를 3.4%에서 4.1%로 올리는 비정기 상향 조정을 발표했습니다. 이번 조정으로 채권 전략가들이 금리 인하 기대치를 재조정하고 새해에 주식 배수를 추가 지지하면서 경기민감 섹터 전반에 걸친 광범위한 매수를 촉발했습니다.' },
    read: false, effect: { TECH: 1.06, BANK: 1.05, GREEN: 1.04 },
  },
  {
    id: 'd29-2', dayIdx: 29,
    title: { en: 'Record Revenue Announced — But Margin Collapse Tells the Real Story', ko: '사상 최대 매출 발표 — 그러나 마진 붕괴가 진짜 이야기' },
    content: { en: 'A major e-commerce platform trumpeted record annual revenue in a flashy press release, sending shares up 4% in pre-market trading. But buried in the footnotes: operating margins had collapsed from 12% to 4% due to aggressive discounting and surging logistics costs. Once analysts digested the full results, the stock reversed sharply — a reminder that top-line growth without profitability is a trap for inattentive investors.', ko: '주요 전자상거래 플랫폼이 화려한 보도자료로 연간 사상 최대 매출을 발표해 장 전 거래에서 주가가 4% 올랐습니다. 그러나 각주에 숨겨진 내용은 공격적인 할인과 치솟는 물류 비용으로 영업 마진이 12%에서 4%로 붕괴됐다는 것이었습니다. 애널리스트들이 전체 실적을 소화한 후 주가는 급반전했으며, 수익성 없는 매출 성장은 부주의한 투자자들에게 함정이라는 점을 상기시켜 줬습니다.' },
    read: false, effect: { ECOM: 0.95 },
  },
  {
    id: 'd29-3', dayIdx: 29,
    title: { en: 'Health Data Interoperability Mandate Accelerates Digital Therapeutics Market', ko: '의료 데이터 상호운용성 의무화, 디지털 치료제 시장 가속화' },
    content: { en: 'A sweeping federal health data interoperability regulation came into full force, requiring all providers and payers to share structured patient data through standardized APIs. Digital therapeutics companies and AI health platform operators are the primary beneficiaries, as the mandate unlocks longitudinal patient datasets needed to train and validate clinical AI models across oncology, cardiology, and metabolic disease.', ko: '광범위한 연방 의료 데이터 상호운용성 규정이 완전 발효되어 모든 의료 제공자와 보험사가 표준화된 API를 통해 구조화된 환자 데이터를 공유해야 하게 됐습니다. 이 의무화로 종양학, 심장학, 대사 질환 전반의 임상 AI 모델 훈련 및 검증에 필요한 종단적 환자 데이터셋이 개방되면서 디지털 치료제 기업과 AI 헬스 플랫폼 운영사들이 주요 수혜자가 됩니다.' },
    read: false, effect: { HEALTH: 1.06, TECH: 1.03 },
  },

  // Day 30 — 4 additional items (2 positive, 2 negative/mixed)
  {
    id: 'd30-1', dayIdx: 30,
    title: { en: 'Final-Day Rally: Major Indices Close Year Near Record Highs', ko: '마지막 날 랠리: 주요 지수 연말 사상 최고 부근으로 마감' },
    content: { en: 'In a broadly positive year-end session, major global equity indices closed near all-time highs, capping a year defined by the AI productivity revolution, energy transition acceleration, and financial system resilience. Retail investor participation hit its highest annual level since 2021, though volume was thinner than mid-year peaks as many institutional desks had already squared positions.', ko: '전반적으로 긍정적인 연말 세션에서 주요 글로벌 주가 지수가 사상 최고 부근으로 마감해 AI 생산성 혁명, 에너지 전환 가속화, 금융 시스템 회복탄력성으로 정의된 한 해를 마무리했습니다. 소매 투자자 참여가 2021년 이후 최고 연간 수준을 기록했지만, 많은 기관 데스크가 이미 포지션을 정리해 연중 최고 시기보다는 거래량이 얇았습니다.' },
    read: false, effect: { TECH: 1.07, ECOM: 1.05, GREEN: 1.04 },
  },
  {
    id: 'd30-2', dayIdx: 30,
    title: { en: 'Year-End Tax-Loss Selling Hammers Underperformers; Short Sellers Forced to Cover', ko: '연말 세금 손실 매도, 부진 종목 강타…공매도 세력 강제 청산' },
    content: { en: 'Year-end tax-loss harvesting triggered aggressive selling in stocks that had underperformed during the year, particularly in the health and food sectors. Paradoxically, several heavily shorted names surged as short sellers were forced to cover their positions ahead of the year-end settlement deadline — a textbook short squeeze that reminded investors how quickly bearish bets can reverse near market closes.', ko: '연말 세금 손실 수확이 해당 연도에 부진한 종목, 특히 헬스케어와 식품 섹터에서 공격적인 매도를 촉발했습니다. 역설적으로, 공매도 비중이 높은 일부 종목은 연말 결제 기한을 앞두고 공매도 세력이 포지션을 강제로 청산하면서 급등했습니다. 이는 시장 마감 부근에서 약세 베팅이 얼마나 빠르게 역전될 수 있는지를 투자자들에게 일깨워준 교과서적인 숏 스퀴즈였습니다.' },
    read: false, effect: { HEALTH: 0.95, FOOD: 0.96 },
  },
  {
    id: 'd30-3', dayIdx: 30,
    title: { en: 'Massive Layoffs Announced at Tech Giant — Shares Surge 6%', ko: '기술 대기업 대규모 감원 발표 — 주가 6% 급등' },
    content: { en: 'A major technology company announced it would cut 12% of its global workforce — roughly 18,000 employees — in a sweeping restructuring plan. While the news sounds grim on the surface, investors cheered: the layoffs are expected to slash annual operating costs by $4.2 billion, dramatically improving the company\'s EV/EBITDA multiple and free cash flow profile. Markets rewarded the discipline, sending shares sharply higher on what appeared to be terrible news.', ko: '주요 기술 기업이 대대적인 구조조정 계획으로 전 세계 인력의 12%, 약 1만 8,000명을 감원한다고 발표했습니다. 표면적으로는 암울해 보이는 소식이지만 투자자들은 환호했습니다. 이번 감원으로 연간 운영 비용이 42억 달러 절감돼 기업의 EV/EBITDA 배수와 잉여현금흐름 프로파일이 극적으로 개선될 것으로 예상됩니다. 시장은 그 기율을 보상했으며, 끔찍한 소식처럼 보이는 것에 주가가 급등했습니다.' },
    read: false, effect: { TECH: 1.08 },
  },
  {
    id: 'd30-4', dayIdx: 30,
    title: { en: 'Profit-Taking Warning: Stocks Trading at Elevated PBR Signal Mean Reversion Risk', ko: '차익 실현 경고: 높은 PBR에 거래되는 주식, 평균 회귀 위험 신호' },
    content: { en: 'Strategists at several major banks issued year-end caution notes, pointing out that many market sectors are now trading at price-to-book ratios (PBR) 2–3 standard deviations above their 20-year averages. History shows that stocks trading at extreme valuations tend to mean-revert sharply; the strategists advised investors to trim winners and resist the temptation of momentum chasing into the new year.', ko: '여러 주요 은행의 전략가들이 연말 주의 메모를 발표하며 많은 시장 섹터가 현재 20년 평균보다 2~3 표준편차 위의 주가순자산비율(PBR)로 거래되고 있다고 지적했습니다. 역사적으로 극단적인 밸류에이션으로 거래되는 주식은 평균으로 급격히 회귀하는 경향이 있으며, 전략가들은 투자자들에게 수익 종목을 줄이고 새해 모멘텀 추구의 유혹에 저항할 것을 권고했습니다.' },
    read: false, effect: { ECOM: 0.96, REALTY: 0.95 },
  },
];
