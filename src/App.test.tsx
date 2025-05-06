import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('./components/Header', () => {
  const MockHeader = () => <div data-testid="mock-header" />;
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});
jest.mock('./pages/Home/Home', () => {
  const MockHome = () => <div data-testid="mock-home" />;
  MockHome.displayName = 'MockHome';
  return MockHome;
});
jest.mock('./pages/FlightList/FlightList', () => {
  const MockFlightList = () => <div data-testid="mock-flight-list" />;
  MockFlightList.displayName = 'MockFlightList';
  return MockFlightList;
});
jest.mock('./pages/CabinSelection/CabinSelection', () => {
  const MockCabinSelection = () => <div data-testid="mock-cabin-selection" />;
  MockCabinSelection.displayName = 'MockCabinSelection';
  return MockCabinSelection;
});

import App from './App';

describe('App routing', () => {
  it('renders Home on /', () => {
    // Arrange & Act
    window.history.pushState({}, '', '/');
    render(<App />);
    // Assert
    expect(screen.getByTestId('mock-home')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders FlightList on /flights', () => {
    // Arrange & Act
    window.history.pushState({}, '', '/flights');
    render(<App />);
    // Assert
    expect(screen.getByTestId('mock-flight-list')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders CabinSelection on /cabin-selection', () => {
    // Arrange & Act
    window.history.pushState({}, '', '/cabin-selection');
    render(<App />);
    // Assert
    expect(screen.getByTestId('mock-cabin-selection')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('redirects unknown routes to Home', () => {
    // Arrange & Act
    window.history.pushState({}, '', '/unknown');
    render(<App />);
    // Assert
    expect(screen.getByTestId('mock-home')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});
