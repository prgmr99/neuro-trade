import { LocalizedString } from '../types';

export interface FlashScenario {
  id: number;
  stock: {
    symbol: string;
    name: LocalizedString;
    price: number;
    volatility: number;
    description: LocalizedString;
  };
  news: {
    title: LocalizedString;
    content: LocalizedString;
    effect: number; // multiplier, e.g. 1.15 for +15%, 0.85 for -15%
  };
}

export const FLASH_SCENARIOS: FlashScenario[] = [
  // --- CLEARLY BULLISH ---
  {
    id: 1,
    stock: {
      symbol: 'TECH',
      name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
      price: 150,
      volatility: 0.05,
      description: { en: 'Leading AI and consumer electronics conglomerate.', ko: '인공지능·가전 분야의 선두 대기업.' },
    },
    news: {
      title: { en: 'NeoTech Lands $50B Government AI Contract', ko: '네오테크, 500억 달러 정부 AI 계약 수주' },
      content: { en: 'The federal government has awarded NeoTech Industries the largest AI infrastructure contract in history. Analysts project a 20% revenue surge next quarter.', ko: '연방 정부가 역대 최대 규모의 AI 인프라 계약을 네오테크 산업에 수주했습니다. 애널리스트들은 다음 분기 매출이 20% 급증할 것으로 전망합니다.' },
      effect: 1.18,
    },
  },
  {
    id: 2,
    stock: {
      symbol: 'HEALTH',
      name: { en: 'VitaPharma', ko: '비타파마' },
      price: 120,
      volatility: 0.03,
      description: { en: 'Pharmaceutical giant developing life-saving drugs.', ko: '생명을 구하는 신약을 개발하는 제약 대기업.' },
    },
    news: {
      title: { en: 'VitaPharma Cure Approved by FDA in Record Time', ko: '비타파마 신약, FDA 역대 최단 기간 승인' },
      content: { en: 'The FDA has granted accelerated approval for VitaPharma\'s breakthrough cancer treatment. Market analysts predict immediate blockbuster status with $8B in annual revenue.', ko: 'FDA가 비타파마의 혁신적인 암 치료제를 역대 최단 기간에 승인했습니다. 시장 분석가들은 연간 80억 달러의 블록버스터 매출을 예상합니다.' },
      effect: 1.16,
    },
  },
  {
    id: 3,
    stock: {
      symbol: 'AERO',
      name: { en: 'AeroSpace Dynamics', ko: '에어로스페이스 다이내믹스' },
      price: 210,
      volatility: 0.06,
      description: { en: 'Aviation, aerospace manufacturing and defense.', ko: '항공·우주 제조 및 방위 산업.' },
    },
    news: {
      title: { en: 'Pentagon Awards AeroSpace $200B Defense Mega-Contract', ko: '미 국방부, 에어로스페이스에 2000억 달러 방산 초대형 계약 체결' },
      content: { en: 'AeroSpace Dynamics has secured a 10-year, $200 billion contract to supply next-generation fighter jets and missile defense systems. Shares are expected to surge at open.', ko: '에어로스페이스 다이내믹스가 차세대 전투기 및 미사일 방어 시스템 공급을 위한 10년, 2000억 달러 계약을 체결했습니다. 시장 개장 시 주가 급등이 예상됩니다.' },
      effect: 1.20,
    },
  },
  {
    id: 4,
    stock: {
      symbol: 'GREEN',
      name: { en: 'EcoEnergy Corp', ko: '에코에너지' },
      price: 45,
      volatility: 0.08,
      description: { en: 'Renewable energy and electric vehicle innovator.', ko: '재생에너지·전기차 혁신 기업.' },
    },
    news: {
      title: { en: 'G20 Nations Pledge $1T in Green Energy Subsidies', ko: 'G20 국가들, 1조 달러 규모 친환경 에너지 보조금 공약' },
      content: { en: 'All G20 nations jointly announced a historic $1 trillion green energy subsidy package over five years. EcoEnergy Corp is named a primary beneficiary.', ko: 'G20 전 국가가 5년간 1조 달러 규모의 역사적인 친환경 에너지 보조금 패키지를 공동 발표했습니다. 에코에너지가 주요 수혜 기업으로 지목됐습니다.' },
      effect: 1.22,
    },
  },
  {
    id: 5,
    stock: {
      symbol: 'ECOM',
      name: { en: 'GlobalMart E-Commerce', ko: '글로벌마트 이커머스' },
      price: 85,
      volatility: 0.04,
      description: { en: 'Worldwide retail and logistics giant.', ko: '전 세계적인 유통 및 물류 거인.' },
    },
    news: {
      title: { en: 'GlobalMart Reports Record Holiday Sales, Triples Guidance', ko: '글로벌마트, 역대 최고 명절 매출·가이던스 3배 상향' },
      content: { en: 'GlobalMart\'s holiday quarter smashed all records, posting 85% revenue growth. Management tripled next-year guidance, sending analysts scrambling to revise price targets upward.', ko: '글로벌마트의 명절 분기 실적이 모든 기록을 경신하며 매출 85% 성장을 달성했습니다. 경영진은 내년 가이던스를 3배 상향하며 애널리스트들의 목표가 상향 조정 러시를 불러일으켰습니다.' },
      effect: 1.14,
    },
  },

  // --- CLEARLY BEARISH ---
  {
    id: 6,
    stock: {
      symbol: 'TECH',
      name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
      price: 155,
      volatility: 0.05,
      description: { en: 'Leading AI and consumer electronics conglomerate.', ko: '인공지능·가전 분야의 선두 대기업.' },
    },
    news: {
      title: { en: 'NeoTech Hit With $30B Antitrust Fine', ko: '네오테크, 300억 달러 반독점 과징금 폭탄' },
      content: { en: 'Regulators have imposed the largest antitrust fine in tech history on NeoTech, ordering it to divest key AI divisions. Legal costs alone are expected to drain billions.', ko: '규제 당국이 역대 최대 규모의 반독점 과징금을 네오테크에 부과하고 핵심 AI 사업부 매각을 명령했습니다. 소송 비용만으로도 수십억 달러가 소진될 전망입니다.' },
      effect: 0.82,
    },
  },
  {
    id: 7,
    stock: {
      symbol: 'GREEN',
      name: { en: 'EcoEnergy Corp', ko: '에코에너지' },
      price: 48,
      volatility: 0.08,
      description: { en: 'Renewable energy and electric vehicle innovator.', ko: '재생에너지·전기차 혁신 기업.' },
    },
    news: {
      title: { en: 'EcoEnergy Battery Factory Fire Destroys Production Capacity', ko: '에코에너지 배터리 공장 화재, 생산 능력 초토화' },
      content: { en: 'A catastrophic fire has destroyed EcoEnergy\'s main battery manufacturing plant, wiping out 60% of production capacity. Insurance may not cover the full $4B loss.', ko: '대형 화재가 에코에너지의 주력 배터리 제조 공장을 전소시키며 생산 능력의 60%가 소실됐습니다. 보험으로 40억 달러 전체 손실을 충당하기 어려울 수 있습니다.' },
      effect: 0.78,
    },
  },
  {
    id: 8,
    stock: {
      symbol: 'AERO',
      name: { en: 'AeroSpace Dynamics', ko: '에어로스페이스 다이내믹스' },
      price: 205,
      volatility: 0.06,
      description: { en: 'Aviation, aerospace manufacturing and defense.', ko: '항공·우주 제조 및 방위 산업.' },
    },
    news: {
      title: { en: 'AeroSpace Fleet Grounded After Fatal Crash Investigation', ko: '에어로스페이스, 치명적 추락 사고 조사로 전 기종 운항 중단' },
      content: { en: 'Aviation authorities worldwide have grounded all 400 AeroSpace-built aircraft following a fatal crash linked to a design defect. Airlines are demanding full compensation.', ko: '전 세계 항공 당국이 설계 결함과 연관된 치명적 추락 사고 이후 에어로스페이스 제작 항공기 400대 전체의 운항을 중단시켰습니다. 항공사들은 전액 보상을 요구하고 있습니다.' },
      effect: 0.80,
    },
  },
  {
    id: 9,
    stock: {
      symbol: 'HEALTH',
      name: { en: 'VitaPharma', ko: '비타파마' },
      price: 118,
      volatility: 0.03,
      description: { en: 'Pharmaceutical giant developing life-saving drugs.', ko: '생명을 구하는 신약을 개발하는 제약 대기업.' },
    },
    news: {
      title: { en: 'VitaPharma Flagship Drug Pulled Over Safety Scandal', ko: '비타파마 주력 신약, 안전성 스캔들로 퇴출' },
      content: { en: 'The FDA has ordered an emergency recall of VitaPharma\'s best-selling drug after hidden trial data revealed severe cardiac side effects. Class-action lawsuits are already being filed.', ko: 'FDA가 숨겨진 임상 데이터에서 심각한 심장 부작용이 드러나자 비타파마의 최고 판매 신약에 대한 긴급 리콜을 명령했습니다. 집단 소송이 이미 제기되고 있습니다.' },
      effect: 0.75,
    },
  },
  {
    id: 10,
    stock: {
      symbol: 'ECOM',
      name: { en: 'GlobalMart E-Commerce', ko: '글로벌마트 이커머스' },
      price: 88,
      volatility: 0.04,
      description: { en: 'Worldwide retail and logistics giant.', ko: '전 세계적인 유통 및 물류 거인.' },
    },
    news: {
      title: { en: 'GlobalMart Massive Data Breach Exposes 800M Customers', ko: '글로벌마트 대규모 해킹, 고객 8억 명 개인정보 유출' },
      content: { en: 'Hackers breached GlobalMart\'s entire customer database, exposing payment details of 800 million users. Regulatory fines and litigation are expected to cost tens of billions.', ko: '해커들이 글로벌마트 전체 고객 데이터베이스를 뚫고 8억 명의 결제 정보를 유출했습니다. 규제 과징금과 소송 비용이 수백억 달러에 달할 것으로 예상됩니다.' },
      effect: 0.84,
    },
  },

  // --- MODERATELY BULLISH ---
  {
    id: 11,
    stock: {
      symbol: 'TECH',
      name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
      price: 148,
      volatility: 0.05,
      description: { en: 'Leading AI and consumer electronics conglomerate.', ko: '인공지능·가전 분야의 선두 대기업.' },
    },
    news: {
      title: { en: 'NeoTech Unveils New Chip Architecture, Analysts Upbeat', ko: '네오테크, 신형 칩 아키텍처 공개… 애널리스트들 긍정적' },
      content: { en: 'NeoTech\'s new neural processing chip promises 3x performance gains over competitors. Several tech reviewers called it "generational." Institutional buyers are accumulating shares.', ko: '네오테크의 새로운 신경 처리 칩이 경쟁사 대비 3배의 성능 향상을 약속합니다. 여러 기술 평론가들이 "세대를 뛰어넘는 제품"이라고 평가했습니다. 기관 투자자들이 주식을 매집하고 있습니다.' },
      effect: 1.10,
    },
  },
  {
    id: 12,
    stock: {
      symbol: 'ECOM',
      name: { en: 'GlobalMart E-Commerce', ko: '글로벌마트 이커머스' },
      price: 82,
      volatility: 0.04,
      description: { en: 'Worldwide retail and logistics giant.', ko: '전 세계적인 유통 및 물류 거인.' },
    },
    news: {
      title: { en: 'GlobalMart Acquires Same-Day Drone Delivery Startup', ko: '글로벌마트, 당일 드론 배송 스타트업 인수' },
      content: { en: 'GlobalMart acquired logistics startup SwiftDrop for $2.1B, gaining a fleet of 50,000 delivery drones. Analysts say this could cut last-mile delivery costs by 40%.', ko: '글로벌마트가 물류 스타트업 스위프트드롭을 21억 달러에 인수하며 5만 대의 배송 드론 함대를 확보했습니다. 애널리스트들은 라스트마일 배송 비용을 40% 절감할 수 있다고 말합니다.' },
      effect: 1.09,
    },
  },
  {
    id: 13,
    stock: {
      symbol: 'GREEN',
      name: { en: 'EcoEnergy Corp', ko: '에코에너지' },
      price: 43,
      volatility: 0.08,
      description: { en: 'Renewable energy and electric vehicle innovator.', ko: '재생에너지·전기차 혁신 기업.' },
    },
    news: {
      title: { en: 'EcoEnergy Signs Major Power Deal With Three Nations', ko: '에코에너지, 3개국과 대규모 전력 공급 계약 체결' },
      content: { en: 'EcoEnergy Corp has signed 20-year renewable energy supply agreements with Germany, Japan, and Australia. Combined contract value exceeds $15 billion.', ko: '에코에너지가 독일, 일본, 호주와 20년 장기 재생에너지 공급 계약을 체결했습니다. 합산 계약 규모가 150억 달러를 초과합니다.' },
      effect: 1.11,
    },
  },
  {
    id: 14,
    stock: {
      symbol: 'HEALTH',
      name: { en: 'VitaPharma', ko: '비타파마' },
      price: 122,
      volatility: 0.03,
      description: { en: 'Pharmaceutical giant developing life-saving drugs.', ko: '생명을 구하는 신약을 개발하는 제약 대기업.' },
    },
    news: {
      title: { en: 'VitaPharma Enters Lucrative Weight-Loss Drug Market', ko: '비타파마, 수익성 높은 비만치료제 시장 진출' },
      content: { en: 'VitaPharma announced clinical success for its obesity drug with 30% body weight reduction. The weight-loss drug market is worth $100B annually.', ko: '비타파마가 체중 30% 감소 효과를 보인 비만 치료제 임상 성공을 발표했습니다. 비만 치료제 시장의 연간 규모는 1000억 달러에 달합니다.' },
      effect: 1.12,
    },
  },
  {
    id: 15,
    stock: {
      symbol: 'AERO',
      name: { en: 'AeroSpace Dynamics', ko: '에어로스페이스 다이내믹스' },
      price: 215,
      volatility: 0.06,
      description: { en: 'Aviation, aerospace manufacturing and defense.', ko: '항공·우주 제조 및 방위 산업.' },
    },
    news: {
      title: { en: 'AeroSpace Wins Lunar Gateway Module Contract', ko: '에어로스페이스, 달 궤도 게이트웨이 모듈 계약 수주' },
      content: { en: 'NASA selected AeroSpace Dynamics to build the central hub of the Lunar Gateway space station, a $12B contract that positions the company at the forefront of space exploration.', ko: 'NASA가 달 궤도 게이트웨이 우주 정거장의 핵심 모듈 제작사로 에어로스페이스 다이내믹스를 선정했습니다. 120억 달러 규모의 이 계약은 회사를 우주 탐사 최전선에 세웁니다.' },
      effect: 1.13,
    },
  },

  // --- MODERATELY BEARISH ---
  {
    id: 16,
    stock: {
      symbol: 'TECH',
      name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
      price: 152,
      volatility: 0.05,
      description: { en: 'Leading AI and consumer electronics conglomerate.', ko: '인공지능·가전 분야의 선두 대기업.' },
    },
    news: {
      title: { en: 'NeoTech Q3 Earnings Miss by Wide Margin', ko: '네오테크 3분기 실적, 예상치 대폭 하회' },
      content: { en: 'NeoTech posted Q3 revenue $4B below consensus estimates, citing slower-than-expected AI adoption in enterprise markets. The CEO warned of continued headwinds for two quarters.', ko: '네오테크의 3분기 매출이 기업 시장의 예상보다 느린 AI 도입을 이유로 시장 예상치를 40억 달러나 하회했습니다. CEO는 향후 2분기 동안 역풍이 지속될 것이라고 경고했습니다.' },
      effect: 0.88,
    },
  },
  {
    id: 17,
    stock: {
      symbol: 'ECOM',
      name: { en: 'GlobalMart E-Commerce', ko: '글로벌마트 이커머스' },
      price: 86,
      volatility: 0.04,
      description: { en: 'Worldwide retail and logistics giant.', ko: '전 세계적인 유통 및 물류 거인.' },
    },
    news: {
      title: { en: 'Unions Strike Paralyzes GlobalMart Warehouses Nationwide', ko: '전국 파업으로 글로벌마트 물류창고 마비' },
      content: { en: 'Over 200,000 GlobalMart warehouse workers went on strike after contract negotiations broke down. Deliveries are halted across 15 countries with no resolution in sight.', ko: '단체협약 협상 결렬로 20만 명 이상의 글로벌마트 물류창고 직원들이 파업에 돌입했습니다. 15개국에 걸쳐 배송이 중단됐으며 해결 기미가 보이지 않습니다.' },
      effect: 0.89,
    },
  },
  {
    id: 18,
    stock: {
      symbol: 'GREEN',
      name: { en: 'EcoEnergy Corp', ko: '에코에너지' },
      price: 46,
      volatility: 0.08,
      description: { en: 'Renewable energy and electric vehicle innovator.', ko: '재생에너지·전기차 혁신 기업.' },
    },
    news: {
      title: { en: 'Key Mineral Shortage Delays EcoEnergy EV Production', ko: '핵심 광물 부족으로 에코에너지 전기차 생산 지연' },
      content: { en: 'A global lithium shortage is forcing EcoEnergy to cut EV production targets by 35% this year. Supply chain diversification efforts are still 18 months away from bearing fruit.', ko: '글로벌 리튬 부족으로 에코에너지가 올해 전기차 생산 목표를 35% 줄일 수밖에 없게 됐습니다. 공급망 다변화 노력이 결실을 맺으려면 아직 18개월이 남았습니다.' },
      effect: 0.87,
    },
  },
  {
    id: 19,
    stock: {
      symbol: 'HEALTH',
      name: { en: 'VitaPharma', ko: '비타파마' },
      price: 119,
      volatility: 0.03,
      description: { en: 'Pharmaceutical giant developing life-saving drugs.', ko: '생명을 구하는 신약을 개발하는 제약 대기업.' },
    },
    news: {
      title: { en: 'VitaPharma Patent Cliff Looms as Key Drug Goes Generic', ko: '비타파마 주력 신약 특허 만료, 제네릭 출시 임박' },
      content: { en: 'VitaPharma\'s top-selling drug, which accounts for 40% of revenue, loses patent protection next month. Generic rivals are already lining up, threatening a sharp revenue decline.', ko: '매출의 40%를 차지하는 비타파마의 최다 판매 약품이 다음 달 특허 보호가 만료됩니다. 제네릭 경쟁사들이 이미 출시를 준비 중이어서 매출의 급격한 하락이 우려됩니다.' },
      effect: 0.86,
    },
  },
  {
    id: 20,
    stock: {
      symbol: 'AERO',
      name: { en: 'AeroSpace Dynamics', ko: '에어로스페이스 다이내믹스' },
      price: 208,
      volatility: 0.06,
      description: { en: 'Aviation, aerospace manufacturing and defense.', ko: '항공·우주 제조 및 방위 산업.' },
    },
    news: {
      title: { en: 'AeroSpace Loses Major NATO Contract to Rival', ko: '에어로스페이스, NATO 핵심 계약 경쟁사에 빼앗겨' },
      content: { en: 'NATO awarded its $80B fighter jet modernization program to a European consortium, a major blow to AeroSpace Dynamics which had been considered the frontrunner.', ko: 'NATO가 800억 달러 규모의 전투기 현대화 사업을 유럽 컨소시엄에 수여했습니다. 유력 후보로 꼽혔던 에어로스페이스 다이내믹스에게 큰 타격입니다.' },
      effect: 0.85,
    },
  },

  // --- AMBIGUOUS (mixed signals) ---
  {
    id: 21,
    stock: {
      symbol: 'TECH',
      name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
      price: 151,
      volatility: 0.05,
      description: { en: 'Leading AI and consumer electronics conglomerate.', ko: '인공지능·가전 분야의 선두 대기업.' },
    },
    news: {
      title: { en: 'NeoTech CEO Steps Down, Board Names Insider Successor', ko: '네오테크 CEO 사임, 이사회 내부 인사 후계자 선임' },
      content: { en: 'NeoTech\'s visionary founder-CEO abruptly resigned citing health reasons. The board immediately appointed the longtime CFO as acting CEO. Investors are divided on whether the transition signals stability or drift.', ko: '네오테크의 창업자 겸 CEO가 건강 문제를 이유로 갑작스럽게 사임했습니다. 이사회는 장기 재직한 CFO를 즉시 대행 CEO로 임명했습니다. 투자자들은 이번 전환이 안정을 의미하는지 표류를 의미하는지 의견이 엇갈립니다.' },
      effect: 1.04,
    },
  },
  {
    id: 22,
    stock: {
      symbol: 'GREEN',
      name: { en: 'EcoEnergy Corp', ko: '에코에너지' },
      price: 44,
      volatility: 0.08,
      description: { en: 'Renewable energy and electric vehicle innovator.', ko: '재생에너지·전기차 혁신 기업.' },
    },
    news: {
      title: { en: 'New Climate Study Sparks Debate Over Solar Efficiency', ko: '새 기후 연구, 태양광 효율성 논쟁 촉발' },
      content: { en: 'A prominent university study questions the long-term efficiency of current solar panel technology. While critics dispute the methodology, some institutional investors are reassessing positions in renewables.', ko: '저명한 대학 연구팀이 현재 태양광 패널 기술의 장기 효율성에 의문을 제기했습니다. 비평가들은 연구 방법론에 이의를 제기하지만, 일부 기관 투자자들은 재생에너지 포지션을 재검토하고 있습니다.' },
      effect: 0.97,
    },
  },
  {
    id: 23,
    stock: {
      symbol: 'HEALTH',
      name: { en: 'VitaPharma', ko: '비타파마' },
      price: 121,
      volatility: 0.03,
      description: { en: 'Pharmaceutical giant developing life-saving drugs.', ko: '생명을 구하는 신약을 개발하는 제약 대기업.' },
    },
    news: {
      title: { en: 'VitaPharma Enters Merger Talks With Smaller Rival', ko: '비타파마, 소형 경쟁사와 합병 협상 돌입' },
      content: { en: 'VitaPharma has confirmed merger negotiations with BioNovex. Analysts are split: some see it as smart pipeline diversification, others warn of overextension and integration risk at a premium valuation.', ko: '비타파마가 바이오노벡스와의 합병 협상을 공식 확인했습니다. 애널리스트들은 의견이 엇갈립니다. 일부는 영리한 파이프라인 다각화로 보고, 다른 일부는 프리미엄 밸류에이션에서의 과잉 확장과 통합 리스크를 경고합니다.' },
      effect: 1.05,
    },
  },
  {
    id: 24,
    stock: {
      symbol: 'AERO',
      name: { en: 'AeroSpace Dynamics', ko: '에어로스페이스 다이내믹스' },
      price: 212,
      volatility: 0.06,
      description: { en: 'Aviation, aerospace manufacturing and defense.', ko: '항공·우주 제조 및 방위 산업.' },
    },
    news: {
      title: { en: 'AeroSpace Invests Heavily in Hypersonic Tech, Payoff Uncertain', ko: '에어로스페이스, 극초음속 기술에 대규모 투자… 수익성은 불투명' },
      content: { en: 'AeroSpace is pouring $6B into hypersonic missile R&D over the next five years. While defense experts see transformational potential, the technology remains unproven and burn rate concerns are rising.', ko: '에어로스페이스가 향후 5년간 극초음속 미사일 R&D에 60억 달러를 쏟아붓고 있습니다. 방산 전문가들은 변혁적 잠재력을 인정하지만, 기술은 아직 검증되지 않았고 현금 소진 속도에 대한 우려가 커지고 있습니다.' },
      effect: 1.03,
    },
  },
  {
    id: 25,
    stock: {
      symbol: 'ECOM',
      name: { en: 'GlobalMart E-Commerce', ko: '글로벌마트 이커머스' },
      price: 84,
      volatility: 0.04,
      description: { en: 'Worldwide retail and logistics giant.', ko: '전 세계적인 유통 및 물류 거인.' },
    },
    news: {
      title: { en: 'GlobalMart Launches Own Ad Network, Cuts Third-Party Deals', ko: '글로벌마트, 자체 광고 네트워크 출시하며 외부 광고 계약 축소' },
      content: { en: 'GlobalMart is pivoting to a first-party ad network, ending lucrative Google and Meta partnerships. The move could boost long-term margins but causes short-term revenue uncertainty during the transition.', ko: '글로벌마트가 자체 광고 네트워크로 전환하며 수익성 높은 구글·메타 파트너십을 종료합니다. 이 전환은 장기 마진 개선이 기대되지만 단기적인 매출 불확실성을 초래합니다.' },
      effect: 0.96,
    },
  },

  // --- EXTRA VARIETY ---
  {
    id: 26,
    stock: {
      symbol: 'TECH',
      name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
      price: 145,
      volatility: 0.05,
      description: { en: 'Leading AI and consumer electronics conglomerate.', ko: '인공지능·가전 분야의 선두 대기업.' },
    },
    news: {
      title: { en: 'NeoTech Partners With Top 3 Cloud Providers Simultaneously', ko: '네오테크, 클라우드 3사와 동시 파트너십 체결' },
      content: { en: 'In a stunning move, NeoTech announced strategic AI integration partnerships with AWS, Azure, and Google Cloud simultaneously. The deals guarantee minimum revenue of $3B per year for five years.', ko: '놀라운 행보로, 네오테크가 AWS, 애저, 구글 클라우드와 동시에 AI 통합 전략적 파트너십을 발표했습니다. 이 계약은 5년간 연간 최소 30억 달러의 매출을 보장합니다.' },
      effect: 1.15,
    },
  },
  {
    id: 27,
    stock: {
      symbol: 'HEALTH',
      name: { en: 'VitaPharma', ko: '비타파마' },
      price: 116,
      volatility: 0.03,
      description: { en: 'Pharmaceutical giant developing life-saving drugs.', ko: '생명을 구하는 신약을 개발하는 제약 대기업.' },
    },
    news: {
      title: { en: 'Congressional Hearing Targets VitaPharma Drug Pricing', ko: '의회 청문회, 비타파마 약가 인상 집중 조사' },
      content: { en: 'VitaPharma executives faced a hostile congressional hearing over drug pricing practices. Legislators are circulating a bill that could cap profits on its top five products, which represent 70% of revenue.', ko: '비타파마 경영진이 의약품 가격 책정 관행을 두고 적대적인 의회 청문회에 출석했습니다. 의원들이 매출의 70%를 차지하는 상위 5개 제품의 이익을 제한하는 법안을 검토 중입니다.' },
      effect: 0.83,
    },
  },
  {
    id: 28,
    stock: {
      symbol: 'AERO',
      name: { en: 'AeroSpace Dynamics', ko: '에어로스페이스 다이내믹스' },
      price: 218,
      volatility: 0.06,
      description: { en: 'Aviation, aerospace manufacturing and defense.', ko: '항공·우주 제조 및 방위 산업.' },
    },
    news: {
      title: { en: 'AeroSpace Reusable Rocket Launches Satellite Constellation', ko: '에어로스페이스 재사용 로켓, 위성 군집 발사 성공' },
      content: { en: 'AeroSpace Dynamics successfully launched 80 internet satellites in a single reusable rocket mission, halving the cost per launch. The commercial space division is now projected to be profitable ahead of schedule.', ko: '에어로스페이스 다이내믹스가 재사용 로켓 한 번의 임무로 80개의 인터넷 위성 발사에 성공하며 발사 비용을 절반으로 줄였습니다. 상업 우주 사업부가 예정보다 일찍 흑자 전환할 것으로 전망됩니다.' },
      effect: 1.17,
    },
  },
  {
    id: 29,
    stock: {
      symbol: 'ECOM',
      name: { en: 'GlobalMart E-Commerce', ko: '글로벌마트 이커머스' },
      price: 90,
      volatility: 0.04,
      description: { en: 'Worldwide retail and logistics giant.', ko: '전 세계적인 유통 및 물류 거인.' },
    },
    news: {
      title: { en: 'Trade War Tariffs Threaten GlobalMart\'s Asian Supply Chain', ko: '무역 전쟁 관세, 글로벌마트 아시아 공급망 타격 예고' },
      content: { en: 'New 45% tariffs on Asian imports are set to dramatically raise costs for GlobalMart, which sources 60% of its inventory from the region. Management has not yet announced a contingency plan.', ko: '새로운 아시아 수입품 45% 관세가 아시아 지역에서 재고의 60%를 조달하는 글로벌마트의 비용을 크게 높일 것으로 예상됩니다. 경영진은 아직 대응 계획을 발표하지 않았습니다.' },
      effect: 0.81,
    },
  },
  {
    id: 30,
    stock: {
      symbol: 'GREEN',
      name: { en: 'EcoEnergy Corp', ko: '에코에너지' },
      price: 50,
      volatility: 0.08,
      description: { en: 'Renewable energy and electric vehicle innovator.', ko: '재생에너지·전기차 혁신 기업.' },
    },
    news: {
      title: { en: 'EcoEnergy Solid-State Battery Breakthrough Verified by MIT', ko: 'MIT, 에코에너지 전고체 배터리 기술 혁신 검증' },
      content: { en: 'MIT researchers have independently verified EcoEnergy\'s solid-state battery claims: 2x energy density and 5-minute full charge. Auto industry insiders say this makes EcoEnergy\'s EV platform the clear front-runner.', ko: 'MIT 연구진이 에코에너지의 전고체 배터리 주장을 독립적으로 검증했습니다: 2배 에너지 밀도와 5분 완충. 자동차 업계 전문가들은 이로써 에코에너지의 전기차 플랫폼이 확실한 선두 주자가 됐다고 말합니다.' },
      effect: 1.25,
    },
  },
];
