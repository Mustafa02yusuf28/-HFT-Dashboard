'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Bar,
} from 'recharts';

interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const TIME_RANGES = {
  '1H': 60 * 60 * 1000,
  '4H': 4 * 60 * 60 * 1000,
  '1D': 24 * 60 * 60 * 1000,
};

const CANDLE_INTERVALS = {
  '1H': 60 * 1000, // 1 minute candles for 1H
  '4H': 5 * 60 * 1000, // 5 minute candles for 4H
  '1D': 15 * 60 * 1000, // 15 minute candles for 1D
};

const VISIBLE_CANDLES = 50; // Number of candles visible at once

const formatPrice = (value: number) => value.toFixed(2);
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString()}`;
};

// Price movement parameters
const TREND_CHANGE_PROBABILITY = 0.1;
const BASE_VOLATILITY = 0.001;
const MAX_TREND = 0.002;

// Custom Candlestick component
const Candlestick = ({ data, index, x, y, width }: any) => {
  const isUp = data.close >= data.open;
  const color = isUp ? '#00ff9f' : '#ff3366';
  const bodyHeight = Math.max(1, Math.abs(y(data.close) - y(data.open)));
  const bodyY = y(Math.max(data.open, data.close));
  const wickY1 = y(data.high);
  const wickY2 = y(data.low);
  const candleWidth = 6;
  const xCenter = x + width / 2;

  return (
    <g>
      {/* Wick */}
      <line
        x1={xCenter}
        y1={wickY1}
        x2={xCenter}
        y2={wickY2}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={xCenter - candleWidth / 2}
        y={bodyY}
        width={candleWidth}
        height={bodyHeight}
        fill={color}
        stroke={color}
      />
    </g>
  );
};

export default function TradingChart() {
  const [data, setData] = useState<CandleData[]>([]);
  const [timeRange, setTimeRange] = useState<keyof typeof TIME_RANGES>('1H');
  const [currentPrice, setCurrentPrice] = useState<number>(100);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  
  const trendRef = useRef(0);
  const lastPriceRef = useRef(100);
  const historicalDataRef = useRef<CandleData[]>([]);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Initialize historical data
    const now = Date.now();
    const startTime = now - TIME_RANGES[timeRange];
    const initialData: CandleData[] = [];
    const candleInterval = CANDLE_INTERVALS[timeRange];
    const numCandles = TIME_RANGES[timeRange] / candleInterval;
    
    // Generate initial candles
    for (let i = 0; i < numCandles; i++) {
      const timestamp = startTime + i * candleInterval;
      
      // Update trend
      if (Math.random() < TREND_CHANGE_PROBABILITY) {
        trendRef.current = (Math.random() - 0.5) * 2 * MAX_TREND;
      }

      // Generate OHLC data
      const basePrice = i === 0 ? 100 : initialData[i - 1].close;
      const trend = trendRef.current;
      const volatility = BASE_VOLATILITY;
      
      const open = basePrice;
      const numPricePoints = 10; // Simulate multiple price points within the candle
      let high = open;
      let low = open;
      let close = open;
      
      // Simulate price movement within the candle
      for (let j = 0; j < numPricePoints; j++) {
        const priceChange = (Math.random() - 0.5) * 2 * volatility + trend;
        const price = basePrice * (1 + priceChange);
        high = Math.max(high, price);
        low = Math.min(low, price);
        close = price;
      }

      const volume = Math.random() * 100 + 50;

      initialData.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume,
      });
    }

    historicalDataRef.current = initialData;
    lastPriceRef.current = initialData[initialData.length - 1].close;
    setData(initialData.slice(-VISIBLE_CANDLES));
    setCurrentPrice(lastPriceRef.current);

    // Update data periodically
    const updateInterval = setInterval(() => {
      const now = Date.now();
      
      // Update trend
      if (Math.random() < TREND_CHANGE_PROBABILITY) {
        trendRef.current = (Math.random() - 0.5) * 2 * MAX_TREND;
      }

      // Create new candle
      const basePrice = lastPriceRef.current;
      const trend = trendRef.current;
      const volatility = BASE_VOLATILITY;
      
      const open = basePrice;
      let high = open;
      let low = open;
      let close = open;
      
      // Simulate price movement within the candle
      for (let j = 0; j < 10; j++) {
        const priceChange = (Math.random() - 0.5) * 2 * volatility + trend;
        const price = basePrice * (1 + priceChange);
        high = Math.max(high, price);
        low = Math.min(low, price);
        close = price;
      }

      const volume = Math.random() * 100 + 50;

      const newCandle: CandleData = {
        timestamp: now,
        open,
        high,
        low,
        close,
        volume,
      };

      // Update historical data
      const newData = [...historicalDataRef.current.slice(1), newCandle];
      historicalDataRef.current = newData;
      lastPriceRef.current = close;

      // Calculate price range for visible candles
      const visibleData = newData.slice(-VISIBLE_CANDLES);
      const allPrices = visibleData.flatMap(d => [d.high, d.low]);
      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      const padding = (maxPrice - minPrice) * 0.1;

      setPriceRange({
        min: minPrice - padding,
        max: maxPrice + padding,
      });

      setData(visibleData);
      setCurrentPrice(close);
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [timeRange]);

  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeRange: keyof typeof TIME_RANGES,
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          p: 1.5,
          fontSize: '12px',
        }}>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {new Date(label).toLocaleString()}
          </div>
          <div style={{ color: '#fff', marginTop: '8px' }}>
            <div>O: <span style={{ color: '#00ff9f' }}>${formatPrice(data.open)}</span></div>
            <div>H: <span style={{ color: '#00ff9f' }}>${formatPrice(data.high)}</span></div>
            <div>L: <span style={{ color: '#00ff9f' }}>${formatPrice(data.low)}</span></div>
            <div>C: <span style={{ color: '#00ff9f' }}>${formatPrice(data.close)}</span></div>
            <div style={{ marginTop: '8px' }}>
              Vol: <span style={{ color: '#00ff9f' }}>{Math.round(data.volume)}</span>
            </div>
          </div>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 1,
        px: 1,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <Typography sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            fontWeight: 500,
          }}>
            BTC/USD
          </Typography>
          <Typography sx={{ 
            color: currentPrice > lastPriceRef.current ? '#00ff9f' : '#ff3366',
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}>
            ${formatPrice(currentPrice)}
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              px: 2,
              py: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 255, 159, 0.1)',
                color: '#00ff9f',
                fontWeight: 600,
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            },
          }}
        >
          {Object.keys(TIME_RANGES).map((range) => (
            <ToggleButton key={range} value={range}>
              {range}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ 
        flex: 1, 
        minHeight: 0,
        width: '100%',
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={data} 
            margin={{ top: 5, right: 55, bottom: 5, left: 5 }}
            ref={chartRef}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255, 255, 255, 0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              stroke="rgba(255, 255, 255, 0.5)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 11 }}
              minTickGap={50}
              dy={10}
            />
            <YAxis
              domain={[priceRange.min, priceRange.max]}
              tickFormatter={formatPrice}
              stroke="rgba(255, 255, 255, 0.5)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 11 }}
              width={50}
              tickCount={10}
              orientation="right"
              dx={0}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="volume"
              orientation="left"
              tickFormatter={(value) => `${value.toFixed(0)}`}
              stroke="rgba(255, 255, 255, 0.5)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 11 }}
              width={45}
              tickCount={4}
              domain={[0, 'dataMax']}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={100}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeDasharray="3 3"
            />
            <Bar
              dataKey="volume"
              yAxisId="volume"
              shape={(props: any) => {
                const { x, y, width, height } = props;
                const data = props.payload;
                const color = data.close >= data.open ? '#00ff9f' : '#ff3366';
                return (
                  <rect
                    x={x + width / 2 - 3}
                    y={y}
                    width={6}
                    height={height}
                    fill={color}
                    fillOpacity={0.2}
                  />
                );
              }}
              isAnimationActive={false}
            />
            {data.map((entry, index) => {
              const isUp = entry.close >= entry.open;
              const color = isUp ? '#00ff9f' : '#ff3366';
              
              const chartWidth = chartRef.current?.width || 0;
              const chartHeight = chartRef.current?.height || 0;
              
              if (chartWidth === 0 || chartHeight === 0 || !data.length) {
                return null;
              }
              
              const candleSpacing = chartWidth / data.length;
              const xPos = candleSpacing * index;
              const candleWidth = Math.min(6, candleSpacing * 0.8);
              
              const yRange = priceRange.max - priceRange.min;
              if (yRange === 0) return null;
              
              const yScale = (value: number) => {
                if (typeof value !== 'number') return 0;
                const scale = chartHeight / yRange;
                return chartHeight - scale * (value - priceRange.min);
              };
              
              const highY = yScale(entry.high);
              const lowY = yScale(entry.low);
              const openY = yScale(entry.open);
              const closeY = yScale(entry.close);
              
              if ([highY, lowY, openY, closeY].some(y => isNaN(y))) {
                return null;
              }
              
              const xCenter = xPos + candleSpacing / 2;
              
              return (
                <g key={`candle-${index}`}>
                  <line
                    x1={xCenter}
                    y1={highY}
                    x2={xCenter}
                    y2={lowY}
                    stroke={color}
                    strokeWidth={1}
                  />
                  <rect
                    x={xCenter - candleWidth / 2}
                    y={Math.min(openY, closeY)}
                    width={candleWidth}
                    height={Math.max(1, Math.abs(closeY - openY))}
                    fill={color}
                    stroke={color}
                  />
                </g>
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
} 