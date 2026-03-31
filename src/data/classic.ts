import { News, Stock, StockSymbol } from '../types';
import { ClassicScenarioArc } from './classic-arcs';
import { TRADE_WAR_ARC } from './classic-arc-trade-war';
import { TECH_BUBBLE_ARC } from './classic-arc-tech-bubble';
import { ENERGY_CRISIS_ARC } from './classic-arc-energy-crisis';
import { AI_REGULATION_ARC } from './classic-arc-ai-regulation';
import { SPACE_RACE_ARC } from './classic-arc-space-race';
import { FINANCIAL_CRISIS_ARC } from './classic-arc-financial-crisis';
import { CLIMATE_SUMMIT_ARC } from './classic-arc-climate-summit';
import { CHIP_SHORTAGE_ARC } from './classic-arc-chip-shortage';
import { MEME_STOCK_ARC } from './classic-arc-meme-stock';
import { CRYPTO_MELTDOWN_ARC } from './classic-arc-crypto-meltdown';
import { SOVEREIGN_DEBT_ARC } from './classic-arc-sovereign-debt';
import { NUCLEAR_DISASTER_ARC } from './classic-arc-nuclear-disaster';
import { CURRENCY_CRISIS_ARC } from './classic-arc-currency-crisis';
import { OIL_PRICE_WAR_ARC } from './classic-arc-oil-price-war';
import { SUPPLY_CHAIN_SHOCK_ARC } from './classic-arc-supply-chain-shock';
import { RATE_HIKE_STORM_ARC } from './classic-arc-rate-hike-storm';
import { REAL_ESTATE_COLLAPSE_ARC } from './classic-arc-real-estate-collapse';
import { AVIATION_SAFETY_ARC } from './classic-arc-aviation-safety';
import { DOTCOM_CRASH_ARC } from './classic-arc-dotcom-crash';

export const CLASSIC_STOCKS: Record<StockSymbol, Stock> = {
  'TECH': {
    symbol: 'TECH',
    name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
    price: 150.00,
    previousPrice: 150.00,
    priceHistory: [],
    volatility: 0.05,
    description: {
      en: 'Leading technology conglomerate focusing on AI and consumer electronics.',
      ko: '인공지능과 가전 제품에 주력하는 선도적인 기술 대기업입니다.'
    },
  },
  'ECOM': {
    symbol: 'ECOM',
    name: { en: 'GlobalMart E-Commerce', ko: '글로벌마트 이커머스' },
    price: 85.50,
    previousPrice: 85.50,
    priceHistory: [],
    volatility: 0.03,
    description: {
      en: 'Worldwide retail and logistics giant.',
      ko: '전 세계적인 유통 및 물류 거인입니다.'
    },
  },
  'GREEN': {
    symbol: 'GREEN',
    name: { en: 'EcoEnergy Corp', ko: '에코에너지' },
    price: 45.20,
    previousPrice: 45.20,
    priceHistory: [],
    volatility: 0.08,
    description: {
      en: 'Innovative renewable energy solutions and electric vehicles.',
      ko: '혁신적인 재생 에너지 솔루션 및 전기 자동차 기업.'
    },
  },
  'HEALTH': {
    symbol: 'HEALTH',
    name: { en: 'VitaPharma', ko: '비타파마' },
    price: 120.00,
    previousPrice: 120.00,
    priceHistory: [],
    volatility: 0.02,
    description: {
      en: 'Established pharmaceutical company developing life-saving drugs.',
      ko: '생명을 구하는 신약을 개발하는 전통 있는 제약 회사입니다.'
    },
  },
  'AERO': {
    symbol: 'AERO',
    name: { en: 'AeroSpace Dynamics', ko: '에어로스페이스 다이내믹스' },
    price: 210.00,
    previousPrice: 210.00,
    priceHistory: [],
    volatility: 0.06,
    description: {
      en: 'Aviation and aerospace manufacturing and defense.',
      ko: '항공, 우주 항공 제조 및 방위 산업을 다룹니다.'
    },
  }
};

