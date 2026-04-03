import { Stock, StockSymbol } from '../../types';

export const ADVANCED_STOCKS: Record<StockSymbol, Stock> = {
  'TECH': {
    symbol: 'TECH',
    name: { en: 'NeoTech Industries', ko: '네오테크 산업' },
    price: 150.00,
    previousPrice: 150.00,
    priceHistory: [],
    volatility: 0.08,
    resilience: 0.15,
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
    volatility: 0.06,
    resilience: 0.20,
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
    volatility: 0.12,
    resilience: 0,
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
    volatility: 0.05,
    resilience: 0.25,
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
    volatility: 0.10,
    resilience: 0.15,
    description: {
      en: 'Aviation and aerospace manufacturing and defense.',
      ko: '항공, 우주 항공 제조 및 방위 산업을 다룹니다.'
    },
  },
  'BANK': {
    symbol: 'BANK',
    name: { en: 'Meridian Financial', ko: '메리디안 파이낸셜' },
    price: 95.00,
    previousPrice: 95.00,
    priceHistory: [],
    volatility: 0.07,
    resilience: 0.20,
    description: {
      en: 'Major commercial bank with global investment banking and wealth management divisions.',
      ko: '글로벌 투자은행 및 자산관리 부문을 갖춘 대형 상업은행입니다.'
    },
  },
  'MEDIA': {
    symbol: 'MEDIA',
    name: { en: 'StreamVerse', ko: '스트림버스' },
    price: 65.00,
    previousPrice: 65.00,
    priceHistory: [],
    volatility: 0.11,
    resilience: 0.05,
    description: {
      en: 'Leading digital media and streaming entertainment platform with original content production.',
      ko: '오리지널 콘텐츠 제작을 겸비한 선도적인 디지털 미디어 및 스트리밍 엔터테인먼트 플랫폼.'
    },
  },
  'FOOD': {
    symbol: 'FOOD',
    name: { en: 'HarvestGlobal', ko: '하베스트글로벌' },
    price: 40.00,
    previousPrice: 40.00,
    priceHistory: [],
    volatility: 0.06,
    resilience: 0.20,
    description: {
      en: 'Integrated agriculture and food processing corporation spanning farm-to-table supply chains.',
      ko: '농장에서 식탁까지 공급망을 아우르는 종합 농업 및 식품 가공 기업입니다.'
    },
  },
  'CRYPTO': {
    symbol: 'CRYPTO',
    name: { en: 'ChainLink Digital', ko: '체인링크 디지털' },
    price: 30.00,
    previousPrice: 30.00,
    priceHistory: [],
    volatility: 0.18,
    resilience: 0,
    description: {
      en: 'Blockchain infrastructure and digital asset exchange with DeFi protocol development.',
      ko: '블록체인 인프라 및 디지털 자산 거래소로 DeFi 프로토콜 개발을 선도합니다.'
    },
  },
  'REALTY': {
    symbol: 'REALTY',
    name: { en: 'MetroLand Properties', ko: '메트로랜드 부동산' },
    price: 180.00,
    previousPrice: 180.00,
    priceHistory: [],
    volatility: 0.07,
    resilience: 0.15,
    description: {
      en: 'Premier real estate investment trust with commercial and residential portfolios in major cities.',
      ko: '주요 도시의 상업용 및 주거용 부동산 포트폴리오를 보유한 대표적인 리츠(REITs) 기업입니다.'
    },
  },
};
