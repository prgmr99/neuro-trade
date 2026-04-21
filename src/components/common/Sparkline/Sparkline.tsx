import React from 'react';

interface SparklineProps {
  points: number[];
  width?: number;
  height?: number;
  isUp: boolean;
  ariaLabel?: string;
}

export const Sparkline: React.FC<SparklineProps> = React.memo(function Sparkline({
  points,
  width = 40,
  height = 16,
  isUp,
  ariaLabel,
}) {
  if (points.length < 2) return null;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const color = isUp ? 'var(--positive)' : 'var(--negative)';

  return (
    <svg
      width={width}
      height={height}
      className="sparkline"
      role="img"
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
