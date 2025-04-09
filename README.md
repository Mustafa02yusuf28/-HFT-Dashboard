# HFT Dashboard

A modern, real-time high-frequency trading dashboard built with Next.js and TypeScript. The dashboard provides a comprehensive view of trading activities with advanced charting capabilities and performance metrics.

## Features

- Real-time candlestick chart with volume indicators
- Order book visualization
- Performance metrics tracking
- Trade history monitoring
- Responsive design for all screen sizes
- Dark mode interface optimized for trading
- Multiple time frame support (1H, 4H, 1D)

## Tech Stack

- Next.js 14
- TypeScript
- Material-UI (MUI)
- Recharts for advanced charting
- Styled Components

## Security Features

- Environment variable protection
- No hardcoded credentials
- Secure WebSocket implementation
- Rate limiting support
- CORS protection
- Input validation for trade data
- Proper error handling for network requests

## Security Best Practices

1. Environment Variables:
   - Never commit `.env` files
   - Use separate env files for different environments
   - Store sensitive data only in environment variables

2. API Security:
   - Implement rate limiting for API endpoints
   - Use HTTPS for all network requests
   - Validate all input data
   - Implement proper error handling

3. WebSocket Security:
   - Use secure WebSocket connections (WSS)
   - Implement authentication for WebSocket connections
   - Handle connection errors gracefully

4. Data Protection:
   - Never log sensitive trading data
   - Implement proper data sanitization
   - Use secure storage for user preferences

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hft-dashboard.git
cd hft-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WS_URL=your_websocket_url
# Add other non-sensitive configuration
```

Never commit:
- API keys
- Private keys
- Access tokens
- Sensitive URLs

## Project Structure

```
hft-dashboard/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Security Checks

Before deploying:
1. Run security audit:
```bash
npm audit
```

2. Check for outdated dependencies:
```bash
npm outdated
```

3. Verify environment variables:
```bash
npm run env:check # Add this script to package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Security Guidelines for Contributors

1. Never commit sensitive data
2. Always use environment variables for configuration
3. Follow the principle of least privilege
4. Document security-related changes
5. Run security checks before submitting PRs



## Security Reporting

Found a security issue? Please write confidentially to my alternate email[workforthieves@gmail.com].
