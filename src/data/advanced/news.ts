import { News } from '../../types';
import { BOOST_DAYS_1_10 } from './news-boost-1';
import { BOOST_DAYS_11_20 } from './news-boost-2';
import { BOOST_DAYS_21_30 } from './news-boost-3';

// Arc 1: AI Revolution (Days 1-29)
const ARC_AI_REVOLUTION: News[] = [
  {
    id: 'a1-1', dayIdx: 1,
    title: { en: 'NeoTech Unveils "Prometheus" AGI System', ko: '네오테크, 범용인공지능 "프로메테우스" 공개' },
    content: { en: 'NeoTech Corporation announced Prometheus, claiming it surpasses human-level reasoning across all benchmarks. Shares surged in pre-market trading as analysts called it "the most significant technological milestone of the century."', ko: '네오테크 코퍼레이션이 모든 벤치마크에서 인간 수준의 추론 능력을 초월한다고 주장하는 프로메테우스를 발표했습니다. 애널리스트들이 "세기의 가장 중요한 기술적 이정표"라고 평가하면서 주가가 장전 거래에서 급등했습니다.' },
    read: false, effect: { TECH: 1.08 },
  },
  {
    id: 'a1-2', dayIdx: 2,
    title: { en: 'Enterprise Giants Rush to License Prometheus API', ko: '대기업들, 프로메테우스 API 라이선스 확보 경쟁' },
    content: { en: 'Fortune 500 companies are signing multi-billion dollar licensing agreements with NeoTech just 48 hours after the Prometheus announcement. E-commerce platforms expect to automate up to 40% of logistics and customer service operations.', ko: '프로메테우스 발표 48시간 만에 포천 500대 기업들이 네오테크와 수십억 달러 규모의 라이선스 계약을 체결하고 있습니다. 전자상거래 플랫폼들은 물류 및 고객 서비스 운영의 최대 40%를 자동화할 것으로 기대하고 있습니다.' },
    read: false, effect: { TECH: 1.08, ECOM: 1.05 },
  },
  {
    id: 'a1-3', dayIdx: 4,
    title: { en: 'Major Banks Announce AI-Driven Trading Desks', ko: '주요 은행들, AI 주도 트레이딩 데스크 도입 발표' },
    content: { en: 'Three of the world\'s largest investment banks announced plans to deploy Prometheus-based autonomous trading systems, projecting 25% efficiency gains. Critics warn the move could amplify market volatility and reduce human oversight.', ko: '세계 3대 투자은행이 프로메테우스 기반 자율 트레이딩 시스템 도입 계획을 발표하며 25% 효율성 향상을 예상했습니다. 비평가들은 이 조치가 시장 변동성을 키우고 인간의 감독을 약화시킬 수 있다고 경고합니다.' },
    read: false, effect: { BANK: 1.07, TECH: 1.03 },
  },
  {
    id: 'a1-4', dayIdx: 5,
    title: { en: 'Streaming Giants Face AI Content Disruption', ko: '스트리밍 대기업들, AI 콘텐츠 혁신에 직면' },
    content: { en: 'NeoTech\'s Prometheus is now generating full-length films and music albums at a fraction of traditional production costs, forcing media companies to reassess their content strategies. One major studio saw its stock drop 8% on reports of shelved productions.', ko: '네오테크의 프로메테우스가 기존 제작 비용의 극히 일부로 장편 영화와 음악 앨범을 생성하면서 미디어 기업들이 콘텐츠 전략을 재검토하고 있습니다. 한 대형 스튜디오는 제작 보류 보도로 주가가 8% 하락했습니다.' },
    read: false, effect: { MEDIA: 0.92, TECH: 1.04 },
  },
  {
    id: 'a1-5', dayIdx: 7,
    title: { en: 'AI Threatens 2 Million White-Collar Jobs, Study Finds', ko: '연구 결과, AI가 200만 화이트칼라 일자리 위협' },
    content: { en: 'A landmark economic study projects that Prometheus-class AI will displace 2 million professional jobs within three years, particularly in finance, legal, and administrative sectors. Consumer spending concerns weighed on e-commerce forecasts.', ko: '획기적인 경제 연구가 프로메테우스급 AI가 3년 내 금융, 법률, 행정 분야를 중심으로 200만 개의 전문직 일자리를 대체할 것으로 전망했습니다. 소비 지출에 대한 우려가 전자상거래 전망에 부담을 주었습니다.' },
    read: false, effect: { BANK: 0.93, ECOM: 0.96, TECH: 1.02 },
  },
  {
    id: 'a1-6', dayIdx: 8,
    title: { en: 'Health Sector Embraces AI Diagnostics Pipeline', ko: '의료 부문, AI 진단 파이프라인 적극 도입' },
    content: { en: 'Major hospital networks announced partnerships with NeoTech to deploy Prometheus for early-stage disease detection, with initial trials showing a 34% improvement in diagnostic accuracy. Pharmaceutical firms are also licensing the system to accelerate drug discovery.', ko: '주요 병원 네트워크들이 조기 질병 진단에 프로메테우스를 도입하기 위해 네오테크와 파트너십을 발표했으며, 초기 시험에서 진단 정확도가 34% 향상된 것으로 나타났습니다. 제약사들도 신약 개발 가속화를 위해 시스템 라이선스를 취득하고 있습니다.' },
    read: false, effect: { HEALTH: 1.06, TECH: 1.02 },
  },
  {
    id: 'a1-7', dayIdx: 10,
    title: { en: 'Senate Subcommittee Opens AGI Safety Hearings', ko: '상원 소위원회, AGI 안전성 청문회 개최' },
    content: { en: 'U.S. Senate subcommittee convened emergency hearings on the societal risks of AGI systems, summoning NeoTech executives to testify. Markets interpreted the move as a potential precursor to regulatory curbs, sending tech valuations lower.', ko: '미국 상원 소위원회가 AGI 시스템의 사회적 위험에 대한 긴급 청문회를 소집하고 네오테크 임원들을 증인으로 불러냈습니다. 시장은 이를 규제 강화의 전조로 해석하며 기술주 밸류에이션이 하락했습니다.' },
    read: false, effect: { TECH: 0.94 },
  },
  {
    id: 'a1-8', dayIdx: 12,
    title: { en: 'EU Proposes Emergency AI Moratorium Legislation', ko: 'EU, 긴급 AI 모라토리엄 법안 제안' },
    content: { en: 'The European Commission proposed a 90-day moratorium on AGI deployments pending a comprehensive safety review, sending shockwaves through global technology markets. Asian tech indices fell in sympathy trading overnight.', ko: '유럽위원회가 포괄적인 안전성 검토가 완료될 때까지 AGI 배포에 대한 90일 유예를 제안하며 글로벌 기술 시장에 충격을 주었습니다. 아시아 기술주 지수도 동조 하락했습니다.' },
    read: false, effect: { TECH: 0.92, MEDIA: 0.95 },
  },
  {
    id: 'a1-9', dayIdx: 14,
    title: { en: 'NeoTech Rivals Form "Open AI Alliance" Consortium', ko: '네오테크 경쟁사들, "오픈 AI 얼라이언스" 컨소시엄 결성' },
    content: { en: 'Seven competing technology firms announced a $40 billion consortium to develop open-source alternatives to Prometheus, aiming to prevent monopolistic control of AGI infrastructure. The move was seen as bullish for broad tech sector competition.', ko: '7개 경쟁 기술 기업이 AGI 인프라의 독점적 지배를 막기 위해 프로메테우스의 오픈소스 대안을 개발하는 400억 달러 규모의 컨소시엄을 발표했습니다. 이 조치는 기술 섹터 전반의 경쟁에 긍정적인 신호로 평가되었습니다.' },
    read: false, effect: { TECH: 1.05 },
  },
  {
    id: 'a1-10', dayIdx: 16,
    title: { en: 'DOJ Launches Antitrust Investigation into NeoTech', ko: '법무부, 네오테크 독점금지법 조사 착수' },
    content: { en: 'The U.S. Department of Justice formally opened an antitrust investigation into NeoTech\'s licensing practices, alleging the company is using Prometheus to unfairly dominate adjacent markets. NeoTech stock fell sharply while banking sector stocks that have alternate AI partners recovered.', ko: '미국 법무부가 네오테크의 라이선스 관행에 대한 공식 독점금지 조사를 시작하며, 프로메테우스를 이용한 인접 시장 불공정 지배를 주장했습니다. 네오테크 주가는 급락한 반면, 대체 AI 파트너를 보유한 은행 섹터 주가는 회복세를 보였습니다.' },
    read: false, effect: { TECH: 0.91, BANK: 1.03 },
  },
  {
    id: 'a1-11', dayIdx: 18,
    title: { en: 'Aerospace Sector Adopts AI for Autonomous Systems', ko: '항공우주 산업, 자율 시스템에 AI 도입' },
    content: { en: 'Defense contractors disclosed that Prometheus-derived models are being integrated into next-generation autonomous drone and satellite navigation systems, with the Pentagon committing $8 billion in contracts. The news lifted aerospace stocks despite broader tech sector headwinds.', ko: '방위산업체들이 프로메테우스 파생 모델을 차세대 자율 드론 및 위성 항법 시스템에 통합하고 있다고 공개하며 미 국방부가 80억 달러 규모의 계약을 체결했습니다. 기술 섹터 전반의 역풍에도 불구하고 항공우주 주가가 상승했습니다.' },
    read: false, effect: { AERO: 1.09, TECH: 1.01 },
  },
  {
    id: 'a1-12', dayIdx: 20,
    title: { en: 'AI Market Correction Triggers Broad Tech Selloff', ko: 'AI 시장 조정, 기술주 전반 매도세 촉발' },
    content: { en: 'Overvaluation concerns sparked a broad selloff in technology stocks, with analysts warning that Prometheus adoption timelines had been priced in too aggressively. The correction also dragged media and e-commerce stocks lower amid a risk-off sentiment.', ko: '과대평가 우려가 기술주 전반의 매도세를 촉발했으며, 애널리스트들은 프로메테우스 도입 일정이 지나치게 공격적으로 주가에 반영됐다고 경고했습니다. 위험 회피 심리 속에 미디어 및 전자상거래 주가도 동반 하락했습니다.' },
    read: false, effect: { TECH: 0.91, MEDIA: 0.93, ECOM: 0.94 },
  },
  {
    id: 'a1-13', dayIdx: 23,
    title: { en: 'NeoTech Reaches Regulatory Settlement, Resumes Expansion', ko: '네오테크, 규제 당국과 합의 타결 후 사업 확장 재개' },
    content: { en: 'NeoTech agreed to a landmark consent decree with the DOJ, including licensing Prometheus at regulated rates and submitting to independent safety audits. Markets viewed the resolution as removing the largest overhang on the AI sector.', ko: '네오테크가 법무부와 규제 요율로 프로메테우스를 라이선스하고 독립적인 안전 감사를 수용하는 내용의 획기적인 동의 판결에 합의했습니다. 시장은 이번 해결을 AI 섹터의 가장 큰 불확실성이 제거된 것으로 평가했습니다.' },
    read: false, effect: { TECH: 1.10, BANK: 1.04 },
  },
  {
    id: 'a1-14', dayIdx: 26,
    title: { en: 'AI-Powered Personalization Drives E-Commerce Surge', ko: 'AI 개인화 기술, 전자상거래 급성장 견인' },
    content: { en: 'E-commerce platforms report a 28% increase in conversion rates after deploying Prometheus-based recommendation engines, with one platform attributing $2 billion in incremental quarterly revenue to the technology.', ko: '전자상거래 플랫폼들이 프로메테우스 기반 추천 엔진 도입 후 전환율이 28% 상승했다고 보고하며, 한 플랫폼은 분기 추가 매출 20억 달러를 해당 기술 덕분이라고 밝혔습니다.' },
    read: false, effect: { ECOM: 1.08, TECH: 1.03 },
  },
  {
    id: 'a1-15', dayIdx: 29,
    title: { en: 'New AI Paradigm Established: Analysts Declare Market Reset', ko: '새로운 AI 패러다임 정립: 애널리스트들, 시장 리셋 선언' },
    content: { en: 'Leading investment banks issued revised long-term price targets across the technology sector, declaring that the post-Prometheus economy has created a durable new baseline for corporate productivity. The broad market staged a multi-sector recovery rally.', ko: '주요 투자은행들이 기술 섹터 전반에 걸쳐 수정된 장기 목표 주가를 제시하며, 포스트-프로메테우스 경제가 기업 생산성에 대한 지속 가능한 새로운 기준선을 만들었다고 선언했습니다. 광범위한 시장이 다부문 회복 랠리를 연출했습니다.' },
    read: false, effect: { TECH: 1.07, BANK: 1.05, MEDIA: 1.04 },
  },
];

