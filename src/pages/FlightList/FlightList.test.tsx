import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  FlightListHeader,
  PromoCodeSection,
  SortControls,
  FlightCard,
  NoFlightsMessage,
} from '../../components';
import { useFlightSearch } from '../../context';
import type { FlightSearchContextType, FlightSearchCriteria } from '../../context';
import { useFlightListManager } from '../../hooks';
import { FlightListManagerReturn } from '../../hooks/useFlightListManager';
import { Flight } from '../../types';
import { generateFlightKey, getLowestEconomyPrice, getBusinessPrice } from '../../utils';

import FlightList from './FlightList';

jest.mock('../../context', () => ({
  useFlightSearch: jest.fn(),
}));

jest.mock('../../hooks', () => ({
  useFlightListManager: jest.fn(),
}));

jest.mock('../../components', () => ({
  FlightListHeader: jest.fn(() => <div data-testid="flight-list-header" />),
  PromoCodeSection: jest.fn(() => <div data-testid="promo-code-section" />),
  SortControls: jest.fn(() => <div data-testid="sort-controls" />),
  FlightCard: jest.fn(() => <div data-testid="flight-card" />),
  NoFlightsMessage: jest.fn(() => <div data-testid="no-flights-message" />),
}));

jest.mock('../../utils', () => ({
  generateFlightKey: jest.fn(flight => `key-${flight.id}`),
  getLowestEconomyPrice: jest.fn().mockReturnValue(100),
  getBusinessPrice: jest.fn().mockReturnValue(300),
}));

const useFlightSearchMock = jest.mocked(useFlightSearch);
const useFlightListManagerMock = jest.mocked(useFlightListManager);

describe('FlightList', () => {
  let setHeaderVariant: jest.Mock;
  let defaultManager: FlightListManagerReturn;

  beforeEach(() => {
    jest.clearAllMocks();

    setHeaderVariant = jest.fn();

    const mockCriteria: FlightSearchCriteria = {
      from: null,
      to: null,
      passengerCount: 1,
      cabin: 'economy',
    };

    const mockSearchContext: Partial<FlightSearchContextType> = {
      setHeaderVariant,
      criteria: mockCriteria,
      setCriteria: jest.fn(),
      selectedFlight: null,
      setSelectedFlight: jest.fn(),
      headerVariant: 'dark',
    };

    useFlightSearchMock.mockReturnValue(mockSearchContext as FlightSearchContextType);

    defaultManager = {
      isLoading: false,
      hasCriteria: true,
      sortedFlights: [],
      sortBy: 'ecoFlyPrice',
      promoCodeActive: false,
      expandedDetails: { flightKey: '', section: null },
      fromCityName: 'CityA',
      toCityName: 'CityB',
      actualPassengerCount: 2,
      setSortBy: jest.fn(),
      setPromoCodeActive: jest.fn(),
      toggleExpand: jest.fn(),
      handleSelectFare: jest.fn(),
    };
    useFlightListManagerMock.mockReturnValue(defaultManager);
  });

  it('should set header variant to light on mount', () => {
    // Act
    render(<FlightList />);
    // Assert
    expect(setHeaderVariant).toHaveBeenCalledWith('light');
  });

  it('should render loading state when isLoading is true', () => {
    // Arrange
    const loadingManager: FlightListManagerReturn = {
      ...defaultManager,
      isLoading: true,
    };
    useFlightListManagerMock.mockReturnValue(loadingManager);
    // Act
    render(<FlightList />);
    // Assert
    expect(screen.getByText('Uçuşlar yükleniyor...')).toBeInTheDocument();
    expect(FlightListHeader).not.toHaveBeenCalled();
  });

  it('should render redirect message when hasCriteria is false', () => {
    // Arrange
    const noCriteriaManager: FlightListManagerReturn = {
      ...defaultManager,
      hasCriteria: false,
    };
    useFlightListManagerMock.mockReturnValue(noCriteriaManager);
    // Act
    render(<FlightList />);
    // Assert
    expect(screen.getByText('Yönlendiriliyor...')).toBeInTheDocument();
    expect(FlightListHeader).not.toHaveBeenCalled();
  });

  it('should render NoFlightsMessage when no flights available', () => {
    // Arrange
    const emptyFlightsManager: FlightListManagerReturn = {
      ...defaultManager,
      sortedFlights: [],
    };
    useFlightListManagerMock.mockReturnValue(emptyFlightsManager);
    // Act
    render(<FlightList />);
    // Assert
    expect(NoFlightsMessage).toHaveBeenCalled();
  });

  it('should render FlightCard for each flight when flights available', () => {
    // Arrange
    const mockFlights = [{ id: '1' }, { id: '2' }] as unknown as Flight[];

    const withFlightsManager: FlightListManagerReturn = {
      ...defaultManager,
      sortedFlights: mockFlights,
    };
    useFlightListManagerMock.mockReturnValue(withFlightsManager);

    // Act
    render(<FlightList />);

    // Assert
    expect(FlightListHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        fromCityName: 'CityA',
        toCityName: 'CityB',
        passengerCount: 2,
      }),
      undefined
    );
    expect(PromoCodeSection).toHaveBeenCalledWith(
      expect.objectContaining({
        promoCodeActive: false,
        onTogglePromo: expect.any(Function),
      }),
      undefined
    );
    expect(SortControls).toHaveBeenCalledWith(
      expect.objectContaining({
        currentSortBy: 'ecoFlyPrice',
        onSetSortBy: defaultManager.setSortBy,
      }),
      undefined
    );
    expect(generateFlightKey).toHaveBeenCalledTimes(2);
    expect(FlightCard).toHaveBeenCalledTimes(2);
    mockFlights.forEach(flight => {
      expect(FlightCard).toHaveBeenCalledWith(
        expect.objectContaining({
          flight,
          isEconomyExpanded: false,
          isBusinessExpanded: false,
          promoCodeActive: false,
          onToggleExpand: expect.any(Function),
          onSelectFare: defaultManager.handleSelectFare,
          getLowestEconomyPrice,
          getBusinessPrice,
        }),
        undefined
      );
    });
  });
});
