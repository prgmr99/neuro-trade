import { News } from '../../types';

export const BOOST_DAYS_11_20: News[] = [
  // Day 11 — 2 additional items
  {
    id: 'c11-1', dayIdx: 11,
    title: { en: 'Sovereign Wealth Funds Accelerate Real Estate Diversification', ko: '국부 펀드, 부동산 포트폴리오 다변화 가속' },
    content: { en: 'Three of the world\'s largest sovereign wealth funds disclosed combined $42 billion real estate allocation shifts, rotating out of US office towers into logistics, data centers, and multifamily residential assets. While headlines celebrated the influx of capital into new segments, the mass exodus from traditional office and retail REITs accelerated existing occupancy declines — dragging down valuations for the broader real estate sector despite the sector-specific winners.', ko: '세계 3대 국부 펀드가 420억 달러 규모의 부동산 배분을 미국 오피스 빌딩에서 물류, 데이터 센터, 공동 주거 자산으로 이동한다고 공시했습니다. 새로운 부문으로의 자금 유입이 주목받았지만, 기존 오피스 및 소매 리츠로부터의 대규모 자금 이탈이 이미 진행 중인 공실률 하락을 가속화하면서 특정 부문의 수혜에도 불구하고 부동산 섹터 전반의 가치가 하락했습니다.' },
    read: false, effect: { REALTY: 0.95, BANK: 0.98 },
  },
  {
    id: 'c11-2', dayIdx: 11,
    title: { en: 'Fast-Casual Dining Chains Report Record Same-Store Sales Growth', ko: '패스트캐주얼 외식 체인, 동일 매장 매출 사상 최고치 기록' },
    content: { en: 'Leading fast-casual restaurant groups reported a 12% same-store sales increase in the latest quarter, driven by menu price optimization and a rebound in office-adjacent foot traffic following remote-work normalization. Analysts note an interesting investor split: income-focused buyers are drawn to the sector\'s newly raised dividend yield of 3.2%, while growth-oriented funds argue the capital would be better reinvested in new locations — illustrating the classic tension between dividend yield and growth potential when evaluating mature consumer brands.', ko: '주요 패스트캐주얼 레스토랑 그룹이 메뉴 가격 최적화와 재택근무 정상화 이후 오피스 인근 유동인구 회복에 힘입어 최근 분기 동일 매장 매출이 12% 증가했다고 보고했습니다. 애널리스트들은 투자자 사이의 흥미로운 견해 차이를 주목합니다. 수익 중심 투자자들은 새롭게 인상된 3.2%의 배당 수익률에 끌리는 반면, 성장 지향 펀드들은 해당 자본을 신규 매장 출점에 재투자하는 것이 더 낫다고 주장합니다. 이는 성숙한 소비재 브랜드를 평가할 때 배당 수익률과 성장 잠재력 사이의 고전적 긴장 관계를 잘 보여줍니다.' },
    read: false, effect: { FOOD: 1.07 },
  },

  // Day 12 — 3 additional items
  {
    id: 'c12-1', dayIdx: 12,
    title: { en: 'Green Bond Issuance Shatters Annual Record Mid-Year', ko: '그린 본드 발행, 연중에 연간 기록 돌파' },
    content: { en: 'Global green bond issuance crossed $1 trillion for the first time in the first six months of the year, with corporate issuers accounting for 58% of the total — up from 41% the prior year. Notably, executives at several top clean energy developers have been purchasing their own company shares in the open market at an accelerating pace, a widely watched insider buying signal that investors interpret as strong management conviction that current valuations understate long-term project value.', ko: '연간 상반기 기준으로 글로벌 그린 본드 발행이 처음으로 1조 달러를 돌파했으며, 기업 발행사 비중이 전년도 41%에서 58%로 높아졌습니다. 주목할 점은 여러 주요 청정에너지 개발업체 경영진이 공개 시장에서 자사주 매입을 빠르게 늘리고 있다는 것입니다. 이는 널리 주목받는 내부자 매수 신호로, 투자자들은 현재 주가가 장기 프로젝트 가치를 과소평가하고 있다는 경영진의 강한 확신으로 해석합니다.' },
    read: false, effect: { GREEN: 1.08 },
  },
  {
    id: 'c12-2', dayIdx: 12,
    title: { en: 'Telehealth Platform Mergers Reshape Digital Health Landscape', ko: '원격의료 플랫폼 합병, 디지털 헬스 지형 재편' },
    content: { en: 'Two of the largest telehealth providers announced a $9.4 billion all-stock merger to create an integrated virtual care network spanning primary care, mental health, and chronic disease management. The combined entity will serve over 28 million patients and is expected to achieve $650 million in annual cost synergies within three years through shared infrastructure and provider networks.', ko: '최대 원격의료 서비스 제공업체 두 곳이 94억 달러 규모의 전량 주식 교환 합병을 발표해 1차 진료, 정신건강, 만성질환 관리를 아우르는 통합 가상진료 네트워크를 구축합니다. 합병 법인은 2,800만 명 이상의 환자를 서비스하게 되며, 인프라와 의료진 네트워크 공유를 통해 3년 내 연간 6억 5,000만 달러의 비용 시너지를 달성할 것으로 기대됩니다.' },
    read: false, effect: { HEALTH: 1.08, TECH: 1.02 },
  },
  {
    id: 'c12-3', dayIdx: 12,
    title: { en: 'Airline Capacity Constraints Boost Premium Ticket Pricing Power', ko: '항공사 공급 제한, 프리미엄 항공권 가격 결정력 강화' },
    content: { en: 'Aircraft delivery delays from major manufacturers have kept industrywide seat capacity 8% below pre-pandemic levels, enabling carriers to sustain premium economy and business class fares at historically elevated levels. Load factors averaged 91% systemwide last month, and three major airlines raised full-year earnings guidance citing a sustained high-margin demand environment.', ko: '주요 항공기 제조업체의 납기 지연으로 업계 전체 좌석 공급이 팬데믹 이전 대비 8% 낮은 수준을 유지해 항공사들이 프리미엄 이코노미와 비즈니스 클래스 운임을 역사적으로 높은 수준으로 유지할 수 있게 됐습니다. 지난달 시스템 전체 탑승률이 평균 91%를 기록하면서 세 개 주요 항공사가 고마진 수요 환경 지속을 이유로 연간 실적 가이던스를 상향 조정했습니다.' },
    read: false, effect: { AERO: 1.07 },
  },

  // Day 13 — 3 additional items
  {
    id: 'c13-1', dayIdx: 13,
    title: { en: 'Media Conglomerates Pivot to Live Sports Rights as Streaming Differentiator', ko: '미디어 대기업, 스트리밍 차별화 전략으로 스포츠 생중계 중시' },
    content: { en: 'Three major media groups collectively committed $38 billion to live sports broadcasting rights over the next decade, betting that exclusive sporting events are among the few content categories immune to subscriber churn. Advertising revenue projections were lifted as live sports command a 3–5x premium CPM over standard video-on-demand inventory, strengthening the financial case for the acquisitions.', ko: '세 개의 주요 미디어 그룹이 향후 10년간 스포츠 생중계 중계권에 총 380억 달러를 투자하기로 약속했습니다. 독점 스포츠 이벤트가 구독자 이탈에 면역인 몇 안 되는 콘텐츠 카테고리 중 하나라는 판단에서입니다. 스포츠 생중계가 일반 VOD 인벤토리 대비 CPM 3~5배 프리미엄을 받으면서 광고 수익 전망이 상향됐습니다.' },
    read: false, effect: { MEDIA: 1.09 },
  },
  {
    id: 'c13-2', dayIdx: 13,
    title: { en: 'Emerging Market Consumer Boom Drives E-Commerce Cross-Border Growth', ko: '신흥시장 소비 붐, 이커머스 국가 간 거래 성장 견인' },
    content: { en: 'A major cross-border e-commerce index revealed that shipments from emerging market consumers to global platforms grew 44% year-over-year, as rising middle-class incomes in Southeast Asia and Latin America drove discretionary spending online. Analysts point out a notable market cap divergence in the beneficiaries: large-cap platform giants with existing regional infrastructure absorbed the volume surge smoothly and saw steady gains, while small-cap logistics enablers — nimbler but more capital-constrained — experienced volatile swings as investors bet on which players would capture the long-tail opportunity.', ko: '주요 국가 간 전자상거래 지수에 따르면 동남아시아와 라틴 아메리카의 중산층 소득 증가로 신흥시장 소비자들의 글로벌 플랫폼 주문이 전년 대비 44% 증가했습니다. 애널리스트들은 수혜 기업 간의 시가총액별 뚜렷한 차이를 지적합니다. 기존 지역 인프라를 갖춘 대형주 플랫폼은 물량 급증을 안정적으로 소화하며 꾸준한 상승세를 보인 반면, 더 민첩하지만 자본 여력이 제한된 소형주 물류 지원 기업들은 어느 업체가 장기 기회를 포착할지 베팅하는 투자자들로 인해 변동성이 큰 움직임을 보였습니다.' },
    read: false, effect: { ECOM: 1.08 },
  },
  {
    id: 'c13-3', dayIdx: 13,
    title: { en: 'Fintech Challenger Banks Surpass 150 Million Global Accounts', ko: '핀테크 챌린저 뱅크, 전 세계 계좌 수 1억 5,000만 개 돌파' },
    content: { en: 'A composite report tracking digital-native challenger banks confirmed total global account openings surpassed 150 million, with monthly active user growth of 22% outpacing incumbent retail banks by a factor of six. The challenger bank cohort now controls an estimated $890 billion in deposits, prompting incumbent lenders to accelerate investment in app-based user experience overhauls to stem market share losses.', ko: '디지털 네이티브 챌린저 뱅크를 추적하는 종합 보고서에 따르면 전 세계 계좌 개설 수가 1억 5,000만 개를 넘어섰으며, 월간 활성 사용자 성장률이 22%로 기존 소매 은행의 6배에 달했습니다. 챌린저 뱅크 코호트는 현재 약 8,900억 달러의 예금을 관리하며, 이에 기존 대출 기관들은 시장 점유율 손실을 막기 위해 앱 기반 사용자 경험 개선 투자를 가속화하고 있습니다.' },
    read: false, effect: { BANK: 0.94, TECH: 1.04 },
  },

  // Day 14 — 2 additional items
  {
    id: 'c14-1', dayIdx: 14,
    title: { en: 'Pharmaceutical Giants Launch Joint Manufacturing Consortium for Pandemic Preparedness', ko: '제약 대기업, 팬데믹 대비 공동 생산 컨소시엄 출범' },
    content: { en: 'Six leading pharmaceutical companies announced the formation of a joint manufacturing consortium with $15 billion in committed capacity to produce up to 4 billion doses of any novel vaccine within 180 days of a pathogen sequence being identified. Governments from 34 nations have signed advance purchase agreements, providing multi-year revenue certainty for consortium members and reducing the speculative risk previously associated with pandemic preparedness investments.', ko: '6개 주요 제약사가 병원체 염기서열 확인 후 180일 내에 신규 백신 40억 회분까지 생산할 수 있는 150억 달러 규모의 공동 생산 컨소시엄 설립을 발표했습니다. 34개국 정부가 사전 구매 계약을 체결해 컨소시엄 참여사에 다년간의 안정적 매출을 보장하고, 팬데믹 대비 투자와 관련된 투기적 리스크를 줄였습니다.' },
    read: false, effect: { HEALTH: 1.07 },
  },
  {
    id: 'c14-2', dayIdx: 14,
    title: { en: 'Carbon Border Adjustment Mechanism Takes Effect in EU', ko: 'EU 탄소국경조정제도(CBAM) 본격 시행' },
    content: { en: 'The European Union\'s Carbon Border Adjustment Mechanism entered its full operative phase, imposing carbon tariffs on imports of steel, cement, aluminum, fertilizers, and electricity from non-compliant trading partners. European clean energy developers and low-carbon industrial producers stand to gain significant competitive advantages as the mechanism raises the effective cost of high-emission imports by an average of 14%.', ko: '유럽연합의 탄소국경조정제도(CBAM)가 완전 시행 단계에 진입해 비준수 무역 파트너로부터 수입되는 철강, 시멘트, 알루미늄, 비료, 전기에 탄소 관세를 부과합니다. 이 제도가 고배출 수입품의 실질 비용을 평균 14% 높이면서 유럽 청정에너지 개발업체와 저탄소 산업 생산자들이 상당한 경쟁 우위를 확보할 전망입니다.' },
    read: false, effect: { GREEN: 1.07, AERO: 0.96 },
  },

  // Day 15 — 3 additional items
  {
    id: 'c15-1', dayIdx: 15,
    title: { en: 'Consumer Credit Delinquencies Tick Up, Banks Raise Provisions', ko: '소비자 신용 연체율 상승, 은행들 대손충당금 확대' },
    content: { en: 'Federal Reserve data showed 90-day-plus consumer credit delinquencies rose to 2.8% — the highest reading in four years — as pandemic-era savings buffers fully depleted for lower-income households. Three major retail banks pre-announced elevated loan loss provisions ranging from $1.2 to $2.7 billion, triggering downgrades from two major credit rating agencies on concerns about asset quality deterioration.', ko: '연방준비제도 데이터에 따르면 저소득층 가계의 팬데믹 시기 저축이 완전히 소진되면서 90일 이상 소비자 신용 연체율이 2.8%로 4년 만에 최고치를 기록했습니다. 세 개의 주요 소매 은행이 12억~27억 달러의 대손충당금 확대를 사전 예고하면서 자산 건전성 악화 우려로 두 개의 주요 신용평가기관이 등급을 하향 조정했습니다.' },
    read: false, effect: { BANK: 0.93, REALTY: 0.95 },
  },
  {
    id: 'c15-2', dayIdx: 15,
    title: { en: 'Global Semiconductor Shortage Eases as New Fabs Come Online', ko: '신규 팹 가동으로 글로벌 반도체 공급 부족 완화' },
    content: { en: 'Industry analysts confirmed that three new advanced semiconductor fabrication plants in the US, Japan, and Germany began commercial production this quarter, adding an estimated 15% to global advanced-node capacity. Lead times for key chips fell from an average of 38 weeks to 22 weeks, easing production bottlenecks for consumer electronics, automotive, and cloud infrastructure manufacturers.', ko: '업계 애널리스트들이 미국, 일본, 독일의 3개 신규 첨단 반도체 팹이 이번 분기 상업 생산을 시작해 전 세계 첨단 공정 생산 능력을 약 15% 확대했다고 확인했습니다. 핵심 칩의 납기가 평균 38주에서 22주로 단축되면서 소비자 전자, 자동차, 클라우드 인프라 제조업체의 생산 병목이 해소되고 있습니다.' },
    read: false, effect: { TECH: 1.08, ECOM: 1.04 },
  },
  {
    id: 'c15-3', dayIdx: 15,
    title: { en: 'International Food Safety Agency Flags Novel Contaminant Risk in Processed Foods', ko: '국제 식품 안전 기관, 가공식품의 신규 오염물질 위험 경보' },
    content: { en: 'The International Food Safety Consortium issued an advisory identifying elevated concentrations of a newly characterized chemical byproduct in a widely used food additive chain, affecting an estimated 400 product SKUs across 12 global markets. Affected consumer goods companies announced voluntary recalls and reformulation programs, with analysts estimating a combined $2.1 billion near-term revenue hit across the sector.', ko: '국제 식품 안전 컨소시엄이 널리 사용되는 식품 첨가물 공급망에서 새롭게 특성 규명된 화학 부산물의 고농도 농축을 발견했다는 권고문을 발표했습니다. 이는 12개 글로벌 시장에서 약 400개 제품 SKU에 영향을 미칩니다. 해당 소비재 기업들이 자발적 리콜과 성분 재구성 프로그램을 발표하면서 애널리스트들은 업계 전체의 단기 매출 타격이 21억 달러에 달할 것으로 추정하고 있습니다.' },
    read: false, effect: { FOOD: 0.91 },
  },

  // Day 16 — 2 additional items
  {
    id: 'c16-1', dayIdx: 16,
    title: { en: 'Real Estate Investment Trusts Report Divergent Segment Performance', ko: '리츠, 세그먼트별 극명한 실적 차이 보고' },
    content: { en: 'Quarterly REIT earnings confirmed a continued bifurcation between industrial and logistics properties — where net operating income grew 17% — and traditional office REITs, where occupancy slipped below 70% for the first time on record in three major metropolitan markets. Analysts are recalibrating sector weightings, with capital rotating aggressively toward data center and cell tower REITs at the expense of office and retail landlord exposure.', ko: '분기 리츠 실적에서 순영업수익이 17% 성장한 산업 및 물류 부동산과 3개 주요 도심 시장에서 가동률이 사상 처음으로 70% 이하로 떨어진 전통적인 오피스 리츠 간의 양극화가 지속되고 있음이 확인됐습니다. 애널리스트들이 섹터 비중을 재조정하면서 오피스 및 소매 임대 노출을 줄이고 데이터 센터와 통신 철탑 리츠로 자금이 공격적으로 이동하고 있습니다.' },
    read: false, effect: { REALTY: 0.93, BANK: 0.97 },
  },
  {
    id: 'c16-2', dayIdx: 16,
    title: { en: 'Precision Agriculture Platforms Report Productivity Breakthroughs', ko: '정밀 농업 플랫폼, 생산성 획기적 향상 보고' },
    content: { en: 'A consortium of precision agriculture technology providers released annual field data showing AI-guided planting, irrigation, and pest management systems improved crop yields by an average of 23% while reducing water consumption by 31% compared to conventional farming practices. The results are accelerating enterprise adoption among large-scale food producers who face mounting regulatory pressure to demonstrate sustainable practices.', ko: '정밀 농업 기술 제공업체 컨소시엄이 AI 기반 파종, 관개, 병충해 관리 시스템이 기존 농업 대비 평균 23% 수확량 향상과 31% 물 소비 감소를 달성했다는 연간 현장 데이터를 발표했습니다. 이 결과는 지속 가능한 관행을 입증하라는 규제 압박이 높아지는 대규모 식품 생산업체들의 기업 채택을 가속화하고 있습니다.' },
    read: false, effect: { FOOD: 1.06, TECH: 1.03 },
  },

  // Day 17 — 1 additional item
  {
    id: 'c17-1', dayIdx: 17,
    title: { en: 'Digital Media Advertising Rebound Lifts Streaming Revenue Outlook', ko: '디지털 미디어 광고 반등, 스트리밍 매출 전망 상향 견인' },
    content: { en: 'The Interactive Advertising Bureau reported a 21% year-over-year surge in connected TV and streaming ad spend in the latest quarter, driven by brand advertisers returning to premium video environments following a period of broad-market caution. Platform operators with ad-supported tiers reported ARPU improvements of 18–27%, demonstrating the monetization upside of hybrid subscription-advertising business models under improving macro conditions.', ko: '인터랙티브 광고국이 광범위한 시장 관망세 이후 브랜드 광고주들이 프리미엄 비디오 환경으로 복귀하면서 최근 분기 커넥티드TV 및 스트리밍 광고비가 전년 대비 21% 급증했다고 보고했습니다. 광고 지원 티어를 운영하는 플랫폼 운영업체들은 ARPU가 18~27% 개선됐다고 보고하며, 거시경제 여건 개선 속에서 하이브리드 구독-광고 비즈니스 모델의 수익화 상향 가능성을 입증했습니다.' },
    read: false, effect: { MEDIA: 1.08, ECOM: 1.03 },
  },

  // Day 18 — 4 additional items
  {
    id: 'c18-1', dayIdx: 18,
    title: { en: 'Major Crypto Exchange Files for IPO at $28 Billion Valuation', ko: '주요 암호화폐 거래소, 280억 달러 기업가치로 IPO 신청' },
    content: { en: 'One of the world\'s top three crypto exchanges filed confidentially for an IPO targeting a $28 billion valuation, citing record institutional trading volumes and expanding custody and staking services revenue streams. Options traders appear to have anticipated the news: in the days preceding the announcement, unusually high call option volume on crypto-related equities pushed the put-call ratio to a decade low, a classic unusual options activity signal that sophisticated market participants often watch as an early indication of pending positive catalysts.', ko: '세계 3대 암호화폐 거래소 중 한 곳이 기록적인 기관 거래량과 수탁 및 스테이킹 서비스 매출 확대를 이유로 280억 달러 기업가치를 목표로 IPO를 비공개 신청했습니다. 옵션 트레이더들은 이 소식을 미리 예상한 것으로 보입니다. 발표 수일 전부터 암호화폐 관련 주식에 대한 비정상적으로 높은 콜옵션 거래량이 풋-콜 비율을 10년 만에 최저치로 끌어내렸는데, 이는 정교한 시장 참여자들이 긍정적인 촉매제 발생을 사전 포착하는 지표로 주목하는 전형적인 비정상적 옵션 활동 신호입니다.' },
    read: false, effect: { CRYPTO: 1.08, BANK: 1.04 },
  },
  {
    id: 'c18-2', dayIdx: 18,
    title: { en: 'Health Insurance Giants Warn of Surging Chronic Disease Cost Burden', ko: '대형 건강보험사, 만성질환 비용 급증 경고' },
    content: { en: 'The four largest US health insurers issued coordinated warnings that chronic disease claims — particularly cardiovascular, diabetes, and metabolic disorder categories — are running 19% above actuarial projections due to deferred pandemic-era screenings now flooding the healthcare system. Premium increases averaging 14% are expected for the next plan year, reigniting political pressure for pharmaceutical pricing reform and preventive care investment mandates.', ko: '미국 4대 건강보험사가 팬데믹 기간 미뤄진 검진이 한꺼번에 몰리면서 특히 심혈관, 당뇨, 대사 장애 범주의 만성질환 보험금 청구가 보험계리 예측치를 19% 상회하고 있다고 공동 경고했습니다. 다음 보험 연도에 평균 14%의 보험료 인상이 예상되면서 제약 가격 개혁 및 예방 의료 투자 의무화에 대한 정치적 압박이 재점화되고 있습니다.' },
    read: false, effect: { HEALTH: 0.93 },
  },
  {
    id: 'c18-3', dayIdx: 18,
    title: { en: 'Grid-Scale Battery Storage Deployments Accelerate on Policy Tailwinds', ko: '정책 지원 힘입어 대형 배터리 저장 설비 확충 가속' },
    content: { en: 'New federal clean energy infrastructure incentives triggered a wave of grid-scale battery storage procurement contracts totaling $31 billion — but a closer read of the fine print reveals the economics are almost entirely subsidy-dependent. Independent analysts warn that without the tax credits, project returns fall below the cost of capital for most developers, meaning any shift in the political climate could strand billions in committed spending and reprice the sector sharply downward.', ko: '새로운 연방 청정에너지 인프라 인센티브가 총 310억 달러 규모의 대형 배터리 저장 설비 조달 계약 물결을 촉발했습니다. 그러나 세부 조항을 면밀히 살펴보면 경제성이 거의 전적으로 보조금에 의존하고 있음이 드러납니다. 독립 애널리스트들은 세액 공제 없이는 대부분의 개발업체에서 프로젝트 수익률이 자본비용을 하회한다고 경고하며, 정치적 환경이 변화할 경우 수십억 달러의 투자가 좌초되고 섹터 전반이 급격히 재평가될 수 있다고 지적합니다.' },
    read: false, effect: { GREEN: 0.94, TECH: 0.97 },
  },
  {
    id: 'c18-4', dayIdx: 18,
    title: { en: 'Retail Credit Card Delinquencies Signal Widening Consumer Stress', ko: '소매 신용카드 연체율, 광범위한 소비자 재무 압박 신호' },
    content: { en: 'Consumer finance data released this week showed retail store credit card delinquency rates reached 5.3%, a level not seen since the 2009 financial crisis, as inflation-depleted purchasing power forces lower-income households into revolving credit to cover essentials. E-commerce platforms with co-branded credit card programs flagged potential revenue headwinds from increased chargeoffs, while traditional banks with large card portfolios said they had already tightened underwriting standards.', ko: '이번 주 발표된 소비자 금융 데이터에서 소매점 신용카드 연체율이 2009년 금융위기 이후 최고치인 5.3%에 달했습니다. 인플레이션으로 구매력이 떨어진 저소득층 가계가 생필품 구입을 위해 회전 신용에 의존하게 된 것입니다. 공동 브랜드 신용카드 프로그램을 운영하는 전자상거래 플랫폼이 충당금 증가에 따른 매출 역풍을 경고했으며, 대규모 카드 포트폴리오를 보유한 전통 은행들은 이미 심사 기준을 강화했다고 밝혔습니다.' },
    read: false, effect: { BANK: 0.92, ECOM: 0.95 },
  },

  // Day 19 — 2 additional items
  {
    id: 'c19-1', dayIdx: 19,
    title: { en: 'Aerospace Defense Contractors Win Hypersonic Weapons Program Awards', ko: '항공우주 방산 업체, 극초음속 무기 프로그램 수주' },
    content: { en: 'The Department of Defense awarded five-year development and production contracts worth $22 billion to leading aerospace defense contractors for next-generation hypersonic glide vehicle and air-breathing missile programs, marking the largest single-program award in the category. Analysts expect the contracts to drive sustained double-digit revenue growth for prime contractors and create a $7 billion subcomponent supply chain opportunity across avionics, advanced materials, and propulsion systems.', ko: '국방부가 차세대 극초음속 활공체 및 공기 흡입식 미사일 프로그램에 대해 주요 항공우주 방산 업체들에게 220억 달러 규모의 5년 개발 및 생산 계약을 수주했으며, 이는 해당 분야 역대 최대 단일 프로그램 수주입니다. 애널리스트들은 이번 계약이 주요 계약업체의 지속적인 두 자릿수 매출 성장을 이끌고 항공전자, 첨단 소재, 추진 시스템 분야에서 70억 달러 규모의 부품 공급망 기회를 창출할 것으로 전망하고 있습니다.' },
    read: false, effect: { AERO: 1.09, TECH: 1.02 },
  },
  {
    id: 'c19-2', dayIdx: 19,
    title: { en: 'Online Food Delivery Consolidation Wave Creates Duopoly in Major Markets', ko: '온라인 음식 배달 시장 통합, 주요 시장에서 복점 구도 형성' },
    content: { en: 'Antitrust authorities in the US and EU approved a landmark merger between the second- and third-largest food delivery platforms, creating a combined entity with 47% market share across 22 countries and the operational scale to achieve profitability within four quarters. Restaurant partners expressed concerns about fee renegotiation leverage, while investors cheered the rational competitive structure that ends a costly market-share war that had depressed unit economics across the sector for three years.', ko: '미국과 EU 반독점 당국이 2위와 3위 음식 배달 플랫폼 간의 합병을 승인해 22개국에서 47% 시장 점유율을 보유하고 4분기 내 흑자 전환이 가능한 통합 법인이 탄생했습니다. 레스토랑 파트너들은 수수료 재협상 협상력에 대한 우려를 표명했지만, 투자자들은 3년간 업계 전반의 단위 경제성을 악화시킨 소모적인 시장 점유율 전쟁을 종식시키는 합리적인 경쟁 구도를 환영했습니다.' },
    read: false, effect: { FOOD: 1.07, ECOM: 1.05 },
  },

  // Day 20 — 4 additional items
  {
    id: 'c20-1', dayIdx: 20,
    title: { en: 'Central Bank Emergency Rate Cut Signals Recession Fears', ko: '중앙은행 긴급 금리 인하, 경기침체 우려 반영' },
    content: { en: 'The Federal Reserve convened an emergency inter-meeting session and cut the benchmark rate by 75 basis points, the largest single-session reduction since the 2020 pandemic response, as forward-looking economic indicators including PMI surveys, freight volumes, and consumer confidence all deteriorated sharply. The surprise cut initially boosted equities but was subsequently interpreted as a distress signal, with real estate and banking sector valuations rerating lower on concerns about net interest margin compression.', ko: '연방준비제도가 PMI 조사, 화물 물량, 소비자 신뢰지수 등 선행 경제 지표가 급격히 악화되면서 2020년 팬데믹 대응 이후 최대인 75bp의 긴급 임시 회의 금리 인하를 단행했습니다. 기습적인 금리 인하가 처음에는 주가를 끌어올렸으나, 이후 위기 신호로 해석되면서 순이자 마진 압축 우려로 부동산과 은행 섹터 가치가 재평가됐습니다.' },
    read: false, effect: { BANK: 0.92, REALTY: 0.93, ECOM: 0.96 },
  },
  {
    id: 'c20-2', dayIdx: 20,
    title: { en: 'Healthcare Sector Defensive Rally as Growth Assets Unwind', ko: '성장 자산 청산 속 헬스케어 섹터 방어적 랠리' },
    content: { en: 'Institutional investors executed a textbook sector rotation, pulling approximately $180 billion out of high-growth technology and discretionary names — where valuations depend on future earnings — and redeploying into defensive healthcare equities that generate stable near-term cash flows regardless of the economic cycle. This is the classic late-cycle rotation playbook: money moves from economically sensitive growth sectors into recession-resilient defensives when investors believe peak growth has passed, with healthcare absorbing the bulk of inflows and outperforming the broader market by 9 percentage points during the shift.', ko: '기관 투자자들이 교과서적인 섹터 로테이션을 실행했습니다. 미래 수익에 의존하는 고성장 기술주와 경기민감 종목에서 약 1,800억 달러를 빼내어, 경기 사이클과 무관하게 안정적인 근기 현금흐름을 창출하는 방어적 헬스케어 주식에 재배치했습니다. 이는 전형적인 경기 후반 섹터 로테이션 전략입니다. 투자자들이 성장 정점을 지났다고 판단할 때 경기 민감 성장 섹터에서 경기침체에 강한 방어주로 자금이 이동하며, 이번 전환 과정에서 헬스케어가 자금 유입의 대부분을 흡수해 시장 전체를 9%포인트 아웃퍼폼했습니다.' },
    read: false, effect: { HEALTH: 1.07, TECH: 0.94 },
  },
  {
    id: 'c20-3', dayIdx: 20,
    title: { en: 'Food Commodity Prices Spike on Emerging Market Demand Surge', ko: '신흥시장 수요 급증으로 식품 원자재 가격 급등' },
    content: { en: 'A confluence of drought-related supply disruptions and accelerating demand from rapidly urbanizing emerging economies pushed the FAO Food Price Index to a three-year high, raising the prospect of margin headwinds for consumer packaged goods companies entering a challenging macroeconomic environment. Agricultural commodity traders reported the highest daily trading volumes in five years as institutional investors sought commodity exposure as an inflation hedge.', ko: '가뭄 관련 공급 차질과 급속도로 도시화하는 신흥 경제국의 수요 가속이 복합적으로 작용하면서 FAO 식품가격지수가 3년 만에 최고치를 기록하며, 도전적인 거시경제 환경에 직면한 소비재 포장식품 기업들의 마진 역풍 가능성이 높아졌습니다. 기관 투자자들이 인플레이션 헤지 수단으로 원자재 노출을 늘리면서 농산물 거래업체들은 5년 만에 최대 일일 거래량을 기록했습니다.' },
    read: false, effect: { FOOD: 0.93, GREEN: 1.04 },
  },
  {
    id: 'c20-4', dayIdx: 20,
    title: { en: 'Media Sector Faces Advertiser Pullback Amid Economic Uncertainty', ko: '경제 불확실성 속 미디어 섹터 광고주 이탈 직면' },
    content: { en: 'Major advertising holding companies revised full-year ad spend forecasts downward by an average of 11%, with media agency executives citing client budget freezes across consumer, automotive, and financial services sectors as corporate CFOs implemented precautionary spending controls in response to deteriorating macro signals. Streaming and digital news platforms reported booking cancellations at a rate that implies a 15–20% second-half advertising revenue shortfall versus prior guidance.', ko: '주요 광고 지주사들이 연간 광고비 전망을 평균 11% 하향 조정했습니다. 기업 CFO들이 악화된 거시 신호에 대응해 예방적 지출 통제를 시행하면서 미디어 에이전시 임원들이 소비재, 자동차, 금융 서비스 섹터 고객들의 예산 동결을 이유로 들었습니다. 스트리밍과 디지털 뉴스 플랫폼들은 이전 가이던스 대비 하반기 광고 매출이 15~20% 부족할 것을 시사하는 예약 취소율을 보고했습니다.' },
    read: false, effect: { MEDIA: 0.91, ECOM: 0.94 },
  },
];