// Arc 2: Global Health Crisis (Days 3-18)
const ARC_HEALTH_CRISIS: News[] = [
  {
    id: 'a2-1', dayIdx: 3,
    title: { en: 'Unidentified Respiratory Illness Detected in Three Cities', ko: '세 도시에서 미확인 호흡기 질환 발생' },
    content: { en: 'Health authorities in Southeast Asia reported clusters of a novel respiratory illness with an unusually rapid progression, prompting the WHO to open a preliminary inquiry. Pharmaceutical stocks edged higher on speculation about treatment demand.', ko: '동남아시아 보건 당국이 비정상적으로 빠른 진행 속도를 가진 신종 호흡기 질환 집단 감염 사례를 보고했으며, WHO가 예비 조사에 착수했습니다. 치료 수요에 대한 기대감으로 제약주가 소폭 상승했습니다.' },
    read: false, effect: { HEALTH: 1.04, AERO: 0.97 },
  },
  {
    id: 'a2-2', dayIdx: 4,
    title: { en: 'Illness Spreads to 12 Countries; Airlines Issue Travel Advisories', ko: '질병 12개국으로 확산; 항공사 여행 주의보 발령' },
    content: { en: 'The unidentified illness has now been confirmed in 12 countries across Asia and Europe, prompting several major airlines to suspend routes and issue voluntary travel advisories. Aerospace sector stocks fell on reduced forward booking projections.', ko: '미확인 질병이 아시아와 유럽 12개국에서 확진되면서 주요 항공사들이 노선을 중단하고 자발적 여행 주의보를 발령했습니다. 선도 예약 전망 감소로 항공우주 섹터 주가가 하락했습니다.' },
    read: false, effect: { AERO: 0.91, HEALTH: 1.06 },
  },
  {
    id: 'a2-3', dayIdx: 5,
    title: { en: 'WHO Declares Public Health Emergency of International Concern', ko: 'WHO, 국제 공중보건 비상사태 선포' },
    content: { en: 'The World Health Organization formally declared the outbreak a Public Health Emergency of International Concern, activating its global response coordination framework. Food supply chain stocks fell on fears of cross-border logistics disruptions.', ko: '세계보건기구가 공식적으로 해당 발병을 국제 공중보건 비상사태로 선포하고 글로벌 대응 조정 체계를 가동했습니다. 국경 간 물류 차질 우려로 식품 공급망 주가가 하락했습니다.' },
    read: false, effect: { HEALTH: 1.08, FOOD: 0.93, AERO: 0.92 },
  },
  {
    id: 'a2-4', dayIdx: 6,
    title: { en: 'G7 Nations Impose Coordinated Border Restrictions', ko: 'G7 국가들, 국경 제한 조치 공조' },
    content: { en: 'G7 nations announced coordinated border restrictions and mandatory quarantine protocols, effectively halting non-essential international travel. E-commerce logistics networks reported severe delays as air freight capacity collapsed.', ko: 'G7 국가들이 사실상 비필수 국제 여행을 차단하는 국경 제한 및 의무 격리 프로토콜을 발표했습니다. 항공 화물 용량이 붕괴되면서 전자상거래 물류 네트워크에 심각한 지연이 발생했다고 보고했습니다.' },
    read: false, effect: { AERO: 0.91, ECOM: 0.93, FOOD: 0.95 },
  },
  {
    id: 'a2-5', dayIdx: 7,
    title: { en: 'Hospital Systems Near Capacity as Cases Surge', ko: '병원 시스템, 환자 급증으로 포화 상태 근접' },
    content: { en: 'Hospitals in affected regions reported ICU occupancy rates exceeding 90%, triggering emergency resource allocation protocols. Medical supply companies and pharmaceutical distributors surged on emergency government procurement orders.', ko: '피해 지역 병원들이 중환자실 점유율이 90%를 초과했다고 보고하며 긴급 자원 배분 프로토콜을 가동했습니다. 정부의 긴급 조달 주문으로 의료 공급업체와 제약 유통업체 주가가 급등했습니다.' },
    read: false, effect: { HEALTH: 1.08, ECOM: 1.04 },
  },
  {
    id: 'a2-6', dayIdx: 8,
    title: { en: 'Global Food Supply Chains Under Strain from Lockdowns', ko: '봉쇄 조치로 글로벌 식품 공급망 압박' },
    content: { en: 'Agricultural export restrictions by three major food-producing nations triggered commodity price spikes of up to 18%, as domestic hoarding policies disrupted global supply chains. Food sector stocks fell on thin margin fears despite higher commodity prices.', ko: '3개 주요 식품 생산국의 농산물 수출 제한이 국내 사재기 정책으로 글로벌 공급망을 교란하며 원자재 가격을 최대 18% 폭등시켰습니다. 더 높은 원자재 가격에도 불구하고 마진 축소 우려로 식품 섹터 주가가 하락했습니다.' },
    read: false, effect: { FOOD: 0.92, ECOM: 0.93 },
  },
  {
    id: 'a2-7', dayIdx: 9,
    title: { en: 'Biotech Firms Announce Competing Vaccine Programs', ko: '바이오테크 기업들, 경쟁적 백신 프로그램 발표' },
    content: { en: 'Five leading pharmaceutical companies announced expedited vaccine development programs, with the first candidate entering Phase I trials. Government pre-purchase commitments worth $15 billion were announced, driving the health sector sharply higher.', ko: '5개 주요 제약사가 가속화된 백신 개발 프로그램을 발표했으며, 첫 번째 후보물질이 1상 임상시험에 돌입했습니다. 150억 달러 규모의 정부 선구매 약정이 발표되면서 헬스케어 섹터 주가가 크게 상승했습니다.' },
    read: false, effect: { HEALTH: 1.09 },
  },
  {
    id: 'a2-8', dayIdx: 10,
    title: { en: 'Tech Firms Pivot to Remote Work Infrastructure Boom', ko: '기술 기업들, 원격 근무 인프라 붐으로 선회' },
    content: { en: 'Global lockdowns triggered an explosive surge in demand for remote collaboration software, cloud infrastructure, and cybersecurity services. Several technology companies raised full-year guidance by double digits as enterprise software adoption accelerated by an estimated three years.', ko: '전 세계 봉쇄 조치가 원격 협업 소프트웨어, 클라우드 인프라, 사이버보안 서비스 수요를 폭발적으로 증가시켰습니다. 기업용 소프트웨어 도입이 약 3년 앞당겨지면서 여러 기술 기업들이 연간 가이던스를 두 자릿수로 상향 조정했습니다.' },
    read: false, effect: { TECH: 1.09, ECOM: 1.07 },
  },
  {
    id: 'a2-9', dayIdx: 11,
    title: { en: 'Phase III Trial Results Show 78% Efficacy for Lead Vaccine', ko: '선도 백신 3상 임상 결과, 78% 효능 확인' },
    content: { en: 'A leading pharmaceutical company released interim Phase III trial data showing 78% efficacy for its vaccine candidate, exceeding the WHO\'s 60% threshold. Emergency use authorization applications were filed immediately in 40 countries.', ko: '주요 제약사가 백신 후보물질의 78% 효능을 보여주는 3상 임상 중간 데이터를 공개하며 WHO의 60% 기준을 초과 달성했습니다. 즉시 40개국에 긴급 사용 승인 신청서가 제출되었습니다.' },
    read: false, effect: { HEALTH: 1.10, AERO: 1.03 },
  },
  {
    id: 'a2-10', dayIdx: 12,
    title: { en: 'Antiviral Treatment Clears FDA Emergency Review', ko: '항바이러스 치료제, FDA 긴급 검토 통과' },
    content: { en: 'The FDA granted emergency use authorization to a novel antiviral compound, reporting a 55% reduction in hospitalizations in treated patients. Healthcare stocks reached all-time highs as production scale-up agreements were signed globally.', ko: 'FDA가 신규 항바이러스 화합물에 긴급 사용 승인을 부여하며 치료 환자의 입원이 55% 감소했다고 보고했습니다. 전 세계적으로 생산 확대 계약이 체결되면서 헬스케어 주가가 사상 최고치를 기록했습니다.' },
    read: false, effect: { HEALTH: 1.08, AERO: 1.05 },
  },
  {
    id: 'a2-11', dayIdx: 14,
    title: { en: 'Case Counts Begin Declining in First-Wave Nations', ko: '1차 유행 국가들에서 신규 확진자 감소세 시작' },
    content: { en: 'Epidemiological data showed a sustained 14-day decline in new case counts across nations where the vaccine was deployed earliest. Airline stocks rebounded sharply on expectations of travel restriction rollbacks within weeks.', ko: '역학 데이터에 따르면 백신이 가장 먼저 배포된 국가들에서 신규 확진자 수가 14일 연속 감소세를 나타냈습니다. 수주 내 여행 제한 해제 기대감으로 항공주가 크게 반등했습니다.' },
    read: false, effect: { HEALTH: 1.05, AERO: 1.10, FOOD: 1.04 },
  },
  {
    id: 'a2-12', dayIdx: 15,
    title: { en: 'WHO Announces Coordinated Phased Reopening Framework', ko: 'WHO, 단계적 경제 재개 공조 프레임워크 발표' },
    content: { en: 'The WHO issued a coordinated global reopening framework, enabling countries meeting specific epidemiological benchmarks to safely lift restrictions in phases. Food commodity prices began normalizing as cross-border logistics resumed.', ko: 'WHO가 특정 역학 기준을 충족하는 국가들이 단계적으로 안전하게 제한을 해제할 수 있도록 하는 글로벌 재개 프레임워크를 발표했습니다. 국경 간 물류가 재개되면서 식품 원자재 가격이 정상화되기 시작했습니다.' },
    read: false, effect: { AERO: 1.08, FOOD: 1.07, ECOM: 1.05 },
  },
  {
    id: 'a2-13', dayIdx: 16,
    title: { en: 'International Travel Restrictions Formally Lifted in 28 Nations', ko: '28개국, 국제 여행 제한 공식 해제' },
    content: { en: '28 countries simultaneously lifted international travel restrictions, triggering the largest single-day recovery in airline bookings on record. Tourism-adjacent sectors, including food and hospitality supply chains, rallied strongly on restoration of global demand.', ko: '28개국이 동시에 국제 여행 제한을 해제하며 기록상 항공 예약 단일 최대 회복을 촉발했습니다. 글로벌 수요 회복으로 식품 및 숙박 공급망을 포함한 관광 관련 섹터가 강세를 보였습니다.' },
    read: false, effect: { AERO: 1.09, FOOD: 1.06 },
  },
  {
    id: 'a2-14', dayIdx: 17,
    title: { en: 'IMF Upgrades Global Growth Forecast on Recovery Optimism', ko: 'IMF, 회복 낙관론에 글로벌 성장 전망 상향' },
    content: { en: 'The International Monetary Fund upgraded its global GDP growth forecast by 1.2 percentage points, citing faster-than-expected containment of the health crisis and robust pent-up consumer demand. Broad market indices rallied across all sectors.', ko: '국제통화기금이 예상보다 빠른 보건 위기 억제와 강력한 억눌린 소비자 수요를 근거로 글로벌 GDP 성장 전망을 1.2%포인트 상향 조정했습니다. 광범위한 시장 지수가 모든 섹터에 걸쳐 상승했습니다.' },
    read: false, effect: { HEALTH: 1.04, ECOM: 1.06, FOOD: 1.05 },
  },
  {
    id: 'a2-15', dayIdx: 18,
    title: { en: 'Post-Crisis Pharmaceutical Investment Boom Begins', ko: '위기 이후 제약 투자 붐 시작' },
    content: { en: 'Governments worldwide announced a combined $80 billion in long-term pandemic preparedness investment commitments to pharmaceutical research and manufacturing capacity. The announcement cemented health sector stocks at elevated valuations as investors priced in a sustained structural tailwind.', ko: '전 세계 정부들이 제약 연구 및 제조 역량에 합산 800억 달러 규모의 장기 팬데믹 대비 투자 약정을 발표했습니다. 이 발표로 투자자들이 지속적인 구조적 순풍을 주가에 반영하면서 헬스케어 섹터 주가가 높은 밸류에이션에 안착했습니다.' },
    read: false, effect: { HEALTH: 1.09, TECH: 1.03 },
  },
];

