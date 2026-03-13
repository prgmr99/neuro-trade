import { News, Stock, StockSymbol } from '../types';

export const INITIAL_STOCKS: Record<StockSymbol, Stock> = {
  'TECH': {
    symbol: 'TECH',
    name: 'NeoTech Industries',
    price: 150.00,
    previousPrice: 150.00,
    volatility: 0.05,
    description: 'Leading technology conglomerate focusing on AI and consumer electronics.',
  },
  'ECOM': {
    symbol: 'ECOM',
    name: 'GlobalMart E-Commerce',
    price: 85.50,
    previousPrice: 85.50,
    volatility: 0.03,
    description: 'Worldwide retail and logistics giant.',
  },
  'GREEN': {
    symbol: 'GREEN',
    name: 'EcoEnergy Corp',
    price: 45.20,
    previousPrice: 45.20,
    volatility: 0.08,
    description: 'Innovative renewable energy solutions and electric vehicles.',
  },
  'HEALTH': {
    symbol: 'HEALTH',
    name: 'VitaPharma',
    price: 120.00,
    previousPrice: 120.00,
    volatility: 0.02,
    description: 'Established pharmaceutical company developing life-saving drugs.',
  },
  'AERO': {
    symbol: 'AERO',
    name: 'AeroSpace Dynamics',
    price: 210.00,
    previousPrice: 210.00,
    volatility: 0.06,
    description: 'Aviation and aerospace manufacturing and defense.',
  }
};

