import { ClassicScenarioArc } from './classic-arcs';

export const CLIMATE_SUMMIT_ARC: ClassicScenarioArc = {
  id: 'climate-summit',
  name: { en: 'Global Climate Summit', ko: '글로벌 기후 정상회담' },
  news: [
    // Day 1: Historic climate summit opens with bold pledges
    {
      id: 'cs-1-1',
      dayIdx: 1,
      title: {
        en: 'Historic Climate Summit Opens with Unprecedented Pledges',
        ko: '역사적 기후 정상회담, 전례 없는 공약과 함께 개막',
      },
      content: {
        en: 'The largest climate summit in history opened with 180 nations pledging to achieve net-zero emissions by 2040, five years ahead of previous targets.',
        ko: '사상 최대 규모 기후 정상회담이 180개국이 기존 목표보다 5년 앞당긴 2040년까지 탄소 순배출 제로를 달성하겠다는 공약과 함께 개막했다.',
      },
      read: false,
      effect: { GREEN: 1.12, AERO: 0.95 },
    },
    {
      id: 'cs-1-2',
      dayIdx: 1,
      title: {
        en: 'Renewable Energy Stocks Surge on Summit Optimism',
        ko: '정상회담 낙관론에 재생에너지 주 급등',
      },
      content: {
        en: 'Solar, wind, and battery storage companies rallied sharply as summit pledges implied trillions in new clean energy investment over the coming decade.',
        ko: '정상회담 공약이 향후 10년간 수조 달러의 신규 청정에너지 투자를 시사하면서 태양광, 풍력, 배터리 저장 기업 주가가 큰 폭으로 상승했다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'cs-1-3',
      dayIdx: 1,
      title: {
        en: 'Aviation Industry Faces Strict New Emission Targets',
        ko: '항공 산업, 엄격한 신규 배출 목표에 직면',
      },
      content: {
        en: 'The summit draft framework singled out aviation as requiring a 50% emission reduction by 2030, sending aerospace stocks lower on compliance cost fears.',
        ko: '정상회담 초안이 항공 산업에 2030년까지 50% 배출 감소를 요구하면서 규제 준수 비용 우려에 항공우주 주가가 하락했다.',
      },
      read: false,
      effect: { AERO: 0.92 },
    },
    {
      id: 'cs-1-4',
      dayIdx: 1,
      title: {
        en: 'Tech Companies Pledge Carbon-Neutral Operations by 2028',
        ko: '기술 기업들, 2028년까지 탄소중립 운영 선언',
      },
      content: {
        en: 'Major technology companies jointly pledged to achieve carbon-neutral operations by 2028, including data centers, with investors split on whether the transition costs justify the PR benefits.',
        ko: '주요 기술 기업들이 데이터센터를 포함해 2028년까지 탄소중립 운영을 달성하겠다고 공동 선언했다. 전환 비용 대비 홍보 효과에 대한 투자자 의견이 엇갈렸다.',
      },
      read: false,
      effect: { TECH: 0.97 },
    },
    {
      id: 'cs-1-5',
      dayIdx: 1,
      title: {
        en: 'WHO Links Climate Action to Public Health Gains',
        ko: 'WHO, 기후 행동과 공중보건 이익의 연관성 강조',
      },
      content: {
        en: 'The WHO presented research showing aggressive climate action could prevent 7 million premature deaths annually, boosting demand for healthcare companies focused on environmental health.',
        ko: 'WHO가 적극적 기후 행동으로 연간 700만 명의 조기 사망을 예방할 수 있다는 연구를 발표하며 환경 보건 중심 헬스케어 기업에 대한 수요가 높아졌다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },

    // Day 2: Carbon tax proposal shocks fossil fuel-dependent industries
    {
      id: 'cs-2-1',
      dayIdx: 2,
      title: {
        en: 'Global Carbon Tax Proposal Shocks Markets',
        ko: '글로벌 탄소세 제안에 시장 충격',
      },
      content: {
        en: 'Summit negotiators proposed a universal carbon tax of $100 per ton starting 2027, far exceeding market expectations and sending carbon-intensive stocks into freefall.',
        ko: '정상회담 협상단이 2027년부터 톤당 100달러의 범용 탄소세를 제안했다. 시장 예상을 훨씬 초과한 수준이며 탄소 집약 업종 주가가 급락했다.',
      },
      read: false,
      effect: { AERO: 0.88, ECOM: 0.94 },
    },
    {
      id: 'cs-2-2',
      dayIdx: 2,
      title: {
        en: 'Green Energy Sector Hits All-Time High on Carbon Tax Tailwind',
        ko: '탄소세 호재에 친환경 에너지 업종 사상 최고가',
      },
      content: {
        en: 'Renewable energy stocks reached record valuations as analysts calculated the proposed carbon tax would make fossil fuel electricity generation 40% more expensive than solar and wind.',
        ko: '제안된 탄소세로 화석연료 발전 비용이 태양광·풍력 대비 40% 비싸질 것이라는 분석이 나오면서 재생에너지 주가가 사상 최고 밸류에이션을 기록했다.',
      },
      read: false,
      effect: { GREEN: 1.11 },
    },
    {
      id: 'cs-2-3',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Logistics Under Pressure from Carbon Levy',
        ko: '탄소 부과금에 이커머스 물류비 압박',
      },
      content: {
        en: 'Logistics-heavy e-commerce platforms warned that the proposed carbon tax on shipping fuels would add billions to annual operating costs unless fleet electrification accelerates.',
        ko: '물류 비중이 높은 이커머스 플랫폼들은 운송 연료 탄소세로 차량 전동화를 서두르지 않으면 연간 운영비가 수십억 달러 증가할 것이라고 경고했다.',
      },
      read: false,
      effect: { ECOM: 0.93 },
    },
    {
      id: 'cs-2-4',
      dayIdx: 2,
      title: {
        en: 'Healthcare Sector Benefits from Clean Air Investment Push',
        ko: '청정 공기 투자 확대에 헬스케어 업종 수혜',
      },
      content: {
        en: 'The summit\'s clean air provisions included $200 billion for respiratory disease prevention and air quality monitoring, directly benefiting healthcare and medical device companies.',
        ko: '정상회담의 청정 공기 조항에 호흡기 질환 예방과 대기질 모니터링을 위한 2,000억 달러가 포함되면서 헬스케어 및 의료기기 기업들이 직접적 수혜를 입었다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },
    {
      id: 'cs-2-5',
      dayIdx: 2,
      title: {
        en: 'Tech Companies See Opportunity in Carbon Tracking Systems',
        ko: '기술 기업, 탄소 추적 시스템에서 사업 기회 포착',
      },
      content: {
        en: 'Technology firms positioned themselves to build the global carbon tracking and trading infrastructure that the proposed tax would require, offsetting transition costs.',
        ko: '기술 기업들이 제안된 탄소세에 필요한 글로벌 탄소 추적·거래 인프라 구축에 나서며 전환 비용을 상쇄할 사업 기회를 확보했다.',
      },
      read: false,
      effect: { TECH: 1.05 },
    },

    // Day 3: Tech companies announce massive green pivots
    {
      id: 'cs-3-1',
      dayIdx: 3,
      title: {
        en: 'NeoTech Announces $30 Billion Green Technology Pivot',
        ko: '네오테크, 300억 달러 규모 그린 기술 전환 발표',
      },
      content: {
        en: 'NeoTech Industries announced a massive $30 billion investment in green computing, sustainable AI, and carbon capture technology over the next five years.',
        ko: '네오테크가 향후 5년간 그린 컴퓨팅, 지속가능 AI, 탄소 포집 기술에 300억 달러를 투자하는 대규모 전환 계획을 발표했다.',
      },
      read: false,
      effect: { TECH: 1.08, GREEN: 1.05 },
    },
    {
      id: 'cs-3-2',
      dayIdx: 3,
      title: {
        en: 'E-Commerce Giants Commit to All-Electric Delivery Fleets',
        ko: '이커머스 대기업, 전기차 배송 차량 전면 전환 선언',
      },
      content: {
        en: 'Major e-commerce platforms jointly committed to converting 100% of their delivery fleets to electric vehicles by 2029, with initial conversion costs pressuring near-term margins.',
        ko: '주요 이커머스 플랫폼들이 2029년까지 배송 차량 100%를 전기차로 전환하겠다고 공동 선언했다. 초기 전환 비용이 단기 마진을 압박할 전망이다.',
      },
      read: false,
      effect: { ECOM: 0.96, GREEN: 1.04 },
    },
    {
      id: 'cs-3-3',
      dayIdx: 3,
      title: {
        en: 'Aerospace Industry Unveils Hydrogen-Powered Aircraft Roadmap',
        ko: '항공우주 업계, 수소 동력 항공기 로드맵 공개',
      },
      content: {
        en: 'Leading aerospace manufacturers jointly released a roadmap for hydrogen-powered commercial aircraft, reassuring investors that the industry can meet emission targets.',
        ko: '주요 항공우주 제조업체들이 수소 동력 상업 항공기 로드맵을 공동 발표하며 업계가 배출 목표를 달성할 수 있다는 투자자 신뢰를 회복시켰다.',
      },
      read: false,
      effect: { AERO: 1.07 },
    },
    {
      id: 'cs-3-4',
      dayIdx: 3,
      title: {
        en: 'Pharmaceutical Companies Launch Climate Health Initiative',
        ko: '제약사들, 기후 건강 이니셔티브 출범',
      },
      content: {
        en: 'Twenty leading pharmaceutical companies launched a joint climate health initiative to develop treatments for climate-related diseases, backed by $50 billion in combined R&D funding.',
        ko: '20대 제약사가 기후 관련 질환 치료제 개발을 위한 공동 기후 건강 이니셔티브를 출범했다. 총 500억 달러의 합산 R&D 자금이 투입된다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'cs-3-5',
      dayIdx: 3,
      title: {
        en: 'Carbon Credit Market Explodes in Size on Regulatory Clarity',
        ko: '규제 명확화에 탄소배출권 시장 규모 폭발적 성장',
      },
      content: {
        en: 'Global carbon credit trading volumes tripled in a single day as the summit\'s regulatory framework provided the clarity needed for institutional investors to enter the market.',
        ko: '정상회담의 규제 프레임워크가 기관 투자자들의 시장 진입에 필요한 명확성을 제공하면서 글로벌 탄소배출권 거래량이 하루 만에 3배로 폭증했다.',
      },
      read: false,
      effect: { TECH: 1.04, GREEN: 1.03 },
    },

    // Day 4: Developing nations demand concessions, deal at risk
    {
      id: 'cs-4-1',
      dayIdx: 4,
      title: {
        en: 'Developing Nations Walk Out of Climate Summit',
        ko: '개발도상국, 기후 정상회담 퇴장',
      },
      content: {
        en: 'A coalition of 60 developing nations walked out of negotiations, demanding $500 billion in annual climate financing and exemptions from the carbon tax until 2035.',
        ko: '60개 개발도상국 연합이 2035년까지 탄소세 면제와 연간 5,000억 달러의 기후 금융 지원을 요구하며 협상장을 퇴장했다.',
      },
      read: false,
      effect: { GREEN: 0.93, TECH: 0.96 },
    },
    {
      id: 'cs-4-2',
      dayIdx: 4,
      title: {
        en: 'Climate Deal Collapse Fears Rattle Global Markets',
        ko: '기후 합의 결렬 우려에 글로벌 시장 흔들',
      },
      content: {
        en: 'Markets sold off broadly as the developing nation walkout raised the specter of a complete summit failure, threatening to unwind the week\'s climate-driven investment thesis.',
        ko: '개발도상국 퇴장으로 정상회담 전면 결렬 가능성이 부각되면서 이번 주 기후 기반 투자 논리가 무너질 수 있다는 우려에 시장이 전반적으로 하락했다.',
      },
      read: false,
      effect: { ECOM: 0.95, AERO: 0.96 },
    },
    {
      id: 'cs-4-3',
      dayIdx: 4,
      title: {
        en: 'Emergency Mediation Effort Launched by UN Secretary General',
        ko: 'UN 사무총장, 긴급 중재 나서',
      },
      content: {
        en: 'The UN Secretary General launched an emergency mediation effort, proposing a tiered carbon tax system with extended timelines for developing economies. Markets stabilized on the news.',
        ko: 'UN 사무총장이 개발도상국에 연장된 이행 기한을 부여하는 차등 탄소세 체계를 제안하며 긴급 중재에 나섰다. 시장은 이 소식에 안정을 되찾았다.',
      },
      read: false,
      effect: { GREEN: 1.05, TECH: 1.03 },
    },
    {
      id: 'cs-4-4',
      dayIdx: 4,
      title: {
        en: 'Healthcare Stocks Resilient as Climate Health Thesis Holds',
        ko: '기후 보건 테마 건재에 헬스케어 주 견조',
      },
      content: {
        en: 'Healthcare stocks proved resilient during the summit uncertainty, as analysts noted the climate health investment thesis holds regardless of the carbon tax outcome.',
        ko: '애널리스트들이 탄소세 결과와 무관하게 기후 보건 투자 논리가 유효하다고 분석하면서 헬스케어 주가 정상회담 불확실성 속에서도 견조한 흐름을 보였다.',
      },
      read: false,
      effect: { HEALTH: 1.04 },
    },
    {
      id: 'cs-4-5',
      dayIdx: 4,
      title: {
        en: 'Aerospace Stocks Recover on Hydrogen Aircraft Momentum',
        ko: '수소 항공기 모멘텀에 항공우주 주 회복',
      },
      content: {
        en: 'Aerospace stocks recovered from the day\'s lows as investors recognized that hydrogen aircraft development will proceed regardless of summit outcomes due to fuel cost economics.',
        ko: '연료비 경제성 때문에 정상회담 결과와 무관하게 수소 항공기 개발이 진행될 것이라는 인식이 퍼지면서 항공우주 주가가 장중 저점에서 회복했다.',
      },
      read: false,
      effect: { AERO: 1.05 },
    },

    // Day 5: Landmark agreement signed, green/health benefit, mixed for others
    {
      id: 'cs-5-1',
      dayIdx: 5,
      title: {
        en: 'Landmark Climate Agreement Signed by 175 Nations',
        ko: '175개국 역사적 기후 협약 서명',
      },
      content: {
        en: 'After marathon overnight negotiations, 175 nations signed a landmark climate agreement featuring a tiered carbon tax, $300 billion climate fund, and binding emission reduction targets.',
        ko: '밤새 이어진 마라톤 협상 끝에 175개국이 차등 탄소세, 3,000억 달러 기후 기금, 구속력 있는 배출 감소 목표를 담은 역사적 기후 협약에 서명했다.',
      },
      read: false,
      effect: { GREEN: 1.10, HEALTH: 1.05 },
    },
    {
      id: 'cs-5-2',
      dayIdx: 5,
      title: {
        en: 'Green Energy Sector Celebrates Structural Growth Mandate',
        ko: '친환경 에너지 업계, 구조적 성장 보장에 환호',
      },
      content: {
        en: 'Renewable energy companies celebrated the agreement as a structural growth guarantee, with binding targets ensuring decades of sustained demand for clean energy infrastructure.',
        ko: '재생에너지 기업들은 이번 협약을 구조적 성장 보장으로 환영했다. 구속력 있는 목표가 수십 년간의 지속적인 청정에너지 인프라 수요를 보장한다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'cs-5-3',
      dayIdx: 5,
      title: {
        en: 'Tech Sector Lands Key Role in Climate Monitoring Infrastructure',
        ko: '기술 업종, 기후 모니터링 인프라 핵심 역할 확보',
      },
      content: {
        en: 'The climate agreement designated technology companies as critical providers of global carbon monitoring, reporting, and verification systems, creating a massive new revenue stream.',
        ko: '기후 협약이 기술 기업을 글로벌 탄소 모니터링·보고·검증 시스템의 핵심 제공자로 지정하면서 막대한 신규 매출원이 창출됐다.',
      },
      read: false,
      effect: { TECH: 1.07 },
    },
    {
      id: 'cs-5-4',
      dayIdx: 5,
      title: {
        en: 'E-Commerce Adapts: Green Logistics as Competitive Advantage',
        ko: '이커머스의 적응: 친환경 물류가 경쟁 우위로',
      },
      content: {
        en: 'E-commerce platforms that had already invested in electric fleets and carbon-neutral warehouses emerged as winners, gaining market share from slower-moving competitors.',
        ko: '이미 전기차 배송과 탄소중립 물류센터에 투자한 이커머스 플랫폼들이 대응이 느린 경쟁사 대비 시장 점유율을 높이며 승자로 부상했다.',
      },
      read: false,
      effect: { ECOM: 1.05 },
    },
    {
      id: 'cs-5-5',
      dayIdx: 5,
      title: {
        en: 'Analysts: Climate Agreement Reshapes Global Investment Landscape',
        ko: '애널리스트 "기후 협약이 글로벌 투자 지형 재편"',
      },
      content: {
        en: 'Market strategists declared the climate agreement a once-in-a-generation event that permanently redirects capital flows toward sustainable industries and climate-resilient business models.',
        ko: '시장 전략가들은 기후 협약을 지속가능 산업과 기후 회복력 있는 비즈니스 모델로 자본 흐름을 영구적으로 전환시키는 세대적 사건으로 평가했다.',
      },
      read: false,
      effect: { AERO: 1.04, HEALTH: 1.03 },
    },
  ],
};
