import React, { useMemo } from 'react';
import './RollingNumber.css';

interface RollingNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  className?: string;
  ariaLabel?: string;
}

interface RollingDigitProps {
  digit: number;
}

/**
 * Single digit 0–9 that vertically translates to simulate an odometer roll.
 * Uses CSS custom property `--rolling-digit` consumed in RollingNumber.css.
 * `prefers-reduced-motion` disables the transition at the stylesheet level.
 */
const RollingDigit: React.FC<RollingDigitProps> = React.memo(({ digit }) => {
  return (
    <span
      className="rolling-digit"
      style={{ '--rolling-digit': digit } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="rolling-digit-track">
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </span>
    </span>
  );
});

RollingDigit.displayName = 'RollingDigit';

/**
 * Odometer-style number display. Each decimal digit animates with a
 * vertical translate; non-digit characters (prefix, decimal point,
 * negative sign) are rendered as static spans.
 *
 * The full number is exposed to assistive tech through `ariaLabel`
 * (defaults to the formatted value) while visual DOM is aria-hidden.
 */
export const RollingNumber: React.FC<RollingNumberProps> = ({
  value,
  decimals = 2,
  prefix = '',
  className = '',
  ariaLabel,
}) => {
  const { sign, bodyPrefix, chars } = useMemo(() => {
    const isNeg = value < 0;
    const abs = Math.abs(value);
    const formatted = abs.toFixed(decimals);
    return {
      sign: isNeg ? '-' : '',
      bodyPrefix: prefix,
      chars: formatted.split(''),
    };
  }, [value, decimals, prefix]);

  const spoken =
    ariaLabel ??
    `${sign}${bodyPrefix}${Math.abs(value).toFixed(decimals)}`;

  return (
    <span className={`rolling-number ${className}`.trim()} aria-label={spoken} role="text">
      <span aria-hidden="true" className="rolling-number-visual">
        {sign && <span className="rolling-static">{sign}</span>}
        {bodyPrefix && <span className="rolling-static">{bodyPrefix}</span>}
        {chars.map((ch, i) => {
          const n = Number(ch);
          if (!Number.isNaN(n) && ch !== ' ') {
            return <RollingDigit key={i} digit={n} />;
          }
          return (
            <span key={i} className="rolling-static">
              {ch}
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default RollingNumber;
