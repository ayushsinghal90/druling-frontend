# Druling - Digital Menu Solutions

A modern digital menu solution that helps restaurants create QR code-based menus easily.

## Features

- 🎯 Instant QR code generation
- 📱 Mobile-optimized menu display
- 📊 Analytics and insights
- 🔄 Real-time menu updates
- 💳 Multiple subscription tiers
- 🔒 Secure authentication

## Tech Stack

- React 18 with TypeScript
- Vite for blazing fast development
- Redux Toolkit for state management
- TailwindCSS for styling
- React Router for navigation
- Zod for runtime type validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy the environment template:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration
5. Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── auth/         # Authentication related components
│   ├── dashboard/    # Dashboard specific components
│   └── shared/       # Shared components
├── config/           # Configuration files
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── pages/            # Page components
├── services/         # API services
├── store/            # Redux store configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

See `.env.example` for all available configuration options.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details
