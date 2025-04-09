'use client';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import dynamic from 'next/dynamic';

// Use dynamic imports with no SSR to avoid hydration issues
const TradingChart = dynamic(() => import('@/components/TradingChart'), { ssr: false });
const OrderBook = dynamic(() => import('@/components/OrderBook'), { ssr: false });
const PerformanceMetrics = dynamic(() => import('@/components/PerformanceMetrics'), { ssr: false });
const TradeHistory = dynamic(() => import('@/components/TradeHistory'), { ssr: false });

const borderGlow = keyframes`
  0% { border-color: rgba(32, 199, 255, 0.3); }
  50% { border-color: rgba(159, 47, 255, 0.3); }
  100% { border-color: rgba(32, 199, 255, 0.3); }
`;

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, rgba(26, 27, 30, 0.95), rgba(18, 19, 22, 0.95))',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(32, 199, 255, 0.3)',
  borderRadius: '12px',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), 0 0 15px rgba(32, 199, 255, 0.1)',
  animation: `${borderGlow} 4s infinite`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(32, 199, 255, 0.2)',
    transform: 'translateY(-1px)',
    '&::before': {
      opacity: 1,
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(32, 199, 255, 0.03), transparent 70%)',
    borderRadius: 'inherit',
    opacity: 0.5,
    transition: 'opacity 0.3s ease',
  },
}));

export default function Home() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #13151a 0%, #080a0f 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(32, 199, 255, 0.15), transparent 70%)',
        pointerEvents: 'none',
      },
    }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid rgba(32, 199, 255, 0.15)',
          background: 'linear-gradient(180deg, rgba(26, 27, 30, 0.98), rgba(26, 27, 30, 0.95))',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(32, 199, 255, 0.3), transparent)',
          },
        }}>
          <Typography variant="h5" component="h1" sx={{ color: 'white', mb: 2 }}>
            HFT Dashboard
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: 2,
          p: 2,
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(32, 199, 255, 0.03) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }
        }}>
          {/* Left Section - Chart and Order Book */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflow: 'hidden',
          }}>
            {/* Chart */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <DashboardPaper>
                <TradingChart />
              </DashboardPaper>
            </Box>
            
            {/* Order Book */}
            <Box sx={{ height: '300px' }}>
              <DashboardPaper>
                <OrderBook />
              </DashboardPaper>
            </Box>
          </Box>

          {/* Right Section - Performance Metrics and Trade History */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflow: 'hidden',
          }}>
            {/* Performance Metrics */}
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <DashboardPaper>
                <PerformanceMetrics />
              </DashboardPaper>
            </Box>
            
            {/* Trade History */}
            <Box sx={{ height: '400px' }}>
              <DashboardPaper>
                <TradeHistory />
              </DashboardPaper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
