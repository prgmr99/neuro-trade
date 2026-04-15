import type { Stock, News } from '../types';

export const FUTURES_STOCKS: Record<string, Stock> = {
  TECH: {
    symbol: 'TECH',
    name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
    price: 150.00,
    previousPrice: 150.00,
    priceHistory: [],
    volatility: 0.18,
    description: { en: 'High-growth semiconductor & AI chipmaker.', ko: '고성장 반도체 및 AI 칩 제조사.' },
  },
  ECOM: {
    symbol: 'ECOM',
    name: { en: 'GlobalCart', ko: '글로벌카트' },
    price: 85.50,
    previousPrice: 85.50,
    priceHistory: [],
    volatility: 0.15,
    description: { en: 'Dominant e-commerce and logistics platform.', ko: '주요 전자상거래 및 물류 플랫폼.' },
  },
  GREEN: {
    symbol: 'GREEN',
    name: { en: 'EcoEnergy', ko: '에코에너지' },
    price: 45.20,
    previousPrice: 45.20,
    priceHistory: [],
    volatility: 0.22,
    description: { en: 'Renewable energy generation and storage.', ko: '재생에너지 발전 및 저장 기업.' },
  },
  HEALTH: {
    symbol: 'HEALTH',
    name: { en: 'MedCore', ko: '메드코어' },
    price: 120.00,
    previousPrice: 120.00,
    priceHistory: [],
    volatility: 0.14,
    description: { en: 'Biotech and pharmaceutical research leader.', ko: '바이오테크 및 제약 연구 선도 기업.' },
  },
  AERO: {
    symbol: 'AERO',
    name: { en: 'SkyDynamics', ko: '스카이다이나믹스' },
    price: 210.00,
    previousPrice: 210.00,
    priceHistory: [],
    volatility: 0.20,
    description: { en: 'Aerospace and defense technology manufacturer.', ko: '항공우주 및 방위산업 기술 제조사.' },
  },
};

