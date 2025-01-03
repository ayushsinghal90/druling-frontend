# Druling

Your one-stop solution for all you restaurant management.

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
├── assets/           # Images and static files
├── components/       # Reusable UI components
├── config/           # Configuration files
├── contexts/         # Context for shared pages
├── hooks/            # Custom React hooks
├── lib/              # Utils for common func
├── pages/            # Page components
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

## License

MIT License - See LICENSE file for details

## Resources

- [icons](https://hugeicons.com/icon/global-stroke-rounded)
