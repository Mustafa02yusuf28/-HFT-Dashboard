'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Order {
  price: number;
  size: number;
  total: number;
}

// Header styling
const HeaderCell = styled(TableCell)(({ theme }) => ({
  color: '#20C7FF',
  fontSize: '0.65rem',
  fontWeight: 600,
  padding: '4px 8px',
  textTransform: 'uppercase',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  fontFamily: '"JetBrains Mono", monospace',
  '&.bid-header': {
    textAlign: 'right',
  },
  '&.ask-header': {
    textAlign: 'left',
  }
}));

// Value cells styling
const StyledCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.75rem',
  fontFamily: '"JetBrains Mono", monospace',
  padding: '2px 8px',
  height: '24px',
  lineHeight: '24px',
  color: 'white',
  backgroundColor: 'transparent',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  '&.bid': { 
    color: '#00FF9F',
    textAlign: 'right',
  },
  '&.ask': { 
    color: '#FF3366',
    textAlign: 'left',
  },
  '&.size': {
    color: 'rgba(255,255,255,0.7)',
  }
}));

const DepthRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== '$bidDepth' && prop !== '$askDepth',
})<{ $bidDepth: number; $askDepth: number }>(({ $bidDepth, $askDepth }) => ({
  position: 'relative',
  backgroundColor: '#131722',
  height: '24px',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  '&::before': {
    left: '50%',
    transform: 'translateX(-100%)',
    width: `${$bidDepth}%`,
    backgroundColor: 'rgba(0,255,159,0.12)',
  },
  '&::after': {
    left: '50%',
    width: `${$askDepth}%`,
    backgroundColor: 'rgba(255,51,102,0.12)',
  },
}));

export default function OrderBook() {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);

  useEffect(() => {
    const generateData = () => {
      const base = 100;
      const newBids: Order[] = [];
      const newAsks: Order[] = [];
      for (let i = 0; i < 10; i++) {
        const bidSize = +(Math.random() * 10).toFixed(4);
        const askSize = +(Math.random() * 10).toFixed(4);
        const bidPrice = +(base - (i + 1) * 0.1).toFixed(3);
        const askPrice = +(base + (i + 1) * 0.1).toFixed(3);

        newBids.push({ price: bidPrice, size: bidSize, total: bidSize * bidPrice });
        newAsks.push({ price: askPrice, size: askSize, total: askSize * askPrice });
      }
      setBids(newBids);
      setAsks(newAsks);
    };

    generateData();
    const interval = setInterval(generateData, 1000);
    return () => clearInterval(interval);
  }, []);

  const maxTotal = Math.max(
    ...bids.map(b => b.total),
    ...asks.map(a => a.total)
  );

  return (
    <Box sx={{ backgroundColor: '#131722', borderRadius: '6px', overflow: 'hidden' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <Typography sx={{ color: '#20C7FF', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
          Orderbook
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
          {asks[0]?.price.toFixed(2)}
        </Typography>
      </Box>

      {/* Headers Table */}
      <Table size="small" sx={{ 
        width: '100%', 
        tableLayout: 'fixed',
        marginBottom: '-1px',
      }}>
        <TableHead>
          <TableRow>
            <HeaderCell className="bid-header">BID SIZE</HeaderCell>
            <HeaderCell className="bid-header">BID PRICE</HeaderCell>
            <HeaderCell className="ask-header">ASK PRICE</HeaderCell>
            <HeaderCell className="ask-header">ASK SIZE</HeaderCell>
          </TableRow>
        </TableHead>
      </Table>

      {/* Values Table */}
      <Table size="small" sx={{ 
        width: '100%', 
        tableLayout: 'fixed',
      }}>
        <TableBody>
          {Array.from({ length: Math.max(bids.length, asks.length) }).map((_, i) => {
            const bid = bids[i];
            const ask = asks[i];
            const bidDepth = bid ? (bid.total / maxTotal) * 100 : 0;
            const askDepth = ask ? (ask.total / maxTotal) * 100 : 0;

            return (
              <DepthRow key={i} $bidDepth={bidDepth} $askDepth={askDepth}>
                <StyledCell className="size bid">{bid?.size.toFixed(4)}</StyledCell>
                <StyledCell className="bid">{bid?.price.toFixed(3)}</StyledCell>
                <StyledCell className="ask">{ask?.price.toFixed(3)}</StyledCell>
                <StyledCell className="size ask">{ask?.size.toFixed(4)}</StyledCell>
              </DepthRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
