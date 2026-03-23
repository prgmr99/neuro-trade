import { ClassicScenarioArc } from './classic-arcs';

export const TECH_BUBBLE_ARC: ClassicScenarioArc = {
  id: 'tech-bubble',
  name: { en: 'Tech Bubble', ko: '테크 버블' },
  news: [
    // Day 1 — Record tech IPO frenzy
    {
      id: 'tb-1-1',
      dayIdx: 1,
      title: {
        en: 'AI Startup Breaks IPO Records with $80B Valuation',
        ko: 'AI 스타트업, 800억 달러 기업가치로 IPO 신기록 경신',
      },
      content: {
        en: 'NeuralWave Inc. debuted on NASDAQ today at $80 billion, the largest tech IPO in five years, stoking a frenzy of retail and institutional buying in the AI sector.',
        ko: '뉴럴웨이브(NeuralWave)가 오늘 나스닥에 800억 달러 시가총액으로 상장하며 5년 만의 최대 테크 IPO를 기록했다. 개인·기관 투자자들의 AI 섹터 매수세가 폭발적으로 쏟아졌다.',
      },
      read: false,
      effect: { TECH: 1.12, ECOM: 1.05 },
    },
    {
      id: 'tb-1-2',
      dayIdx: 1,
      title: {
        en: 'Venture Capital Pours Record Funds into AI Infrastructure',
        ko: 'VC, AI 인프라에 사상 최대 자금 투입',
      },
      content: {
        en: 'Venture capital firms committed over $30 billion to AI infrastructure deals this quarter, the highest quarterly figure ever recorded, signaling unbridled confidence in the sector.',
        ko: '이번 분기 벤처캐피털의 AI 인프라 투자 규모가 300억 달러를 돌파하며 분기 기준 사상 최고치를 기록했다. 섹터에 대한 무한한 신뢰를 보여주는 지표라는 평가가 나온다.',
      },
      read: false,
      effect: { TECH: 1.08, GREEN: 1.02 },
    },
    {
      id: 'tb-1-3',
      dayIdx: 1,
      title: {
        en: 'Retail Investors Flood Online Brokerages Amid Tech Euphoria',
        ko: '테크 열풍에 개인 투자자, 온라인 증권사로 몰려',
      },
      content: {
        en: 'Major online brokerages reported record account openings as retail investors rushed to buy into the AI-driven tech rally, pushing e-commerce platforms higher on the wave of optimism.',
        ko: '주요 온라인 증권사들이 사상 최대 신규 계좌 개설을 보고했다. 개인 투자자들이 AI 주도 기술주 랠리에 편승하면서 전자상거래 플랫폼 주가도 낙관 심리에 함께 올랐다.',
      },
      read: false,
      effect: { ECOM: 1.06, TECH: 1.04 },
    },
    {
      id: 'tb-1-4',
      dayIdx: 1,
      title: {
        en: 'Healthcare Funds Rotate Capital Into High-Growth Tech',
        ko: '헬스케어 펀드, 고성장 기술주로 자금 이동',
      },
      content: {
        en: 'Asset managers trimmed healthcare positions to fund fresh allocations in AI and semiconductor stocks, citing superior near-term growth prospects in the technology sector.',
        ko: '자산운용사들이 헬스케어 비중을 줄이고 AI·반도체 주식에 새로 자금을 배분하고 있다. 기술 섹터의 단기 성장성이 더 우월하다는 판단에서다.',
      },
      read: false,
      effect: { HEALTH: 0.94, AERO: 0.96 },
    },
    {
      id: 'tb-1-5',
      dayIdx: 1,
      title: {
        en: 'Aviation Sector Underperforms as Investors Chase Tech Returns',
        ko: '투자자들 기술주 수익률 쫓아 항공 섹터 상대적 부진',
      },
      content: {
        en: 'Aerospace and aviation stocks lagged the broader market as momentum-driven investors redirected capital to the booming technology sector, leaving traditional industrials behind.',
        ko: '모멘텀 투자자들이 급등하는 기술 섹터로 자금을 옮기면서 항공우주·항공주가 시장 전체 대비 부진한 흐름을 보였다. 전통 산업주들이 뒤처지는 모습이다.',
      },
      read: false,
      effect: { AERO: 0.93, HEALTH: 0.97 },
    },

    // Day 2 — Whistleblower scandal, contagion fear
    {
      id: 'tb-2-1',
      dayIdx: 2,
      title: {
        en: 'Whistleblower Exposes Accounting Fraud at Top AI Unicorn',
        ko: '내부고발자, 주요 AI 유니콘 회계 부정 폭로',
      },
      content: {
        en: 'A former CFO has filed documents with the SEC alleging that Apex AI inflated revenue by $4 billion over two years using fictitious enterprise contracts, sending shockwaves through the tech sector.',
        ko: '전직 CFO가 에이펙스(Apex AI)가 2년간 가공의 기업 계약을 이용해 매출을 40억 달러 부풀렸다는 자료를 SEC에 제출했다. 기술 섹터 전반에 충격파가 퍼지고 있다.',
      },
      read: false,
      effect: { TECH: 0.88, ECOM: 0.91 },
    },
    {
      id: 'tb-2-2',
      dayIdx: 2,
      title: {
        en: 'Contagion Fear Grips Tech Stocks as Regulators Launch Probe',
        ko: '당국 조사 착수에 기술주 전반 전염 우려 확산',
      },
      content: {
        en: 'The SEC has opened a broad inquiry into accounting practices across high-growth tech companies. Investors dumped tech holdings indiscriminately, fearing similar irregularities elsewhere.',
        ko: 'SEC가 고성장 기술 기업들의 회계 관행에 대한 광범위한 조사에 착수했다. 투자자들은 다른 기업에도 유사한 불법 행위가 있을 것을 우려해 기술주를 무차별적으로 내던지고 있다.',
      },
      read: false,
      effect: { TECH: 0.87, ECOM: 0.93 },
    },
    {
      id: 'tb-2-3',
      dayIdx: 2,
      title: {
        en: 'Investors Seek Safety in Healthcare as Tech Selloff Deepens',
        ko: '기술주 매도세 심화에 투자자들 헬스케어로 피신',
      },
      content: {
        en: 'Healthcare stocks attracted strong safe-haven inflows as investors fleeing the tech rout repositioned into defensive sectors with stable earnings and limited exposure to the fraud scandal.',
        ko: '기술주 폭락을 피해 탈출한 투자자들이 안전자산으로 헬스케어 섹터에 강하게 유입됐다. 안정적인 실적과 사기 스캔들 연루 가능성이 낮다는 점이 부각됐다.',
      },
      read: false,
      effect: { HEALTH: 1.07, GREEN: 1.04 },
    },
    {
      id: 'tb-2-4',
      dayIdx: 2,
      title: {
        en: 'Green Energy Stocks Draw Speculative Inflows Amid Tech Chaos',
        ko: '기술주 혼란 속 그린에너지 주식에 투기 자금 유입',
      },
      content: {
        en: 'Traders seeking alternatives to technology rotated into green energy names, viewing the sector as both a defensive play and a longer-term growth story insulated from the accounting scandal.',
        ko: '기술주 대안을 찾는 트레이더들이 그린에너지 종목으로 이동했다. 이 섹터가 방어적 성격과 장기 성장성을 동시에 갖추면서 회계 스캔들과 무관하다는 점이 매력 포인트로 작용했다.',
      },
      read: false,
      effect: { GREEN: 1.06, AERO: 1.02 },
    },
    {
      id: 'tb-2-5',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Giants Deny Links to Fraudulent AI Contracts',
        ko: '전자상거래 대기업들, 불법 AI 계약 연루설 부인',
      },
      content: {
        en: 'Major e-commerce companies issued public statements distancing themselves from Apex AI, but investor confidence remained shaken as analysts warned that supply-chain AI dependencies could complicate audits.',
        ko: '주요 전자상거래 기업들이 에이펙스 AI와의 관계를 부인하는 공식 성명을 발표했다. 하지만 공급망 AI 의존도가 감사를 복잡하게 만들 수 있다는 애널리스트 경고에 투자자 신뢰는 여전히 흔들리고 있다.',
      },
      read: false,
      effect: { ECOM: 0.92, TECH: 0.91 },
    },

    // Day 3 — Full market correction
    {
      id: 'tb-3-1',
      dayIdx: 3,
      title: {
        en: 'Tech Sector Enters Official Correction Territory',
        ko: '기술 섹터, 공식 조정 국면 진입',
      },
      content: {
        en: 'The tech-heavy index fell more than 10% from its recent peak, meeting the textbook definition of a market correction. Analysts warn the selloff may not be over as earnings season approaches.',
        ko: '기술주 비중이 높은 지수가 최근 고점 대비 10% 이상 하락해 교과서적 의미의 조정 국면에 공식 진입했다. 실적 시즌이 다가오면서 매도세가 아직 끝나지 않았다는 경고가 나온다.',
      },
      read: false,
      effect: { TECH: 0.86, ECOM: 0.90 },
    },
    {
      id: 'tb-3-2',
      dayIdx: 3,
      title: {
        en: 'Government Announces Surge in Defense Spending',
        ko: '정부, 국방 예산 대폭 증액 발표',
      },
      content: {
        en: 'The administration unveiled a $120 billion supplemental defense budget, with significant allocations for next-generation aircraft and satellite systems, triggering a sharp rally in aerospace stocks.',
        ko: '정부가 차세대 항공기와 위성 시스템에 대한 대규모 배분을 포함한 1,200억 달러 규모의 추가 국방 예산안을 발표했다. 항공우주 주식이 급등세를 보이고 있다.',
      },
      read: false,
      effect: { AERO: 1.10, GREEN: 1.03 },
    },
    {
      id: 'tb-3-3',
      dayIdx: 3,
      title: {
        en: 'Defensive Sectors Lead as Investors Flee Growth Stocks',
        ko: '성장주 탈출 가속화, 방어 섹터가 시장 주도',
      },
      content: {
        en: 'With risk appetite at a six-month low, healthcare and green energy companies outperformed as institutional investors sought predictable cash flows over speculative growth stories.',
        ko: '위험 선호 심리가 6개월 최저치로 떨어지면서 헬스케어와 그린에너지 기업들이 시장 대비 강세를 보였다. 기관 투자자들이 투기적 성장 스토리보다 예측 가능한 현금흐름을 선호하고 있다.',
      },
      read: false,
      effect: { HEALTH: 1.08, GREEN: 1.06 },
    },
    {
      id: 'tb-3-4',
      dayIdx: 3,
      title: {
        en: 'Margin Calls Accelerate Tech Selloff in Afternoon Session',
        ko: '마진콜 쏟아지며 오후 기술주 매도세 가속',
      },
      content: {
        en: 'Forced liquidations triggered by margin calls in leveraged tech positions created a cascade of selling in the afternoon session, pushing already beaten-down technology names to fresh lows.',
        ko: '레버리지 기술주 포지션에서 촉발된 강제 청산이 오후 장에서 연쇄 매도세를 불러일으켰다. 이미 크게 하락한 기술주들이 추가로 신저가를 갈아치웠다.',
      },
      read: false,
      effect: { TECH: 0.89, AERO: 1.04 },
    },
    {
      id: 'tb-3-5',
      dayIdx: 3,
      title: {
        en: 'Climate Policy Tailwind Boosts Green Energy Outlook',
        ko: '기후 정책 호재, 그린에너지 전망 밝혀',
      },
      content: {
        en: 'A bipartisan climate bill clearing a key Senate committee boosted expectations for renewable energy subsidies, providing a rare bright spot in an otherwise turbulent trading session.',
        ko: '초당파 기후 법안이 상원 핵심 위원회를 통과하면서 재생에너지 보조금 기대감이 높아졌다. 전반적으로 혼란스러운 장세 속에서 드문 긍정적 신호로 주목받고 있다.',
      },
      read: false,
      effect: { GREEN: 1.07, HEALTH: 1.03 },
    },

    // Day 4 — Bargain hunters, partial rebound
    {
      id: 'tb-4-1',
      dayIdx: 4,
      title: {
        en: 'Value Hunters Snap Up Oversold Tech at Multi-Month Lows',
        ko: '가치 투자자들, 수개월 저점 기술주 저가 매수',
      },
      content: {
        en: 'Contrarian investors and long-term fund managers began accumulating technology shares, citing extreme oversold conditions and price-to-earnings ratios not seen since the 2020 market bottom.',
        ko: '역발상 투자자와 장기 펀드 매니저들이 기술주 매수에 나섰다. 극도의 과매도 상태와 2020년 시장 저점 이후 보기 드문 주가수익비율을 그 이유로 들었다.',
      },
      read: false,
      effect: { TECH: 1.09, ECOM: 1.06 },
    },
    {
      id: 'tb-4-2',
      dayIdx: 4,
      title: {
        en: 'Aerospace Firm Wins $45B Military Satellite Contract',
        ko: '항공우주 기업, 450억 달러 군사위성 계약 수주',
      },
      content: {
        en: 'OmegaAero secured a landmark $45 billion contract to build the next generation of military communication satellites, propelling aerospace stocks to their best single-day gain of the year.',
        ko: '오메가에어로(OmegaAero)가 차세대 군사 통신위성 구축을 위한 450억 달러 규모의 대형 계약을 따냈다. 항공우주 주식이 올해 최고의 일간 상승률을 기록하고 있다.',
      },
      read: false,
      effect: { AERO: 1.13, GREEN: 1.02 },
    },
    {
      id: 'tb-4-3',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Leaders Pivot to Profitability Narrative',
        ko: '전자상거래 선두기업들, 수익성 중심 전략으로 전환 강조',
      },
      content: {
        en: 'Leading e-commerce platforms announced aggressive cost-cutting and a renewed focus on operating margins, winning back investor confidence with a credible path to near-term profitability.',
        ko: '주요 전자상거래 플랫폼들이 공격적인 비용 절감과 영업이익률 중심 전략으로의 전환을 발표했다. 신뢰할 수 있는 단기 수익화 경로를 제시하며 투자자 신뢰를 회복하고 있다.',
      },
      read: false,
      effect: { ECOM: 1.08, TECH: 1.04 },
    },
    {
      id: 'tb-4-4',
      dayIdx: 4,
      title: {
        en: 'Healthcare Stocks Consolidate After Recent Safe-Haven Run',
        ko: '안전자산 매수 랠리 후 헬스케어 주식 숨고르기',
      },
      content: {
        en: 'Healthcare shares gave back a portion of recent gains as some investors rotated back into beaten-down growth sectors, though the sector held most of its safe-haven premium amid lingering uncertainty.',
        ko: '일부 투자자들이 낙폭이 컸던 성장 섹터로 되돌아가면서 헬스케어 주식이 최근 상승분 일부를 반납했다. 그럼에도 불확실성이 남아 있어 안전자산 프리미엄은 대부분 유지됐다.',
      },
      read: false,
      effect: { HEALTH: 0.96, AERO: 1.06 },
    },
    {
      id: 'tb-4-5',
      dayIdx: 4,
      title: {
        en: 'SEC Narrows Tech Fraud Probe, Easing Sector-Wide Fears',
        ko: 'SEC, 기술주 사기 조사 범위 축소… 업종 전반 우려 완화',
      },
      content: {
        en: 'Regulators indicated the accounting investigation would focus on a handful of companies rather than the broader sector, significantly relieving pressure on technology stocks and encouraging renewed buying.',
        ko: '규제 당국은 회계 조사가 업종 전반이 아닌 소수 기업에 집중될 것이라고 밝혔다. 기술주 전반의 압박이 크게 완화되면서 신규 매수세가 돌아오고 있다.',
      },
      read: false,
      effect: { TECH: 1.07, ECOM: 1.05 },
    },

    // Day 5 — New equilibrium, broad stabilization
    {
      id: 'tb-5-1',
      dayIdx: 5,
      title: {
        en: 'Markets Find New Equilibrium After Volatile Week',
        ko: '격동의 한 주 마무리, 시장 새 균형점 모색',
      },
      content: {
        en: 'After a week of sharp swings, equity markets settled into a calmer trading pattern as investors digested the accounting scandal fallout and began positioning for the next earnings cycle.',
        ko: '한 주간의 급격한 변동 이후 주식 시장이 안정된 흐름을 되찾았다. 투자자들이 회계 스캔들 여파를 소화하고 다음 실적 시즌을 앞두고 포지션을 조정하고 있다.',
      },
      read: false,
      effect: { TECH: 1.05, ECOM: 1.04 },
    },
    {
      id: 'tb-5-2',
      dayIdx: 5,
      title: {
        en: 'Long-Term Climate Investment Package Clears Legislature',
        ko: '장기 기후 투자 패키지 의회 통과',
      },
      content: {
        en: 'A sweeping 10-year, $500 billion clean energy investment bill was signed into law, providing unprecedented policy certainty for green energy companies and sparking a broad sector rally.',
        ko: '10년간 5,000억 달러 규모의 청정에너지 투자 법안이 서명되어 발효됐다. 그린에너지 기업들에 전례 없는 정책적 확실성을 부여하며 업종 전반의 랠리에 불을 붙였다.',
      },
      read: false,
      effect: { GREEN: 1.14, HEALTH: 1.03 },
    },
    {
      id: 'tb-5-3',
      dayIdx: 5,
      title: {
        en: 'Rotation From Growth to Value Gathers Pace',
        ko: '성장주에서 가치주로의 로테이션 본격화',
      },
      content: {
        en: 'Portfolio managers accelerated a rotation away from high-multiple technology names toward value-oriented sectors, with healthcare and aerospace seeing renewed institutional interest as the week closed.',
        ko: '포트폴리오 매니저들이 고밸류에이션 기술주에서 가치주 섹터로의 로테이션을 가속화했다. 주 마감을 앞두고 헬스케어와 항공우주에 기관 투자 관심이 다시 높아지고 있다.',
      },
      read: false,
      effect: { HEALTH: 1.06, AERO: 1.08 },
    },
    {
      id: 'tb-5-4',
      dayIdx: 5,
      title: {
        en: 'Tech Sector Stabilizes as Fraud Fallout Is Priced In',
        ko: '사기 여파 주가에 반영 마무리, 기술 섹터 안정세',
      },
      content: {
        en: 'Analysts declared the accounting fraud largely priced in after three days of heavy selling, with the technology sector posting modest gains as sentiment shifted from fear to cautious optimism.',
        ko: '3일간의 강한 매도세를 거치며 회계 사기가 주가에 대부분 반영됐다는 평가가 나왔다. 기술 섹터가 소폭 상승 전환하며 심리가 공포에서 신중한 낙관론으로 돌아서고 있다.',
      },
      read: false,
      effect: { TECH: 1.06, ECOM: 1.05 },
    },
    {
      id: 'tb-5-5',
      dayIdx: 5,
      title: {
        en: 'Broad Market Optimism Returns to Close Out Turbulent Week',
        ko: '격동의 한 주 마감, 시장 전반에 낙관론 복귀',
      },
      content: {
        en: 'All major sectors posted gains in the final session as confidence returned to financial markets. Investors looked past the week\'s turmoil toward strong corporate fundamentals and a supportive policy backdrop.',
        ko: '마지막 거래일에 모든 주요 섹터가 상승 마감했다. 투자자들이 이번 주의 혼란을 딛고 탄탄한 기업 펀더멘털과 우호적인 정책 환경에 시선을 돌리면서 신뢰가 회복됐다.',
      },
      read: false,
      effect: { TECH: 1.04, AERO: 1.05, GREEN: 1.03, HEALTH: 1.04, ECOM: 1.03 },
    },
  ],
};