// Arc 3: Energy Transition (Days 1-25)
const ARC_ENERGY_TRANSITION: News[] = [
  {
    id: 'a3-1', dayIdx: 1,
    title: { en: 'Congress Proposes Landmark Carbon Tax Legislation', ko: '의회, 탄소세 법안 발의' },
    content: { en: 'Bipartisan lawmakers introduced a sweeping carbon pricing bill that would charge $50 per ton on emissions, with revenue directed toward clean energy subsidies.', ko: '초당적 의원들이 탄소 배출량 1톤당 50달러를 부과하는 탄소 가격제 법안을 발의했으며, 수익은 청정에너지 보조금으로 사용될 예정입니다.' },
    read: false, effect: { GREEN: 1.07, REALTY: 0.97 },
  },
  {
    id: 'a3-2', dayIdx: 3,
    title: { en: 'Crude Oil Prices Surge on Middle East Supply Fears', ko: '중동 공급 우려로 국제유가 급등' },
    content: { en: 'Brent crude surged 12% this week amid escalating tensions in key oil-producing regions, raising energy costs for airlines and food producers globally.', ko: '주요 산유국 지역의 긴장 고조로 이번 주 브렌트유가 12% 급등하며 항공사와 식품 생산업체의 에너지 비용 부담이 증가하고 있습니다.' },
    read: false, effect: { AERO: 0.94, FOOD: 0.96, GREEN: 1.05 },
  },
  {
    id: 'a3-3', dayIdx: 5,
    title: { en: 'Sovereign Wealth Funds Pivot to Green Energy Assets', ko: '국부펀드, 녹색에너지 자산으로 포트폴리오 전환' },
    content: { en: 'Three major sovereign wealth funds announced a combined $200 billion reallocation toward renewable energy infrastructure over the next decade, citing carbon tax tailwinds.', ko: '주요 국부펀드 3곳이 탄소세 도입 기대를 배경으로 향후 10년간 총 2,000억 달러를 신재생에너지 인프라로 재배분한다고 발표했습니다.' },
    read: false, effect: { GREEN: 1.08, TECH: 1.03 },
  },
  {
    id: 'a3-4', dayIdx: 7,
    title: { en: 'Lithium and Cobalt Shortage Threatens EV Supply Chain', ko: '리튬·코발트 부족으로 전기차 공급망 위기' },
    content: { en: 'Mining analysts warn that rare mineral reserves are critically below demand forecasts, potentially delaying EV production timelines by 18 to 24 months.', ko: '광업 전문가들은 희귀 광물 매장량이 수요 예측을 크게 밑돌아 전기차 생산 일정이 18~24개월 지연될 수 있다고 경고했습니다.' },
    read: false, effect: { GREEN: 0.92, TECH: 0.95 },
  },
  {
    id: 'a3-5', dayIdx: 9,
    title: { en: 'Solar Panel Manufacturers Hit by Tariff Dispute', ko: '관세 분쟁으로 태양광 패널 제조업체 타격' },
    content: { en: 'A new round of trade tariffs on solar panel imports has disrupted global supply chains, causing installation backlogs to surge across North America and Europe.', ko: '태양광 패널 수입에 대한 새로운 관세 부과로 글로벌 공급망이 교란되면서 북미와 유럽 전역에서 설치 적체가 급증하고 있습니다.' },
    read: false, effect: { GREEN: 0.91, REALTY: 0.97 },
  },
  {
    id: 'a3-6', dayIdx: 11,
    title: { en: 'Nuclear Energy Revival Gains Political Momentum', ko: '원자력 에너지 부활론 정치적 지지 확산' },
    content: { en: 'A Senate energy committee endorsed advanced small modular reactor technology as a bridge fuel, with three major utilities announcing feasibility studies.', ko: '상원 에너지위원회가 소형모듈원자로(SMR) 기술을 가교 에너지원으로 승인했으며, 주요 전력회사 3곳이 타당성 조사 착수를 발표했습니다.' },
    read: false, effect: { GREEN: 0.96, TECH: 1.04 },
  },
  {
    id: 'a3-7', dayIdx: 13,
    title: { en: 'Solid-State EV Battery Achieves 600-Mile Range in Tests', ko: '전고체 전기차 배터리, 테스트에서 960km 주행 달성' },
    content: { en: 'A major technology consortium announced a solid-state battery prototype delivering 600 miles of range with 10-minute charging, calling it a potential industry inflection point.', ko: '주요 기술 컨소시엄이 10분 충전으로 960km 주행이 가능한 전고체 배터리 프로토타입을 발표하며 업계의 전환점이 될 수 있다고 밝혔습니다.' },
    read: false, effect: { GREEN: 1.08, TECH: 1.08 },
  },
  {
    id: 'a3-8', dayIdx: 15,
    title: { en: 'Crypto Mining Farms Blamed for Regional Grid Instability', ko: '암호화폐 채굴장, 지역 전력망 불안정 주범으로 지목' },
    content: { en: 'Energy regulators in three states launched investigations into large-scale crypto mining operations after grid operators reported unprecedented demand spikes during peak hours.', ko: '전력망 운영사가 최대 부하 시간대에 전례 없는 수요 급증을 보고한 후, 3개 주 에너지 규제당국이 대규모 암호화폐 채굴 업체에 대한 조사를 개시했습니다.' },
    read: false, effect: { CRYPTO: 0.93, GREEN: 1.03 },
  },
  {
    id: 'a3-9', dayIdx: 17,
    title: { en: 'Carbon Tax Bill Advances with Rare Bipartisan Support', ko: '탄소세 법안, 초당적 지지로 입법 절차 진전' },
    content: { en: 'The carbon pricing bill cleared the Senate Finance Committee 14-to-4, sending a strong signal to markets that significant clean energy incentives are imminent.', ko: '탄소 가격제 법안이 상원 재정위원회를 14대 4로 통과하며 상당한 청정에너지 인센티브가 임박했다는 강력한 신호를 시장에 보내고 있습니다.' },
    read: false, effect: { GREEN: 1.10, FOOD: 0.96, AERO: 0.97 },
  },
  {
    id: 'a3-10', dayIdx: 19,
    title: { en: 'Green Building Standards Set to Become Federal Law', ko: '친환경 건물 기준, 연방법으로 의무화 예정' },
    content: { en: 'New mandatory green building codes requiring net-zero energy performance for all commercial construction over 50,000 square feet will take effect within two years.', ko: '연면적 5,000평방미터 이상 모든 상업 건물에 대해 순제로 에너지 성능을 요구하는 새로운 친환경 건물 의무 기준이 2년 내 시행될 예정입니다.' },
    read: false, effect: { REALTY: 0.94, GREEN: 1.06, TECH: 1.02 },
  },
  {
    id: 'a3-11', dayIdx: 21,
    title: { en: 'Agriculture Sector Faces Rising Fuel and Fertilizer Costs', ko: '농업 부문, 연료·비료비 급등으로 수익성 압박' },
    content: { en: 'Farm operators report a 23% increase in operating costs this quarter, driven by elevated diesel prices and energy-intensive fertilizer production tied to natural gas markets.', ko: '농장 운영자들은 이번 분기 운영비가 23% 증가했다고 보고했는데, 이는 경유 가격 상승과 천연가스 시장과 연동된 에너지 집약적 비료 생산 비용 증가에 기인합니다.' },
    read: false, effect: { FOOD: 0.91, GREEN: 1.02 },
  },
  {
    id: 'a3-12', dayIdx: 23,
    title: { en: 'Three Largest Renewable Firms Announce Merger Talks', ko: '3대 재생에너지 기업, 합병 협상 착수 발표' },
    content: { en: 'Industry consolidation accelerates as the top three independent renewable energy developers confirm preliminary discussions on a three-way merger that would create a $180 billion clean energy giant.', ko: '상위 3개 독립 재생에너지 개발사가 1,800억 달러 규모의 청정에너지 거대 기업을 탄생시킬 3자 합병에 대한 예비 협의를 확인하며 업계 통합이 가속화되고 있습니다.' },
    read: false, effect: { GREEN: 1.09, TECH: 1.03 },
  },
  {
    id: 'a3-13', dayIdx: 25,
    title: { en: 'Carbon Tax Signed Into Law; New Energy Era Declared', ko: '탄소세법 서명 완료…"새로운 에너지 시대" 선언' },
    content: { en: 'The president signed the landmark carbon pricing act into law, with analysts projecting $1.2 trillion in clean energy investment over the next decade and structural headwinds for fossil fuel-dependent industries.', ko: '대통령이 획기적인 탄소 가격제 법안에 서명했으며, 전문가들은 향후 10년간 1조 2,000억 달러의 청정에너지 투자와 화석연료 의존 산업에 대한 구조적 역풍을 예상하고 있습니다.' },
    read: false, effect: { GREEN: 1.09, AERO: 0.96, FOOD: 0.95, REALTY: 0.96 },
  },
];

