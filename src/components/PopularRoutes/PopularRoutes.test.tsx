import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import PopularRoutes from './PopularRoutes';

const mockRoutes = [
  { label: 'İstanbul → Ankara', value: 'IST-ESB', price: 1000, times: ['10:00', '14:00'] },
  { label: 'İzmir → Antalya', value: 'ADB-AYT', price: 800, times: ['09:00'] },
];

describe('PopularRoutes', () => {
  it('renders all main elements and route buttons', () => {
    // Arrange
    render(<PopularRoutes routes={mockRoutes} onSelect={jest.fn()} />);
    // Act
    // (no user interaction needed)
    // Assert
    expect(screen.getByTestId('popular-routes')).toBeInTheDocument();
    expect(screen.getByTestId('popular-routes-title')).toBeInTheDocument();
    expect(screen.getByTestId('popular-routes-grid')).toBeInTheDocument();
    expect(screen.getByTestId('popular-route-IST-ESB')).toBeInTheDocument();
    expect(screen.getByTestId('popular-route-ADB-AYT')).toBeInTheDocument();
  });

  it('renders price and times for each route', () => {
    // Arrange
    render(<PopularRoutes routes={mockRoutes} onSelect={jest.fn()} />);
    // Act
    // (no user interaction needed)
    // Assert
    expect(screen.getByTestId('popular-route-price-IST-ESB')).toHaveTextContent('En düşük 1000 TL');
    expect(screen.getByTestId('popular-route-times-IST-ESB')).toHaveTextContent('10:00');
    expect(screen.getByTestId('popular-route-price-ADB-AYT')).toHaveTextContent('En düşük 800 TL');
    expect(screen.getByTestId('popular-route-times-ADB-AYT')).toHaveTextContent('09:00');
  });

  it('calls onSelect with correct values when a route is clicked', () => {
    // Arrange
    const onSelect = jest.fn();
    render(<PopularRoutes routes={mockRoutes} onSelect={onSelect} />);
    // Act
    fireEvent.click(screen.getByTestId('popular-route-IST-ESB'));
    // Assert
    expect(onSelect).toHaveBeenCalledWith('IST', 'ESB');
    // Act
    fireEvent.click(screen.getByTestId('popular-route-ADB-AYT'));
    // Assert
    expect(onSelect).toHaveBeenCalledWith('ADB', 'AYT');
  });
});
