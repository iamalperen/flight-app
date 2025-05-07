import { renderHook, waitFor } from '@testing-library/react';

import { flightService } from '../services';
import { FlightsData } from '../types/flight';

import { useFlights } from './useFlights';

jest.mock('../services');

const flightServiceMock = jest.mocked(flightService);

const mockFlightsData: FlightsData = {
  flights: [
    {
      originAirport: {
        name: 'Istanbul Airport',
        code: 'IST',
        city: { code: 'IST', name: 'Istanbul' },
        country: { code: 'TR', name: 'Turkey' },
      },
      destinationAirport: {
        name: 'Esenboga Airport',
        code: 'ESB',
        city: { code: 'ESB', name: 'Ankara' },
        country: { code: 'TR', name: 'Turkey' },
      },
      arrivalDateTimeDisplay: '12:00',
      departureDateTimeDisplay: '10:00',
      flightDuration: '2h',
      fareCategories: {
        BUSINESS: {
          subcategories: [
            {
              brandCode: 'primeFly',
              price: { amount: 2000, currency: 'TRY' },
              order: 1,
              status: 'AVAILABLE',
              rights: ['Lounge'],
            },
          ],
        },
        ECONOMY: {
          subcategories: [
            {
              brandCode: 'ecoFly',
              price: { amount: 500, currency: 'TRY' },
              order: 1,
              status: 'AVAILABLE',
              rights: ['Meal'],
            },
          ],
        },
      },
    },
  ],
};

describe('useFlights', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading=true and flightsData=null initially', () => {
    // Arrange
    flightServiceMock.getFlights.mockReturnValue(new Promise(() => {}));
    // Act
    const { result } = renderHook(() => useFlights());
    // Assert
    expect(result.current.loading).toBe(true);
    expect(result.current.flightsData).toBeNull();
  });

  it('returns flightsData after fetch and loading=false', async () => {
    // Arrange
    flightServiceMock.getFlights.mockResolvedValue(mockFlightsData);
    // Act
    const { result } = renderHook(() => useFlights());
    await waitFor(() => expect(result.current.loading).toBe(false));
    // Assert
    expect(result.current.flightsData).toEqual(mockFlightsData);
  });

  it('sets loading=false if getFlights rejects', async () => {
    // Arrange
    flightServiceMock.getFlights.mockRejectedValue(new Error('Network error'));
    // Act
    const { result } = renderHook(() => useFlights());
    await waitFor(() => expect(result.current.loading).toBe(false));
    // Assert
    expect(result.current.flightsData).toBeNull();
  });
});
