'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const MetricBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#131722',
  borderRadius: '4px',
  padding: '8px',
  height: '52px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px'
}));

const MetricLabel = styled(Typography)({
  color: '#5C6B7A',
  fontSize: '0.7rem',
  fontWeight: 500,
  lineHeight: 1,
});

const MetricValue = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 600,
  lineHeight: 1,
});

const GridContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '8px',
});

export default function PerformanceMetrics() {
  return (
    <Box sx={{ 
      p: '12px',
      backgroundColor: '#0B0F17', 
      borderRadius: '6px',
      height: 'fit-content',
    }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'white',
          mb: 1,
          pl: 0.5
        }}
      >
        Performance Metrics
      </Typography>
      
      <GridContainer>
        <MetricBox>
          <MetricLabel>Sharpe Ratio</MetricLabel>
          <MetricValue sx={{ color: '#00FF9F' }}>2.1</MetricValue>
        </MetricBox>
        <MetricBox>
          <MetricLabel>Win Rate</MetricLabel>
          <MetricValue sx={{ color: '#00FF9F' }}>61%</MetricValue>
        </MetricBox>
        <MetricBox>
          <MetricLabel>Profit Factor</MetricLabel>
          <MetricValue sx={{ color: '#00FF9F' }}>1.87</MetricValue>
        </MetricBox>
        <MetricBox>
          <MetricLabel>Max Drawdown</MetricLabel>
          <MetricValue sx={{ color: '#FF3366' }}>4.5%</MetricValue>
        </MetricBox>
      </GridContainer>
    </Box>
  );
} 