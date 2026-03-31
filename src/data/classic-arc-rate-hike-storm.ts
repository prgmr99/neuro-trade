import { ClassicScenarioArc } from './classic-arcs';

export const RATE_HIKE_STORM_ARC: ClassicScenarioArc = {
  id: 'rate-hike-storm',
  name: { en: 'Rate Hike Storm', ko: '금리 인상 폭풍' },
  news: [
    // Day 1: Central bank signals aggressive rate hike cycle
    {
      id: 'rhs-1-1',
      dayIdx: 1,
      title: {
        en: 'Central Bank Signals Most Aggressive Rate Hikes in Decades',
        ko: '중앙은행, 수십 년 만에 가장 공격적인 금리 인상 시사',
      },
      content: {
        en: 'The Federal Reserve Board announced it will raise interest rates by 75 basis points and signaled multiple additional hikes to combat 40-year high inflation. Bond yields surged immediately on the hawkish guidance.',
        ko: '연방준비위원회가 기준금리를 75bp 인상하고 40년 만의 최고 인플레이션 억제를 위해 추가 인상을 예고했다. 매파적 가이던스에 채권 수익률이 즉각 급등했다.',
      },
      read: false,
      effect: { TECH: 0.88, GREEN: 0.90 },
    },
    {
      id: 'rhs-1-2',
      dayIdx: 1,
      title: {
        en: 'Growth Stocks Hammered as Discount Rates Spike',
        ko: '할인율 급등에 성장주 일제히 폭락',
      },
      content: {
        en: 'High-growth technology and e-commerce companies bore the brunt of the sell-off as higher discount rates slashed the present value of future earnings. The tech-heavy index fell 4% in a single session.',
        ko: '할인율 상승이 미래 수익의 현재 가치를 깎아내리면서 고성장 기술주와 이커머스 기업들이 매도세의 직격탄을 맞았다. 기술주 중심 지수가 하루 만에 4% 급락했다.',
      },
      read: false,
      effect: { ECOM: 0.90 },
    },
    {
      id: 'rhs-1-3',
      dayIdx: 1,
      title: {
        en: 'Healthcare Stocks Rise as Value Rotation Begins',
        ko: '가치주 순환매 시작에 헬스케어 주가 상승',
      },
      content: {
        en: 'Investors rotated into defensive value stocks led by pharmaceuticals and healthcare, which offer stable dividends and predictable cash flows in a rising rate environment.',
        ko: '투자자들이 금리 상승기에 안정적 배당과 예측 가능한 현금흐름을 제공하는 제약·헬스케어 중심의 방어적 가치주로 자금을 이동시켰다.',
      },
      read: false,
      effect: { HEALTH: 1.08 },
    },
    {
      id: 'rhs-1-4',
      dayIdx: 1,
      title: {
        en: 'Defense Sector Stable on Government Spending Immunity',
        ko: '국방 업종, 정부 지출 면역력으로 안정세',
      },
      content: {
        en: 'Aerospace and defense contractors remained relatively stable as analysts noted that government defense budgets are largely insulated from monetary policy changes.',
        ko: '항공우주 방위 업체들은 정부 국방 예산이 통화정책 변화로부터 대체로 격리돼 있다는 분석에 힘입어 비교적 안정세를 유지했다.',
      },
      read: false,
      effect: { AERO: 1.03 },
    },
    {
      id: 'rhs-1-5',
      dayIdx: 1,
      title: {
        en: 'Renewable Energy Projects Face Financing Squeeze',
        ko: '재생에너지 프로젝트, 자금 조달 압박 직면',
      },
      content: {
        en: 'Capital-intensive renewable energy projects saw financing costs spike as lenders repriced loans to reflect the new rate environment. Several planned solar farms were put on indefinite hold.',
        ko: '자본집약적 재생에너지 프로젝트의 자금 조달 비용이 급등했다. 대출 기관들이 새로운 금리 환경을 반영해 대출 조건을 재산정하면서 여러 태양광 발전소 계획이 무기한 보류됐다.',
      },
      read: false,
      effect: { GREEN: 0.88 },
    },

    // Day 2: Growth/tech stocks crash as discount rates spike, value rotation begins
    {
      id: 'rhs-2-1',
      dayIdx: 2,
      title: {
        en: 'Tech Sell-Off Deepens as Rate Fears Intensify',
        ko: '금리 공포 심화에 기술주 매도세 가속',
      },
      content: {
        en: 'The technology sector plunged for a second consecutive day as bond yields continued climbing. Former market darlings that traded at lofty multiples saw the steepest declines.',
        ko: '채권 수익률이 계속 상승하면서 기술주가 이틀 연속 급락했다. 높은 밸류에이션으로 거래되던 시장의 총아들이 가장 큰 낙폭을 기록했다.',
      },
      read: false,
      effect: { TECH: 0.90 },
    },
    {
      id: 'rhs-2-2',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Consumer Spending Shows First Cracks',
        ko: '이커머스 소비 지출에 첫 균열 조짐',
      },
      content: {
        en: 'Real-time spending data revealed that online retail transactions dropped 8% week-over-week as consumers pulled back discretionary purchases amid rising credit card rates.',
        ko: '실시간 소비 데이터에 따르면 신용카드 금리 상승으로 소비자들이 재량적 구매를 줄이면서 온라인 소매 거래가 전주 대비 8% 감소했다.',
      },
      read: false,
      effect: { ECOM: 0.92 },
    },
    {
      id: 'rhs-2-3',
      dayIdx: 2,
      title: {
        en: 'Pharmaceutical Companies Announce Dividend Increases',
        ko: '제약사들, 배당금 인상 발표',
      },
      content: {
        en: 'Several major pharmaceutical companies raised their quarterly dividends, attracting yield-seeking investors fleeing from growth stocks. The healthcare index outperformed the broader market by 3%.',
        ko: '다수의 대형 제약사가 분기 배당금 인상을 발표해 성장주에서 빠져나온 배당 추구 투자자들을 끌어들였다. 헬스케어 지수가 시장 전체 대비 3% 초과 수익을 기록했다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },
    {
      id: 'rhs-2-4',
      dayIdx: 2,
      title: {
        en: 'Aerospace Wins New Multi-Year Government Contract',
        ko: '항공우주, 다년간 정부 계약 신규 수주',
      },
      content: {
        en: 'AeroSpace Dynamics secured a five-year defense modernization contract worth $8 billion. Analysts highlighted that government contracts provide rate-insensitive revenue streams.',
        ko: '에어로스페이스 다이내믹스가 80억 달러 규모의 5년 국방 현대화 계약을 수주했다. 애널리스트들은 정부 계약이 금리에 민감하지 않은 매출원이라고 강조했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'rhs-2-5',
      dayIdx: 2,
      title: {
        en: 'Green Energy Investors Demand Higher Returns',
        ko: '친환경 에너지 투자자들, 더 높은 수익률 요구',
      },
      content: {
        en: 'Venture capital and private equity firms raised their return thresholds for renewable energy investments, effectively freezing funding for early-stage clean tech startups.',
        ko: '벤처캐피털과 사모펀드가 재생에너지 투자 수익률 기준을 높이면서 초기 단계 클린테크 스타트업에 대한 자금 공급이 사실상 중단됐다.',
      },
      read: false,
      effect: { GREEN: 0.93 },
    },

    // Day 3: Housing market freezes, consumer spending weakens, defensive sectors rise
    {
      id: 'rhs-3-1',
      dayIdx: 3,
      title: {
        en: 'Housing Market Freezes as Mortgage Rates Hit 7%',
        ko: '주택담보대출 금리 7% 돌파에 부동산 시장 얼어붙어',
      },
      content: {
        en: 'Mortgage applications plummeted 40% as rates crossed the 7% threshold for the first time in two decades. The housing slowdown is expected to ripple through consumer spending and retail sectors.',
        ko: '주택담보대출 금리가 20년 만에 처음으로 7%를 넘어서면서 대출 신청이 40% 급감했다. 부동산 침체가 소비지출과 유통 업종에 파급될 것으로 예상된다.',
      },
      read: false,
      effect: { ECOM: 0.91, TECH: 0.95 },
    },
    {
      id: 'rhs-3-2',
      dayIdx: 3,
      title: {
        en: 'Consumer Confidence Drops to Three-Year Low',
        ko: '소비자 신뢰지수, 3년 만에 최저치로 하락',
      },
      content: {
        en: 'The latest consumer confidence survey showed the sharpest monthly decline in three years. Households reported growing anxiety about rising borrowing costs and job security.',
        ko: '최신 소비자 신뢰 조사에서 3년 만에 가장 큰 월간 하락이 나타났다. 가계는 높아지는 차입 비용과 고용 안정성에 대한 불안이 커지고 있다고 응답했다.',
      },
      read: false,
      effect: { ECOM: 0.94 },
    },
    {
      id: 'rhs-3-3',
      dayIdx: 3,
      title: {
        en: 'Tech Layoffs Accelerate as Companies Slash Costs',
        ko: '비용 절감 나선 기술 기업들, 대규모 해고 가속화',
      },
      content: {
        en: 'Three major technology companies announced combined layoffs of 25,000 employees, citing the need to right-size operations in a higher interest rate environment.',
        ko: '3개 대형 기술 기업이 높아진 금리 환경에 맞춰 사업 규모를 적정화해야 한다며 총 2만 5천 명의 해고를 발표했다.',
      },
      read: false,
      effect: { TECH: 0.92 },
    },
    {
      id: 'rhs-3-4',
      dayIdx: 3,
      title: {
        en: 'VitaPharma Pipeline Advances Lift Sector Further',
        ko: '비타파마 파이프라인 진전에 업종 추가 상승',
      },
      content: {
        en: 'VitaPharma announced positive Phase III trial results for two drug candidates, providing a fundamental catalyst that amplified the ongoing defensive rotation into healthcare.',
        ko: '비타파마가 두 개의 신약 후보물질에 대한 긍정적인 3상 임상 결과를 발표해 헬스케어로의 방어적 순환매에 펀더멘털 촉매제를 더했다.',
      },
      read: false,
      effect: { HEALTH: 1.09 },
    },
    {
      id: 'rhs-3-5',
      dayIdx: 3,
      title: {
        en: 'Aerospace Defense Revenue Guidance Raised',
        ko: '항공우주 방위 매출 가이던스 상향',
      },
      content: {
        en: 'Aerospace defense divisions raised their full-year revenue guidance on the back of accelerated government procurement. The sector continued to attract investors seeking rate-immune cash flows.',
        ko: '항공우주 방위 부문이 정부 조달 가속화에 힘입어 연간 매출 가이던스를 상향했다. 금리에 면역적인 현금흐름을 찾는 투자자들이 계속 유입됐다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },

    // Day 4: Inflation data shows first signs of cooling, rate pause speculation begins
    {
      id: 'rhs-4-1',
      dayIdx: 4,
      title: {
        en: 'Inflation Data Shows Surprise Decline',
        ko: '인플레이션 지표, 예상 밖 하락세 기록',
      },
      content: {
        en: 'The latest consumer price index came in at 6.5%, down from the previous month\'s 7.1% and below economist forecasts. Markets surged as traders priced in the possibility of a rate hike pause.',
        ko: '최신 소비자물가지수가 전월 7.1%에서 하락한 6.5%를 기록하며 경제학자 전망치도 밑돌았다. 트레이더들이 금리 인상 중단 가능성을 반영하면서 시장이 급등했다.',
      },
      read: false,
      effect: { TECH: 1.08, GREEN: 1.06 },
    },
    {
      id: 'rhs-4-2',
      dayIdx: 4,
      title: {
        en: 'Rate Pause Speculation Lifts Growth Stocks',
        ko: '금리 동결 추측에 성장주 반등',
      },
      content: {
        en: 'Bond futures markets shifted dramatically to price in a potential rate pause at the next meeting. Previously battered growth and technology stocks posted their strongest rally in months.',
        ko: '채권 선물 시장이 차기 회의에서의 금리 동결 가능성을 급격히 반영하기 시작했다. 그간 폭락했던 성장주와 기술주가 수개월 만에 가장 강한 반등을 보였다.',
      },
      read: false,
      effect: { ECOM: 1.07 },
    },
    {
      id: 'rhs-4-3',
      dayIdx: 4,
      title: {
        en: 'Renewable Energy Financing Thaws on Easing Outlook',
        ko: '금리 완화 전망에 재생에너지 자금 조달 해빙',
      },
      content: {
        en: 'Several renewable energy projects that had been frozen secured new financing commitments as lenders anticipated an end to the rate hiking cycle. Green energy stocks bounced sharply.',
        ko: '금리 인상 사이클 종료를 기대한 대출 기관들이 동결됐던 여러 재생에너지 프로젝트에 새로운 자금 지원을 약속했다. 친환경 에너지 주가가 급반등했다.',
      },
      read: false,
      effect: { GREEN: 1.09 },
    },
    {
      id: 'rhs-4-4',
      dayIdx: 4,
      title: {
        en: 'Healthcare Moderates as Risk Appetite Returns',
        ko: '위험 선호 회복에 헬스케어 상승세 둔화',
      },
      content: {
        en: 'As investors rotated back into growth names, some profit-taking occurred in defensive healthcare positions. The sector still closed higher but underperformed the broader rally.',
        ko: '투자자들이 성장주로 다시 회전하면서 방어적 헬스케어 포지션에서 일부 차익 실현이 나타났다. 업종은 여전히 상승 마감했으나 전체 랠리 대비 소폭 부진했다.',
      },
      read: false,
      effect: { HEALTH: 1.02 },
    },
    {
      id: 'rhs-4-5',
      dayIdx: 4,
      title: {
        en: 'Aerospace Maintains Steady Course Amid Market Shift',
        ko: '시장 전환 속 항공우주 꾸준한 흐름 유지',
      },
      content: {
        en: 'Aerospace stocks held their gains as the sector benefits in both scenarios: rate cuts boost commercial aviation demand while continued government spending supports defense revenue.',
        ko: '항공우주 주가가 상승분을 유지했다. 금리 인하 시 민항 수요 증가, 정부 지출 지속 시 방위 매출이 뒷받침되는 양면 수혜 구조 덕분이다.',
      },
      read: false,
      effect: { AERO: 1.04 },
    },

    // Day 5: Central bank signals potential pivot, broad market recovery
    {
      id: 'rhs-5-1',
      dayIdx: 5,
      title: {
        en: 'Central Bank Chair Hints at Policy Pivot',
        ko: '중앙은행 총재, 정책 전환 시사',
      },
      content: {
        en: 'In a closely watched speech, the central bank chair acknowledged that inflation is trending downward and suggested the committee would consider pausing rate hikes at the next meeting.',
        ko: '주목받은 연설에서 중앙은행 총재가 인플레이션이 하락 추세라고 인정하며 차기 회의에서 금리 인상 중단을 검토할 것이라고 시사했다.',
      },
      read: false,
      effect: { TECH: 1.10, GREEN: 1.08 },
    },
    {
      id: 'rhs-5-2',
      dayIdx: 5,
      title: {
        en: 'E-Commerce Rallies on Consumer Spending Recovery Hopes',
        ko: '소비 회복 기대감에 이커머스 랠리',
      },
      content: {
        en: 'E-commerce platforms surged as analysts projected that a rate pause would stabilize consumer spending. Early holiday shopping data showed a tentative uptick in online orders.',
        ko: '금리 동결이 소비 지출을 안정시킬 것이라는 전망에 이커머스 플랫폼 주가가 급등했다. 초기 연말 쇼핑 데이터에서 온라인 주문의 잠정적 증가세가 포착됐다.',
      },
      read: false,
      effect: { ECOM: 1.09 },
    },
    {
      id: 'rhs-5-3',
      dayIdx: 5,
      title: {
        en: 'Green Energy Leads Market Recovery Rally',
        ko: '친환경 에너지, 시장 회복 랠리 선도',
      },
      content: {
        en: 'Renewable energy stocks led the broad market recovery as the rate pivot prospect removed the biggest headwind facing capital-intensive clean energy projects.',
        ko: '금리 전환 전망이 자본집약적 클린에너지 프로젝트의 최대 역풍을 제거하면서 재생에너지 주가가 시장 전체의 회복 랠리를 선도했다.',
      },
      read: false,
      effect: { GREEN: 1.10 },
    },
    {
      id: 'rhs-5-4',
      dayIdx: 5,
      title: {
        en: 'Aerospace Commercial Orders Surge on Travel Optimism',
        ko: '여행 낙관론에 항공우주 민항 수주 급증',
      },
      content: {
        en: 'Airlines placed a wave of new aircraft orders as the prospect of stable interest rates boosted confidence in travel demand recovery. Commercial aviation bookings hit a post-pandemic high.',
        ko: '안정적인 금리 전망이 여행 수요 회복에 대한 자신감을 높이면서 항공사들이 대규모 신규 항공기 주문을 쏟아냈다. 민항기 예약이 팬데믹 이후 최고치를 기록했다.',
      },
      read: false,
      effect: { AERO: 1.07 },
    },
    {
      id: 'rhs-5-5',
      dayIdx: 5,
      title: {
        en: 'Markets End Turbulent Week on Hopeful Note',
        ko: '격동의 한 주, 희망적 분위기로 마무리',
      },
      content: {
        en: 'All major indices closed the week higher as the central bank pivot prospect combined with cooling inflation data restored confidence. Analysts declared the worst of the rate shock was likely over.',
        ko: '중앙은행 정책 전환 전망과 인플레이션 둔화 데이터가 맞물리면서 모든 주요 지수가 주간 상승 마감했다. 애널리스트들은 금리 충격의 최악은 지났을 것이라고 선언했다.',
      },
      read: false,
      effect: { TECH: 1.05, HEALTH: 1.04 },
    },
  ],
};