// Arc 4: Financial System Disruption (Days 8-28)
const ARC_FINANCIAL_DISRUPTION: News[] = [
  {
    id: 'a4-1', dayIdx: 8,
    title: { en: 'Bitcoin Breaks $120,000 as Retail Frenzy Returns', ko: '비트코인 1억 6천만 원 돌파…개인 투자 열풍 재점화' },
    content: { en: 'Bitcoin surged past $120,000 for the first time, driven by a wave of retail buying and renewed optimism following positive macroeconomic data from the Federal Reserve.', ko: '연방준비제도의 긍정적인 거시경제 지표 발표 이후 개인 투자자들의 매수세가 몰리며 비트코인이 사상 처음으로 1억 6천만 원을 돌파했습니다.' },
    read: false, effect: { CRYPTO: 1.09, TECH: 1.05 },
  },
  {
    id: 'a4-2', dayIdx: 10,
    title: { en: 'BlackRock and Vanguard Expand Crypto Allocation in Major Funds', ko: '블랙록·뱅가드, 주요 펀드 내 암호화폐 비중 확대' },
    content: { en: 'Two of the world\'s largest asset managers announced they would increase crypto exposure in select multi-asset funds to up to 5%, marking a watershed moment for institutional adoption.', ko: '세계 최대 자산운용사 2곳이 일부 복합자산 펀드의 암호화폐 비중을 최대 5%까지 높이겠다고 발표하며 기관 투자 시대의 획을 그었습니다.' },
    read: false, effect: { CRYPTO: 1.10, BANK: 0.97, TECH: 1.04 },
  },
  {
    id: 'a4-3', dayIdx: 12,
    title: { en: 'Banks Report Unusual Deposit Outflows to Crypto Platforms', ko: '시중은행, 암호화폐 플랫폼으로의 이례적 예금 유출 보고' },
    content: { en: 'Federal regulators flagged a 34% year-over-year increase in fund transfers from traditional bank accounts to crypto exchanges, raising concerns about deposit base stability.', ko: '연방 규제당국은 일반 은행 계좌에서 암호화폐 거래소로의 자금 이체가 전년 대비 34% 증가했다며 예금 기반 안정성에 대한 우려를 제기했습니다.' },
    read: false, effect: { BANK: 0.94, CRYPTO: 1.05, ECOM: 1.03 },
  },
  {
    id: 'a4-4', dayIdx: 14,
    title: { en: 'Senate Banking Committee Signals Crypto Regulatory Crackdown', ko: '상원 은행위원회, 암호화폐 규제 강화 시사' },
    content: { en: 'The Senate Banking Committee chairperson warned that legislation to classify most crypto assets as securities could be introduced within 60 days, citing consumer protection concerns.', ko: '상원 은행위원회 위원장이 소비자 보호를 이유로 대부분의 암호화폐 자산을 증권으로 분류하는 법안이 60일 내에 발의될 수 있다고 경고했습니다.' },
    read: false, effect: { CRYPTO: 0.92, BANK: 1.04, TECH: 0.97 },
  },
  {
    id: 'a4-5', dayIdx: 16,
    title: { en: 'Major DeFi Protocol Suffers $2.1 Billion Exploit', ko: '주요 디파이 프로토콜, 2조 8천억 원 규모 해킹 피해' },
    content: { en: 'Hackers exploited a smart contract vulnerability in one of DeFi\'s top lending protocols, draining $2.1 billion in assets before the exploit was patched — the largest hack in blockchain history.', ko: '해커들이 주요 디파이 대출 프로토콜의 스마트 컨트랙트 취약점을 악용해 패치 전까지 2조 8천억 원 상당의 자산을 탈취했으며, 이는 블록체인 역사상 최대 규모의 해킹입니다.' },
    read: false, effect: { CRYPTO: 0.91, TECH: 0.95, ECOM: 0.97 },
  },
  {
    id: 'a4-6', dayIdx: 17,
    title: { en: 'Crypto Market Wipeout: $800 Billion Erased in 48 Hours', ko: '암호화폐 시장 대폭락: 48시간 만에 1,000조 원 증발' },
    content: { en: 'A cascade of liquidations following the DeFi hack and regulatory headlines triggered a market-wide selloff, with total crypto market cap falling from $3.8 trillion to $3.0 trillion in two days.', ko: '디파이 해킹과 규제 관련 뉴스가 겹치며 연쇄 청산이 발생, 암호화폐 시가총액이 이틀 만에 4,900조 원에서 3,900조 원으로 급감했습니다.' },
    read: false, effect: { CRYPTO: 0.92, BANK: 1.03, REALTY: 0.97 },
  },
  {
    id: 'a4-7', dayIdx: 19,
    title: { en: 'Federal Reserve Announces Pilot for Digital Dollar CBDC', ko: '연방준비제도, 디지털 달러 CBDC 시범 사업 발표' },
    content: { en: 'The Federal Reserve unveiled a two-year pilot program for a central bank digital currency, partnering with five major commercial banks to test programmable payment infrastructure.', ko: '연방준비제도가 5개 주요 상업은행과 협력해 프로그래머블 결제 인프라를 테스트하는 2년간의 중앙은행 디지털화폐(CBDC) 시범 사업을 공개했습니다.' },
    read: false, effect: { BANK: 1.06, TECH: 1.08, CRYPTO: 0.94 },
  },
  {
    id: 'a4-8', dayIdx: 20,
    title: { en: 'Stablecoin Reserve Requirements Bill Passes House Vote', ko: '스테이블코인 준비금 요건 법안, 하원 통과' },
    content: { en: 'The House passed legislation requiring all stablecoin issuers to maintain 1:1 cash reserves audited quarterly, a move seen as legitimizing the sector while increasing compliance costs.', ko: '하원이 모든 스테이블코인 발행사에 분기별 감사를 받는 1대1 현금 준비금 유지를 요구하는 법안을 통과시켰으며, 이는 업계를 제도권에 편입시키는 동시에 규정 준수 비용을 높이는 조치로 평가됩니다.' },
    read: false, effect: { CRYPTO: 1.04, BANK: 1.05, ECOM: 1.02 },
  },
  {
    id: 'a4-9', dayIdx: 22,
    title: { en: 'Goldman Sachs Launches Institutional Crypto Custody Platform', ko: '골드만삭스, 기관 투자자용 암호화폐 수탁 플랫폼 출시' },
    content: { en: 'Goldman Sachs officially launched a regulated digital asset custody service for institutional clients, supporting Bitcoin, Ethereum, and select tokenized real-world assets.', ko: '골드만삭스가 비트코인, 이더리움 및 일부 토큰화된 실물 자산을 지원하는 기관 투자자용 규제 디지털 자산 수탁 서비스를 공식 출시했습니다.' },
    read: false, effect: { BANK: 1.07, CRYPTO: 1.09, TECH: 1.03 },
  },
  {
    id: 'a4-10', dayIdx: 23,
    title: { en: 'JPMorgan and Citigroup File for Crypto Exchange Licenses', ko: 'JP모건·씨티그룹, 암호화폐 거래소 라이선스 신청' },
    content: { en: 'Two of America\'s largest banks formally applied for federal digital asset exchange licenses, signaling their intent to offer crypto trading and yield products directly to retail clients.', ko: '미국 최대 은행 2곳이 연방 디지털 자산 거래소 라이선스를 공식 신청하며 개인 고객에게 직접 암호화폐 거래와 수익 상품을 제공하겠다는 의지를 밝혔습니다.' },
    read: false, effect: { BANK: 1.08, CRYPTO: 1.06, ECOM: 1.04 },
  },
  {
    id: 'a4-11', dayIdx: 24,
    title: { en: 'Crypto-Backed Mortgages Gain Traction as Asset Class Matures', ko: '암호화폐 담보 주택담보대출, 자산군 성숙과 함께 주목받아' },
    content: { en: 'Several fintech lenders reported surging demand for mortgage products collateralized by Bitcoin and Ethereum, with loan originations up 180% year-over-year as regulatory clarity improves.', ko: '규제 명확성이 높아지면서 비트코인과 이더리움을 담보로 한 주택담보대출 상품에 대한 수요가 급증해 대출 실행 건수가 전년 대비 180% 증가했다고 여러 핀테크 대출사가 보고했습니다.' },
    read: false, effect: { REALTY: 1.05, CRYPTO: 1.05, BANK: 1.04 },
  },
  {
    id: 'a4-12', dayIdx: 26,
    title: { en: 'E-Commerce Giants Integrate Crypto Checkout as Standard Option', ko: '이커머스 대기업들, 암호화폐 결제를 기본 옵션으로 통합' },
    content: { en: 'Three of the top five global e-commerce platforms announced native cryptocurrency checkout integration, projected to reduce payment processing fees by up to 1.8% per transaction.', ko: '글로벌 5대 전자상거래 플랫폼 중 3곳이 네이티브 암호화폐 결제 통합을 발표하며 건당 결제 처리 수수료를 최대 1.8% 절감할 것으로 예상됩니다.' },
    read: false, effect: { ECOM: 1.09, CRYPTO: 1.07, BANK: 0.96 },
  },
  {
    id: 'a4-13', dayIdx: 28,
    title: { en: 'New Financial Equilibrium: Crypto and Banks Reach Symbiosis', ko: '새로운 금융 균형: 암호화폐와 은행권 공생 체계 구축' },
    content: { en: 'Analysts declare a new financial paradigm as regulated crypto infrastructure now processes 12% of global payment volume alongside traditional banking, with hybrid products blurring the line between sectors.', ko: '규제를 받는 암호화폐 인프라가 전통 금융과 함께 전 세계 결제 거래량의 12%를 처리하고 하이브리드 상품이 두 부문의 경계를 허물면서, 전문가들은 새로운 금융 패러다임의 도래를 선언했습니다.' },
    read: false, effect: { BANK: 1.06, CRYPTO: 1.08, TECH: 1.05, ECOM: 1.04 },
  },
];

