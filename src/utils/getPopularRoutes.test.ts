import { FlightsData } from '../types/flight';

import { getPopularRoutes } from './getPopularRoutes';

describe('getPopularRoutes', () => {
  it('returns top 5 popular routes sorted by flight count', () => {
    // Arrange
    const flightsData = {
      flights: [
        {
          originAirport: { city: { code: 'IST', name: 'İstanbul' } },
          destinationAirport: { city: { code: 'ESB', name: 'Ankara' } },
          fareCategories: { ECONOMY: { subcategories: [{ price: { amount: 1000 } }] } },
          departureDateTimeDisplay: '10:00',
        },
        {
          originAirport: { city: { code: 'IST', name: 'İstanbul' } },
          destinationAirport: { city: { code: 'ESB', name: 'Ankara' } },
          fareCategories: { ECONOMY: { subcategories: [{ price: { amount: 900 } }] } },
          departureDateTimeDisplay: '14:00',
        },
        {
          originAirport: { city: { code: 'IST', name: 'İstanbul' } },
          destinationAirport: { city: { code: 'ESB', name: 'Ankara' } },
          fareCategories: { ECONOMY: { subcategories: [{ price: { amount: 950 } }] } },
          departureDateTimeDisplay: '16:00',
        },
        // 2 kez ESB-IST
        {
          originAirport: { city: { code: 'ESB', name: 'Ankara' } },
          destinationAirport: { city: { code: 'IST', name: 'İstanbul' } },
          fareCategories: { ECONOMY: { subcategories: [{ price: { amount: 800 } }] } },
          departureDateTimeDisplay: '09:00',
        },
        {
          originAirport: { city: { code: 'ESB', name: 'Ankara' } },
          destinationAirport: { city: { code: 'IST', name: 'İstanbul' } },
          fareCategories: { ECONOMY: { subcategories: [{ price: { amount: 850 } }] } },
          departureDateTimeDisplay: '18:00',
        },
        // 1 kez ADB-AYT
        {
          originAirport: { city: { code: 'ADB', name: 'İzmir' } },
          destinationAirport: { city: { code: 'AYT', name: 'Antalya' } },
          fareCategories: { ECONOMY: { subcategories: [{ price: { amount: 700 } }] } },
          departureDateTimeDisplay: '12:00',
        },
      ],
    };

    // Act
    const result = getPopularRoutes(flightsData as FlightsData);

    // Assert
    expect(result[0].label).toBe('İstanbul → Ankara');
    expect(result[0].value).toBe('IST-ESB');
    expect(result[0].price).toBe(900);
    expect(result[0].times).toEqual(['10:00', '14:00', '16:00']);
    expect(result[1].label).toBe('Ankara → İstanbul');
    expect(result[2].label).toBe('İzmir → Antalya');
    expect(result.length).toBeLessThanOrEqual(5);
  });
});
