import React from 'react';
import { 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { DayPrice } from '../types';

interface StockChartProps {
  data: DayPrice[];
}

const formatDateFromOffset = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data: DayPrice = payload[0].payload;
    const isUp = data.close >= data.open;
    const color = isUp ? '#10b981' : '#ef4444'; // positive or negative color

    return (
      <div className="chart-tooltip" style={{
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        border: `1px solid ${color}`,
        padding: '10px',
        borderRadius: '8px',
        color: '#e2e8f0',
        fontSize: '0.85rem'
      }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{formatDateFromOffset(Number(label))}</p>
        <p style={{ margin: 0 }}>Open:  <span style={{color}}>${data.open.toFixed(2)}</span></p>
        <p style={{ margin: 0 }}>Close: <span style={{color}}>${data.close.toFixed(2)}</span></p>
        <p style={{ margin: 0 }}>High:  <span style={{color}}>${data.high.toFixed(2)}</span></p>
        <p style={{ margin: 0 }}>Low:   <span style={{color}}>${data.low.toFixed(2)}</span></p>
      </div>
    );
  }
  return null;
};

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  // Recharts doesn't have a native Candlestick chart, but we can simulate it
  // using a ComposedChart with two ErrorBars or a custom shape.
  // The simplest reliable way in Recharts without external complex plugins
  // is to use a Bar chart where we define a custom shape for the candle.
  
  const prepareData = data.map(d => {
    const isUp = d.close >= d.open;
    return {
      ...d,
      isUp,
      // For standard bar body
      bottom: Math.min(d.open, d.close),
      top: Math.max(d.open, d.close),
      // To trick Recharts into placing the bar correctly we use an array for Y values
      candleBody: [Math.min(d.open, d.close), Math.max(d.open, d.close)]
    };
  });

  // Calculate Y-axis domain
  const minLow = Math.min(...data.map(d => d.low));
  const maxHigh = Math.max(...data.map(d => d.high));
  const buffer = (maxHigh - minLow) * 0.1;

  const CustomCandle = (props: any) => {
    const {
      x, y, width, height,
      low, high,
      isUp
    } = props;

    // In some Recharts versions, yAxis and scale might not be available
    // on the custom shape props natively without explicit configuration or
    // during initial render.
    // We can use the fact that 'y' and 'height' give us the pixel coordinates
    // for the main body (Math.max(open, close) and Math.min(open, close)).
    //
    // The total value range of the chart is [domainMin, domainMax].
    // The height of the drawing area is determined by the Cartesian bounds, 
    // but the easiest way to find the pixel Y for a value is to interpolate
    // relative to the known pixels (y, height) and data values (top, bottom).
    
    const topVal = Math.max(props.open, props.close);
    const bottomVal = Math.min(props.open, props.close);
    
    let highY = y;
    let lowY = y + height;

    if (topVal !== bottomVal) {
      // Pixels per unit value
      const pixelsPerValue = height / (topVal - bottomVal);
      highY = y - (high - topVal) * pixelsPerValue;
      lowY = (y + height) + (bottomVal - low) * pixelsPerValue;
    }

    const color = isUp ? '#10b981' : '#ef4444';
    const fill = color; // Fill both green and red candles with their respective solid colors
    
    // The main body coordinates
    const rectX = x;
    const rectY = y;
    const rectWidth = width;
    const rectHeight = height === 0 ? 1 : height; // Ensure at least 1px height if open === close
    
    // Center line X
    const lineX = x + width / 2;

    return (
      <g>
        {/* Wick (High to Low line) */}
        <line x1={lineX} y1={highY} x2={lineX} y2={lowY} stroke={color} strokeWidth={2} />
        {/* Candle Body */}
        <rect x={rectX} y={rectY} width={rectWidth} height={rectHeight} fill={fill} stroke={color} strokeWidth={2} />
      </g>
    );
  };

  return (
    <div style={{ width: '100%', height: '250px', marginTop: '1rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={prepareData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            tickLine={false} 
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }} 
            tickFormatter={(value) => formatDateFromOffset(Number(value))}
          />
          <YAxis 
            domain={[Math.max(0, minLow - buffer), maxHigh + buffer]} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '5 5' }} 
          />
          <Bar 
            dataKey="candleBody" 
            shape={<CustomCandle />} 
            isAnimationActive={false} // Disable animation to prevent visual glitches on rerender
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
