import { renderHook, act } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Flight, FareSubcategory } from '../types';
import { getActualEcoFlyPrice } from '../utils';

import { useFlightListManager } from './useFlightListManager';

import { useFlights } from './index';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('./index', () => ({
  useFlights: jest.fn(),
}));

jest.mock('../utils/getActualEcoFlyPrice', () => ({
  getActualEcoFlyPrice: jest.fn(),
}));

const useLocationMock = jest.mocked(useLocation);
const useNavigateMock = jest.mocked(useNavigate);
const useFlightsMock = jest.mocked(useFlights);
const getActualEcoFlyPriceMock = jest.mocked(getActualEcoFlyPrice);

describe('useFlightListManager', () => {
  const navigate = jest.fn();

  const mockFareSubcategory: FareSubcategory = {
    brandCode: 'ecoFly',
    price: { amount: 100, currency: 'TRY' },
    order: 1,
    status: 'AVAILABLE',
    rights: [],
  };

  const createMockFlight = (id: string, departureTime: string): Flight => ({
    originAirport: {
      name: 'Airport A',
      code: 'AAA',
      city: { code: 'A', name: 'CityA' },
      country: { code: 'TR', name: 'Turkey' },
    },
    destinationAirport: {
      name: 'Airport B',
      code: 'BBB',
      city: { code: 'B', name: 'CityB' },
      country: { code: 'TR', name: 'Turkey' },
    },
    arrivalDateTimeDisplay: '12:00',
    departureDateTimeDisplay: departureTime,
    flightDuration: '2h',
    fareCategories: {
      ECONOMY: {
        subcategories: [{ ...mockFareSubcategory }],
      },
      BUSINESS: {
        subcategories: [{ ...mockFareSubcategory, price: { amount: 300, currency: 'TRY' } }],
      },
    },
  });

  const mockFlight1 = createMockFlight('1', '08:00');
  const mockFlight2 = createMockFlight('2', '07:00');
  const mockFlights = [mockFlight1, mockFlight2];

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigateMock.mockReturnValue(navigate);

    getActualEcoFlyPriceMock.mockImplementation(flight => {
      return flight === mockFlight1 ? 200 : 100;
    });
  });

  it('redirects to home when no state and not loading', () => {
    // Arrange
    useLocationMock.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      state: null,
      key: '',
    });

    useFlightsMock.mockReturnValue({
      flightsData: null,
      loading: false,
    });

    // Act
    renderHook(() => useFlightListManager());

    // Assert
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('exposes isLoading flag from useFlights', () => {
    // Arrange
    useLocationMock.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { from: 'X', to: 'Y', passengerCount: 1 },
    });

    useFlightsMock.mockReturnValue({
      flightsData: null,
      loading: true,
    });

    // Act
    const { result } = renderHook(() => useFlightListManager());

    // Assert
    expect(result.current.isLoading).toBe(true);
  });

  it('filters and sorts flights by ecoFlyPrice', () => {
    // Arrange
    useLocationMock.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { from: 'A', to: 'B', passengerCount: 2 },
    });

    useFlightsMock.mockReturnValue({
      flightsData: { flights: mockFlights },
      loading: false,
    });

    // Act
    const { result } = renderHook(() => useFlightListManager());

    // Assert
    expect(result.current.sortedFlights[0]).toBe(mockFlight2);
    expect(result.current.sortedFlights[1]).toBe(mockFlight1);
  });

  it('toggles expandedDetails correctly', () => {
    // Arrange
    useLocationMock.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { from: 'A', to: 'B', passengerCount: 1 },
    });

    useFlightsMock.mockReturnValue({
      flightsData: { flights: mockFlights },
      loading: false,
    });

    // Act
    const { result } = renderHook(() => useFlightListManager());

    // Toggle on
    act(() => {
      result.current.toggleExpand('flight-1', 'ECONOMY');
    });

    // Assert
    expect(result.current.expandedDetails).toEqual({
      flightKey: 'flight-1',
      section: 'ECONOMY',
    });

    act(() => {
      result.current.toggleExpand('flight-1', 'ECONOMY');
    });

    // Assert
    expect(result.current.expandedDetails).toEqual({
      flightKey: null,
      section: null,
    });
  });

  it('navigates to cabin selection on fare select', () => {
    // Arrange
    useLocationMock.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { from: 'A', to: 'B', passengerCount: 1 },
    });

    useFlightsMock.mockReturnValue({
      flightsData: { flights: mockFlights },
      loading: false,
    });

    const { result } = renderHook(() => useFlightListManager());

    // Act
    act(() => {
      result.current.handleSelectFare(mockFlight1, mockFareSubcategory);
    });

    // Assert
    expect(navigate).toHaveBeenCalledWith('/cabin-selection', {
      state: {
        flightDetails: mockFlight1,
        selectedFare: mockFareSubcategory,
        status: mockFareSubcategory.status,
      },
    });
  });

  it('sorts flights by departureTime when sortBy is changed', () => {
    // Arrange
    useLocationMock.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { from: 'A', to: 'B', passengerCount: 1 },
    });

    useFlightsMock.mockReturnValue({
      flightsData: { flights: mockFlights },
      loading: false,
    });

    const { result } = renderHook(() => useFlightListManager());

    // Act
    act(() => {
      result.current.setSortBy('departureTime');
    });

    // Assert
    expect(result.current.sortedFlights[0]).toBe(mockFlight2); // 07:00 should be first
    expect(result.current.sortedFlights[1]).toBe(mockFlight1); // 08:00 should be second
  });

  it('updates flight filters when promoCodeActive changes', () => {
    // Arrange
    useLocationMock.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { from: 'A', to: 'B', passengerCount: 1 },
    });

    useFlightsMock.mockReturnValue({
      flightsData: { flights: mockFlights },
      loading: false,
    });

    getActualEcoFlyPriceMock.mockImplementation((flight, applyPromo) => {
      if (flight === mockFlight1) {
        return applyPromo ? 100 : 200;
      }
      return applyPromo ? 50 : 100;
    });

    const { result } = renderHook(() => useFlightListManager());

    // Act
    act(() => {
      result.current.setPromoCodeActive(true);
    });

    // Assert
    expect(result.current.promoCodeActive).toBe(true);
    expect(getActualEcoFlyPriceMock).toHaveBeenCalledWith(expect.anything(), true);
  });
});
