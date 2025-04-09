'use client';

import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '4px 8px',
  fontSize: '0.75rem',
  fontFamily: '"JetBrains Mono", monospace',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  color: 'rgba(255, 255, 255, 0.7)',
  whiteSpace: 'nowrap',
  '&.header': {
    color: '#20C7FF',
    fontSize: '0.65rem',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  '&.buy': {
    color: '#00FF9F',
  },
  '&.sell': {
    color: '#FF3366',
  }
}));

export default function RecentTrades() {
  // Simulated trades data - replace with real data
  const trades = [
    { id: 1, type: 'buy', price: 100.123, size: 1.2345, time: '12:01:23' },
    { id: 2, type: 'sell', price: 100.234, size: 0.5678, time: '12:01:22' },
    { id: 3, type: 'buy', price: 100.345, size: 2.3456, time: '12:01:21' },
    { id: 4, type: 'sell', price: 100.456, size: 1.7890, time: '12:01:20' },
    { id: 5, type: 'buy', price: 100.567, size: 0.9876, time: '12:01:19' },
  ]; // Show latest trades (static view, no scroll)

  return (
    <Box sx={{ 
      backgroundColor: '#0B0F17',
      borderRadius: '6px'
    }}>
      <Box sx={{
        p: 1.5,
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'white'
          }}
        >
          Recent Trades
        </Typography>
      </Box>

      <Table
        size="small"
        sx={{
          tableLayout: 'fixed',
          width: '100%',
          borderCollapse: 'collapse',
          '& .MuiTableCell-root': {
            height: '24px',
            padding: '4px 8px',
          },
          '& .MuiTableRow-root:last-child .MuiTableCell-root': {
            borderBottom: 'none'
          }
        }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell className="header">Price</StyledTableCell>
            <StyledTableCell className="header" align="right">Size</StyledTableCell>
            <StyledTableCell className="header" align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <StyledTableCell className={trade.type}>
                {trade.price.toFixed(3)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {trade.size.toFixed(4)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {trade.time}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