export const SCENARIO_NEWS: News[] = [
  // Day 1: AI Breakthrough News
  { id: '1-1', dayIdx: 1, title: 'NeoTech Announces General AI Prototype', content: 'In a stunning press conference, NeoTech Industries revealed a breakthrough in artificial general intelligence. Experts predict this could revolutionize multiple industries.', read: false, effect: { 'TECH': 1.15, 'ECOM': 1.05 } },
  { id: '1-2', dayIdx: 1, title: 'Government Considers Stricter AI Regulation', content: 'Following recent AI advancements, lawmakers are proposing restrictive measures to ensure safety, causing concerns among tech investors.', read: false, effect: { 'TECH': 0.95 } },
  { id: '1-3', dayIdx: 1, title: 'EcoEnergy Hits Production Milestone', content: 'EcoEnergy Corp announced they have surpassed their quarterly production goals for their new solid-state batteries.', read: false, effect: { 'GREEN': 1.08, 'AERO': 1.02 } },
  { id: '1-4', dayIdx: 1, title: 'Global Supply Chain Issues Ease', content: 'Shipping costs have dropped significantly as major ports clear backlogs, a positive sign for retailers.', read: false, effect: { 'ECOM': 1.06, 'AERO': 1.01 } },
  { id: '1-5', dayIdx: 1, title: 'Unusual Flu Strain Detected', content: 'The CDC is monitoring a new, mild but highly contagious flu strain emerging in urban centers.', read: false, effect: { 'HEALTH': 1.04 } },

  // Day 2: Market Reaction to Day 1
  { id: '2-1', dayIdx: 2, title: 'Tech Stocks See Huge Inflow', content: 'Investors continue to pile into NeoTech following their AGI announcement, despite regulatory fears.', read: false, effect: { 'TECH': 1.08, 'GREEN': 0.98 } },
  { id: '2-2', dayIdx: 2, title: 'AeroSpace Secures Massive Defense Contract', content: 'The Department of Defense has awarded a multi-billion dollar contract to AeroSpace Dynamics for next-generation defense systems.', read: false, effect: { 'AERO': 1.12, 'TECH': 1.02 } },
  { id: '2-3', dayIdx: 2, title: 'E-Commerce Giants Slashed Prices', content: 'GlobalMart has initiated a widespread price war to capture more market share, squeezing their profit margins short-term.', read: false, effect: { 'ECOM': 0.92 } },
  { id: '2-4', dayIdx: 2, title: 'Flu Cases Surge Unexpectedly', content: 'The previously monitored flu strain is spreading faster than anticipated, leading to increased demand for medical supplies.', read: false, effect: { 'HEALTH': 1.10, 'ECOM': 1.03 } },
  { id: '2-5', dayIdx: 2, title: 'Senate Passes Renewable Subsidies Act', content: 'A new bill has been passed that will heavily subsidize domestic solar and wind energy projects.', read: false, effect: { 'GREEN': 1.15 } },

  // Day 3: Flu escalates
  { id: '3-1', dayIdx: 3, title: 'Pandemic Fears Grip the Market', content: 'The WHO is considering declaring the new flu strain a global health emergency. Travel stocks are plunging.', read: false, effect: { 'AERO': 0.85, 'ECOM': 1.08, 'HEALTH': 1.15 } },
  { id: '3-2', dayIdx: 3, title: 'NeoTech Reallocates AI to Medical Research', content: 'In a PR triumph, NeoTech is partnering with VitaPharma to use their new AGI to map the flu virus.', read: false, effect: { 'TECH': 1.05, 'HEALTH': 1.05 } },
  { id: '3-3', dayIdx: 3, title: 'Supply Chains Disrupted Again', content: 'Factories are reporting high absenteeism due to the flu, causing production delays globally.', read: false, effect: { 'ECOM': 0.95, 'TECH': 0.96 } },
  { id: '3-4', dayIdx: 3, title: 'Green Energy Funds See Outflows', content: 'Investors are pulling money from speculative green energy stocks to seek safe havens in healthcare and defense.', read: false, effect: { 'GREEN': 0.90 } },
  { id: '3-5', dayIdx: 3, title: 'VitaPharma Announces Vaccine Trial', content: 'Human trials have already begun for a promising vaccine candidate against the new strain.', read: false, effect: { 'HEALTH': 1.12 } },

  // Day 4: Resolution signs
  { id: '4-1', dayIdx: 4, title: 'Vaccine Shows 95% Efficacy', content: 'VitaPharma’s vaccine trial results are overwhelmingly positive, sparking a massive market rally.', read: false, effect: { 'HEALTH': 1.08, 'AERO': 1.15, 'ECOM': 1.05 } },
  { id: '4-2', dayIdx: 4, title: 'Return to Normalcy Accelerates', content: 'Governments are planning to lift all temporary health restrictions next week.', read: false, effect: { 'AERO': 1.10, 'TECH': 1.04, 'GREEN': 1.05 } },
  { id: '4-3', dayIdx: 4, title: 'NeoTech AI Proves Crucial in Discovery', content: 'The rapid vaccine development was largely credited to NeoTech\'s computing power.', read: false, effect: { 'TECH': 1.10 } },
  { id: '4-4', dayIdx: 4, title: 'E-commerce Bubble Bursts?', content: 'With people returning to physical stores, online retail projections are being revised downward.', read: false, effect: { 'ECOM': 0.88 } },
  { id: '4-5', dayIdx: 4, title: 'AeroSpace Secures Commercial Jet Order', content: 'A major airline has placed a historic order for new jets in anticipation of a travel boom.', read: false, effect: { 'AERO': 1.08 } },

  // Day 5: Final Day Wrap up
  { id: '5-1', dayIdx: 5, title: 'Markets Stabilize After Wild Week', content: 'Volatility is finally decreasing as the economy adjusts to the post-flu reality.', read: false, effect: { 'ECOM': 1.02, 'TECH': 1.01 } },
  { id: '5-2', dayIdx: 5, title: 'Green Energy Sector Mergers Rumored', content: 'Consolidation is expected in the renewable sector as smaller companies struggled during the recent volatility.', read: false, effect: { 'GREEN': 1.06 } },
  { id: '5-3', dayIdx: 5, title: 'VitaPharma Posts Record Earnings', content: 'The pharmaceutical giant has destroyed Q3 estimates following their massive vaccine sales.', read: false, effect: { 'HEALTH': 1.05 } },
  { id: '5-4', dayIdx: 5, title: 'Tech Regulation Bill Stalls', content: 'Congress has delayed voting on the AI regulation bill indefinitely, a huge win for NeoTech.', read: false, effect: { 'TECH': 1.06 } },
  { id: '5-5', dayIdx: 5, title: 'Economic Optimism Reaches Yearly High', content: 'Consumer confidence surveys show massive optimism for the coming year.', read: false, effect: { 'AERO': 1.03, 'ECOM': 1.04 } },
];
