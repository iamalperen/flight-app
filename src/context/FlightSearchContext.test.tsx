import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { FlightSearchProvider, useFlightSearch } from './FlightSearchContext';

const TestComponent = () => {
  const {
    criteria,
    setCriteria,
    selectedFlight,
    setSelectedFlight,
    headerVariant,
    setHeaderVariant,
  } = useFlightSearch();

  return (
    <div>
      <div data-testid="criteria">{JSON.stringify(criteria)}</div>
      <div data-testid="selected-flight">{JSON.stringify(selectedFlight)}</div>
      <div data-testid="header-variant">{headerVariant}</div>
      <button
        onClick={() =>
          setCriteria({
            from: { value: 'IST', label: 'İstanbul' },
            to: { value: 'ESB', label: 'Esenboğa' },
            passengerCount: 2,
            cabin: 'economy',
          })
        }
      >
        Update Criteria
      </button>
      <button
        onClick={() =>
          setSelectedFlight({
            originAirport: {
              name: 'İstanbul Airport',
              code: 'IST',
              city: { code: 'IST', name: 'İstanbul' },
              country: { code: 'TR', name: 'Turkey' },
            },
            destinationAirport: {
              name: 'Esenboğa Airport',
              code: 'ESB',
              city: { code: 'ANK', name: 'Ankara' },
              country: { code: 'TR', name: 'Turkey' },
            },
            arrivalDateTimeDisplay: '11:00',
            departureDateTimeDisplay: '10:00',
            flightDuration: '1h',
            fareCategories: {
              BUSINESS: { subcategories: [] },
              ECONOMY: { subcategories: [] },
            },
          })
        }
      >
        Select Flight
      </button>
      <button onClick={() => setHeaderVariant('dark')}>Change Header</button>
    </div>
  );
};

describe('FlightSearchContext', () => {
  it('should provide default values', () => {
    // Arrange & Act
    render(
      <FlightSearchProvider>
        <TestComponent />
      </FlightSearchProvider>
    );

    // Assert
    expect(screen.getByTestId('criteria')).toHaveTextContent(
      JSON.stringify({
        from: null,
        to: null,
        passengerCount: 1,
        cabin: 'economy',
      })
    );
    expect(screen.getByTestId('selected-flight')).toHaveTextContent('null');
    expect(screen.getByTestId('header-variant')).toHaveTextContent('light');
  });

  it('should update criteria when setCriteria is called', async () => {
    // Arrange
    render(
      <FlightSearchProvider>
        <TestComponent />
      </FlightSearchProvider>
    );

    // Act
    fireEvent.click(screen.getByText('Update Criteria'));

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('criteria')).toHaveTextContent(
        JSON.stringify({
          from: { value: 'IST', label: 'İstanbul' },
          to: { value: 'ESB', label: 'Esenboğa' },
          passengerCount: 2,
          cabin: 'economy',
        })
      );
    });
  });

  it('should update selected flight when setSelectedFlight is called', async () => {
    // Arrange
    render(
      <FlightSearchProvider>
        <TestComponent />
      </FlightSearchProvider>
    );

    // Act
    fireEvent.click(screen.getByText('Select Flight'));

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('selected-flight')).toHaveTextContent(
        JSON.stringify({
          originAirport: {
            name: 'İstanbul Airport',
            code: 'IST',
            city: { code: 'IST', name: 'İstanbul' },
            country: { code: 'TR', name: 'Turkey' },
          },
          destinationAirport: {
            name: 'Esenboğa Airport',
            code: 'ESB',
            city: { code: 'ANK', name: 'Ankara' },
            country: { code: 'TR', name: 'Turkey' },
          },
          arrivalDateTimeDisplay: '11:00',
          departureDateTimeDisplay: '10:00',
          flightDuration: '1h',
          fareCategories: {
            BUSINESS: { subcategories: [] },
            ECONOMY: { subcategories: [] },
          },
        })
      );
    });
  });

  it('should update header variant when setHeaderVariant is called', async () => {
    // Arrange
    render(
      <FlightSearchProvider>
        <TestComponent />
      </FlightSearchProvider>
    );

    // Act
    fireEvent.click(screen.getByText('Change Header'));

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('header-variant')).toHaveTextContent('dark');
    });
  });
});
