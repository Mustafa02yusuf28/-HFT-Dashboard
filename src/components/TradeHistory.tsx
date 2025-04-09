'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Trade {
  time: string;
  type: 'BUY' | 'SELL';
  price: number;
  size: number;
  pnl: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  borderBottom: '1px solid rgba(32, 199, 255, 0.08)',
  fontSize: '0.75rem',
  fontFamily: '"JetBrains Mono", monospace',
  whiteSpace: 'nowrap',
  color: 'rgba(255, 255, 255, 0.87)',
  '&.header': {
    color: 'rgba(32, 199, 255, 0.9)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    borderBottom: '1px solid rgba(32, 199, 255, 0.15)',
  },
  '&.time': {
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: '0.02em',
  }
}));

const StyledTableRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: 'rgba(32, 199, 255, 0.05)',
  },
});

const TableContainer = styled(Box)({
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(32, 199, 255, 0.2)',
    borderRadius: '3px',
    '&:hover': {
      background: 'rgba(32, 199, 255, 0.3)',
    },
  },
});

export default function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Simulated data - replace with real WebSocket connection
    const generateTrades = () => {
      const newTrades: Trade[] = [];
      const now = Date.now();

      for (let i = 0; i < 5; i++) {
        const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
        const price = 100 + Math.random() * 10;
        const size = Math.random() * 5;
        const pnl = (Math.random() - 0.5) * 1000;

        const date = new Date(now - i * 1000);
        const time = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });

        newTrades.push({
          time,
          type,
          price,
          size,
          pnl,
        });
      }

      setTrades((prev) => [...newTrades, ...prev].slice(0, 10));
    };

    generateTrades();
    const interval = setInterval(generateTrades, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
    }}>
      <Typography variant="h6" sx={{ 
        mb: 2,
        fontSize: '0.875rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        background: 'linear-gradient(90deg, #20C7FF, #9F2FFF)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Recent Trades
      </Typography>
      <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell className="header" width="25%">Time</StyledTableCell>
              <StyledTableCell className="header" width="15%">Type</StyledTableCell>
              <StyledTableCell className="header" width="20%">Price</StyledTableCell>
              <StyledTableCell className="header" width="20%">Size</StyledTableCell>
              <StyledTableCell className="header" width="20%">P&L</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((trade, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell className="time">{trade.time}</StyledTableCell>
                <StyledTableCell sx={{
                  color: trade.type === 'BUY' ? '#00FF9F' : '#FF3366',
                  fontWeight: 600,
                }}>
                  {trade.type}
                </StyledTableCell>
                <StyledTableCell>{trade.price.toFixed(2)}</StyledTableCell>
                <StyledTableCell>{trade.size.toFixed(2)}</StyledTableCell>
                <StyledTableCell sx={{
                  color: trade.pnl >= 0 ? '#00FF9F' : '#FF3366',
                  fontWeight: 500,
                }}>
                  {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 