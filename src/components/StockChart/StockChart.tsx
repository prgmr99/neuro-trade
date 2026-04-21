import React, { useMemo, useState, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from 'recharts';
import type { BarShapeProps } from 'recharts/types/cartesian/Bar';
import { DayPrice } from '../../types';
import './StockChart.css';


type ChartType = 'candle' | 'line';

export interface StockChartOverlay {
  value: number;
  label: string;
  kind: 'entry' | 'liq';
  direction?: 'long' | 'short';
}

interface StockChartProps {
  data: DayPrice[];
  chartType?: ChartType;
  overlays?: StockChartOverlay[];
  /**
   * Optional in-progress candle to append at the right edge of the chart.
   * During Futures Next-Day animation the orchestrator sets this per frame so
   * a live candle grows alongside the price tween. Cleared (undefined) once
   * the tween resolves and nextDay() pushes its permanent candle.
   */
  liveCandle?: DayPrice;
}

/**
 * Reads a CSS custom property from :root and returns the resolved value.
 * Recharts SVG primitives require real color strings (not `var(--x)`), so we
 * resolve at render time. Inside Vitest/SSR `window` is undefined so we fall
 * back to static Toss palette values.
 */
const cssVar = (name: string, fallback: string): string => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

/**
 * Hook that returns an incrementing key whenever `[data-theme]` or `class`
 * on <html> changes, so COLORS can be recomputed after dark-mode toggles.
 */
function useThemeKey(): number {
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      setKey(k => k + 1);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
    return () => observer.disconnect();
  }, []);
  return key;
}

