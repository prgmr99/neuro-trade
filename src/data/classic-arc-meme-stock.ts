import { ClassicScenarioArc } from './classic-arcs';

export const MEME_STOCK_ARC: ClassicScenarioArc = {
  id: 'meme-stock',
  name: { en: 'Meme Stock Mania', ko: '밈 주식 광풍' },
  news: [
    // Day 1: Retail investors coordinate massive short squeeze
    {
      id: 'ms-1-1',
      dayIdx: 1,
      title: {
        en: 'Online Traders Swarm Struggling Retailer\'s Stock',
        ko: '온라인 개인투자자, 부진한 유통주에 집중 매수',
      },
      content: {
        en: 'Millions of retail investors on the social platform TrendBoard coordinated a massive buying campaign on GlobalMart shares, which had been heavily shorted by institutional funds. The stock surged 140% in a single session as short sellers scrambled to cover positions.',
        ko: '소셜 플랫폼 트렌드보드의 수백만 개인투자자들이 기관 공매도 비중이 높았던 글로벌마트 주식에 대규모 매수 공세를 펼쳤다. 공매도 세력이 급히 포지션을 청산하면서 주가가 단일 세션에서 140% 폭등했다.',
      },
      read: false,
      effect: { ECOM: 1.15 },
    },
    {
      id: 'ms-1-2',
      dayIdx: 1,
      title: {
        en: 'Tech Stocks Dip as Retail Capital Flows to Meme Plays',
        ko: '밈 주식으로 자금 이동… 기술주 하락',
      },
      content: {
        en: 'Retail investors liquidated positions in blue-chip technology stocks to fund their meme stock purchases. NeoTech Industries fell 4% on unusually high retail selling volume.',
        ko: '개인투자자들이 밈 주식 매수 자금 마련을 위해 우량 기술주 포지션을 청산했다. 네오텍 인더스트리즈가 비정상적으로 높은 개인 매도 물량에 4% 하락했다.',
      },
      read: false,
      effect: { TECH: 0.93 },
    },
    {
      id: 'ms-1-3',
      dayIdx: 1,
      title: {
        en: 'Hedge Funds Face Billions in Short Squeeze Losses',
        ko: '헤지펀드, 숏 스퀴즈에 수십억 달러 손실 직면',
      },
      content: {
        en: 'At least three major hedge funds disclosed combined losses exceeding $6 billion from short positions in retail stocks. The funds are reportedly seeking emergency capital infusions from prime brokers.',
        ko: '최소 3개 대형 헤지펀드가 유통주 공매도 포지션에서 총 60억 달러 이상의 손실을 공시했다. 이들 펀드는 프라임 브로커에 긴급 자본 수혈을 요청한 것으로 알려졌다.',
      },
      read: false,
      effect: { ECOM: 1.08 },
    },
    {
      id: 'ms-1-4',
      dayIdx: 1,
      title: {
        en: 'Healthcare and Defense Stocks Steady in Meme Storm',
        ko: '밈 주식 폭풍 속 헬스케어·방위주 안정세',
      },
      content: {
        en: 'Institutional investors maintained positions in healthcare and defense names as a hedge against the unprecedented retail-driven volatility. Both sectors traded in narrow ranges despite the broader chaos.',
        ko: '기관투자자들이 전례 없는 개인 주도 변동성에 대한 헤지 수단으로 헬스케어와 방위주 포지션을 유지했다. 두 업종 모두 전반적인 혼란에도 좁은 범위에서 안정적으로 거래됐다.',
      },
      read: false,
      effect: { HEALTH: 1.03, AERO: 1.02 },
    },
    {
      id: 'ms-1-5',
      dayIdx: 1,
      title: {
        en: 'Green Energy Names Caught in Meme Crossfire',
        ko: '친환경 에너지주, 밈 주식 소용돌이에 휩쓸려',
      },
      content: {
        en: 'Several renewable energy stocks with high short interest became secondary targets for the retail trading army. EcoEnergy Corp saw unusual volume spikes as traders speculated it could be the next squeeze candidate.',
        ko: '공매도 비중이 높은 복수의 재생에너지 종목이 개인투자자들의 2차 타깃이 됐다. 에코에너지가 다음 숏 스퀴즈 대상이 될 수 있다는 투기 심리에 거래량이 급증했다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },

    // Day 2: Brokerages restrict trading
    {
      id: 'ms-2-1',
      dayIdx: 2,
      title: {
        en: 'Major Brokerages Halt Buy Orders on Meme Stocks',
        ko: '주요 증권사, 밈 주식 매수 주문 중단',
      },
      content: {
        en: 'Three of the largest retail brokerages suspended buy orders on meme stocks citing "extraordinary market conditions." Outraged traders accused the platforms of protecting hedge fund interests over retail investors.',
        ko: '3대 개인 증권사가 "이례적 시장 상황"을 이유로 밈 주식 매수 주문을 중단시켰다. 분노한 투자자들은 증권사들이 개인이 아닌 헤지펀드의 이익을 보호하고 있다고 비난했다.',
      },
      read: false,
      effect: { ECOM: 0.88 },
    },
    {
      id: 'ms-2-2',
      dayIdx: 2,
      title: {
        en: 'Market-Wide Volatility Index Hits Pandemic-Era Highs',
        ko: '시장 변동성 지수, 팬데믹 시기 수준으로 급등',
      },
      content: {
        en: 'The VXI volatility index surged to levels not seen since the pandemic crash, as uncertainty from the meme stock phenomenon rippled across all asset classes. Broad market indices fell over 2%.',
        ko: 'VXI 변동성 지수가 팬데믹 폭락 이후 최고치까지 치솟았다. 밈 주식 현상에서 비롯된 불확실성이 전 자산군으로 확산되며 주요 시장 지수가 2% 이상 하락했다.',
      },
      read: false,
      effect: { TECH: 0.94, AERO: 0.95 },
    },
    {
      id: 'ms-2-3',
      dayIdx: 2,
      title: {
        en: 'Green Energy Stocks Dumped in Margin Call Cascade',
        ko: '마진콜 연쇄에 친환경 에너지주 투매',
      },
      content: {
        en: 'Traders forced to meet margin calls sold profitable green energy positions, triggering a sector-wide sell-off. EcoEnergy Corp dropped 7% despite no change in its business fundamentals.',
        ko: '마진콜에 몰린 투자자들이 수익 중이던 친환경 에너지 포지션을 처분하면서 업종 전반에 매도 압력이 확산됐다. 에코에너지는 펀더멘털 변화 없이 7% 급락했다.',
      },
      read: false,
      effect: { GREEN: 0.92 },
    },
    {
      id: 'ms-2-4',
      dayIdx: 2,
      title: {
        en: 'Pharma Stocks Rise as Volatility Safe Haven',
        ko: '변동성 속 안전처 제약주 상승',
      },
      content: {
        en: 'Risk-averse investors increased allocations to pharmaceutical stocks as market volatility spiked. VitaPharma benefited from its low correlation to the retail trading frenzy sweeping other sectors.',
        ko: '시장 변동성이 급등하면서 리스크 회피 성향의 투자자들이 제약주 비중을 늘렸다. 비타파마는 다른 업종을 휩쓰는 개인투자 광풍과의 낮은 상관관계 덕분에 수혜를 입었다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'ms-2-5',
      dayIdx: 2,
      title: {
        en: 'Lawmakers Demand Emergency Hearing on Trading Restrictions',
        ko: '의원들, 거래 제한 관련 긴급 청문회 요구',
      },
      content: {
        en: 'Bipartisan groups of lawmakers demanded immediate hearings on the brokerage trading restrictions. The political firestorm added regulatory uncertainty to an already volatile market environment.',
        ko: '여야 의원들이 증권사 거래 제한에 대한 즉각적인 청문회 개최를 요구했다. 정치적 파장이 이미 변동성이 큰 시장에 규제 불확실성까지 가중시켰다.',
      },
      read: false,
      effect: { ECOM: 0.93, TECH: 0.96 },
    },

    // Day 3: Congressional hearings, volatility spikes
    {
      id: 'ms-3-1',
      dayIdx: 3,
      title: {
        en: 'Brokerage CEOs Grilled in Televised Hearings',
        ko: '증권사 CEO들, TV 생중계 청문회서 집중 추궁',
      },
      content: {
        en: 'CEOs of major retail brokerages faced aggressive questioning about their decision to halt trading. Revelations about payment-for-order-flow practices drew sharp criticism from both parties.',
        ko: '주요 개인 증권사 CEO들이 거래 중단 결정에 대해 집중적인 추궁을 받았다. 주문 흐름 지불(PFOF) 관행에 대한 폭로가 여야 모두의 강한 비판을 불러일으켰다.',
      },
      read: false,
      effect: { ECOM: 0.95, TECH: 0.97 },
    },
    {
      id: 'ms-3-2',
      dayIdx: 3,
      title: {
        en: 'Hedge Fund Titan Calls Meme Trading "Existential Threat"',
        ko: '헤지펀드 거물, 밈 트레이딩을 "존립 위협"으로 규정',
      },
      content: {
        en: 'A prominent hedge fund manager warned that the retail trading phenomenon poses systemic risks to market stability. His comments drew fierce backlash from online trading communities.',
        ko: '저명한 헤지펀드 매니저가 개인투자 현상이 시장 안정성에 시스템적 위험을 초래한다고 경고했다. 그의 발언은 온라인 투자 커뮤니티로부터 격렬한 반발을 불러일으켰다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },
    {
      id: 'ms-3-3',
      dayIdx: 3,
      title: {
        en: 'Defense Stocks Benefit from Institutional Flight to Quality',
        ko: '기관 안전자산 선호에 방위주 수혜',
      },
      content: {
        en: 'Institutional investors shifted capital to defense and aerospace names with government-backed revenue streams. AeroSpace Dynamics gained 5% as fund managers sought shelter from retail-driven chaos.',
        ko: '기관투자자들이 정부 수주 기반 매출이 보장된 방위·항공우주 종목으로 자금을 옮겼다. 에어로스페이스 다이내믹스가 개인 주도 혼란을 피하려는 펀드 매니저들 덕에 5% 상승했다.',
      },
      read: false,
      effect: { AERO: 1.07 },
    },
    {
      id: 'ms-3-4',
      dayIdx: 3,
      title: {
        en: 'NeoTech Earnings Beat Overshadowed by Market Turmoil',
        ko: '네오텍 어닝 서프라이즈, 시장 혼란에 묻혀',
      },
      content: {
        en: 'NeoTech Industries posted quarterly earnings 12% above consensus estimates, but the stock barely moved as investors remained fixated on the meme stock drama unfolding across markets.',
        ko: '네오텍 인더스트리즈가 시장 예상치를 12% 상회하는 분기 실적을 발표했지만, 투자자들의 관심이 밈 주식 사태에 쏠리면서 주가는 거의 움직이지 않았다.',
      },
      read: false,
      effect: { TECH: 1.02 },
    },
    {
      id: 'ms-3-5',
      dayIdx: 3,
      title: {
        en: 'Green Energy Finds Support After Oversold Bounce',
        ko: '과매도 반등에 친환경 에너지 지지선 확보',
      },
      content: {
        en: 'Technical traders identified oversold conditions in green energy stocks, triggering a modest rebound. Analysts noted the sector\'s fundamentals remain intact despite the meme-driven volatility.',
        ko: '기술적 투자자들이 친환경 에너지주의 과매도 상태를 포착하며 소폭 반등을 이끌었다. 애널리스트들은 밈 주도 변동성에도 업종 펀더멘털은 건재하다고 평가했다.',
      },
      read: false,
      effect: { GREEN: 1.04 },
    },

    // Day 4: Regulators propose new rules, meme stocks pull back
    {
      id: 'ms-4-1',
      dayIdx: 4,
      title: {
        en: 'Securities Commission Proposes Retail Trading Safeguards',
        ko: '증권위, 개인투자자 보호 규제안 발표',
      },
      content: {
        en: 'The Federal Securities Commission unveiled proposed rules requiring enhanced risk disclosures for highly volatile stocks and real-time reporting of institutional short positions. Markets viewed the measures as balanced.',
        ko: '연방증권위원회가 고변동성 종목에 대한 위험 고지 강화와 기관 공매도 포지션 실시간 공시를 요구하는 규제안을 공개했다. 시장은 이 조치를 균형 잡힌 것으로 평가했다.',
      },
      read: false,
      effect: { ECOM: 0.96, TECH: 1.03 },
    },
    {
      id: 'ms-4-2',
      dayIdx: 4,
      title: {
        en: 'Meme Stocks Retreat as Momentum Fades',
        ko: '모멘텀 약화에 밈 주식 후퇴',
      },
      content: {
        en: 'Meme stock favorites pulled back sharply as the initial short squeeze momentum faded and proposed regulations dampened speculative fervor. GlobalMart shares fell 18% from their peak.',
        ko: '초기 숏 스퀴즈 모멘텀이 약화되고 규제안이 투기 열풍을 식히면서 밈 주식들이 급격히 후퇴했다. 글로벌마트 주가가 고점 대비 18% 하락했다.',
      },
      read: false,
      effect: { ECOM: 0.90 },
    },
    {
      id: 'ms-4-3',
      dayIdx: 4,
      title: {
        en: 'Tech Sector Rebounds as Volatility Subsides',
        ko: '변동성 완화에 기술주 반등',
      },
      content: {
        en: 'Technology stocks rallied as volatility indices retreated from their highs. Institutional investors returned to quality growth names, with NeoTech Industries leading the sector recovery.',
        ko: '변동성 지수가 고점에서 후퇴하면서 기술주가 반등했다. 기관투자자들이 우량 성장주로 복귀하며 네오텍 인더스트리즈가 업종 회복을 주도했다.',
      },
      read: false,
      effect: { TECH: 1.07 },
    },
    {
      id: 'ms-4-4',
      dayIdx: 4,
      title: {
        en: 'Aerospace Holds Gains from Institutional Inflows',
        ko: '항공우주, 기관 자금 유입에 상승분 유지',
      },
      content: {
        en: 'Aerospace and defense stocks consolidated their recent gains as institutional demand remained strong. Analysts noted the sector emerged from the meme stock crisis with an improved investor base.',
        ko: '항공우주·방위주가 기관 수요 강세에 힘입어 최근 상승분을 유지했다. 애널리스트들은 밈 주식 위기를 거치며 업종의 투자자 기반이 개선됐다고 평가했다.',
      },
      read: false,
      effect: { AERO: 1.03 },
    },
    {
      id: 'ms-4-5',
      dayIdx: 4,
      title: {
        en: 'Healthcare Sector Extends Winning Streak',
        ko: '헬스케어 업종, 연승 행진 이어가',
      },
      content: {
        en: 'Pharmaceutical stocks posted their fourth consecutive day of gains as the sector\'s low-volatility profile continued attracting risk-averse capital. VitaPharma hit an all-time high.',
        ko: '제약주가 4일 연속 상승하며 업종의 저변동성 특성이 위험 회피 자금을 계속 끌어모았다. 비타파마가 사상 최고가를 경신했다.',
      },
      read: false,
      effect: { HEALTH: 1.04 },
    },

    // Day 5: Market normalizes, new regulations, broader stabilization
    {
      id: 'ms-5-1',
      dayIdx: 5,
      title: {
        en: 'New Retail Trading Regulations Signed Into Law',
        ko: '개인투자자 거래 규제법 공식 서명',
      },
      content: {
        en: 'The president signed comprehensive retail trading reform legislation mandating short position transparency, banning payment-for-order-flow, and establishing investor protection standards. Markets rallied on the regulatory clarity.',
        ko: '대통령이 공매도 포지션 투명성 의무화, 주문 흐름 지불(PFOF) 금지, 투자자 보호 기준 수립을 골자로 한 포괄적 개인 거래 개혁법에 서명했다. 규제 명확성에 시장이 상승했다.',
      },
      read: false,
      effect: { ECOM: 1.06, TECH: 1.04 },
    },
    {
      id: 'ms-5-2',
      dayIdx: 5,
      title: {
        en: 'Broad Market Indices Recover to Pre-Crisis Levels',
        ko: '주요 시장 지수, 위기 이전 수준 회복',
      },
      content: {
        en: 'Major market indices recovered to pre-meme-stock-crisis levels as institutional and retail confidence returned. Trading volumes normalized across all sectors for the first time in two weeks.',
        ko: '기관과 개인 모두의 신뢰가 회복되면서 주요 시장 지수가 밈 주식 위기 이전 수준을 되찾았다. 2주 만에 처음으로 전 업종 거래량이 정상화됐다.',
      },
      read: false,
      effect: { TECH: 1.05, AERO: 1.04 },
    },
    {
      id: 'ms-5-3',
      dayIdx: 5,
      title: {
        en: 'Green Energy Rebounds on Clean Slate',
        ko: '친환경 에너지, 깔끔한 재출발로 반등',
      },
      content: {
        en: 'Renewable energy stocks rebounded strongly as meme-related selling pressure evaporated. Analysts reiterated buy ratings on EcoEnergy Corp, calling the recent dip an attractive entry point.',
        ko: '밈 관련 매도 압력이 해소되면서 재생에너지주가 강하게 반등했다. 애널리스트들은 최근 하락을 매력적 진입 시점이라며 에코에너지에 대한 매수 의견을 재확인했다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'ms-5-4',
      dayIdx: 5,
      title: {
        en: 'GlobalMart Announces Strategic Pivot Plan',
        ko: '글로벌마트, 전략적 사업 전환 계획 발표',
      },
      content: {
        en: 'GlobalMart\'s board unveiled a comprehensive business transformation plan capitalizing on its newfound brand recognition from the meme stock saga. The stock stabilized as investors assessed the turnaround strategy.',
        ko: '글로벌마트 이사회가 밈 주식 사태로 높아진 브랜드 인지도를 활용한 포괄적 사업 전환 계획을 공개했다. 투자자들이 턴어라운드 전략을 평가하면서 주가가 안정됐다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },
    {
      id: 'ms-5-5',
      dayIdx: 5,
      title: {
        en: 'Analysts: Meme Mania Left Markets Stronger',
        ko: '애널리스트 "밈 광풍이 시장을 더 강하게 만들었다"',
      },
      content: {
        en: 'Market strategists concluded that the meme stock crisis, while disruptive, ultimately produced healthier market infrastructure with better transparency and fairer retail access. Investor confidence indices rose to yearly highs.',
        ko: '시장 전략가들은 밈 주식 위기가 혼란스러웠지만 결과적으로 투명성 강화와 공정한 개인 접근성을 갖춘 더 건전한 시장 인프라를 만들었다고 결론지었다. 투자자 신뢰지수가 연중 최고치로 상승했다.',
      },
      read: false,
      effect: { HEALTH: 1.03, GREEN: 1.02 },
    },
  ],
};