// Arc 5: Geopolitical Tensions (Days 10-29)
const ARC_GEOPOLITICAL: News[] = [
  {
    id: 'a5-1', dayIdx: 10,
    title: { en: 'US-China Trade Tensions Escalate Over Technology Exports', ko: '미중 기술 수출 갈등 격화' },
    content: { en: 'The US Commerce Department announced new restrictions on semiconductor exports to China, citing national security concerns. Technology and aerospace stocks fell sharply on fears of retaliatory measures.', ko: '미국 상무부가 국가 안보를 이유로 중국에 대한 반도체 수출 규제를 강화했다. 보복 조치 우려로 기술주와 항공우주주가 급락했다.' },
    read: false, effect: { TECH: 0.91, AERO: 0.93 },
  },
  {
    id: 'a5-2', dayIdx: 11,
    title: { en: 'EU Announces Retaliatory Tariffs on US Agricultural Goods', ko: 'EU, 미국산 농산물에 보복 관세 부과 발표' },
    content: { en: 'The European Union unveiled a sweeping 25% tariff on American agricultural and food products in response to US steel duties. Food and consumer staples exporters braced for significant revenue headwinds.', ko: '유럽연합이 미국의 철강 관세에 대한 보복으로 미국산 농산물에 25% 관세를 부과하겠다고 발표했다. 식품 수출 기업들은 실적 악화를 우려하고 있다.' },
    read: false, effect: { FOOD: 0.92, ECOM: 0.94 },
  },
  {
    id: 'a5-3', dayIdx: 13,
    title: { en: 'Pentagon Accelerates Defense Procurement Amid Geopolitical Uncertainty', ko: '지정학적 불확실성 속 미 국방부 방산 조달 가속화' },
    content: { en: 'The Pentagon announced a $48 billion supplemental defense budget to accelerate procurement of advanced weapons systems and satellite technology. Aerospace and defense contractors saw their stocks surge to multi-year highs.', ko: '미 국방부가 첨단 무기 체계와 위성 기술 조달 가속화를 위해 480억 달러 규모의 추가 국방 예산을 발표했다. 방산 업체 주가가 수년 만에 최고치로 치솟았다.' },
    read: false, effect: { AERO: 1.08, TECH: 1.04 },
  },
  {
    id: 'a5-4', dayIdx: 14,
    title: { en: 'Global Supply Chain Reshoring Push Gains Momentum', ko: '글로벌 공급망 리쇼어링 추세 가속화' },
    content: { en: 'Major multinationals announced plans to shift manufacturing back to domestic markets, citing trade war risks and supply chain fragility. E-commerce logistics firms saw a mixed reaction as domestic demand rose but import-dependent inventories shrank.', ko: '다수의 다국적 기업들이 무역 분쟁 리스크와 공급망 취약성을 이유로 생산 시설을 자국으로 이전하겠다고 발표했다. 이커머스 물류 기업들은 국내 수요 증가와 수입 의존 재고 감소가 엇갈리며 혼조세를 보였다.' },
    read: false, effect: { ECOM: 0.96, GREEN: 1.05 },
  },
  {
    id: 'a5-5', dayIdx: 16,
    title: { en: 'Sanctions Target Chinese Tech Firms, Rattling Global Media Platforms', ko: '중국 기술 기업 제재, 글로벌 미디어 플랫폼에 파장' },
    content: { en: 'Washington expanded its sanctions list to include several Chinese media and streaming technology companies, raising concerns over platform fragmentation. Global media stocks fell on fears of market-access restrictions and content licensing disputes.', ko: '워싱턴이 중국 미디어·스트리밍 기술 기업들을 제재 목록에 추가하면서 플랫폼 분절화 우려가 높아졌다. 글로벌 미디어주는 시장 접근 제한과 콘텐츠 라이선스 분쟁 우려로 하락했다.' },
    read: false, effect: { MEDIA: 0.92, TECH: 0.93 },
  },
  {
    id: 'a5-6', dayIdx: 17,
    title: { en: 'Grain Export Corridors Disrupted by Regional Conflict', ko: '지역 분쟁으로 곡물 수출 통로 차단' },
    content: { en: 'Key Black Sea shipping lanes were disrupted following escalating regional hostilities, threatening global wheat and corn supplies. Agricultural commodity prices spiked, pressuring food manufacturers while benefiting domestic producers.', ko: '지역 분쟁 격화로 흑해 주요 해상 항로가 차단되면서 글로벌 밀·옥수수 공급에 차질이 빚어졌다. 농산물 가격이 급등하면서 식품 제조업체는 압박을 받은 반면 국내 생산업체는 수혜를 입었다.' },
    read: false, effect: { FOOD: 0.91, ECOM: 0.95 },
  },
  {
    id: 'a5-7', dayIdx: 19,
    title: { en: 'G20 Emergency Summit Announced to Address Trade Fragmentation', ko: 'G20 긴급 정상회의, 무역 분열 해소 위해 소집' },
    content: { en: 'G20 leaders announced an emergency summit in Geneva to address accelerating global trade fragmentation and tariff escalation. Markets rallied broadly on hopes of a diplomatic breakthrough, with export-sensitive sectors leading gains.', ko: 'G20 정상들이 무역 분열 심화와 관세 갈등 해소를 위해 제네바에서 긴급 정상회의를 소집한다고 발표했다. 외교적 돌파구에 대한 기대감으로 시장이 전반적으로 상승했으며, 수출 민감 업종이 상승을 주도했다.' },
    read: false, effect: { ECOM: 1.06, AERO: 1.04, MEDIA: 1.05 },
  },
  {
    id: 'a5-8', dayIdx: 21,
    title: { en: 'Defense Alliance Expands, Boosting Aerospace Contracts', ko: '방위 동맹 확대, 항공우주 계약 증가' },
    content: { en: 'NATO announced a major expansion of joint defense procurement, committing member states to increased spending on next-generation fighter jets and missile defense systems. Aerospace sector stocks climbed to record highs on the contract pipeline outlook.', ko: 'NATO가 차세대 전투기와 미사일 방어 시스템에 대한 회원국 공동 조달 확대를 발표했다. 항공우주 업종은 향후 계약 수주 전망에 힘입어 사상 최고치를 기록했다.' },
    read: false, effect: { AERO: 1.09, TECH: 1.03 },
  },
  {
    id: 'a5-9', dayIdx: 23,
    title: { en: 'Geneva Summit Yields Partial Trade Agreement', ko: '제네바 정상회의, 부분적 무역 합의 도출' },
    content: { en: 'The G20 emergency summit concluded with a partial framework agreement, pausing most tariff escalations for 90 days while negotiations continue. Markets responded positively, though analysts warned that structural disputes remained unresolved.', ko: 'G20 긴급 정상회의가 대부분의 관세 인상을 90일간 유예하는 부분 합의 틀로 마무리됐다. 시장은 긍정적으로 반응했지만, 구조적 갈등은 여전히 미해결 상태라는 분석가들의 경고도 이어졌다.' },
    read: false, effect: { ECOM: 1.07, FOOD: 1.06, TECH: 1.04 },
  },
  {
    id: 'a5-10', dayIdx: 25,
    title: { en: 'Tech Export Sanctions Eased Under New Bilateral Deal', ko: '새 양자 협정으로 기술 수출 제재 완화' },
    content: { en: 'A landmark bilateral agreement between the US and China eased restrictions on certain semiconductor exports, with oversight mechanisms agreed upon by both sides. Technology stocks surged as investors priced in restored supply chain fluidity.', ko: '미국과 중국이 감독 메커니즘에 합의하며 일부 반도체 수출 제재를 완화하는 양자 협정을 체결했다. 기술주는 공급망 유동성 회복 기대감으로 급등했다.' },
    read: false, effect: { TECH: 1.08, AERO: 1.05 },
  },
  {
    id: 'a5-11', dayIdx: 27,
    title: { en: 'New Multilateral Trade Framework Signed by 18 Nations', ko: '18개국, 새 다자 무역 협정 서명' },
    content: { en: 'Eighteen nations signed a new multilateral trade framework at the World Trade Organization, reducing tariffs on green energy technology and agricultural goods. Renewable energy and food stocks rallied as new export markets opened.', ko: '18개국이 세계무역기구(WTO)에서 친환경 에너지 기술과 농산물에 대한 관세를 낮추는 새 다자 무역 협정에 서명했다. 새로운 수출 시장 개방에 힘입어 재생에너지·식품주가 상승했다.' },
    read: false, effect: { GREEN: 1.10, FOOD: 1.08, ECOM: 1.05 },
  },
  {
    id: 'a5-12', dayIdx: 29,
    title: { en: 'Global Markets Rally as Trade War Fears Subside', ko: '무역 전쟁 우려 완화에 글로벌 증시 랠리' },
    content: { en: 'Global equity markets surged broadly as easing trade tensions and the new multilateral framework restored investor confidence. Media, e-commerce, and technology sectors led gains, with analysts upgrading outlooks across export-oriented industries.', ko: '무역 긴장 완화와 새 다자 협정 체결로 투자자 신뢰가 회복되면서 글로벌 증시가 전반적으로 급등했다. 미디어, 이커머스, 기술 업종이 상승을 주도했으며, 수출 지향 산업 전반에 걸쳐 전망 상향 조정이 이어졌다.' },
    read: false, effect: { MEDIA: 1.09, ECOM: 1.08, TECH: 1.07, AERO: 1.06 },
  },
];

