import { News } from '../../types';

export const BOOST_DAYS_1_10: News[] = [
  // Day 1 — 4 additional items
  {
    id: 'b1-1', dayIdx: 1,
    title: { en: 'Central Bank Signals Rate Pause Amid Tech Surge', ko: '중앙은행, 기술주 급등 속 금리 동결 시사' },
    content: { en: 'The Federal Reserve indicated it will hold benchmark rates steady for at least two quarters, citing easing inflation and a robust technology sector. Analysts expect the decision to channel fresh capital into growth equities, particularly semiconductors and cloud infrastructure plays. With TECH now trading at 35x forward earnings, some strategists caution that lofty valuations leave little room for disappointment.', ko: '연방준비제도가 인플레이션 완화와 기술 섹터의 강세를 이유로 최소 두 분기 동안 기준금리를 동결할 것이라고 시사했습니다. 애널리스트들은 이번 결정으로 성장주, 특히 반도체와 클라우드 인프라 관련주에 신규 자금이 유입될 것으로 예상합니다. 기술주가 현재 선행 P/E 35배에 거래되고 있어 일부 전략가들은 높은 밸류에이션이 실망을 위한 여지를 거의 남기지 않는다고 경고합니다.' },
    read: false, effect: { TECH: 1.06, BANK: 1.03 },
  },
  {
    id: 'b1-2', dayIdx: 1,
    title: { en: 'Retail Giants Report Record Online Sales Quarter', ko: '유통 대기업들, 온라인 판매 분기 최고치 기록' },
    content: { en: 'Major e-commerce platforms disclosed a 28% year-over-year surge in gross merchandise volume, driven by AI-powered personalized recommendations. The data points to structurally higher digital commerce adoption, with mobile checkout conversions hitting an all-time high of 73%.', ko: '주요 전자상거래 플랫폼들이 AI 기반 개인화 추천에 힘입어 전년 동기 대비 28% 급증한 총 상품 거래액을 공시했습니다. 이 데이터는 구조적으로 높아진 디지털 커머스 수용을 보여주며, 모바일 결제 전환율은 73%로 사상 최고치를 기록했습니다.' },
    read: false, effect: { ECOM: 1.09 },
  },
  {
    id: 'b1-3', dayIdx: 1,
    title: { en: 'Solar Panel Costs Plunge Below Grid Parity Globally', ko: '태양광 패널 비용, 전 세계 그리드 패리티 이하로 하락' },
    content: { en: 'A landmark industry report confirms solar energy production costs have dropped below conventional grid parity in 47 countries, accelerating utility-scale deployments. Green energy stocks rallied as project pipelines expanded by an estimated $340 billion worldwide over the next three years.', ko: '업계 랜드마크 보고서가 47개국에서 태양광 발전 비용이 기존 그리드 패리티 이하로 떨어져 대규모 발전소 배치가 가속화되고 있음을 확인했습니다. 향후 3년간 전 세계 프로젝트 파이프라인이 3,400억 달러 확대될 것으로 추정되면서 친환경 에너지 주가가 상승했습니다.' },
    read: false, effect: { GREEN: 1.08 },
  },
  {
    id: 'b1-4', dayIdx: 1,
    title: { en: 'Aviation Sector Eyes AI Co-Pilot Certification', ko: '항공 섹터, AI 부조종사 인증 검토 착수' },
    content: { en: 'Regulators in the US and EU opened a joint framework review that could allow certified AI co-pilot systems on commercial flights within 18 months, slashing crew-training costs by up to 30%. Aerospace manufacturers welcomed the move, projecting significant margin improvements on next-generation narrow-body programs.', ko: '미국과 EU 규제 당국이 18개월 이내에 상업용 항공기에 인증된 AI 부조종사 시스템 허용 가능성을 열어주는 공동 프레임워크 검토를 시작해 승무원 훈련 비용을 최대 30% 절감할 전망입니다. 항공우주 제조업체들은 차세대 단통로 프로그램에서 상당한 마진 개선을 예상하며 이번 조치를 환영했습니다.' },
    read: false, effect: { AERO: 1.07, TECH: 1.02 },
  },

  // Day 2 — 4 additional items
  {
    id: 'b2-1', dayIdx: 2,
    title: { en: 'Biotech Consortium Launches Pan-Pathogen Vaccine Platform', ko: '바이오텍 컨소시엄, 범병원체 백신 플랫폼 출시' },
    content: { en: 'A coalition of leading pharmaceutical companies unveiled a universal mRNA scaffold capable of rapid adaptation to novel pathogens, citing lessons from the recent respiratory virus outbreak. Early clinical data showed 91% efficacy across three distinct viral families, and the lead developer reported EPS of $4.82 — a 23% beat over consensus — triggering a broad rally in health sector equities.', ko: '선도적인 제약사 연합이 최근 호흡기 바이러스 발생에서 교훈을 얻어 신규 병원체에 빠르게 적응 가능한 범용 mRNA 스캐폴드를 공개했습니다. 세 가지 상이한 바이러스군에서 91% 효능을 보인 초기 임상 데이터가 발표됐으며, 선도 개발사는 컨센서스를 23% 상회하는 주당순이익(EPS) $4.82를 기록해 헬스케어 섹터 주가가 전반적으로 상승했습니다.' },
    read: false, effect: { HEALTH: 1.09 },
  },
  {
    id: 'b2-2', dayIdx: 2,
    title: { en: 'Streaming Wars Escalate as Media Giants Merge Ad Tiers', ko: '스트리밍 전쟁 격화, 미디어 대기업들 광고 티어 통합' },
    content: { en: 'Two of the biggest content platforms announced a joint advertising inventory pool, creating the world\'s first cross-platform programmatic TV marketplace. Advertisers welcomed the consolidated reach, while subscription revenue projections for both parties were revised upward by 14% on higher churn recovery.', ko: '두 개의 대형 콘텐츠 플랫폼이 공동 광고 인벤토리 풀을 발표하며 세계 최초의 크로스 플랫폼 프로그래매틱 TV 마켓플레이스를 만들었습니다. 광고주들이 통합된 도달 범위를 환영하면서 양사의 구독 매출 전망치가 높은 이탈율 회복세로 14% 상향 조정됐습니다.' },
    read: false, effect: { MEDIA: 1.08 },
  },
  {
    id: 'b2-3', dayIdx: 2,
    title: { en: 'Crypto Derivatives Volume Hits $4 Trillion Monthly Record', ko: '암호화폐 파생상품 거래량, 월간 4조 달러 기록 경신' },
    content: { en: 'On-chain analytics firms reported perpetual futures and options on digital assets cleared $4 trillion in notional volume last month, surpassing traditional commodity derivatives for the first time. Institutional participation rose to 61% of total open interest, signaling a structural maturation of the crypto derivatives market.', ko: '온체인 분석 업체들이 디지털 자산 무기한 선물 및 옵션이 지난달 명목 거래량 4조 달러를 돌파해 처음으로 전통 상품 파생상품을 넘어섰다고 보고했습니다. 총 미결제약정의 61%를 기관 참여가 차지하며 암호화폐 파생상품 시장의 구조적 성숙을 알렸습니다.' },
    read: false, effect: { CRYPTO: 1.08, BANK: 1.02 },
  },
  {
    id: 'b2-4', dayIdx: 2,
    title: { en: 'Commercial Real Estate Debt Refinancing Wave Looms', ko: '상업용 부동산 부채 리파이낸싱 파도 임박' },
    content: { en: 'Over $780 billion in commercial real estate loans are set to mature within the next 12 months, raising concerns about refinancing gaps as office vacancy rates remain elevated. Rating agencies placed several real estate investment trusts on negative watch, while industrial logistics REITs bucked the trend with strong occupancy numbers.', ko: '향후 12개월 내에 7,800억 달러 이상의 상업용 부동산 대출이 만기를 맞아 사무실 공실률이 높은 상황에서 리파이낸싱 격차에 대한 우려가 높아지고 있습니다. 신용평가기관들이 여러 리츠에 부정적 관찰 등급을 부여한 반면, 산업물류 리츠는 높은 가동률로 이에 역행했습니다.' },
    read: false, effect: { REALTY: 0.93, BANK: 0.96 },
  },

  // Day 3 — 4 additional items
  {
    id: 'b3-1', dayIdx: 3,
    title: { en: 'Food Supply Chain Disruption Sparks Inflation Fears', ko: '식품 공급망 혼란, 인플레이션 우려 촉발' },
    content: { en: 'Severe drought conditions across major grain-producing regions triggered a 19% spike in global wheat and corn futures, prompting food manufacturers to warn of imminent margin compression. Several packaged-goods companies pre-announced cost headwinds, with analysts estimating a 200–350 basis point hit to gross margins in the near term.', ko: '주요 곡물 생산지의 심각한 가뭄 조건이 전 세계 밀과 옥수수 선물을 19% 급등시켜 식품 제조업체들이 임박한 마진 압박을 경고했습니다. 일부 포장식품 기업들이 비용 역풍을 사전 예고하면서 애널리스트들은 단기적으로 매출총이익률이 200~350 베이시스 포인트 하락할 것으로 추정했습니다.' },
    read: false, effect: { FOOD: 0.93 },
  },
  {
    id: 'b3-2', dayIdx: 3,
    title: { en: 'Defense Budget Supplemental Adds $85B for Aerospace Programs', ko: '국방 추경예산, 항공우주 프로그램에 850억 달러 추가' },
    content: { en: 'Congress passed an emergency supplemental defense appropriation allocating $85 billion to next-generation fighter jets, autonomous drone swarms, and orbital surveillance systems. Major aerospace contractors announced accelerated hiring of 12,000 engineers and technicians to meet accelerated delivery schedules. Technically, the sector index also reclaimed its 200-day moving average this week, a level that often attracts momentum buyers.', ko: '의회가 차세대 전투기, 자율 드론 군집, 궤도 감시 시스템에 850억 달러를 배정하는 긴급 국방 추가 예산을 통과시켰습니다. 주요 항공우주 계약업체들은 가속화된 납기 일정을 맞추기 위해 엔지니어와 기술자 1만 2,000명을 긴급 채용한다고 발표했습니다. 기술적으로는 섹터 지수가 이번 주 200일 이동평균을 회복해 모멘텀 매수자를 끌어들이는 주요 지지선을 확보했습니다.' },
    read: false, effect: { AERO: 1.08 },
  },
  {
    id: 'b3-3', dayIdx: 3,
    title: { en: 'AI Health Diagnostics Receive Landmark Regulatory Clearance', ko: 'AI 건강 진단, 획기적인 규제 승인 획득' },
    content: { en: 'The FDA granted Class II clearance to an AI-driven early-cancer-detection platform that demonstrated 96% accuracy in multi-center clinical trials, a benchmark surpassing traditional radiologist interpretation. The decision opens an estimated $28 billion addressable market for digital pathology and imaging-AI applications.', ko: 'FDA가 다기관 임상시험에서 기존 방사선과 판독을 능가하는 96% 정확도를 보인 AI 기반 초기 암 감지 플랫폼에 Class II 승인을 부여했습니다. 이번 결정으로 디지털 병리학 및 이미징 AI 애플리케이션 분야의 추정 280억 달러 규모 시장이 열렸습니다.' },
    read: false, effect: { HEALTH: 1.07, TECH: 1.03 },
  },
  {
    id: 'b3-4', dayIdx: 3,
    title: { en: 'Crypto Exchange Giants Eye Banking Charter Applications', ko: '암호화폐 거래소 대기업, 은행 인가 신청 추진' },
    content: { en: 'Two of the largest digital asset exchanges submitted applications for full banking charters, seeking to offer FDIC-insured accounts and traditional lending products alongside crypto custody services. The move drew sharp criticism from incumbent banks but was welcomed by crypto-native investors anticipating mainstream legitimacy.', ko: '두 개의 최대 디지털 자산 거래소가 암호화폐 수탁 서비스와 함께 FDIC 보험 계좌 및 전통적인 대출 상품을 제공하기 위해 정식 은행 인가 신청서를 제출했습니다. 이 조치는 기존 은행들의 강한 반발을 샀지만 주류 합법성을 기대하는 암호화폐 네이티브 투자자들의 환영을 받았습니다.' },
    read: false, effect: { CRYPTO: 1.07, BANK: 0.94 },
  },

  // Day 4 — 4 additional items
  {
    id: 'b4-1', dayIdx: 4,
    title: { en: 'Carbon Credit Market Crosses $100B Threshold', ko: '탄소 크레딧 시장, 1,000억 달러 돌파' },
    content: { en: 'Verified carbon credit trading volumes surpassed $100 billion for the first time, driven by newly mandatory offset requirements for airlines and shipping companies under a revised international climate accord. Green energy developers with large credit inventories saw their forward revenue projections revised significantly upward.', ko: '검증된 탄소 크레딧 거래량이 처음으로 1,000억 달러를 넘어섰습니다. 이는 개정된 국제 기후 협약에 따라 항공사와 해운사에 새로 도입된 의무적 상쇄 요건에 의해 주도됐습니다. 대규모 크레딧 재고를 보유한 친환경 에너지 개발업체들의 선도 수익 전망치가 상당히 상향 조정됐습니다.' },
    read: false, effect: { GREEN: 1.08, AERO: 0.95 },
  },
  {
    id: 'b4-2', dayIdx: 4,
    title: { en: 'Housing Starts Rebound Sharply on Mortgage Rate Relief', ko: '주택 착공, 모기지 금리 완화로 급반등' },
    content: { en: 'New housing starts jumped 22% month-over-month as 30-year fixed mortgage rates dipped to an 18-month low, reigniting homebuilder optimism and boosting real estate investment activity. Commercial real estate values in suburban markets showed early signs of stabilization, reducing near-term distress risk for lending portfolios.', ko: '30년 고정 모기지 금리가 18개월 최저치로 하락하면서 신규 주택 착공이 전월 대비 22% 급증해 주택건설업체의 낙관론이 재점화되고 부동산 투자 활동이 활기를 띠었습니다. 교외 시장의 상업용 부동산 가치가 안정화 초기 징후를 보이면서 대출 포트폴리오의 단기 부실 위험이 감소했습니다.' },
    read: false, effect: { REALTY: 1.07, BANK: 1.04 },
  },
  {
    id: 'b4-3', dayIdx: 4,
    title: { en: 'Fast Food Chains Adopt AI Ordering Kiosks Nationwide', ko: '패스트푸드 체인, 전국적으로 AI 주문 키오스크 도입' },
    content: { en: 'The three largest quick-service restaurant groups simultaneously announced full deployment of AI-driven kiosks and kitchen automation systems in over 40,000 locations, aiming to reduce labor costs by 18%. Consumer research indicates upsell rates increase by roughly 25% with AI-curated menu suggestions, boosting average ticket size.', ko: '3대 패스트푸드 그룹이 인건비 18% 절감을 목표로 40,000개 이상의 매장에 AI 기반 키오스크와 주방 자동화 시스템을 동시에 전면 도입한다고 발표했습니다. 소비자 연구에 따르면 AI 큐레이션 메뉴 제안으로 추가 판매율이 약 25% 증가해 평균 주문 금액이 상승했습니다.' },
    read: false, effect: { FOOD: 1.07, TECH: 1.02 },
  },
  {
    // TRAP: Headline sounds very bearish, but forced password-sharing crackdown actually monetizes freeloaders → surprise positive for media
    id: 'b4-4', dayIdx: 4,
    title: { en: 'Media Streaming Subscriber Growth Stalls in Saturated Markets', ko: '미디어 스트리밍 구독자 증가, 포화 시장에서 정체' },
    content: { en: 'Quarterly earnings season revealed that net subscriber additions for major streaming platforms missed consensus by an average of 34%, with North American and Western European markets showing near-zero organic growth. However, a closer look shows password-sharing crackdowns converted millions of freeloaders into paying accounts, quietly lifting average revenue per user to record highs — a pattern savvy investors recognized as a bullish sign beneath the gloomy headline.', ko: '분기 실적 시즌에서 주요 스트리밍 플랫폼의 순 구독자 추가가 평균 34% 컨센서스를 하회했으며, 북미와 서유럽 시장은 유기적 성장이 거의 제로에 가까운 것으로 나타났습니다. 그러나 자세히 살펴보면 계정 공유 단속이 수백만 명의 무임 승차자를 유료 계정으로 전환시켜 사용자당 평균 매출을 조용히 사상 최고치로 끌어올렸으며, 이는 어두운 헤드라인 이면의 강세 신호로 노련한 투자자들이 주목하는 패턴입니다.' },
    read: false, effect: { MEDIA: 1.04 },
  },

  // Day 5 — 2 additional items
  {
    id: 'b5-1', dayIdx: 5,
    title: { en: 'Supply Chain Robotics Boom Reshapes Logistics Economics', ko: '공급망 로봇공학 붐, 물류 경제 재편' },
    content: { en: 'An industry-wide survey found that 68% of major distribution centers have deployed or are actively piloting autonomous mobile robots, cutting fulfillment cycle times by an average of 41%. E-commerce platforms and logistics-adjacent technology firms are the primary beneficiaries as per-unit shipping costs hit multi-year lows.', ko: '업계 전반 조사에서 주요 유통센터의 68%가 자율이동로봇을 배치했거나 적극적으로 시범 운영 중이며 평균 주문 처리 사이클 시간이 41% 단축됐습니다. 전자상거래 플랫폼과 물류 인접 기술 기업들이 단위당 배송 비용이 수년 만에 최저치를 기록하면서 주요 수혜자가 되고 있습니다.' },
    read: false, effect: { ECOM: 1.06, TECH: 1.04 },
  },
  {
    id: 'b5-2', dayIdx: 5,
    title: { en: 'Regional Banks Post Mixed Results on Loan-Loss Provisions', ko: '지역 은행들, 대손충당금 관련 엇갈린 실적 발표' },
    content: { en: 'Mid-tier regional banks reported divergent results this quarter, with well-capitalized institutions benefiting from higher net interest margins while overleveraged peers were forced to raise loan-loss provisions by up to 40%. The bifurcation is raising systemic concerns, as smaller lenders account for nearly 70% of commercial real estate credit exposure.', ko: '중견 지역 은행들이 이번 분기 엇갈린 실적을 보고했습니다. 자본이 충분한 기관은 더 높은 순이자 마진의 혜택을 누린 반면, 과도하게 레버리지된 기관들은 대손충당금을 최대 40% 늘려야 했습니다. 소규모 대출기관이 상업용 부동산 신용 익스포저의 거의 70%를 차지하는 상황에서 이 양극화가 시스템적 우려를 키우고 있습니다.' },
    read: false, effect: { BANK: 0.93, REALTY: 0.95 },
  },

  // Day 6 — 4 additional items
  {
    id: 'b6-1', dayIdx: 6,
    title: { en: 'OPEC+ Cuts Production; Energy Transition Stocks Rally', ko: 'OPEC+, 생산량 감산 결정; 에너지 전환주 강세' },
    content: { en: 'OPEC+ announced a surprise 1.5 million barrel-per-day production cut, pushing crude oil above $95/bbl and simultaneously boosting the economic case for green energy alternatives. Renewable energy developers reported accelerated customer inquiries as the price shock reinforced long-term decarbonization commitments from major corporations.', ko: 'OPEC+가 하루 150만 배럴의 기습 감산을 발표해 국제유가가 배럴당 95달러를 넘어섰으며, 동시에 친환경 에너지 대안의 경제성을 강화했습니다. 이번 가격 충격이 주요 기업들의 장기 탈탄소화 약속을 강화하면서 재생에너지 개발업체들은 고객 문의가 가속화됐다고 보고했습니다.' },
    read: false, effect: { GREEN: 1.07, AERO: 0.93 },
  },
  {
    id: 'b6-2', dayIdx: 6,
    title: { en: 'Health Sector Faces Generic Drug Pricing Pressure in Congress', ko: '헬스케어 섹터, 의회에서 제네릭 의약품 가격 압박에 직면' },
    content: { en: 'A bipartisan Senate bill targeting pharmaceutical pricing would cap branded drug margins at 15% above generic equivalents and impose mandatory rebate claw-backs for Medicare-covered treatments. Biotech and pharmaceutical stocks fell sharply as lobbyists acknowledged a realistic chance of passage before the fiscal year end.', ko: '제약 가격을 겨냥한 초당적 상원 법안이 제네릭 동등품 대비 브랜드 의약품 마진을 15%로 제한하고 메디케어 적용 치료에 의무적 리베이트 환수를 부과할 예정입니다. 로비스트들이 회계연도 종료 전 통과 가능성을 인정하면서 바이오텍과 제약 주가가 급락했습니다.' },
    read: false, effect: { HEALTH: 0.93 },
  },
  {
    id: 'b6-3', dayIdx: 6,
    title: { en: 'Consumer Spending Data Shows Resilient Discretionary Demand', ko: '소비자 지출 데이터, 견조한 임의소비 수요 시사' },
    content: { en: 'The latest consumer expenditure survey revealed discretionary spending rose 3.1% in real terms last quarter, beating expectations despite persistent headline inflation. Interestingly, sentiment surveys are flashing extreme bullishness — a classic contrarian warning that markets may be pricing in perfection, even as the underlying data remains solid.', ko: '최신 소비자 지출 조사에서 임의소비 지출이 지속적인 헤드라인 인플레이션에도 불구하고 지난 분기 실질 기준 3.1% 증가해 예상치를 웃돌았습니다. 흥미롭게도 심리 설문조사는 극단적인 낙관론을 나타내고 있으며, 이는 기초 데이터가 견고한 상황에서도 시장이 완벽함을 가격에 반영할 수 있다는 고전적인 역발상 경고입니다.' },
    read: false, effect: { FOOD: 1.06, MEDIA: 1.05 },
  },
  {
    id: 'b6-4', dayIdx: 6,
    title: { en: 'Crypto Regulation Framework Advances in G20 Nations', ko: 'G20 국가에서 암호화폐 규제 프레임워크 진전' },
    content: { en: 'Finance ministers from the G20 endorsed a unified crypto asset classification and reporting standard, providing the regulatory clarity that institutional investors had long demanded. Compliance-ready exchanges and custody platforms rallied, while unregistered decentralized protocols faced fresh delisting pressure from compliant trading venues.', ko: 'G20 재무장관들이 기관 투자자들이 오랫동안 요구해온 규제 명확성을 제공하는 통합 암호화 자산 분류 및 보고 기준을 승인했습니다. 규정 준수 준비가 된 거래소와 수탁 플랫폼이 강세를 보인 반면, 미등록 탈중앙화 프로토콜은 규정 준수 거래 장소로부터 새로운 상장 폐지 압박에 직면했습니다.' },
    read: false, effect: { CRYPTO: 1.08, BANK: 1.03 },
  },

  // Day 7 — 2 additional items
  {
    // TRAP: Headline sounds very bearish (antitrust fines), but forced data-sharing actually levels the competitive field — smaller rivals now gain access, boosting the broader TECH ecosystem
    id: 'b7-1', dayIdx: 7,
    title: { en: 'Tech Giants Face EU Antitrust Fines Over AI Data Practices', ko: '기술 대기업, AI 데이터 관행으로 EU 반독점 과징금 직면' },
    content: { en: 'The European Commission issued preliminary antitrust findings against three major technology platforms, alleging that proprietary AI training datasets constitute illegal barriers to entry for smaller competitors. The combined penalty exposure exceeds €22 billion, yet the mandated data-sharing provisions are expected to accelerate AI innovation across the entire sector — a dynamic that historically has lifted the broader technology index even as individual incumbents pay fines.', ko: '유럽 위원회가 세 개의 주요 기술 플랫폼에 대해 독자적인 AI 학습 데이터셋이 소규모 경쟁사에 대한 불법 진입 장벽을 구성한다고 주장하며 반독점 예비 조사 결과를 발표했습니다. 합산 벌금 노출액이 220억 유로를 초과하지만, 의무화된 데이터 공유 조항이 섹터 전반의 AI 혁신을 가속화할 것으로 예상되며 이는 개별 기업이 벌금을 내는 가운데서도 역사적으로 기술 지수 전체를 견인해온 역학 구조입니다.' },
    read: false, effect: { TECH: 1.03 },
  },
  {
    id: 'b7-2', dayIdx: 7,
    title: { en: 'Property REITs Pivot to Data Center Conversions', ko: '부동산 리츠, 데이터 센터 전환으로 방향 전환' },
    content: { en: 'Several large real estate investment trusts announced plans to convert underutilized office and retail properties into AI inference and cloud data center facilities, a pivot that attracted strong institutional interest. The redevelopment pipeline represents $14 billion in conversion capex and is expected to generate yields substantially above traditional commercial office assets.', ko: '여러 대형 부동산 투자 신탁이 활용도가 낮은 사무실과 소매 부동산을 AI 추론 및 클라우드 데이터 센터 시설로 전환하는 계획을 발표해 강한 기관 투자자 관심을 끌었습니다. 재개발 파이프라인은 140억 달러의 전환 자본 지출을 나타내며 전통적인 상업용 사무실 자산보다 상당히 높은 수익률을 창출할 것으로 예상됩니다.' },
    read: false, effect: { REALTY: 1.08, TECH: 1.03 },
  },

  // Day 8 — 3 additional items
  {
    id: 'b8-1', dayIdx: 8,
    title: { en: 'Labor Strikes Hit Major Logistics and Distribution Hubs', ko: '대형 물류 및 유통 허브, 노동 파업 직격' },
    content: { en: 'Coordinated labor actions at six major port and distribution complexes halted an estimated $3.2 billion in daily goods flow, raising alarm among retailers about pre-holiday inventory stockouts. E-commerce operators with heavily outsourced logistics faced the sharpest operational exposure, triggering emergency last-mile procurement at premium rates. Market breadth data told a cautious story: declining stocks outnumbered advancing ones by roughly 4-to-1 on the session, suggesting broad selling pressure rather than isolated sector weakness.', ko: '6개 주요 항만 및 유통 단지에서의 조직적 파업으로 하루 약 32억 달러 규모의 상품 흐름이 중단되어 소매업체들이 연휴 전 재고 부족에 대해 경보를 울렸습니다. 물류를 과도하게 아웃소싱한 전자상거래 운영업체들이 가장 큰 운영 위험에 직면해 프리미엄 요율로 긴급 라스트마일 조달에 나섰습니다. 시장 폭(Market Breadth) 데이터도 신중한 흐름을 보여주었는데, 해당 세션에서 하락 종목이 상승 종목을 약 4대1로 압도하며 고립된 섹터 약세가 아닌 광범위한 매도 압력을 시사했습니다.' },
    read: false, effect: { ECOM: 0.93, FOOD: 0.95 },
  },
  {
    id: 'b8-2', dayIdx: 8,
    title: { en: 'Satellite Internet Constellations Drive Aerospace Backlog Surge', ko: '위성 인터넷 성좌, 항공우주 수주 잔고 급증 견인' },
    content: { en: 'Three competing low-Earth-orbit broadband networks placed combined orders for 1,400 new satellites, creating an $18 billion manufacturing backlog that will keep aerospace production lines fully booked through 2028. Component suppliers and launch service providers also reported order intake at decade-high levels.', ko: '세 개의 경쟁 저궤도 광대역 네트워크가 신규 위성 1,400기를 합산 발주해 2028년까지 항공우주 생산라인을 완전 가동시킬 180억 달러 규모의 제조 수주 잔고를 만들었습니다. 부품 공급업체와 발사 서비스 제공업체들도 10년 만에 최고 수준의 수주를 보고했습니다.' },
    read: false, effect: { AERO: 1.08, TECH: 1.02 },
  },
  {
    id: 'b8-3', dayIdx: 8,
    title: { en: 'Digital Advertising Market Surges on AI Creative Tools Adoption', ko: '디지털 광고 시장, AI 창작 도구 채택으로 급성장' },
    content: { en: 'Ad spending data for the quarter showed total digital advertising grew 18% year-over-year, significantly outpacing GDP, as AI-generated creative assets slashed campaign production costs by up to 60%. Media and content platforms benefiting from programmatic inventory saw the strongest revenue acceleration, particularly in video and interactive formats.', ko: '분기 광고 지출 데이터에서 AI 생성 창작 자산이 캠페인 제작 비용을 최대 60% 절감하면서 총 디지털 광고가 전년 동기 대비 18% 성장해 GDP를 크게 상회했습니다. 프로그래매틱 인벤토리의 혜택을 받는 미디어 및 콘텐츠 플랫폼은 특히 비디오와 인터랙티브 포맷에서 가장 강한 매출 가속을 경험했습니다.' },
    read: false, effect: { MEDIA: 1.07, TECH: 1.03 },
  },

  // Day 9 — 3 additional items
  {
    id: 'b9-1', dayIdx: 9,
    title: { en: 'Pandemic Preparedness Fund Unlocks $200B Global Health Investment', ko: '팬데믹 대비 기금, 2,000억 달러 글로벌 헬스 투자 해제' },
    content: { en: 'An international coalition of governments committed $200 billion to a standing pandemic preparedness fund, with immediate procurement contracts for next-generation therapeutics and rapid-response manufacturing capacity. Health sector companies with established mRNA and antiviral platforms are first in line for the multi-year procurement pipeline.', ko: '각국 정부로 구성된 국제 연합이 차세대 치료제 및 신속 대응 제조 역량에 대한 즉각적인 조달 계약과 함께 상시 팬데믹 대비 기금에 2,000억 달러를 약속했습니다. 확립된 mRNA 및 항바이러스 플랫폼을 보유한 헬스케어 기업들이 다년간 조달 파이프라인에서 우선 순위를 차지하고 있습니다.' },
    read: false, effect: { HEALTH: 1.09, TECH: 1.02 },
  },
  {
    id: 'b9-2', dayIdx: 9,
    title: { en: 'Green Hydrogen Cost Breakthrough Accelerates Industrial Decarbonization', ko: '그린 수소 비용 혁신, 산업 탈탄소화 가속화' },
    content: { en: 'Researchers announced a new electrolyzer membrane achieving a 40% improvement in energy efficiency, pushing green hydrogen production costs below $1.50/kg for the first time and undercutting grey hydrogen at current gas prices. Industrial companies in steel, cement, and chemicals announced accelerated timelines for fuel-switching programs.', ko: '연구진이 에너지 효율을 40% 향상시킨 새로운 전해조 막을 발표해 그린 수소 생산 비용이 처음으로 킬로그램당 1.50달러 이하로 떨어지며 현재 가스 가격에서 그레이 수소를 하회했습니다. 철강, 시멘트, 화학 분야의 산업체들이 연료 전환 프로그램의 가속화 일정을 발표했습니다.' },
    read: false, effect: { GREEN: 1.08, AERO: 1.03 },
  },
  {
    id: 'b9-3', dayIdx: 9,
    title: { en: 'Institutional Crypto Allocations Hit $1.2T as ETF Flows Surge', ko: '기관 암호화폐 배분, ETF 자금 유입 급증으로 1.2조 달러 돌파' },
    content: { en: 'Asset managers disclosed that aggregate institutional crypto allocations crossed $1.2 trillion, fueled by record inflows into spot Bitcoin and Ethereum ETFs since regulatory approval. Wealth management platforms reported that over 34% of high-net-worth clients now hold at least a 2% digital asset allocation, a figure that doubled from 12 months prior.', ko: '자산운용사들이 규제 승인 이후 현물 비트코인 및 이더리움 ETF에 대한 기록적인 자금 유입에 힘입어 기관 암호화폐 배분 합계가 1.2조 달러를 넘어섰다고 공시했습니다. 자산관리 플랫폼들은 고액 자산가 고객의 34% 이상이 현재 최소 2%의 디지털 자산 배분을 보유하고 있으며, 이는 12개월 전에서 두 배 증가한 수치라고 보고했습니다.' },
    read: false, effect: { CRYPTO: 1.09, BANK: 1.04 },
  },

  // Day 10 — 2 additional items
  {
    id: 'b10-1', dayIdx: 10,
    title: { en: 'Geopolitical Tensions Trigger Safe-Haven Rotation Out of Equities', ko: '지정학적 긴장, 주식 이탈 안전자산 로테이션 촉발' },
    content: { en: 'Escalating territorial disputes in two strategic shipping corridors prompted institutional investors to reduce equity exposure and rotate into gold, sovereign bonds, and defensive asset classes. Technology and growth sectors bore the largest selling pressure, while banks with significant emerging-market credit exposure also came under scrutiny.', ko: '두 개의 전략적 해상 통로에서 영토 분쟁이 고조되면서 기관 투자자들이 주식 노출을 줄이고 금, 국채, 방어적 자산 클래스로 로테이션했습니다. 기술주와 성장 섹터가 가장 큰 매도 압박을 받았으며, 신흥시장 신용 익스포저가 큰 은행들도 주목을 받았습니다.' },
    read: false, effect: { TECH: 0.93, BANK: 0.94, ECOM: 0.95 },
  },
  {
    id: 'b10-2', dayIdx: 10,
    title: { en: 'Food Tech Unicorns Raise $8B Round to Scale Precision Fermentation', ko: '푸드테크 유니콘, 정밀 발효 확대 위해 80억 달러 라운드 조성' },
    content: { en: 'A cluster of precision fermentation and cultivated protein startups completed an $8 billion combined fundraise backed by sovereign wealth funds and strategic food conglomerates, signaling confidence in the commercial viability of next-generation protein sources. Traditional food manufacturers face mounting competitive pressure as unit cost curves for lab-grown alternatives continue their steep decline.', ko: '정밀 발효 및 배양 단백질 스타트업 그룹이 국부 펀드와 전략적 식품 대기업이 지원하는 80억 달러 합산 펀드레이즈를 완료하며 차세대 단백질 공급원의 상업적 가능성에 대한 신뢰를 보였습니다. 랩 그로운 대안의 단위 비용 곡선이 계속 가파르게 하락하면서 전통 식품 제조업체들은 증가하는 경쟁 압박에 직면해 있습니다.' },
    read: false, effect: { FOOD: 1.06, TECH: 1.03 },
  },
];
