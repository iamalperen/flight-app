import { Flight, FareCategories } from '../types/flight';

import { getRouteInfo } from './getRouteInfo';

describe('getRouteInfo', () => {
  it('returns route info with flight count, min price, and times', () => {
    // Arrange
    const flights: Flight[] = [
      {
        originAirport: {
          city: { code: 'IST', name: 'İstanbul' },
          name: '',
          code: '',
          country: { code: '', name: '' },
        },
        destinationAirport: {
          city: { code: 'ESB', name: 'Ankara' },
          name: '',
          code: '',
          country: { code: '', name: '' },
        },
        departureDateTimeDisplay: '10:00',
        arrivalDateTimeDisplay: '',
        flightDuration: '',
        fareCategories: {
          ECONOMY: { subcategories: [{ price: { amount: 1000 } }] },
        } as FareCategories,
      },
      {
        originAirport: {
          city: { code: 'IST', name: 'İstanbul' },
          name: '',
          code: '',
          country: { code: '', name: '' },
        },
        destinationAirport: {
          city: { code: 'ESB', name: 'Ankara' },
          name: '',
          code: '',
          country: { code: '', name: '' },
        },
        departureDateTimeDisplay: '14:00',
        arrivalDateTimeDisplay: '',
        flightDuration: '',
        fareCategories: {
          ECONOMY: { subcategories: [{ price: { amount: 900 } }] },
        } as FareCategories,
      },
      {
        originAirport: {
          city: { code: 'ESB', name: 'Ankara' },
          name: '',
          code: '',
          country: { code: '', name: '' },
        },
        destinationAirport: {
          city: { code: 'IST', name: 'İstanbul' },
          name: '',
          code: '',
          country: { code: '', name: '' },
        },
        departureDateTimeDisplay: '09:00',
        arrivalDateTimeDisplay: '',
        flightDuration: '',
        fareCategories: {
          ECONOMY: { subcategories: [{ price: { amount: 800 } }] },
        } as FareCategories,
      },
    ];

    // Act
    const result = getRouteInfo(flights);

    // Assert
    expect(result).toEqual([
      {
        from: { code: 'IST', name: 'İstanbul' },
        to: { code: 'ESB', name: 'Ankara' },
        flightCount: 2,
        minPrice: 900,
        popularTimes: ['10:00', '14:00'],
      },
      {
        from: { code: 'ESB', name: 'Ankara' },
        to: { code: 'IST', name: 'İstanbul' },
        flightCount: 1,
        minPrice: 800,
        popularTimes: ['09:00'],
      },
    ]);
  });
});
