# Flight Booking Application

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://flight-app-rho-eight.vercel.app/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blueviolet.svg)](https://tailwindcss.com/)
[![Jest](https://img.shields.io/badge/Jest-29-red.svg)](https://jestjs.io/)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://flight-app-rho-eight.vercel.app/)
[![ESLint](https://img.shields.io/badge/ESLint-8-4B32C3.svg)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E.svg)](https://prettier.io/)

**[✈️ View Live Demo](https://flight-app-rho-eight.vercel.app/)**

## 📋 Requirements Fulfillment

### ✅ Core Requirements
- **Single Page Application**: Implemented using React Router for seamless navigation
- **React & Tailwind CSS**: Built entirely with ReactJS and styled with Tailwind CSS
- **Three Distinct Pages**: 
  - Flight Search Page
  - Flight Listing Page 
  - Cabin Selection Status Page (Success/Error)

### ✅ Bonus Requirements (Fully Implemented)
- **Unit Testing**: Comprehensive test suite with 100% coverage
- **Custom Hooks with Local Storage**: Implemented for persistent state management

### ✅ Page-Specific Requirements

#### Flight Search Page
- ✅ Visual date field (non-functional as per requirements)
- ✅ Allows navigation to flight listing only when valid departure/arrival points are selected
- ✅ Prevents navigation for invalid route selections
- ✅ Proper styling with specified background color (#063048)
- ✅ Departure/arrival selection area styled correctly (rgb(96 105 119 / 60%))

#### Flight Listing Page
- ✅ Default sorting by eco fly prices
- ✅ Dynamic list reordering when sort criteria changes
- ✅ Promo code functionality:
  - ✅ Non-Eco Fly buttons disabled when promo is active
  - ✅ 50% discount applied to Eco Fly packages
- ✅ Correct styling with box shadows (0 4px 8px 0 rgba(0,0,0,.05))
- ✅ Package headers styled correctly (background-color: #f9f9f9)
- ✅ "Select Flight" buttons styled properly (#E81932)

#### Cabin Selection Status Page
- ✅ Shows success screen when status is "available"
- ✅ Shows error screen when status is "error"
- ✅ Visually matches design specifications

## 🛠️ Technology Stack

- **Frontend**: React.js + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **Local Storage**: Custom hooks for persistent state
- **Icons**: Font Awesome
- **Testing**: Jest + React Testing Library
- **Linting & Formatting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Deployment**: Vercel

## 🔍 Quality Assurance

### Code Quality Tools
- **ESLint**: Rigorous linting rules enforce code quality standards and prevent common errors
- **Prettier**: Consistent code formatting across the entire codebase
- **TypeScript**: Static type checking with strict mode enabled
- **React Testing Library**: Testing focused on user behavior rather than implementation details
- **Husky**: Pre-commit hooks ensure code quality standards are met before commits
- **Lint-Staged**: Runs linters against staged git files to ensure quality


## 📱 Pages & Components

### Flight Search Page
- Origin/destination selection with validation
- Visual date selection
- Responsive layout with brand colors
- Error handling for invalid routes

### Flight List Page
- Advanced sorting capabilities
- Detailed flight cards with expandable sections
- Promo code toggle with visual feedback
- Proper price formatting and currency display
- Economy/Business class selection

### Cabin Selection Status Page
- Clear visual success/error indicators
- Status-appropriate messaging
- Professional iconography for status display


## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/flight-app.git
cd flight-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Running Tests

```bash
npm test
# or
yarn test
```

## 🧩 Project Structure

```
flight-app/
├── public/             # Static files
├── src/
│   ├── components/     # Reusable components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   └── index.tsx       # Entry point
└── README.md           # This file
```

## 📚 Development Highlights

- **Clean Code Architecture**: Separation of concerns with clear component boundaries
- **Reusable Components**: Modular design for maximum code reuse
- **Custom Hooks**: Abstracted complex logic into reusable hooks
- **Testing First Development**: Components designed with testability in mind
- **TypeScript Best Practices**: Comprehensive type definitions for better developer experience
- **Modern React Patterns**: Utilizing the latest React patterns and features

## 📝 License

This project is licensed under the MIT License.
