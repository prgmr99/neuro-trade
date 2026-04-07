const TICKER_ITEMS = [
  { symbol: 'TECH', change: '+2.3%', positive: true },
  { symbol: 'ECOM', change: '-1.1%', positive: false },
  { symbol: 'GREEN', change: '+5.7%', positive: true },
  { symbol: 'HEALTH', change: '+0.8%', positive: true },
  { symbol: 'AERO', change: '-3.2%', positive: false },
  { symbol: 'BANK', change: '+1.5%', positive: true },
  { symbol: 'ENERGY', change: '-0.6%', positive: false },
  { symbol: 'FOOD', change: '+4.1%', positive: true },
];

export default function MarketTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="market-ticker-wrapper">
      <div className="market-ticker-track">
        {items.map((item, i) => (
          <span key={i} className="market-ticker-item">
            <span className="market-ticker-symbol">{item.symbol}</span>
            <span className={item.positive ? 'market-ticker-up' : 'market-ticker-down'}>
              {item.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