const formatDateFromOffset = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const calculateSMA = (data: { close: number }[], period: number): (number | null)[] => {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    return slice.reduce((sum, d) => sum + d.close, 0) / period;
  });
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ payload: ReturnType<typeof Object> }>; label?: string | number }) => {
  if (!active || !payload?.length) return null;

  // Tooltip renders only when active, so calling cssVar here is fine perf-wise
  // and guarantees correct colors after dark-mode toggles.
  const positive  = cssVar('--positive', '#f04452');
  const negative  = cssVar('--negative', '#3182f6');
  const surface   = cssVar('--surface-color', '#ffffff');
  const textPri   = cssVar('--text-primary', '#191f28');
  const textSec   = cssVar('--text-secondary', '#6b7684');
  const border    = cssVar('--border-color', 'rgba(0,0,0,0.08)');
  const smaColor  = cssVar('--accent-color', '#3182f6');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = payload[0].payload as any;
  const isUp = data.close >= data.open;
  const color = isUp ? positive : negative;
  const changePercent = data.open > 0 ? ((data.close - data.open) / data.open * 100) : 0;

  return (
    <div style={{
      background: surface,
      border: `1px solid ${color}`,
      padding: '12px 14px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      fontSize: '0.8rem',
      lineHeight: 1.7,
      minWidth: '140px',
    }}>
      <div style={{ fontWeight: 700, marginBottom: '6px', color: textPri, fontSize: '0.85rem' }}>
        {formatDateFromOffset(Number(label))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 10px' }}>
        <span style={{ color: textSec }}>Open</span>
        <span style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: textPri }}>${data.open.toFixed(2)}</span>
        <span style={{ color: textSec }}>High</span>
        <span style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: textPri }}>${data.high.toFixed(2)}</span>
        <span style={{ color: textSec }}>Low</span>
        <span style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: textPri }}>${data.low.toFixed(2)}</span>
        <span style={{ color: textSec }}>Close</span>
        <span style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color }}>${data.close.toFixed(2)}</span>
      </div>
      <div style={{
        marginTop: '6px',
        paddingTop: '6px',
        borderTop: `1px solid ${border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ color: textSec, fontSize: '0.75rem' }}>Change</span>
        <span style={{ fontWeight: 700, color, fontSize: '0.85rem' }}>
          {isUp ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
      </div>
      {data.sma != null && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
          <span style={{ color: textSec, fontSize: '0.75rem' }}>SMA(5)</span>
          <span style={{ fontWeight: 600, color: smaColor, fontSize: '0.8rem', fontVariantNumeric: 'tabular-nums' }}>
            ${data.sma.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

// Recharts injects these props at runtime via the custom shape API.
// `colors` is threaded in via the Bar's `shape` prop closure so we don't
// rely on a module-level COLORS object that would be stale after theme change.
type ColorsMap = {
  positive: string;
  negative: string;
  sma: string;
  grid: string;
  axis: string;
  refLine: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  danger: string;
  areaFill: string;
};

interface CustomCandleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  low: number;
  high: number;
  isUp: boolean;
  open: number;
  close: number;
  isLive?: boolean;
  colors: ColorsMap;
}

const CustomCandle = (props: BarShapeProps & { colors?: ColorsMap }) => {
  const x = (props.x as number | undefined) ?? 0;
  const y = (props.y as number | undefined) ?? 0;
  const width = (props.width as number | undefined) ?? 0;
  const height = (props.height as number | undefined) ?? 0;
  // low/high/isUp/open/close/isLive live on the data payload injected by Recharts
  const payload = props as unknown as CustomCandleProps;
  const low = payload.low ?? 0;
  const high = payload.high ?? 0;
  const isUp = payload.isUp ?? false;
  const open = payload.open ?? 0;
  const close = payload.close ?? 0;
  const isLive = payload.isLive ?? false;
  const colors = props.colors;

  const topVal = Math.max(open, close);
  const bottomVal = Math.min(open, close);

  let highY = y;
  let lowY = y + height;

  if (topVal !== bottomVal) {
    const pixelsPerValue = height / (topVal - bottomVal);
    highY = y - (high - topVal) * pixelsPerValue;
    lowY = (y + height) + (bottomVal - low) * pixelsPerValue;
  }

  const positive = colors?.positive ?? '#f04452';
  const negative = colors?.negative ?? '#3182f6';
  const color = isUp ? positive : negative;
  const rectHeight = height === 0 ? 1 : height;
  const lineX = x + width / 2;

  if (isLive) {
    return (
      <g className="live-candle-body">
        <line x1={lineX} y1={highY} x2={lineX} y2={lowY} stroke={color} strokeWidth={1.5} strokeOpacity={1} />
        <rect
          x={x}
          y={y}
          width={width}
          height={rectHeight}
          fill={color}
          fillOpacity={0.55}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="3 2"
          rx={1}
          ry={1}
        />
      </g>
    );
  }

  return (
    <g>
      <line x1={lineX} y1={highY} x2={lineX} y2={lowY} stroke={color} strokeWidth={1.5} />
      <rect
        x={x}
        y={y}
        width={width}
        height={rectHeight}
        fill={color}
        stroke={color}
        strokeWidth={1}
        rx={1}
        ry={1}
      />
    </g>
  );
};

const StockChart: React.FC<StockChartProps> = ({ data, chartType = 'candle', overlays, liveCandle }) => {
  const themeKey = useThemeKey();

  // Korean finance convention: red = up, blue = down. Recomputed on theme change.
  const COLORS = useMemo(() => ({
    positive: cssVar('--positive', '#f04452'),
    negative: cssVar('--negative', '#3182f6'),
    sma: cssVar('--accent-color', '#3182f6'),
    grid: cssVar('--border-color', 'rgba(0, 0, 0, 0.08)'),
    axis: cssVar('--text-secondary', '#6b7684'),
    refLine: cssVar('--text-secondary', '#6b7684'),
    surface: cssVar('--surface-color', '#ffffff'),
    textPrimary: cssVar('--text-primary', '#191f28'),
    textSecondary: cssVar('--text-secondary', '#6b7684'),
    border: cssVar('--border-color', 'rgba(0, 0, 0, 0.08)'),
    danger: cssVar('--danger', '#ff3b30'),
    areaFill: 'url(#priceGradient)',
  }), [themeKey]);

  const { preparedData, minLow, maxHigh, currentPrice } = useMemo(() => {
    // Append the in-progress candle at the right edge. SMA and extrema are
    // computed on the combined array so axis/domain/overlay math stay coherent.
    const combinedData = liveCandle ? [...data, liveCandle] : data;
    const smaValues = calculateSMA(combinedData, 5);
    const lastIdx = combinedData.length - 1;

    const prepared = combinedData.map((d, i) => {
      const isUp = d.close >= d.open;
      return {
        ...d,
        isUp,
        candleBody: [Math.min(d.open, d.close), Math.max(d.open, d.close)] as [number, number],
        sma: smaValues[i],
        isLive: liveCandle != null && i === lastIdx,
      };
    });

    const low = Math.min(...combinedData.map(d => d.low));
    const high = Math.max(...combinedData.map(d => d.high));

    return {
      preparedData: prepared,
      minLow: low,
      maxHigh: high,
      currentPrice: combinedData.length > 0 ? combinedData[combinedData.length - 1].close : 0,
    };
  }, [data, liveCandle]);

  const buffer = (maxHigh - minLow) * 0.12;
  const isLatestUp = preparedData.length >= 2 && preparedData[preparedData.length - 1].close >= preparedData[preparedData.length - 2].close;
  const refLineColor = isLatestUp ? COLORS.positive : COLORS.negative;

  return (
    <div className="stock-chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={preparedData} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.positive} stopOpacity={0.15} />
              <stop offset="100%" stopColor={COLORS.positive} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={COLORS.grid}
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: COLORS.axis, fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatDateFromOffset(Number(value))}
          />
          <YAxis
            domain={[Math.max(0, minLow - buffer), maxHigh + buffer]}
            tick={{ fill: COLORS.axis, fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${Number(value).toFixed(0)}`}
            width={45}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: COLORS.border, strokeWidth: 1, strokeDasharray: '4 4' }}
            trigger="click"
          />

          {/* Current price reference line */}
          {currentPrice > 0 && (
            <ReferenceLine
              y={currentPrice}
              stroke={refLineColor}
              strokeDasharray="6 3"
              strokeWidth={1}
              strokeOpacity={0.5}
              label={{
                value: `$${currentPrice.toFixed(0)}`,
                position: 'right',
                fill: refLineColor,
                fontSize: 10,
                fontWeight: 600,
              }}
            />
          )}

          {/* Position overlays: entry + liquidation lines */}
          {overlays?.map((o, idx) => {
            const stroke = o.kind === 'liq' ? COLORS.danger : COLORS.textPrimary;
            const dash = o.kind === 'liq' ? '2 2' : '5 3';
            const opacity = o.kind === 'liq' ? 0.7 : 0.5;
            return (
              <ReferenceLine
                key={`${o.kind}-${o.direction ?? 'n'}-${idx}`}
                y={o.value}
                stroke={stroke}
                strokeDasharray={dash}
                strokeWidth={1}
                strokeOpacity={opacity}
                label={{
                  value: o.label,
                  position: 'left',
                  fill: stroke,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
            );
          })}

          {/* Now-line: vertical indicator at live candle position */}
          {liveCandle && (
            <ReferenceLine
              x={liveCandle.day}
              stroke={COLORS.positive}
              strokeDasharray="2 3"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
          )}

          {chartType === 'candle' ? (
            <Bar
              dataKey="candleBody"
              shape={(shapeProps: BarShapeProps) => (
                <CustomCandle {...shapeProps} colors={COLORS} />
              )}
              isAnimationActive={false}
            />
          ) : (
            <Area
              type="monotone"
              dataKey="close"
              stroke={COLORS.positive}
              strokeWidth={2}
              fill={COLORS.areaFill}
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* 5-day SMA line */}
          <Line
            type="monotone"
            dataKey="sma"
            stroke={COLORS.sma}
            strokeWidth={1.5}
            dot={false}
            connectNulls={false}
            isAnimationActive={false}
            strokeDasharray="4 2"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