export const CLASSIC_NEWS: News[] = [
  // Day 1
  {
    id: '1-1', dayIdx: 1,
    title: { en: 'NeoTech Announces General AI Prototype', ko: '네오테크, 일반 인공지능(AGI) 프로토타입 발표' },
    content: { en: 'In a stunning press conference, NeoTech Industries revealed a breakthrough in artificial general intelligence. Experts predict this could revolutionize multiple industries.', ko: '놀라운 기자회견에서 네오테크가 범용 인공지능의 획기적인 발전을 공개했습니다. 전문가들은 이것이 여러 산업에 혁명을 일으킬 것이라고 예측합니다.' },
    read: false, effect: { 'TECH': 1.15, 'ECOM': 1.05 }
  },
  {
    id: '1-2', dayIdx: 1,
    title: { en: 'Government Considers Stricter AI Regulation', ko: '정부, 더 엄격한 AI 규제 방안 검토' },
    content: { en: 'Following recent AI advancements, lawmakers are proposing restrictive measures to ensure safety, causing concerns among tech investors.', ko: '최근 AI의 발전에 따라 입법자들이 안전장치 마련을 위한 규제 조치를 제안하고 있어 기술 투자자들의 우려가 커지고 있습니다.' },
    read: false, effect: { 'TECH': 0.95 }
  },
  {
    id: '1-3', dayIdx: 1,
    title: { en: 'EcoEnergy Hits Production Milestone', ko: '에코에너지 연간 생산 목표 달성' },
    content: { en: 'EcoEnergy Corp announced they have surpassed their quarterly production goals for their new solid-state batteries.', ko: '에코에너지는 신형 전고체 배터리의 분기별 생산 목표를 조기 초과 달성했다고 발표했습니다.' },
    read: false, effect: { 'GREEN': 1.08, 'AERO': 1.02 }
  },
  {
    id: '1-4', dayIdx: 1,
    title: { en: 'Global Supply Chain Issues Ease', ko: '글로벌 공급망 병목 현상 완화 조짐' },
    content: { en: 'Shipping costs have dropped significantly as major ports clear backlogs, a positive sign for retailers.', ko: '주요 항만의 물류 적체가 해소되면서 배송비가 크게 하락하여 유통업계에 긍정적인 신호로 해석됩니다.' },
    read: false, effect: { 'ECOM': 1.06, 'AERO': 1.01 }
  },
  {
    id: '1-5', dayIdx: 1,
    title: { en: 'Unusual Flu Strain Detected', ko: '새로운 유형의 독감 변이 발견' },
    content: { en: 'The CDC is monitoring a new, mild but highly contagious flu strain emerging in urban centers.', ko: '질병관리청은 주요 도시에서 확산 중인 치명률은 낮지만 전염성이 높은 새로운 독감 변이를 예의주시하고 있습니다.' },
    read: false, effect: { 'HEALTH': 1.04 }
  },

  // Day 2
  {
    id: '2-1', dayIdx: 2,
    title: { en: 'Tech Stocks See Huge Inflow', ko: '기술주에 대규모 자금 유입 지속' },
    content: { en: 'Investors continue to pile into NeoTech following their AGI announcement, despite regulatory fears.', ko: '규제 우려에도 불구하고 AGI 발표의 파급력 덕분에 투자자들이 네오테크에 계속해서 몰려들고 있습니다.' },
    read: false, effect: { 'TECH': 1.08, 'GREEN': 0.98 }
  },
  {
    id: '2-2', dayIdx: 2,
    title: { en: 'AeroSpace Secures Massive Defense Contract', ko: '에어로스페이스, 대규모 국방 계약 수주' },
    content: { en: 'The Department of Defense has awarded a multi-billion dollar contract to AeroSpace Dynamics for next-generation defense systems.', ko: '국방부가 차세대 방위 시스템 구축을 위해 에어로스페이스와 수십억 달러 규모의 계약을 체결했습니다.' },
    read: false, effect: { 'AERO': 1.12, 'TECH': 1.02 }
  },
  {
    id: '2-3', dayIdx: 2,
    title: { en: 'E-Commerce Giants Slashed Prices', ko: '이커머스 공룡들의 파격적인 가격 인하' },
    content: { en: 'GlobalMart has initiated a widespread price war to capture more market share, squeezing their profit margins short-term.', ko: '글로벌마트가 시장 점유율 확대를 위한 대대적인 치킨게임을 시작하며 단기적인 수익성 악화가 예상됩니다.' },
    read: false, effect: { 'ECOM': 0.92 }
  },
  {
    id: '2-4', dayIdx: 2,
    title: { en: 'Flu Cases Surge Unexpectedly', ko: '신종 독감 환자 예상 밖 급증' },
    content: { en: 'The previously monitored flu strain is spreading faster than anticipated, leading to increased demand for medical supplies.', ko: '관측 중이던 독감 바이러스가 예상보다 2배 이상 빠른 속도로 확산되며 의료 물자 수요가 급증하고 있습니다.' },
    read: false, effect: { 'HEALTH': 1.10, 'ECOM': 1.03 }
  },
  {
    id: '2-5', dayIdx: 2,
    title: { en: 'Senate Passes Renewable Subsidies Act', ko: '의회, 대규모 재생에너지 보조금 법안 통과' },
    content: { en: 'A new bill has been passed that will heavily subsidize domestic solar and wind energy projects.', ko: '태양광 및 풍력 발전 프로젝트에 천문학적인 보조금을 지급하는 새로운 법안이 최종 통과되었습니다.' },
    read: false, effect: { 'GREEN': 1.15 }
  },

  // Day 3
  {
    id: '3-1', dayIdx: 3,
    title: { en: 'Pandemic Fears Grip the Market', ko: '팬데믹 공포, 시장을 얼어붙게 하다' },
    content: { en: 'The WHO is considering declaring the new flu strain a global health emergency. Travel stocks are plunging.', ko: 'WHO가 새로운 독감에 대해 세계 공중보건 비상사태 선포를 검토 중입니다. 여행 관련 주가 폭락을 거듭하고 있습니다.' },
    read: false, effect: { 'AERO': 0.85, 'ECOM': 1.08, 'HEALTH': 1.15 }
  },
  {
    id: '3-2', dayIdx: 3,
    title: { en: 'NeoTech Reallocates AI to Medical Research', ko: '네오테크, AGI 자원을 의학 연구로 전면 전환' },
    content: { en: 'In a PR triumph, NeoTech is partnering with VitaPharma to use their new AGI to map the flu virus.', ko: '네오테크가 비타파마와 파트너십을 맺고 AGI를 활용해 독감 바이러스 구조 파악에 나섰으며, 이는 엄청난 호응을 얻고 있습니다.' },
    read: false, effect: { 'TECH': 1.05, 'HEALTH': 1.05 }
  },
  {
    id: '3-3', dayIdx: 3,
    title: { en: 'Supply Chains Disrupted Again', ko: '독감 확산으로 글로벌 공급망 다시 마비 위기' },
    content: { en: 'Factories are reporting high absenteeism due to the flu, causing production delays globally.', ko: '전 세계 주요 공장들이 독감으로 인한 대규모 결근 사태를 겪으며 글로벌 생산 차질이 발생하고 있습니다.' },
    read: false, effect: { 'ECOM': 0.95, 'TECH': 0.96 }
  },
  {
    id: '3-4', dayIdx: 3,
    title: { en: 'Green Energy Funds See Outflows', ko: '친환경 펀드에서 대규모 자금 유출 발생' },
    content: { en: 'Investors are pulling money from speculative green energy stocks to seek safe havens in healthcare and defense.', ko: '투자자들이 불안정한 환경 규제주에서 돈을 빼내 헬스케어와 방위 산업 등 안전 자산으로 피신하고 있습니다.' },
    read: false, effect: { 'GREEN': 0.90 }
  },
  {
    id: '3-5', dayIdx: 3,
    title: { en: 'VitaPharma Announces Vaccine Trial', ko: '비타파마, 신종 독감 백신 임상시험 개시' },
    content: { en: 'Human trials have already begun for a promising vaccine candidate against the new strain.', ko: '새로운 변이에 대한 매우 유망한 백신 후보 물질의 인체 대상 임상시험이 기록적인 속도로 시작되었습니다.' },
    read: false, effect: { 'HEALTH': 1.12 }
  },

  // Day 4
  {
    id: '4-1', dayIdx: 4,
    title: { en: 'Vaccine Shows 95% Efficacy', ko: '신규 백신, 95% 예방 효과 입증' },
    content: { en: 'VitaPharma\'s vaccine trial results are overwhelmingly positive, sparking a massive market rally.', ko: '비타파마의 백신 임상 결과가 압도적으로 긍정적으로 나오면서 시장에 엄청난 랠리가 시작되었습니다.' },
    read: false, effect: { 'HEALTH': 1.08, 'AERO': 1.15, 'ECOM': 1.05 }
  },
  {
    id: '4-2', dayIdx: 4,
    title: { en: 'Return to Normalcy Accelerates', ko: '일상으로의 복귀 움직임 급물살' },
    content: { en: 'Governments are planning to lift all temporary health restrictions next week.', ko: '각국 정부가 다음 주 안에 임시로 시행되었던 모든 보건 규제를 해제할 계획이라고 발표했습니다.' },
    read: false, effect: { 'AERO': 1.10, 'TECH': 1.04, 'GREEN': 1.05 }
  },
  {
    id: '4-3', dayIdx: 4,
    title: { en: 'NeoTech AI Proves Crucial in Discovery', ko: '네오테크의 AGI 백신 발견에 핵심적인 역할' },
    content: { en: 'The rapid vaccine development was largely credited to NeoTech\'s computing power.', ko: '전문가들은 이처럼 전례 없이 빠른 백신 개발이 네오테크의 압도적인 AI 연산력 덕분이라고 분석했습니다.' },
    read: false, effect: { 'TECH': 1.10 }
  },
  {
    id: '4-4', dayIdx: 4,
    title: { en: 'E-commerce Bubble Bursts?', ko: '이커머스 거품, 드디어 터지다?' },
    content: { en: 'With people returning to physical stores, online retail projections are being revised downward.', ko: '사람들이 다시 오프라인 매장으로 돌아가면서, 온라인 유통의 실적 전망치가 연달아 하향 조정되고 있습니다.' },
    read: false, effect: { 'ECOM': 0.88 }
  },
  {
    id: '4-5', dayIdx: 4,
    title: { en: 'AeroSpace Secures Commercial Jet Order', ko: '에어로스페이스, 대규모 여객기 주문 수주' },
    content: { en: 'A major airline has placed a historic order for new jets in anticipation of a travel boom.', ko: '주요 항공사가 다가올 여행 붐을 선제적으로 대응하기 위해 에어로스페이스에 역대급 규모의 새 여객기를 주문했습니다.' },
    read: false, effect: { 'AERO': 1.08 }
  },

  // Day 5
  {
    id: '5-1', dayIdx: 5,
    title: { en: 'Markets Stabilize After Wild Week', ko: '폭풍 같았던 한 주 후 폭넓은 시장 안정화' },
    content: { en: 'Volatility is finally decreasing as the economy adjusts to the post-flu reality.', ko: '경제가 독감 사태 이후의 새로운 국면에 적응하면서 마침내 시장의 변동성이 잦아들고 있습니다.' },
    read: false, effect: { 'ECOM': 1.02, 'TECH': 1.01 }
  },
  {
    id: '5-2', dayIdx: 5,
    title: { en: 'Green Energy Sector Mergers Rumored', ko: '친환경 에너지 부문 대규모 인수합병설 솔솔' },
    content: { en: 'Consolidation is expected in the renewable sector as smaller companies struggled during the recent volatility.', ko: '최근의 격동기 동안 큰 타격을 입은 중소형 재생에너지 기업들을 상대로 한 인수합병이 임박했다는 소문이 돌고 있습니다.' },
    read: false, effect: { 'GREEN': 1.06 }
  },
  {
    id: '5-3', dayIdx: 5,
    title: { en: 'VitaPharma Posts Record Earnings', ko: '비타파마, 역대 최고치 분기 실적 발표' },
    content: { en: 'The pharmaceutical giant has destroyed Q3 estimates following their massive vaccine sales.', ko: '이 거대 제약 회사는 전 세계적인 백신 판매에 힘입어 3분기 실적 전망치를 말 그대로 박살 내버렸습니다.' },
    read: false, effect: { 'HEALTH': 1.05 }
  },
  {
    id: '5-4', dayIdx: 5,
    title: { en: 'Tech Regulation Bill Stalls', ko: '의회 AI 규제 법안 의사당 문턱 못 넘어' },
    content: { en: 'Congress has delayed voting on the AI regulation bill indefinitely, a huge win for NeoTech.', ko: '의회가 AI 규제 법안 표결을 무기한 연기하면서, 네오테크는 큰 잠재적 위기를 성공적으로 넘겼습니다.' },
    read: false, effect: { 'TECH': 1.06 }
  },
  {
    id: '5-5', dayIdx: 5,
    title: { en: 'Economic Optimism Reaches Yearly High', ko: '경제 낙관지수, 연중 최고치 돌파' },
    content: { en: 'Consumer confidence surveys show massive optimism for the coming year.', ko: '최신 소비자 신뢰 지수 조사에서 다가올 새해에 대한 경제주체들의 엄청난 낙관론이 감지되었습니다.' },
    read: false, effect: { 'AERO': 1.03, 'ECOM': 1.04 }
  },
];

export const PANDEMIC_ARC: ClassicScenarioArc = {
  id: 'pandemic',
  name: { en: 'Pandemic', ko: '팬데믹' },
  news: CLASSIC_NEWS,
};

export const CLASSIC_ARCS: ClassicScenarioArc[] = [
  PANDEMIC_ARC,
  TRADE_WAR_ARC,
  TECH_BUBBLE_ARC,
  ENERGY_CRISIS_ARC,
  AI_REGULATION_ARC,
  SPACE_RACE_ARC,
  FINANCIAL_CRISIS_ARC,
  CLIMATE_SUMMIT_ARC,
  CHIP_SHORTAGE_ARC,
  MEME_STOCK_ARC,
  CRYPTO_MELTDOWN_ARC,
  SOVEREIGN_DEBT_ARC,
  NUCLEAR_DISASTER_ARC,
  CURRENCY_CRISIS_ARC,
  OIL_PRICE_WAR_ARC,
  SUPPLY_CHAIN_SHOCK_ARC,
  RATE_HIKE_STORM_ARC,
  REAL_ESTATE_COLLAPSE_ARC,
  AVIATION_SAFETY_ARC,
  DOTCOM_CRASH_ARC,
];
