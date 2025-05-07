import { Flight, FareSubcategory } from '../types';

import { getBusinessPrice } from './getBusinessPrice';

describe('getBusinessPrice', () => {
  const mockBusinessFare: FareSubcategory = {
    brandCode: 'primeFly',
    price: { amount: 400, currency: 'TRY' },
    order: 1,
    status: 'AVAILABLE',
    rights: [],
  };

  const mockFlight: Flight = {
    originAirport: {
      name: 'Origin Airport',
      code: 'ORG',
      city: { code: 'ORG', name: 'Origin City' },
      country: { code: 'TR', name: 'Turkey' },
    },
    destinationAirport: {
      name: 'Destination Airport',
      code: 'DST',
      city: { code: 'DST', name: 'Destination City' },
      country: { code: 'TR', name: 'Turkey' },
    },
    arrivalDateTimeDisplay: '12:00',
    departureDateTimeDisplay: '10:00',
    flightDuration: '2h',
    fareCategories: {
      ECONOMY: {
        subcategories: [],
      },
      BUSINESS: {
        subcategories: [mockBusinessFare],
      },
    },
  };

  const mockFlightNoBusiness: Flight = {
    ...mockFlight,
    fareCategories: {
      ...mockFlight.fareCategories,
      BUSINESS: {
        subcategories: [],
      },
    },
  };

  it('should return the business price', () => {
    // Assert
    expect(getBusinessPrice(mockFlight)).toBe(400);
  });

  it('should return null if no business fares are available', () => {
    // Assert
    expect(getBusinessPrice(mockFlightNoBusiness)).toBeNull();
  });
});
