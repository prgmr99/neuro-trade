import { useEffect, useState } from 'react';

export interface TradeToastData {
  id: number;
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  totalAmount: number;
  cashAfter: number;
}

interface Props {
  toast: TradeToastData;
  onDismiss: (id: number) => void;
}

export default function TradeToast({ toast, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = requestAnimationFrame(() => setVisible(true));
    const fadeTimer = setTimeout(() => setVisible(false), 2200);
    const dismissTimer = setTimeout(() => onDismiss(toast.id), 2600);

    return () => {
      cancelAnimationFrame(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss, toast.id]);

  const isBuy = toast.type === 'buy';

  return (
    <div className={`trade-toast ${visible ? 'visible' : ''} ${isBuy ? 'trade-toast-buy' : 'trade-toast-sell'}`} role="status" aria-live="polite">
      <span className="trade-toast-icon">{isBuy ? '📈' : '📉'}</span>
      <div className="trade-toast-body">
        <span className="trade-toast-action">
          {isBuy ? 'BUY' : 'SELL'} {toast.symbol}
        </span>
        <span className="trade-toast-detail">
          {toast.quantity} shares &middot; ${toast.totalAmount.toFixed(2)}
        </span>
        <span className="trade-toast-balance">
          Balance: ${toast.cashAfter.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