export const FUTURES_FALLBACK_NEWS: News[] = [
  // Day 1: Positive news — lures players into leveraged long positions
  {
    id: 'f-1-1',
    dayIdx: 1,
    title: { en: 'NeoTech Announces Record AI Chip Orders', ko: '네오테크, 사상 최대 AI 칩 수주 발표' },
    content: { en: 'NeoTech secured $12B in AI chip orders from three major cloud providers. Analysts predict strong earnings beat next quarter.', ko: '네오테크가 주요 클라우드 기업 3곳으로부터 120억 달러 규모의 AI 칩을 수주했다. 애널리스트들은 다음 분기 실적 상회를 전망한다.' },
    read: false,
    effect: { TECH: 1.08, ECOM: 1.02 },
  },
  {
    id: 'f-1-2',
    dayIdx: 1,
    title: { en: 'Global Markets Rally on Fed Rate Pause', ko: '연준 금리 동결에 글로벌 증시 랠리' },
    content: { en: 'Federal Reserve signals a prolonged pause in rate hikes, boosting risk assets across the board.', ko: '미 연준이 금리 인상 장기 중단을 시사하며 위험자산 전반에 매수세가 유입됐다.' },
    read: false,
    effect: { TECH: 1.03, ECOM: 1.03, GREEN: 1.04, HEALTH: 1.02, AERO: 1.03 },
  },
  // Day 2: Shock reversal — triggers liquidations for 10x/20x longs
  {
    id: 'f-2-1',
    dayIdx: 2,
    title: { en: 'BREAKING: Major Supply Chain Disruption Hits Tech Sector', ko: '속보: 대규모 공급망 위기, 테크 섹터 강타' },
    content: { en: 'A critical semiconductor plant fire in Taiwan has halted 30% of global chip production. NeoTech warns of shipment delays and revised guidance.', ko: '대만의 핵심 반도체 공장 화재로 글로벌 칩 생산의 30%가 중단됐다. 네오테크는 출하 지연과 실적 전망 하향을 경고했다.' },
    read: false,
    effect: { TECH: 0.88, ECOM: 0.90, AERO: 0.92 },
  },
  {
    id: 'f-2-2',
    dayIdx: 2,
    title: { en: 'Institutional Investors Dump Risk Assets', ko: '기관 투자자들, 위험자산 대거 매도' },
    content: { en: 'Panic selling spreads across markets as institutional investors rapidly de-risk their portfolios following the supply chain shock.', ko: '공급망 충격 이후 기관들이 포트폴리오 리스크를 급격히 축소하며 패닉 매도세가 번졌다.' },
    read: false,
    effect: { TECH: 0.94, ECOM: 0.93, GREEN: 0.94, HEALTH: 0.96, AERO: 0.93 },
  },
  // Day 3: Partial recovery — false hope
  {
    id: 'f-3-1',
    dayIdx: 3,
    title: { en: 'NeoTech: Alternative Suppliers Found, Partial Recovery', ko: '네오테크: 대체 공급업체 확보, 부분 회복' },
    content: { en: "NeoTech identified alternative chip suppliers in South Korea and Germany. However, full capacity won't resume for 6-8 weeks, limiting upside.", ko: '네오테크가 한국과 독일에서 대체 칩 공급업체를 확보했다. 단, 완전한 생산 정상화까지 6~8주가 걸려 상승폭은 제한적이다.' },
    read: false,
    effect: { TECH: 1.05, ECOM: 1.03 },
  },
  {
    id: 'f-3-2',
    dayIdx: 3,
    title: { en: "EcoEnergy Struggles: Subsidy Cuts Loom", ko: '에코에너지 위기: 보조금 삭감 임박' },
    content: { en: "Government energy subsidies face 40% cuts in the new budget proposal, threatening EcoEnergy's expansion plans.", ko: '신규 예산안에서 정부 에너지 보조금이 40% 삭감될 예정이어서 에코에너지의 확장 계획에 차질이 우려된다.' },
    read: false,
    effect: { GREEN: 0.86 },
  },
  // Day 4: Macro shock — hits everyone, traps those who went long on recovery
  {
    id: 'f-4-1',
    dayIdx: 4,
    title: { en: 'Recession Fears Spike: PMI Data Crashes to 3-Year Low', ko: '경기침체 공포 급등: PMI 지수 3년 최저' },
    content: { en: 'Manufacturing PMI collapsed to 43.2, signaling contraction. Analysts slash Q3 earnings forecasts for all sectors.', ko: '제조업 PMI가 43.2로 급락하며 경기 수축을 신호한다. 애널리스트들이 전 섹터 3분기 실적 전망을 대폭 하향했다.' },
    read: false,
    effect: { TECH: 0.91, ECOM: 0.89, GREEN: 0.87, HEALTH: 0.92, AERO: 0.88 },
  },
  {
    id: 'f-4-2',
    dayIdx: 4,
    title: { en: 'Credit Markets Freeze: Banks Tighten Lending', ko: '신용시장 경색: 은행들 대출 긴축' },
    content: { en: 'Major banks announce emergency tightening of credit standards. Margin lending rates spike, triggering cascading liquidations in leveraged positions.', ko: '주요 은행들이 긴급 신용기준 강화를 발표했다. 마진 대출 금리가 급등하며 레버리지 포지션의 연쇄 청산이 촉발됐다.' },
    read: false,
    effect: { TECH: 0.94, ECOM: 0.93, HEALTH: 0.95, AERO: 0.91 },
  },
  // Day 5: Wild volatility — unpredictable, most leveraged positions destroyed
  {
    id: 'f-5-1',
    dayIdx: 5,
    title: { en: 'Emergency Fed Meeting: Surprise Rate Cut', ko: '긴급 연준 회의: 전격 금리 인하' },
    content: { en: 'The Fed called an emergency meeting and cut rates by 75bps. Markets whipsaw violently as shorts scramble to cover.', ko: '연준이 긴급회의를 열고 75bp 금리를 전격 인하했다. 숏 커버링이 쇄도하며 시장이 급격히 반등했다.' },
    read: false,
    effect: { TECH: 1.11, ECOM: 1.09, GREEN: 1.13, HEALTH: 1.07, AERO: 1.10 },
  },
  {
    id: 'f-5-2',
    dayIdx: 5,
    title: { en: 'But Wait — Inflation Data Surges, Rate Cut May Be Short-Lived', ko: '그러나 인플레이션 데이터 급등, 금리 인하 단명 우려' },
    content: { en: 'Hours after the rate cut, surprise CPI data showed 8.2% inflation — raising doubts the Fed can sustain the dovish stance. Markets give back gains.', ko: '금리 인하 수 시간 후, 예상치 못한 CPI 데이터가 8.2% 인플레이션을 보여줬다. 연준의 완화 기조 유지 가능성에 의구심이 제기되며 시장이 상승분을 반납했다.' },
    read: false,
    effect: { TECH: 0.93, ECOM: 0.94, GREEN: 0.91, HEALTH: 0.96, AERO: 0.92 },
  },
];

export const FUTURES_CONFIG = {
  maxDays: 5,
  startingCash: 10000,
  leverageOptions: [10, 25, 50, 75, 100, 125] as const,
  maxLeverage: 125,
  fundingRatePerDay: 0.0009, // 0.09% per day (roughly 0.03% per 8hrs)
} as const;

export const FUTURES_LEVERAGE_OPTIONS = [10, 25, 50, 75, 100, 125] as const;
