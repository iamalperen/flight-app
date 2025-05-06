import { renderHook, act } from '@testing-library/react';
import * as router from 'react-router-dom';

import * as flightSearchContext from '../context/FlightSearchContext';
import { FlightSearchContextType } from '../context/FlightSearchContext';
import { AutocompleteOption } from '../types/flightSearch';
import * as utils from '../utils';

import * as flightsHook from './useFlights';
import { useFlightSearchForm } from './useFlightSearchForm';
import * as recentHook from './useRecentSearches';

jest.mock('./useFlights');
jest.mock('./useRecentSearches');
jest.mock('../context/FlightSearchContext');
jest.mock('react-router-dom');
jest.mock('../utils');

const mockCities: AutocompleteOption[] = [
  { value: 'IST', label: 'İstanbul' },
  { value: 'ESB', label: 'Ankara' },
  { value: 'AYT', label: 'Antalya' },
];
const mockFlightsData = { flights: [] };
const mockRecent = [
  { from: mockCities[0], to: mockCities[1] },
  { from: mockCities[1], to: mockCities[2] },
];
const mockPopularRoutes = [
  { label: 'İstanbul → Ankara', value: 'IST-ESB', price: 1000, times: ['10:00', '14:00'] },
];

describe('useFlightSearchForm', () => {
  const setHeaderVariant = jest.fn();
  const addSearch = jest.fn();
  const navigate = jest.fn();

  const mockFlightSearchContext: FlightSearchContextType = {
    criteria: {
      from: null,
      to: null,
      passengerCount: 1,
      cabin: 'economy',
    },
    setCriteria: jest.fn(),
    selectedFlight: null,
    setSelectedFlight: jest.fn(),
    headerVariant: 'light',
    setHeaderVariant,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(flightsHook.useFlights)
      .mockReturnValue({ flightsData: mockFlightsData, loading: false });
    jest.mocked(recentHook.useRecentSearches).mockReturnValue({ recent: mockRecent, addSearch });
    jest.mocked(flightSearchContext.useFlightSearch).mockReturnValue(mockFlightSearchContext);
    jest.mocked(router.useNavigate).mockReturnValue(navigate);
    jest.mocked(utils.getUniqueCities).mockReturnValue(mockCities);
    jest.mocked(utils.getAvailableDestinations).mockReturnValue([mockCities[1], mockCities[2]]);
    jest.mocked(utils.getPopularRoutes).mockReturnValue(mockPopularRoutes);
    jest.mocked(utils.isValidRoute).mockReturnValue(true);
  });

  it('returns initial state and options', () => {
    // Arrange & Act
    const { result } = renderHook(() => useFlightSearchForm());
    // Assert
    expect(result.current.from).toBeNull();
    expect(result.current.to).toBeNull();
    expect(result.current.passengers).toEqual({ count: 1, cabin: 'economy' });
    expect(result.current.fromOptions.length).toBeGreaterThan(0);
    expect(result.current.popularRoutes).toEqual(mockPopularRoutes);
  });

  it('setFrom, setTo, setPassenger update state', () => {
    // Arrange
    const { result } = renderHook(() => useFlightSearchForm());
    // Act
    act(() => {
      result.current.setFrom(mockCities[0]);
      result.current.setTo(mockCities[1]);
      result.current.setPassenger({ count: 2, cabin: 'business' });
    });
    // Assert
    expect(result.current.from).toEqual(mockCities[0]);
    expect(result.current.to).toEqual(mockCities[1]);
    expect(result.current.passengers).toEqual({ count: 2, cabin: 'business' });
  });

  it('handleCitySelect sets from and to correctly for route string', () => {
    // Arrange
    const { result } = renderHook(() => useFlightSearchForm());
    // Act
    act(() => {
      result.current.handleCitySelect({ value: 'IST-ESB', label: 'İstanbul → Ankara' }, 'from');
    });
    // Assert
    expect(result.current.from).toEqual(mockCities[0]);
    expect(result.current.to).toEqual(mockCities[1]);
  });

  it('handleSubmit calls addSearch and navigate if valid', () => {
    // Arrange
    const { result } = renderHook(() => useFlightSearchForm());
    act(() => {
      result.current.setFrom(mockCities[0]);
      result.current.setTo(mockCities[1]);
    });
    // Act
    act(() => {
      const event = { preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>;
      result.current.handleSubmit(event);
    });
    // Assert
    expect(addSearch).toHaveBeenCalledWith({ from: mockCities[0], to: mockCities[1] });
    expect(navigate).toHaveBeenCalledWith(
      '/flights',
      expect.objectContaining({ state: expect.objectContaining({ from: 'IST', to: 'ESB' }) })
    );
  });

  it('handleSubmit does not call navigate if route is invalid', () => {
    // Arrange
    jest.mocked(utils.isValidRoute).mockReturnValue(false);
    const { result } = renderHook(() => useFlightSearchForm());
    act(() => {
      result.current.setFrom(mockCities[0]);
      result.current.setTo(mockCities[1]);
    });
    // Act
    act(() => {
      const event = { preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>;
      result.current.handleSubmit(event);
    });
    // Assert
    expect(navigate).not.toHaveBeenCalled();
  });
});