// Arc 6: Real Estate & Consumer (Days 5-29)
const ARC_REAL_ESTATE_CONSUMER: News[] = [
  {
    id: 'a6-1', dayIdx: 5,
    title: { en: 'Central Bank Signals Aggressive Rate Hike Cycle', ko: '중앙은행, 공격적 금리 인상 사이클 시사' },
    content: { en: 'The Federal Reserve signaled a series of interest rate hikes to combat persistent inflation, sending mortgage rates to their highest levels in 15 years. Real estate and banking stocks fell sharply as borrowing cost concerns mounted.', ko: '연방준비제도가 지속적인 인플레이션에 대응하기 위해 연속 금리 인상을 예고하면서 모기지 금리가 15년 만에 최고치로 치솟았다. 부동산·은행주가 차입 비용 급등 우려로 급락했다.' },
    read: false, effect: { REALTY: 0.92, BANK: 0.91 },
  },
  {
    id: 'a6-2', dayIdx: 7,
    title: { en: 'Housing Market Shows Rapid Cooling as Sales Drop 18%', ko: '주택 판매 18% 급감, 부동산 시장 급속 냉각' },
    content: { en: 'National home sales fell 18% month-over-month as higher mortgage rates priced out first-time buyers, with inventory piling up in major metropolitan areas. Real estate developers cut project pipelines and flagged rising cancellation rates.', ko: '모기지 금리 상승으로 첫 주택 구매자들이 시장에서 밀려나면서 전국 주택 판매가 전월 대비 18% 급감했다. 주요 대도시를 중심으로 재고가 쌓이자 부동산 개발업체들이 사업 계획을 축소하고 계약 취소율 증가를 경고했다.' },
    read: false, effect: { REALTY: 0.91, BANK: 0.93 },
  },
  {
    id: 'a6-3', dayIdx: 9,
    title: { en: 'Commercial Real Estate Vacancies Hit Decade High', ko: '상업용 부동산 공실률 10년 만에 최고치' },
    content: { en: 'Office vacancy rates hit a decade-high as hybrid work policies became permanent at major corporations, straining commercial property valuations. Banks with large commercial real estate loan books saw credit risk concerns weigh on their share prices.', ko: '주요 기업들의 하이브리드 근무제 영구화로 오피스 공실률이 10년 만에 최고치를 기록하면서 상업용 부동산 가치에 부담을 주고 있다. 상업용 부동산 대출 비중이 높은 은행들은 신용 리스크 우려로 주가가 하락했다.' },
    read: false, effect: { REALTY: 0.92, BANK: 0.92 },
  },
  {
    id: 'a6-4', dayIdx: 11,
    title: { en: 'Remote Work Boom Drives Streaming and Digital Media Surge', ko: '재택근무 확산, 스트리밍·디지털 미디어 수요 급증' },
    content: { en: 'Permanent remote work policies at Fortune 500 companies fueled a surge in home entertainment spending, with streaming platforms and digital media outlets reporting record subscriber growth. Tech infrastructure providers also benefited from rising demand for home office solutions.', ko: '포춘 500대 기업의 영구 재택근무 정책 도입으로 홈 엔터테인먼트 지출이 급증하며 스트리밍 플랫폼과 디지털 미디어 업체들이 역대 최대 구독자 증가를 기록했다. 홈오피스 솔루션 수요 증가로 기술 인프라 기업들도 수혜를 입었다.' },
    read: false, effect: { MEDIA: 1.08, TECH: 1.07 },
  },
  {
    id: 'a6-5', dayIdx: 13,
    title: { en: 'E-Commerce Volumes Surge as Consumers Shift Spending Online', ko: '소비자 온라인 전환 가속, 이커머스 거래량 급증' },
    content: { en: 'Online retail volumes hit an all-time high as consumers shifted discretionary spending away from physical stores toward digital platforms, buoyed by faster delivery times and promotional pricing. Food delivery and grocery e-commerce showed especially strong growth.', ko: '빠른 배송과 프로모션 가격에 힘입어 소비자들의 오프라인 매장 지출이 디지털 플랫폼으로 이동하면서 온라인 소매 거래량이 사상 최고치를 기록했다. 음식 배달과 식료품 이커머스가 특히 강한 성장세를 보였다.' },
    read: false, effect: { ECOM: 1.10, FOOD: 1.05 },
  },
  {
    id: 'a6-6', dayIdx: 15,
    title: { en: 'Brick-and-Mortar Retail Launches Experiential Comeback Strategy', ko: '오프라인 유통업계, 체험형 전략으로 반격' },
    content: { en: 'Major retail chains announced ambitious store revamp programs centered on experiential shopping, in-store dining, and entertainment concepts to compete with e-commerce. Analysts noted the trend could partly offset online market share losses while boosting foot traffic metrics.', ko: '주요 유통 체인들이 이커머스와 경쟁하기 위해 체험형 쇼핑, 매장 내 다이닝, 엔터테인먼트 개념을 중심으로 한 대규모 매장 개편 전략을 발표했다. 애널리스트들은 이 추세가 온라인 점유율 손실을 일부 상쇄하고 방문객 지표를 개선할 수 있다고 분석했다.' },
    read: false, effect: { ECOM: 0.96, MEDIA: 1.06 },
  },
  {
    id: 'a6-7', dayIdx: 17,
    title: { en: 'Central Bank Delivers Fifth Consecutive Rate Hike', ko: '중앙은행, 5회 연속 금리 인상 단행' },
    content: { en: 'The Federal Reserve delivered its fifth consecutive rate hike, bringing the benchmark rate to a 22-year high and fueling speculation that the tightening cycle was nearing its peak. Banks reported strong net interest margins but warned of increasing loan delinquencies in the mortgage book.', ko: '연방준비제도가 5회 연속 금리 인상을 단행해 기준금리가 22년 만에 최고치에 도달했으며, 긴축 사이클 정점 가능성에 대한 추측이 고조됐다. 은행들은 순이자마진 개선을 보고했지만 모기지 대출 연체율 증가를 경고했다.' },
    read: false, effect: { BANK: 1.05, REALTY: 0.92 },
  },
  {
    id: 'a6-8', dayIdx: 19,
    title: { en: 'Fed Chair Hints at Rate Pause, Markets Respond Positively', ko: '연준 의장, 금리 동결 가능성 시사… 시장 긍정 반응' },
    content: { en: 'Federal Reserve Chair hinted at a potential pause in rate hikes following the latest inflation data, which showed a meaningful deceleration. Real estate stocks rebounded sharply as mortgage rate relief prospects improved, and banking stocks gained on reduced recession fears.', ko: '연방준비제도 의장이 최근 물가 지표에서 인플레이션이 뚜렷하게 둔화됐다며 금리 인상 일시 중단 가능성을 시사했다. 모기지 금리 완화 기대감으로 부동산주가 급반등했으며, 경기 침체 우려 완화로 은행주도 상승했다.' },
    read: false, effect: { REALTY: 1.08, BANK: 1.06 },
  },
  {
    id: 'a6-9', dayIdx: 21,
    title: { en: 'Housing Market Shows First Signs of Recovery', ko: '부동산 시장, 첫 회복 신호 포착' },
    content: { en: 'New home sales and mortgage applications rose for the second consecutive month, suggesting the housing market downturn was bottoming out. Homebuilder confidence indices ticked higher, and real estate investment trusts saw renewed institutional buying.', ko: '신규 주택 판매와 모기지 신청이 2개월 연속 증가하면서 부동산 시장 침체가 저점을 통과하고 있다는 신호가 나타났다. 주택 건설사 신뢰지수가 상승했으며, 부동산 투자 신탁(REITs)에 대한 기관 매수세가 다시 살아났다.' },
    read: false, effect: { REALTY: 1.09, BANK: 1.04 },
  },
  {
    id: 'a6-10', dayIdx: 23,
    title: { en: 'Rate Cut Expectations Drive Mortgage Market Boom', ko: '금리 인하 기대감에 모기지 시장 활기 회복' },
    content: { en: 'Futures markets priced in three rate cuts over the next 12 months, triggering a refinancing boom and a surge in new mortgage applications. Banks reported strong forward booking pipelines and real estate developers resumed projects that had been shelved.', ko: '선물 시장이 향후 12개월 내 세 차례 금리 인하를 반영하면서 대규모 재융자 붐과 신규 모기지 신청 급증이 나타났다. 은행들은 강한 선행 예약 파이프라인을 보고했으며, 부동산 개발업체들은 보류했던 사업을 재개했다.' },
    read: false, effect: { REALTY: 1.07, BANK: 1.08, ECOM: 1.04 },
  },
  {
    id: 'a6-11', dayIdx: 25,
    title: { en: 'Consumer Confidence Index Hits Three-Year High', ko: '소비자 신뢰지수, 3년 만에 최고치 기록' },
    content: { en: 'The Consumer Confidence Index surged to a three-year high as falling inflation and stable employment reassured households. Discretionary spending rose sharply, benefiting e-commerce platforms, food service operators, and media streaming subscriptions.', ko: '인플레이션 완화와 안정적 고용 환경이 가계에 안도감을 주면서 소비자 신뢰지수가 3년 만에 최고치로 급등했다. 재량 지출이 크게 증가하면서 이커머스 플랫폼, 푸드서비스, 미디어 스트리밍 구독 서비스가 수혜를 입었다.' },
    read: false, effect: { ECOM: 1.09, FOOD: 1.07, MEDIA: 1.08 },
  },
  {
    id: 'a6-12', dayIdx: 27,
    title: { en: 'Retail Earnings Season Beats Expectations Across the Board', ko: '소매업체 실적 발표, 전반적으로 예상치 상회' },
    content: { en: 'Retail earnings season delivered broad-based beats, with both online and physical retailers reporting stronger-than-expected same-store sales and improved profit margins. Analysts upgraded price targets across the consumer sector as spending momentum proved more durable than feared.', ko: '이번 소매업체 실적 발표 시즌은 온·오프라인 유통업체 모두 기대 이상의 동일 매장 매출과 수익률 개선을 보고하며 전반적인 어닝 서프라이즈를 연출했다. 소비 모멘텀이 예상보다 강하게 유지되면서 애널리스트들이 소비재 섹터 전반의 목표주가를 상향 조정했다.' },
    read: false, effect: { ECOM: 1.10, MEDIA: 1.07, FOOD: 1.06 },
  },
  {
    id: 'a6-13', dayIdx: 29,
    title: { en: 'Urban Real Estate Revival Fueled by Return-to-Office Trend', ko: '출근 복귀 추세에 도심 부동산 시장 회복 가속' },
    content: { en: 'A growing return-to-office trend reversed urban real estate weakness, with demand for city-center residential and mixed-use properties climbing to pre-pandemic levels. Banks reported a sharp uptick in commercial property loans as developers rushed to capitalize on renewed urban demand.', ko: '출근 복귀 추세가 확산되면서 도심 부동산 약세가 반전됐다. 도심 주거용·복합 시설 수요가 팬데믹 이전 수준으로 회복됐다. 개발업체들이 새로운 도심 수요를 선점하기 위해 나서면서 은행들의 상업용 부동산 대출이 급증했다.' },
    read: false, effect: { REALTY: 1.08, BANK: 1.09, TECH: 1.04 },
  },
];

