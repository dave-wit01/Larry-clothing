# Larry Clothing - Professional React Website

A modern, professional e-commerce website built with React, TypeScript, and Tailwind CSS.

## Features

✨ **Modern Stack**
- React 18 with TypeScript support
- Vite for fast development and optimized builds
- React Router for navigation
- Tailwind CSS for responsive design
- Zustand for state management

🛠️ **Developer Tools**
- ESLint for code quality
- Prettier for code formatting
- Vitest for unit testing
- TypeScript for type safety

📱 **Responsive Design**
- Mobile-first approach
- Mobile, tablet, and desktop support
- Professional UI components
- Accessible navigation

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests with Vitest

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components for routing
├── utils/          # Utility functions
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Key Pages

- **Home** - Landing page with featured collection
- **Shop** - Product listing and browsing
- **About** - Company information
- **Contact** - Contact form and information

## Technologies Used

- **Frontend**: React, TypeScript, React Router
- **Styling**: Tailwind CSS, PostCSS
- **Build Tool**: Vite
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint, Prettier

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Components
Add new components in `src/components/`

### Pages
Add new pages in `src/pages/` and register them in `App.jsx`

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## License

All rights reserved © 2024 Larry Clothing
