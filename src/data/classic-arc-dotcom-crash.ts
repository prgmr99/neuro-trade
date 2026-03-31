import { ClassicScenarioArc } from './classic-arcs';

export const DOTCOM_CRASH_ARC: ClassicScenarioArc = {
  id: 'dotcom-crash',
  name: { en: 'Dot-Com Crash', ko: '닷컴 버블 붕괴' },
  news: [
    // Day 1: Star internet company reports massive losses despite sky-high valuation
    {
      id: 'dc-1-1',
      dayIdx: 1,
      title: {
        en: 'ClickSphere Reports $800M Loss Despite $50B Valuation',
        ko: '클릭스피어, 500억 달러 시가총액에도 8억 달러 손실 보고',
      },
      content: {
        en: 'ClickSphere, the poster child of the internet boom, stunned investors by reporting an $800 million quarterly loss while burning through cash at an unsustainable rate. The company\'s stock dropped 30% after-hours.',
        ko: '인터넷 붐의 대표주자 클릭스피어가 지속 불가능한 속도로 현금을 소진하며 분기 손실 8억 달러를 기록해 투자자들을 경악시켰다. 시간외 거래에서 주가가 30% 폭락했다.',
      },
      read: false,
      effect: { TECH: 0.88, ECOM: 0.90 },
    },
    {
      id: 'dc-1-2',
      dayIdx: 1,
      title: {
        en: 'Internet Stock Index Plunges on Profitability Fears',
        ko: '수익성 우려에 인터넷주 지수 급락',
      },
      content: {
        en: 'The broader internet stock index fell 8% as ClickSphere\'s losses raised fundamental questions about the viability of businesses that prioritize growth over profitability.',
        ko: '클릭스피어의 손실이 수익성보다 성장을 우선시하는 비즈니스의 존속 가능성에 근본적인 의문을 제기하면서 인터넷 주가 지수가 8% 급락했다.',
      },
      read: false,
      effect: { TECH: 0.91 },
    },
    {
      id: 'dc-1-3',
      dayIdx: 1,
      title: {
        en: 'Online Retailers Face Investor Scrutiny',
        ko: '온라인 유통업체, 투자자 검증의 도마 위에',
      },
      content: {
        en: 'E-commerce companies faced intense investor pressure to demonstrate paths to profitability. Several online retailers with negative unit economics saw their shares fall by double digits.',
        ko: '이커머스 기업들이 수익성 달성 경로를 증명하라는 투자자들의 강한 압박에 직면했다. 단위 경제성이 마이너스인 여러 온라인 유통업체 주가가 두 자릿수 하락했다.',
      },
      read: false,
      effect: { ECOM: 0.89 },
    },
    {
      id: 'dc-1-4',
      dayIdx: 1,
      title: {
        en: 'Investors Rotate into "Old Economy" Stocks',
        ko: '투자자들, "구경제" 주식으로 자금 이동',
      },
      content: {
        en: 'As internet stocks crumbled, investors poured capital into traditional industry leaders with real earnings and tangible assets. Healthcare and aerospace stocks led the defensive rotation.',
        ko: '인터넷주가 무너지면서 투자자들이 실질적인 수익과 유형 자산을 가진 전통 산업 리더로 자금을 이동시켰다. 헬스케어와 항공우주주가 방어적 순환매를 주도했다.',
      },
      read: false,
      effect: { HEALTH: 1.07, AERO: 1.05 },
    },
    {
      id: 'dc-1-5',
      dayIdx: 1,
      title: {
        en: 'Green Energy Caught in Tech Sell-Off Crossfire',
        ko: '친환경 에너지, 기술주 매도세의 유탄 맞아',
      },
      content: {
        en: 'Renewable energy stocks fell despite having no direct internet exposure, as the risk-off sentiment caused investors to indiscriminately sell speculative growth positions.',
        ko: '인터넷과 직접적 연관이 없음에도 위험회피 심리로 투자자들이 투기적 성장주 포지션을 무차별 매도하면서 재생에너지주도 하락했다.',
      },
      read: false,
      effect: { GREEN: 0.93 },
    },

    // Day 2: Venture capital funding dries up overnight, IPO pipeline collapses
    {
      id: 'dc-2-1',
      dayIdx: 2,
      title: {
        en: 'Venture Capital Firms Freeze New Investments',
        ko: '벤처캐피털, 신규 투자 전면 동결',
      },
      content: {
        en: 'Five major venture capital firms simultaneously announced a pause on new internet investments, citing the need to reassess valuations. Startups that were weeks from closing funding rounds were left stranded.',
        ko: '5개 주요 벤처캐피털이 밸류에이션 재평가 필요성을 이유로 신규 인터넷 투자를 동시에 중단했다. 자금 조달 마감을 수주 앞둔 스타트업들이 벼랑 끝에 몰렸다.',
      },
      read: false,
      effect: { TECH: 0.89 },
    },
    {
      id: 'dc-2-2',
      dayIdx: 2,
      title: {
        en: 'IPO Market Collapses as Underwriters Pull Offerings',
        ko: 'IPO 시장 붕괴, 주관사들 공모 철회',
      },
      content: {
        en: 'Investment banks withdrew 12 planned internet IPOs in a single day as institutional demand evaporated. The IPO window that had minted hundreds of paper billionaires slammed shut.',
        ko: '기관 수요가 증발하면서 투자은행들이 하루 만에 12건의 인터넷 기업 IPO를 철회했다. 수백 명의 종이 억만장자를 만들어냈던 IPO 시장의 문이 닫혔다.',
      },
      read: false,
      effect: { TECH: 0.92, ECOM: 0.93 },
    },
    {
      id: 'dc-2-3',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Giants Slash Marketing Budgets',
        ko: '이커머스 대기업, 마케팅 예산 대폭 삭감',
      },
      content: {
        en: 'Leading e-commerce platforms drastically cut marketing spend as the path to profitability became the new mantra. Analysts warned this could trigger a vicious cycle of falling traffic and revenue.',
        ko: '수익성 달성이 새로운 화두가 되면서 주요 이커머스 플랫폼들이 마케팅 지출을 대폭 삭감했다. 애널리스트들은 트래픽과 매출 감소의 악순환이 시작될 수 있다고 경고했다.',
      },
      read: false,
      effect: { ECOM: 0.91 },
    },
    {
      id: 'dc-2-4',
      dayIdx: 2,
      title: {
        en: 'Pharmaceutical Companies Attract Fleeing Tech Investors',
        ko: '기술주 이탈 자금, 제약사로 유입',
      },
      content: {
        en: 'VitaPharma and other pharmaceutical companies saw record institutional inflows as investors sought companies with proven revenue models and FDA-approved product pipelines.',
        ko: '비타파마를 비롯한 제약사에 기록적인 기관 자금이 유입됐다. 투자자들은 검증된 수익 모델과 FDA 승인 제품 파이프라인을 보유한 기업을 찾아 이동했다.',
      },
      read: false,
      effect: { HEALTH: 1.08 },
    },
    {
      id: 'dc-2-5',
      dayIdx: 2,
      title: {
        en: 'Aerospace Posts Strong Earnings Amid Market Turmoil',
        ko: '시장 혼란 속 항공우주, 호실적 발표',
      },
      content: {
        en: 'AeroSpace Dynamics reported quarterly earnings that exceeded analyst estimates by 15%, driven by defense contracts and commercial jet deliveries. The stock was hailed as a beacon of stability.',
        ko: '에어로스페이스 다이내믹스가 방위 계약과 상용 항공기 납품에 힘입어 분기 실적이 애널리스트 추정치를 15% 상회했다. 안정성의 등대로 칭송받았다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },

    // Day 3: Mass tech layoffs announced, brick-and-mortar retail unexpectedly benefits
    {
      id: 'dc-3-1',
      dayIdx: 3,
      title: {
        en: 'Wave of Tech Layoffs Hits 50,000 Workers',
        ko: '기술업계 대규모 해고 물결, 5만 명 영향',
      },
      content: {
        en: 'Internet companies announced layoffs totaling 50,000 workers in a single week as startups ran out of runway and established firms cut costs. The unemployment rate in tech hubs spiked to a five-year high.',
        ko: '스타트업들의 자금 소진과 기존 기업들의 비용 절감이 맞물리면서 인터넷 기업들이 일주일 만에 총 5만 명의 해고를 발표했다. 기술 허브의 실업률이 5년 만에 최고치로 치솟았다.',
      },
      read: false,
      effect: { TECH: 0.90 },
    },
    {
      id: 'dc-3-2',
      dayIdx: 3,
      title: {
        en: 'Brick-and-Mortar Retailers See Unexpected Sales Boost',
        ko: '오프라인 유통, 예상 밖 매출 증가',
      },
      content: {
        en: 'Traditional physical retailers reported a surprising uptick in foot traffic and sales as consumers lost faith in online-only businesses. Department store chains posted their first quarterly growth in years.',
        ko: '소비자들이 온라인 전용 비즈니스에 대한 신뢰를 잃으면서 오프라인 유통업체들이 놀라운 방문객 증가와 매출 상승을 보고했다. 백화점 체인들이 수년 만에 처음으로 분기 성장을 기록했다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },
    {
      id: 'dc-3-3',
      dayIdx: 3,
      title: {
        en: 'Green Energy Stabilizes as Value Investors Step In',
        ko: '가치 투자자 유입에 친환경 에너지 안정세',
      },
      content: {
        en: 'Value-oriented investors began accumulating renewable energy stocks at deeply discounted prices, arguing that unlike dot-com startups, clean energy companies have real assets and government policy support.',
        ko: '가치 지향 투자자들이 닷컴 스타트업과 달리 실물 자산과 정부 정책 지원이 있는 재생에너지주를 대폭 할인된 가격에 매집하기 시작했다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },
    {
      id: 'dc-3-4',
      dayIdx: 3,
      title: {
        en: 'Defense Budget Increase Approved Amid Economic Fears',
        ko: '경기 불안 속 국방 예산 증액 승인',
      },
      content: {
        en: 'Congress approved a 7% increase in the defense budget as a partial economic stimulus measure. Aerospace defense stocks rallied on the news of guaranteed multi-year revenue streams.',
        ko: '의회가 부분적 경기 부양 조치로 국방 예산 7% 증액을 승인했다. 다년간 보장된 매출 흐름 소식에 항공우주 방위주가 강세를 보였다.',
      },
      read: false,
      effect: { AERO: 1.07 },
    },
    {
      id: 'dc-3-5',
      dayIdx: 3,
      title: {
        en: 'Healthcare Sector Hits All-Time High on Flight to Quality',
        ko: '품질 선호 현상에 헬스케어 사상 최고치 경신',
      },
      content: {
        en: 'The healthcare index reached an all-time high as the dot-com crash reinforced the premium investors place on companies with recurring revenue, pricing power, and regulatory barriers to entry.',
        ko: '닷컴 붕괴가 반복 매출, 가격 결정력, 규제 진입장벽을 갖춘 기업에 대한 프리미엄을 재확인시키면서 헬스케어 지수가 사상 최고치를 경신했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },

    // Day 4: Telecom infrastructure spending halted, defensive sectors outperform
    {
      id: 'dc-4-1',
      dayIdx: 4,
      title: {
        en: 'Telecom Giants Halt Network Expansion Plans',
        ko: '통신 대기업, 네트워크 확장 계획 중단',
      },
      content: {
        en: 'Major telecommunications companies froze billions in planned fiber optic and network infrastructure spending, citing the collapse in internet company demand. Tech hardware suppliers were hit hard.',
        ko: '주요 통신 기업들이 인터넷 기업 수요 붕괴를 이유로 수십억 달러 규모의 광섬유 및 네트워크 인프라 투자를 동결했다. 기술 하드웨어 공급업체가 큰 타격을 입었다.',
      },
      read: false,
      effect: { TECH: 0.93 },
    },
    {
      id: 'dc-4-2',
      dayIdx: 4,
      title: {
        en: 'Surviving Tech Companies Begin Showing Profitability',
        ko: '생존한 기술 기업들, 수익성 흑자 전환 시작',
      },
      content: {
        en: 'A handful of well-managed internet companies reported their first quarterly profits, separating themselves from the pack. Investors rewarded the survivors with significant share price recoveries.',
        ko: '잘 관리된 소수의 인터넷 기업들이 첫 분기 흑자를 보고하며 나머지 기업들과 차별화에 성공했다. 투자자들은 생존자들에게 상당한 주가 회복으로 보답했다.',
      },
      read: false,
      effect: { TECH: 1.06, ECOM: 1.05 },
    },
    {
      id: 'dc-4-3',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Consolidation Wave Begins',
        ko: '이커머스 업계 통합 물결 시작',
      },
      content: {
        en: 'GlobalMart announced acquisitions of three struggling online competitors at fire-sale prices. Analysts predicted that the consolidation would ultimately strengthen the surviving platforms.',
        ko: '글로벌마트가 경영난에 빠진 온라인 경쟁사 3곳을 헐값에 인수한다고 발표했다. 애널리스트들은 이 통합이 궁극적으로 생존 플랫폼을 강화할 것이라고 전망했다.',
      },
      read: false,
      effect: { ECOM: 1.07 },
    },
    {
      id: 'dc-4-4',
      dayIdx: 4,
      title: {
        en: 'Renewable Energy Gets Infrastructure Stimulus Boost',
        ko: '재생에너지, 인프라 부양책 수혜',
      },
      content: {
        en: 'The government redirected halted telecom infrastructure funds toward renewable energy grid modernization. Green energy companies saw a surge in new project announcements.',
        ko: '정부가 중단된 통신 인프라 자금을 재생에너지 전력망 현대화로 전용했다. 친환경 에너지 기업들의 신규 프로젝트 발표가 급증했다.',
      },
      read: false,
      effect: { GREEN: 1.09 },
    },
    {
      id: 'dc-4-5',
      dayIdx: 4,
      title: {
        en: 'Aerospace Commercial Division Benefits from Travel Resilience',
        ko: '항공우주 민항 부문, 여행 수요 견고함에 수혜',
      },
      content: {
        en: 'Despite the tech crash, air travel demand remained robust as the physical economy proved resilient. Airlines confirmed they would honor existing aircraft delivery schedules.',
        ko: '기술주 폭락에도 불구하고 실물 경제의 견고함으로 항공 여행 수요는 강세를 유지했다. 항공사들은 기존 항공기 납품 일정을 유지할 것이라고 확인했다.',
      },
      read: false,
      effect: { AERO: 1.05 },
    },

    // Day 5: Survivors emerge leaner, value investing renaissance begins
    {
      id: 'dc-5-1',
      dayIdx: 5,
      title: {
        en: 'Surviving Internet Companies Emerge Leaner and Stronger',
        ko: '살아남은 인터넷 기업들, 더 날렵하고 강하게 부활',
      },
      content: {
        en: 'The tech companies that survived the crash reported dramatically improved cost structures and clearer paths to profitability. Investors began cautiously rebuilding positions in proven internet leaders.',
        ko: '폭락에서 살아남은 기술 기업들이 극적으로 개선된 비용 구조와 명확한 수익성 달성 경로를 보고했다. 투자자들이 검증된 인터넷 리더에 조심스럽게 재투자하기 시작했다.',
      },
      read: false,
      effect: { TECH: 1.10 },
    },
    {
      id: 'dc-5-2',
      dayIdx: 5,
      title: {
        en: 'Value Investing Renaissance Declared by Market Strategists',
        ko: '시장 전략가들, "가치 투자 르네상스" 선언',
      },
      content: {
        en: 'Leading investment strategists declared the beginning of a value investing renaissance, arguing that the dot-com crash permanently reset investor appetite toward companies with real earnings.',
        ko: '주요 투자 전략가들이 닷컴 붕괴가 실질적 수익을 내는 기업에 대한 투자자 선호를 영구적으로 재설정했다며 가치 투자 르네상스의 시작을 선언했다.',
      },
      read: false,
      effect: { HEALTH: 1.05, AERO: 1.06 },
    },
    {
      id: 'dc-5-3',
      dayIdx: 5,
      title: {
        en: 'E-Commerce Survivors Post First Combined Profit',
        ko: '이커머스 생존자들, 첫 합산 흑자 달성',
      },
      content: {
        en: 'The consolidated e-commerce sector reported its first aggregate quarterly profit as weaker players exited and survivors gained scale. GlobalMart led the sector with a 12% revenue increase.',
        ko: '약한 기업들이 퇴출되고 생존자들이 규모를 확보하면서 이커머스 업종이 최초의 합산 분기 흑자를 보고했다. 글로벌마트가 12% 매출 증가로 업종을 선도했다.',
      },
      read: false,
      effect: { ECOM: 1.09 },
    },
    {
      id: 'dc-5-4',
      dayIdx: 5,
      title: {
        en: 'Green Energy Positioned as the "New New Economy"',
        ko: '친환경 에너지, "뉴 뉴 이코노미"로 부상',
      },
      content: {
        en: 'Analysts rebranded renewable energy as the next major growth sector with real fundamentals, contrasting it favorably against the hollow promises of the dot-com era.',
        ko: '애널리스트들이 재생에너지를 닷컴 시대의 공허한 약속과 대비시키며 실질적인 펀더멘털을 갖춘 차세대 주요 성장 섹터로 재정의했다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'dc-5-5',
      dayIdx: 5,
      title: {
        en: 'Markets Find Floor as Rational Valuation Returns',
        ko: '합리적 밸류에이션 회귀에 시장 바닥 확인',
      },
      content: {
        en: 'All major indices stabilized as the market completed its repricing from speculative excess to rational valuation. Economists declared the bubble burst complete and the foundation laid for sustainable growth.',
        ko: '시장이 투기적 과잉에서 합리적 밸류에이션으로의 재평가를 완료하면서 모든 주요 지수가 안정을 찾았다. 경제학자들은 버블 붕괴가 마무리되고 지속 가능한 성장의 토대가 마련됐다고 선언했다.',
      },
      read: false,
      effect: { TECH: 1.04, ECOM: 1.03, AERO: 1.03 },
    },
  ],
};