// Supplemental news for thin days and Day 30 finale
const ARC_SUPPLEMENTAL: News[] = [
  {
    id: 's-1', dayIdx: 2,
    title: { en: 'Global Shipping Index Hits Record High', ko: '글로벌 해운 지수, 사상 최고치 경신' },
    content: { en: 'The Baltic Dry Index surged to an all-time high as demand for raw materials exceeded available vessel capacity, signaling strong global trade activity but raising concerns about logistics bottlenecks.', ko: '원자재 수요가 가용 선박 수용력을 초과하면서 발틱건화물지수가 사상 최고치를 기록했다. 글로벌 무역 활동이 활발하다는 신호이지만 물류 병목 우려도 커지고 있다.' },
    read: false, effect: { ECOM: 1.04, FOOD: 0.97 },
  },
  {
    id: 's-2', dayIdx: 6,
    title: { en: 'Central Banks Coordinate Emergency Liquidity Injections', ko: '주요 중앙은행들, 긴급 유동성 공급 공조' },
    content: { en: 'The Federal Reserve, ECB, and Bank of Japan announced coordinated emergency liquidity measures to stabilize financial markets amid the escalating health crisis, calming investor panic.', ko: '연방준비제도, 유럽중앙은행, 일본은행이 보건 위기 확산 속 금융 시장 안정을 위한 긴급 유동성 공급 공조를 발표하며 투자자들의 공포 심리를 진정시켰다.' },
    read: false, effect: { BANK: 1.06, CRYPTO: 1.04 },
  },
  {
    id: 's-3', dayIdx: 22,
    title: { en: 'Semiconductor Demand Soars on AI and EV Convergence', ko: '반도체 수요, AI·전기차 융합으로 급증' },
    content: { en: 'Industry analysts project a 45% increase in global semiconductor demand over the next two years, driven by the twin megatrends of AI infrastructure buildout and electric vehicle production acceleration.', ko: '업계 애널리스트들은 AI 인프라 구축과 전기차 생산 가속화라는 양대 메가트렌드에 힘입어 향후 2년간 글로벌 반도체 수요가 45% 증가할 것으로 전망했다.' },
    read: false, effect: { TECH: 1.06, GREEN: 1.04 },
  },
  {
    id: 's-4', dayIdx: 24,
    title: { en: 'Streaming Wars Intensify with Massive Content Budgets', ko: '스트리밍 전쟁 격화, 대규모 콘텐츠 투자 경쟁' },
    content: { en: 'Three major streaming platforms announced combined content budgets exceeding $60 billion for the next fiscal year, escalating the battle for subscriber attention and raising questions about long-term profitability.', ko: '주요 스트리밍 플랫폼 3곳이 다음 회계연도 콘텐츠 예산을 합산 600억 달러 이상으로 발표하며 구독자 확보 경쟁이 격화되고 장기적 수익성에 대한 의문이 제기되고 있다.' },
    read: false, effect: { MEDIA: 1.08, TECH: 1.02 },
  },
  {
    id: 's-5', dayIdx: 28,
    title: { en: 'Global Infrastructure Spending Bill Clears Final Vote', ko: '글로벌 인프라 투자법, 최종 표결 통과' },
    content: { en: 'A landmark $1.5 trillion infrastructure spending bill cleared its final legislative hurdle, allocating funds to transportation, broadband, green energy, and smart city initiatives over the next decade.', ko: '1조 5천억 달러 규모의 획기적인 인프라 투자법이 최종 입법 관문을 통과했다. 향후 10년간 교통, 브로드밴드, 친환경 에너지, 스마트 시티에 자금이 배분될 예정이다.' },
    read: false, effect: { REALTY: 1.07, GREEN: 1.05, AERO: 1.03 },
  },
  {
    id: 's-6', dayIdx: 30,
    title: { en: 'Year-End Rally: All Sectors Close at Multi-Year Highs', ko: '연말 랠리: 전 섹터 수년 만의 최고치로 마감' },
    content: { en: 'Markets closed the trading period with a broad-based year-end rally as institutional investors deployed remaining capital allocations. All ten sectors finished at or near multi-year highs, capping a transformative period in global markets.', ko: '기관 투자자들이 남은 자본 배분을 집행하면서 시장이 전 섹터에 걸친 연말 랠리로 마감했다. 10개 섹터 모두 수년 만의 최고치 부근에서 마감하며, 글로벌 시장의 대변혁기를 마무리했다.' },
    read: false, effect: { TECH: 1.04, ECOM: 1.03, GREEN: 1.05, HEALTH: 1.02, AERO: 1.03 },
  },
  {
    id: 's-7', dayIdx: 30,
    title: { en: 'Analysts Preview: What Lies Ahead for the New Year', ko: '애널리스트 전망: 새해에 주목할 핵심 이슈' },
    content: { en: 'Wall Street strategists issued their new year outlooks, highlighting AI monetization, post-crisis healthcare spending, crypto-banking convergence, and green infrastructure as the four defining investment themes for the coming year.', ko: '월가 전략가들이 새해 전망을 발표하며, AI 수익화, 위기 후 헬스케어 지출, 암호화폐-은행 융합, 그린 인프라를 올해를 규정할 4대 투자 테마로 꼽았다.' },
    read: false, effect: { BANK: 1.04, CRYPTO: 1.06, MEDIA: 1.03, FOOD: 1.02, REALTY: 1.04 },
  },
];

// Merge all arcs and boost content, sort by dayIdx for proper game sequencing
export const ADVANCED_NEWS: News[] = [
  ...ARC_AI_REVOLUTION,
  ...ARC_HEALTH_CRISIS,
  ...ARC_ENERGY_TRANSITION,
  ...ARC_FINANCIAL_DISRUPTION,
  ...ARC_GEOPOLITICAL,
  ...ARC_REAL_ESTATE_CONSUMER,
  ...ARC_SUPPLEMENTAL,
  ...BOOST_DAYS_1_10,
  ...BOOST_DAYS_11_20,
  ...BOOST_DAYS_21_30,
].sort((a, b) => a.dayIdx - b.dayIdx);
