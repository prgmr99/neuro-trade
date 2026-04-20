import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useFuturesStore } from '../../store/futuresStore';
import { useTranslation } from '../../i18n/translations';
import { useDisplayPrice } from '../../hooks/useDisplayPrice';
import { RollingNumber } from '../common/RollingNumber/RollingNumber';

interface StockRowProps {
  symbol: string;
  isSelected: boolean;
  onClick: () => void;
  compact?: boolean;
}

/**
 * Memoized row for a single symbol. Subscribes ONLY to `stocks[symbol]` plus
 * the display price for this symbol — other symbols' price changes do not
 * trigger this row to re-render.
 *
 * NOTE: `stocks[symbol]` is an immer-produced object reference; because the
 * committed futures state only changes at `nextDay()` (once per game day),
 * re-render pressure stays low. The display price is what ticks during the
 * tween animation, and it's subscribed as a primitive (number), so Zustand's
 * shallow equality correctly avoids re-rendering other rows.
 */
export const StockRow = React.memo(function StockRow({
  symbol,
  isSelected,
  onClick,
  compact,
}: StockRowProps) {
  const { language } = useTranslation();
  const stock = useFuturesStore((s) => s.stocks[symbol]);
  const displayPrice = useDisplayPrice(symbol);

  if (!stock) return null;

  const previousPrice = stock.previousPrice;
  const change = displayPrice - previousPrice;
  const pctChange = previousPrice > 0 ? (change / previousPrice) * 100 : 0;
  const isUp = change >= 0;

  return (
    <button
      type="button"
      className={`stock-item${isSelected ? ' selected' : ''}${compact ? '' : ''}`}
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`${symbol} ${stock.name[language]}`}
    >
      <div className="stock-item-left">
        <span className="stock-item-symbol">{symbol}</span>
        <span className="stock-item-name">{stock.name[language]}</span>
      </div>
      <div className={`stock-item-right ${isUp ? 'positive' : 'negative'}`}>
        <RollingNumber
          className="stock-item-price"
          value={displayPrice}
          decimals={2}
          prefix="$"
        />
        <span className="stock-item-change">
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isUp ? '+' : ''}
          {pctChange.toFixed(2)}%
        </span>
      </div>
    </button>
  );
});
