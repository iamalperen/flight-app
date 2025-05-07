import { Flight, FareSubcategory } from '../types';

import { getActualEcoFlyPrice } from './getActualEcoFlyPrice';
import { getFarePrice } from './getFarePrice';

jest.mock('./getFarePrice');
const getFarePriceMock = getFarePrice as jest.Mock;

describe('getActualEcoFlyPrice', () => {
  const mockEcoFlyFare: FareSubcategory = {
    brandCode: 'ecoFly',
    price: { amount: 100, currency: 'TRY' },
    order: 1,
    status: 'AVAILABLE',
    rights: [],
  };

  const mockExtraFlyFare: FareSubcategory = {
    brandCode: 'extraFly',
    price: { amount: 150, currency: 'TRY' },
    order: 2,
    status: 'AVAILABLE',
    rights: [],
  };

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
        subcategories: [mockEcoFlyFare, mockExtraFlyFare],
      },
      BUSINESS: {
        subcategories: [mockBusinessFare],
      },
    },
  };

  const flightNoEcoFly = {
    ...mockFlight,
    fareCategories: {
      ECONOMY: {
        subcategories: [mockExtraFlyFare],
      },
      BUSINESS: {
        subcategories: [mockBusinessFare],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the ecoFly price without promo', () => {
    // Arrange & Act
    getFarePriceMock.mockReturnValueOnce(100);

    // Assert
    expect(getActualEcoFlyPrice(mockFlight, false)).toBe(100);
    expect(getFarePriceMock).toHaveBeenCalledWith(mockEcoFlyFare, false);
  });

  it('should return the discounted ecoFly price with promo', () => {
    // Arrange & Act
    getFarePriceMock.mockReturnValueOnce(50);

    // Assert
    expect(getActualEcoFlyPrice(mockFlight, true)).toBe(50);
    expect(getFarePriceMock).toHaveBeenCalledWith(mockEcoFlyFare, true);
  });

  it('should return null if ecoFly is not available', () => {
    // Assert
    expect(getActualEcoFlyPrice(flightNoEcoFly, false)).toBeNull();
    expect(getFarePriceMock).not.toHaveBeenCalled();
  });
});
