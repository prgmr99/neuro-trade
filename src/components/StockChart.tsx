import React, { useMemo } from 'react';
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
import { DayPrice } from '../types';

type ChartType = 'candle' | 'line';

interface StockChartProps {
  data: DayPrice[];
  chartType?: ChartType;
}

// Korean finance convention: red = up, blue = down (matches CSS vars)
const COLORS = {
  positive: '#f04452',
  negative: '#3182f6',
  sma: '#a78bfa',
  grid: 'rgba(0, 0, 0, 0.04)',
  axis: '#8b95a1',
  refLine: '#8b95a1',
  areaFill: 'url(#priceGradient)',
};

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = payload[0].payload as any;
  const isUp = data.close >= data.open;
  const color = isUp ? COLORS.positive : COLORS.negative;
  const changePercent = data.open > 0 ? ((data.close - data.open) / data.open * 100) : 0;

  return (
    <div style={{
      background: '#ffffff',
      border: `1px solid ${color}`,
      padding: '12px 14px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      fontSize: '0.8rem',
      lineHeight: 1.7,
      minWidth: '140px',
    }}>
      <div style={{ fontWeight: 700, marginBottom: '6px', color: '#191f28', fontSize: '0.85rem' }}>
        {formatDateFromOffset(Number(label))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 10px' }}>
        <span style={{ color: '#8b95a1' }}>Open</span>
        <span style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${data.open.toFixed(2)}</span>
        <span style={{ color: '#8b95a1' }}>High</span>
        <span style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${data.high.toFixed(2)}</span>
        <span style={{ color: '#8b95a1' }}>Low</span>
        <span style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${data.low.toFixed(2)}</span>
        <span style={{ color: '#8b95a1' }}>Close</span>
        <span style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color }}>${data.close.toFixed(2)}</span>
      </div>
      <div style={{
        marginTop: '6px',
        paddingTop: '6px',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ color: '#8b95a1', fontSize: '0.75rem' }}>Change</span>
        <span style={{ fontWeight: 700, color, fontSize: '0.85rem' }}>
          {isUp ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
      </div>
      {data.sma != null && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
          <span style={{ color: '#8b95a1', fontSize: '0.75rem' }}>SMA(5)</span>
          <span style={{ fontWeight: 600, color: COLORS.sma, fontSize: '0.8rem', fontVariantNumeric: 'tabular-nums' }}>
            ${data.sma.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

// Recharts injects these props at runtime via the custom shape API
const CustomCandle = (props: Record<string, number | boolean>) => {
  const x = props.x as number;
  const y = props.y as number;
  const width = props.width as number;
  const height = props.height as number;
  const low = props.low as number;
  const high = props.high as number;
  const isUp = props.isUp as boolean;
  const open = props.open as number;
  const close = props.close as number;
  const topVal = Math.max(open, close);
  const bottomVal = Math.min(open, close);

  let highY = y;
  let lowY = y + height;

  if (topVal !== bottomVal) {
    const pixelsPerValue = height / (topVal - bottomVal);
    highY = y - (high - topVal) * pixelsPerValue;
    lowY = (y + height) + (bottomVal - low) * pixelsPerValue;
  }

  const color = isUp ? COLORS.positive : COLORS.negative;
  const rectHeight = height === 0 ? 1 : height;
  const lineX = x + width / 2;

  return (
    <g>
      <line x1={lineX} y1={highY} x2={lineX} y2={lowY} stroke={color} strokeWidth={1.5} />
      <rect
        x={x}
        y={y}
        width={width}
        height={rectHeight}
        fill={isUp ? color : color}
        stroke={color}
        strokeWidth={1}
        rx={1}
        ry={1}
      />
    </g>
  );
};

const StockChart: React.FC<StockChartProps> = ({ data, chartType = 'candle' }) => {
  const { preparedData, minLow, maxHigh, currentPrice } = useMemo(() => {
    const smaValues = calculateSMA(data, 5);

    const prepared = data.map((d, i) => {
      const isUp = d.close >= d.open;
      return {
        ...d,
        isUp,
        candleBody: [Math.min(d.open, d.close), Math.max(d.open, d.close)] as [number, number],
        sma: smaValues[i],
      };
    });

    const low = Math.min(...data.map(d => d.low));
    const high = Math.max(...data.map(d => d.high));

    return {
      preparedData: prepared,
      minLow: low,
      maxHigh: high,
      currentPrice: data.length > 0 ? data[data.length - 1].close : 0,
    };
  }, [data]);

  const buffer = (maxHigh - minLow) * 0.12;
  const isLatestUp = data.length >= 2 && data[data.length - 1].close >= data[data.length - 2].close;
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
            cursor={{ stroke: 'rgba(0, 0, 0, 0.08)', strokeWidth: 1, strokeDasharray: '4 4' }}
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

          {chartType === 'candle' ? (
            <Bar
              dataKey="candleBody"
              shape={<CustomCandle />}
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
