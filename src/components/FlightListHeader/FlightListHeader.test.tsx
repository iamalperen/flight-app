import { render, screen } from '@testing-library/react';
import React from 'react';

import FlightListHeader from './FlightListHeader';

describe('FlightListHeader', () => {
  it('should display flight details with all props provided', () => {
    // Arrange
    const props = {
      fromCityName: 'Istanbul',
      toCityName: 'Ankara',
      passengerCount: 2,
    };

    // Act
    render(<FlightListHeader {...props} />);

    // Assert
    expect(screen.getByTestId('flight-header')).toBeInTheDocument();
    expect(screen.getByTestId('flight-label')).toHaveTextContent('UÇUŞ');
    expect(screen.getByTestId('flight-title')).toHaveTextContent('Istanbul - Ankara, 2 Yolcu');
  });

  it('should use fallback values when props are not provided', () => {
    // Arrange
    // Act
    render(<FlightListHeader />);

    // Assert
    expect(screen.getByTestId('flight-title')).toHaveTextContent('N/A - N/A, 0 Yolcu');
  });

  it('should handle partial props correctly', () => {
    // Arrange
    const props = {
      fromCityName: 'Izmir',
    };

    // Act
    render(<FlightListHeader {...props} />);

    // Assert
    expect(screen.getByTestId('flight-title')).toHaveTextContent('Izmir - N/A, 0 Yolcu');
  });

  it('should render correctly with very long city names', () => {
    // Arrange
    const props = {
      fromCityName: 'VeryLongCityNameThatMightCauseLayoutIssues',
      toCityName: 'AnotherExtremelyLongCityNameForTesting',
      passengerCount: 5,
    };

    // Act
    render(<FlightListHeader {...props} />);

    // Assert
    expect(screen.getByTestId('flight-title')).toHaveTextContent(
      'VeryLongCityNameThatMightCauseLayoutIssues - AnotherExtremelyLongCityNameForTesting, 5 Yolcu'
    );
  });

  it('should have the correct style classes', () => {
    // Arrange

    // Act
    render(<FlightListHeader fromCityName="Istanbul" toCityName="Ankara" passengerCount={1} />);

    // Assert
    const headerContainer = screen.getByTestId('flight-header');
    const flightLabel = screen.getByTestId('flight-label');
    const flightContent = screen.getByTestId('flight-content');

    expect(headerContainer).toHaveClass('mb-6');
    expect(flightLabel).toHaveClass(
      'bg-red-600',
      'text-white',
      'text-xs',
      'font-bold',
      'rounded-t-md'
    );
    expect(flightContent).toHaveClass('bg-white', 'shadow-md', 'rounded-b-md');
  });
});
