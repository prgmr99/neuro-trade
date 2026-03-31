import { ClassicScenarioArc } from './classic-arcs';

export const CRYPTO_MELTDOWN_ARC: ClassicScenarioArc = {
  id: 'crypto-meltdown',
  name: { en: 'Crypto Exchange Collapse', ko: '암호화폐 거래소 붕괴' },
  news: [
    // Day 1: Major crypto exchange reveals $8B hole
    {
      id: 'cm-1-1',
      dayIdx: 1,
      title: {
        en: 'CryptoVault Exchange Reveals $8B Shortfall in Customer Funds',
        ko: '크립토볼트 거래소, 고객 자금 80억 달러 부족 사실 폭로',
      },
      content: {
        en: 'CryptoVault, once the world\'s third-largest cryptocurrency exchange, disclosed an $8 billion gap between customer deposits and available assets. The revelation sent shockwaves through digital asset markets and rattled investor confidence in the broader financial system.',
        ko: '한때 세계 3위 암호화폐 거래소였던 크립토볼트가 고객 예치금과 보유 자산 사이에 80억 달러의 차이가 있다고 공시했다. 이 폭로는 디지털 자산 시장에 충격파를 보내며 금융 시스템 전반에 대한 투자자 신뢰를 뒤흔들었다.',
      },
      read: false,
      effect: { TECH: 0.90 },
    },
    {
      id: 'cm-1-2',
      dayIdx: 1,
      title: {
        en: 'Tech Stocks with Crypto Exposure Plummet',
        ko: '암호화폐 관련 기술주 급락',
      },
      content: {
        en: 'Technology companies with significant cryptocurrency holdings or blockchain business lines saw their shares fall sharply. NeoTech Industries dropped 6% after analysts flagged its $400 million digital asset treasury position.',
        ko: '암호화폐 보유량이 크거나 블록체인 사업 부문을 운영하는 기술 기업 주가가 급락했다. 네오텍 인더스트리즈는 4억 달러 규모의 디지털 자산 보유가 부각되며 6% 하락했다.',
      },
      read: false,
      effect: { TECH: 0.92 },
    },
    {
      id: 'cm-1-3',
      dayIdx: 1,
      title: {
        en: 'E-Commerce Platforms Suspend Crypto Payments',
        ko: '이커머스 플랫폼, 암호화폐 결제 중단',
      },
      content: {
        en: 'Major e-commerce platforms immediately suspended cryptocurrency payment options amid the CryptoVault fallout. GlobalMart announced it would refund all pending crypto transactions at the pre-collapse exchange rate.',
        ko: '주요 이커머스 플랫폼들이 크립토볼트 사태 여파로 암호화폐 결제 옵션을 즉시 중단했다. 글로벌마트는 모든 보류 중인 암호화폐 거래를 폭락 이전 환율로 환불하겠다고 발표했다.',
      },
      read: false,
      effect: { ECOM: 0.94 },
    },
    {
      id: 'cm-1-4',
      dayIdx: 1,
      title: {
        en: 'Investors Flee to Traditional Safe Havens',
        ko: '투자자들, 전통적 안전자산으로 대거 이동',
      },
      content: {
        en: 'The crypto crisis triggered a massive flight to safety, with investors piling into pharmaceutical stocks and government bonds. VitaPharma surged 5% as institutional funds sought shelter from digital asset contagion.',
        ko: '암호화폐 위기가 대규모 안전자산 선호를 촉발하면서 투자자들이 제약주와 국채로 몰렸다. 비타파마는 기관이 디지털 자산 전염으로부터 피난처를 찾으면서 5% 급등했다.',
      },
      read: false,
      effect: { HEALTH: 1.08 },
    },
    {
      id: 'cm-1-5',
      dayIdx: 1,
      title: {
        en: 'Defense Sector Unaffected by Crypto Turmoil',
        ko: '방위 산업, 암호화폐 혼란에 영향 없어',
      },
      content: {
        en: 'Aerospace and defense stocks held firm as their government-contract revenue base provided insulation from crypto market chaos. Analysts highlighted the sector\'s zero exposure to digital assets as a key advantage.',
        ko: '항공우주·방위주가 정부 계약 기반 매출 덕분에 암호화폐 시장 혼란에서 벗어나 견조한 흐름을 보였다. 애널리스트들은 디지털 자산 노출이 전무하다는 점을 핵심 강점으로 부각했다.',
      },
      read: false,
      effect: { AERO: 1.04 },
    },

    // Day 2: Contagion spreads
    {
      id: 'cm-2-1',
      dayIdx: 2,
      title: {
        en: 'Crypto Contagion Hits Second Major Exchange',
        ko: '암호화폐 전염, 제2 대형 거래소로 확산',
      },
      content: {
        en: 'TradeChain, another top-five crypto exchange, suspended withdrawals after a bank run depleted its reserves. Industry estimates suggest over $20 billion in customer funds are now frozen across multiple platforms.',
        ko: '5대 암호화폐 거래소 중 하나인 트레이드체인이 뱅크런으로 준비금이 고갈된 후 출금을 중단했다. 업계 추산에 따르면 복수 플랫폼에서 200억 달러 이상의 고객 자금이 동결된 상태다.',
      },
      read: false,
      effect: { TECH: 0.89 },
    },
    {
      id: 'cm-2-2',
      dayIdx: 2,
      title: {
        en: 'Blockchain-Adjacent Startups Face Funding Freeze',
        ko: '블록체인 인접 스타트업, 자금 조달 동결 직면',
      },
      content: {
        en: 'Venture capital firms announced a complete pause on blockchain and crypto-related investments. The funding freeze is expected to cascade through the broader tech startup ecosystem within weeks.',
        ko: '벤처캐피탈 업체들이 블록체인 및 암호화폐 관련 투자를 전면 중단한다고 발표했다. 이 자금 동결은 수주 내 광범위한 기술 스타트업 생태계로 파급될 전망이다.',
      },
      read: false,
      effect: { TECH: 0.93 },
    },
    {
      id: 'cm-2-3',
      dayIdx: 2,
      title: {
        en: 'Online Retailers See Spike in Returns and Chargebacks',
        ko: '온라인 유통, 반품·차지백 급증',
      },
      content: {
        en: 'E-commerce platforms reported a surge in product returns and payment chargebacks from customers who had been relying on crypto gains to fund purchases. Customer spending power erosion hit discretionary categories hardest.',
        ko: '암호화폐 수익으로 구매 자금을 충당하던 고객들의 제품 반품과 결제 취소가 급증했다. 소비 여력 감소가 임의소비재 카테고리에 가장 큰 타격을 줬다.',
      },
      read: false,
      effect: { ECOM: 0.92 },
    },
    {
      id: 'cm-2-4',
      dayIdx: 2,
      title: {
        en: 'Green Energy Stocks Dip on Risk-Off Sentiment',
        ko: '위험자산 기피 심리에 친환경 에너지주 하락',
      },
      content: {
        en: 'Renewable energy stocks fell as the broader risk-off sentiment pulled growth-oriented sectors lower. EcoEnergy Corp declined 4% despite strong quarterly production data released the same morning.',
        ko: '전반적인 위험자산 기피 심리가 성장 지향 업종을 끌어내리면서 재생에너지주가 하락했다. 에코에너지는 같은 날 오전 발표된 양호한 분기 생산 실적에도 불구하고 4% 하락했다.',
      },
      read: false,
      effect: { GREEN: 0.95 },
    },
    {
      id: 'cm-2-5',
      dayIdx: 2,
      title: {
        en: 'Pharma Sector Extends Rally on Defensive Appeal',
        ko: '제약 업종, 방어적 매력에 랠리 연장',
      },
      content: {
        en: 'Healthcare stocks extended their rally for a second consecutive session as the crypto crisis deepened. Fund managers cited pharmaceutical sector\'s predictable cash flows as the primary attraction in uncertain times.',
        ko: '암호화폐 위기가 심화되면서 헬스케어주가 이틀 연속 랠리를 이어갔다. 펀드 매니저들은 불확실한 시기에 제약 업종의 예측 가능한 현금흐름이 핵심 매력이라고 꼽았다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },

    // Day 3: Regulators freeze assets, safe havens rally
    {
      id: 'cm-3-1',
      dayIdx: 3,
      title: {
        en: 'Regulators Freeze All CryptoVault Assets Worldwide',
        ko: '규제 당국, 크립토볼트 전 세계 자산 동결',
      },
      content: {
        en: 'Financial regulators in twelve jurisdictions simultaneously froze all CryptoVault corporate and executive assets. The coordinated enforcement action signals the most aggressive regulatory response to a crypto firm in history.',
        ko: '12개 관할권의 금융 규제 당국이 동시에 크립토볼트의 법인 및 경영진 자산을 전부 동결했다. 이번 공조 집행은 암호화폐 기업에 대한 역대 가장 강력한 규제 대응으로 평가된다.',
      },
      read: false,
      effect: { TECH: 0.95 },
    },
    {
      id: 'cm-3-2',
      dayIdx: 3,
      title: {
        en: 'Traditional Finance Stocks Rally on "Back to Basics" Theme',
        ko: '"기본으로 돌아가자" 테마에 전통 금융주 랠리',
      },
      content: {
        en: 'Investors embraced a "back to basics" narrative, rotating aggressively into companies with tangible assets and proven business models. E-commerce stocks with strong physical logistics networks outperformed pure-digital peers.',
        ko: '투자자들이 "기본으로 돌아가자" 내러티브를 수용하며 실물 자산과 검증된 비즈니스 모델을 가진 기업에 공격적으로 자금을 이동시켰다. 물리적 물류 네트워크가 강한 이커머스 종목이 순수 디지털 기업을 상회했다.',
      },
      read: false,
      effect: { ECOM: 1.05 },
    },
    {
      id: 'cm-3-3',
      dayIdx: 3,
      title: {
        en: 'Defense Contractors Win New Cybersecurity Mandates',
        ko: '방위 계약업체, 사이버보안 신규 의무 수주',
      },
      content: {
        en: 'The government awarded emergency cybersecurity contracts to aerospace and defense firms to protect financial infrastructure from crypto-related threats. AeroSpace Dynamics secured a $1.2 billion multi-year deal.',
        ko: '정부가 암호화폐 관련 위협으로부터 금융 인프라를 보호하기 위해 항공우주·방위 기업에 긴급 사이버보안 계약을 발주했다. 에어로스페이스 다이내믹스가 12억 달러 규모의 다년 계약을 수주했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'cm-3-4',
      dayIdx: 3,
      title: {
        en: 'Green Energy Sees Uptick as ESG Funds Rebalance',
        ko: 'ESG 펀드 리밸런싱에 친환경 에너지 반등',
      },
      content: {
        en: 'ESG-focused investment funds rebalanced away from crypto-exposed tech holdings into clean energy stocks. EcoEnergy Corp benefited from over $800 million in passive fund inflows during the session.',
        ko: 'ESG 중심 투자 펀드들이 암호화폐 노출 기술주에서 청정에너지 종목으로 리밸런싱을 단행했다. 에코에너지가 세션 중 8억 달러 이상의 패시브 자금 유입 수혜를 받았다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },
    {
      id: 'cm-3-5',
      dayIdx: 3,
      title: {
        en: 'VitaPharma Hits Record High on Haven Demand',
        ko: '비타파마, 안전자산 수요에 사상 최고가 경신',
      },
      content: {
        en: 'VitaPharma shares reached an all-time high as the pharmaceutical sector became the most popular destination for capital fleeing crypto uncertainty. The stock has gained 14% since the crisis began.',
        ko: '암호화폐 불확실성을 피한 자금의 최우선 목적지가 되면서 비타파마 주가가 사상 최고가를 경신했다. 위기 시작 이후 주가가 14% 상승했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },

    // Day 4: Government announces comprehensive crypto regulation
    {
      id: 'cm-4-1',
      dayIdx: 4,
      title: {
        en: 'Government Unveils Comprehensive Crypto Regulation Framework',
        ko: '정부, 포괄적 암호화폐 규제 프레임워크 발표',
      },
      content: {
        en: 'The government released a sweeping regulatory framework requiring all crypto exchanges to maintain full reserve backing, undergo regular audits, and register as regulated financial institutions. Markets interpreted the clarity as constructive.',
        ko: '정부가 모든 암호화폐 거래소에 완전 지급준비금 유지, 정기 감사, 규제 금융기관 등록을 의무화하는 포괄적 규제 프레임워크를 발표했다. 시장은 규제 명확성을 긍정적으로 해석했다.',
      },
      read: false,
      effect: { TECH: 1.06 },
    },
    {
      id: 'cm-4-2',
      dayIdx: 4,
      title: {
        en: 'Tech Sector Begins Separating Crypto from Core Business',
        ko: '기술 업종, 암호화폐와 핵심 사업 분리 착수',
      },
      content: {
        en: 'Major technology companies announced plans to divest or ring-fence their cryptocurrency operations from core business lines. NeoTech Industries\' stock recovered 4% after pledging to exit digital asset positions within 90 days.',
        ko: '주요 기술 기업들이 핵심 사업에서 암호화폐 운영을 매각하거나 분리하겠다는 계획을 발표했다. 네오텍 인더스트리즈가 90일 내 디지털 자산 포지션 청산을 약속하면서 주가가 4% 회복했다.',
      },
      read: false,
      effect: { TECH: 1.05 },
    },
    {
      id: 'cm-4-3',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Returns to Fiat-Only Payment Models',
        ko: '이커머스, 법정화폐 전용 결제 모델로 복귀',
      },
      content: {
        en: 'Online retail platforms confirmed permanent transitions to fiat-currency-only payment systems, eliminating the volatility risk that crypto payments introduced. Customer satisfaction scores improved on the simplified checkout process.',
        ko: '온라인 유통 플랫폼들이 법정화폐 전용 결제 시스템으로의 영구 전환을 확정하며 암호화폐 결제가 초래한 변동성 위험을 제거했다. 간소화된 결제 절차에 고객 만족도가 상승했다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },
    {
      id: 'cm-4-4',
      dayIdx: 4,
      title: {
        en: 'Green Energy Rallies on Crypto Mining Ban Proposal',
        ko: '암호화폐 채굴 금지안에 친환경 에너지 랠리',
      },
      content: {
        en: 'Lawmakers proposed banning energy-intensive cryptocurrency mining operations, freeing up grid capacity for productive economic use. Renewable energy companies surged as analysts predicted lower energy competition and stronger margins.',
        ko: '의원들이 에너지 집약적 암호화폐 채굴을 금지하는 법안을 발의해 전력망 용량을 생산적 경제 활동에 활용할 수 있게 됐다. 에너지 경쟁 완화와 마진 개선 전망에 재생에너지 기업 주가가 급등했다.',
      },
      read: false,
      effect: { GREEN: 1.09 },
    },
    {
      id: 'cm-4-5',
      dayIdx: 4,
      title: {
        en: 'Aerospace Gains on Expanded Cybersecurity Budget',
        ko: '사이버보안 예산 확대에 항공우주 상승',
      },
      content: {
        en: 'The defense budget received a supplemental allocation for financial infrastructure cybersecurity in response to the crypto crisis. Aerospace and defense contractors with cyber divisions saw strong buying interest.',
        ko: '암호화폐 위기 대응으로 국방 예산에 금융 인프라 사이버보안 추가 배정이 이뤄졌다. 사이버 부문을 보유한 항공우주·방위 계약업체들이 강한 매수세를 보였다.',
      },
      read: false,
      effect: { AERO: 1.05 },
    },

    // Day 5: Market separates crypto from traditional assets, tech rebounds
    {
      id: 'cm-5-1',
      dayIdx: 5,
      title: {
        en: 'Markets Officially Decouple Crypto from Traditional Assets',
        ko: '시장, 암호화폐와 전통 자산 공식 디커플링',
      },
      content: {
        en: 'Major index providers announced the removal of crypto-exposed companies from mainstream indices, officially decoupling digital assets from traditional market benchmarks. Technology stocks surged as the contamination risk disappeared.',
        ko: '주요 지수 제공 업체들이 암호화폐 노출 기업을 주류 지수에서 제외하며 디지털 자산과 전통 시장 벤치마크의 공식 디커플링을 단행했다. 전염 리스크 소멸에 기술주가 급등했다.',
      },
      read: false,
      effect: { TECH: 1.10 },
    },
    {
      id: 'cm-5-2',
      dayIdx: 5,
      title: {
        en: 'NeoTech Industries Posts Strong Crypto-Free Guidance',
        ko: '네오텍 인더스트리즈, 암호화폐 제외 호실적 가이던스 발표',
      },
      content: {
        en: 'NeoTech Industries released updated financial guidance excluding all cryptocurrency operations, revealing a stronger core business than previously understood. The stock rallied 8% on the recalibrated outlook.',
        ko: '네오텍 인더스트리즈가 모든 암호화폐 사업을 제외한 수정 재무 가이던스를 발표하며 이전 인식보다 강한 핵심 사업 역량을 드러냈다. 재조정된 전망에 주가가 8% 급등했다.',
      },
      read: false,
      effect: { TECH: 1.08 },
    },
    {
      id: 'cm-5-3',
      dayIdx: 5,
      title: {
        en: 'E-Commerce Volumes Normalize Post-Crisis',
        ko: '이커머스 거래량, 위기 후 정상화',
      },
      content: {
        en: 'Online retail transaction volumes returned to pre-crisis levels as consumer confidence stabilized. GlobalMart reported that its fiat-only checkout conversion rate actually exceeded the previous crypto-inclusive model.',
        ko: '소비자 신뢰가 안정되면서 온라인 유통 거래량이 위기 이전 수준으로 복귀했다. 글로벌마트는 법정화폐 전용 결제 전환율이 이전 암호화폐 포함 모델보다 오히려 높다고 보고했다.',
      },
      read: false,
      effect: { ECOM: 1.06 },
    },
    {
      id: 'cm-5-4',
      dayIdx: 5,
      title: {
        en: 'Green Energy Cements Post-Crypto Energy Dividend',
        ko: '친환경 에너지, 탈암호화폐 에너지 배당 확정',
      },
      content: {
        en: 'With the crypto mining ban passed, grid operators confirmed a 15% increase in available capacity for renewable energy distribution. EcoEnergy Corp announced accelerated expansion plans leveraging the freed infrastructure.',
        ko: '암호화폐 채굴 금지법 통과로 전력망 운영사들이 재생에너지 배전 가용 용량의 15% 증가를 확인했다. 에코에너지는 해방된 인프라를 활용한 확장 계획 가속화를 발표했다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'cm-5-5',
      dayIdx: 5,
      title: {
        en: 'Analysts Declare Crypto Crisis Contained, Upgrade Outlook',
        ko: '애널리스트 "암호화폐 위기 봉쇄"… 전망 상향',
      },
      content: {
        en: 'Leading financial analysts declared the crypto crisis fully contained, upgrading their market outlook across all traditional sectors. The crisis is now viewed as a watershed moment that strengthened regulatory frameworks globally.',
        ko: '주요 금융 애널리스트들이 암호화폐 위기가 완전히 봉쇄됐다고 선언하며 전통 자산 전 업종의 시장 전망을 상향했다. 이번 위기는 전 세계 규제 체계를 강화한 분수령으로 평가되고 있다.',
      },
      read: false,
      effect: { HEALTH: 1.03, AERO: 1.04 },
    },
  ],
};
