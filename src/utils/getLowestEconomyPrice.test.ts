import { Flight, FareSubcategory } from '../types';

import { getFarePrice } from './getFarePrice';
import { getLowestEconomyPrice } from './getLowestEconomyPrice';

jest.mock('./getFarePrice');
const getFarePriceMock = getFarePrice as jest.Mock;

describe('getLowestEconomyPrice', () => {
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

  const mockPrimeFlyFare: FareSubcategory = {
    brandCode: 'primeFly',
    price: { amount: 200, currency: 'TRY' },
    order: 3,
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

  // Mock flight with economy fares
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
        subcategories: [mockEcoFlyFare, mockExtraFlyFare, mockPrimeFlyFare],
      },
      BUSINESS: {
        subcategories: [mockBusinessFare],
      },
    },
  };

  const mockFlightNoEconomy: Flight = {
    ...mockFlight,
    fareCategories: {
      ...mockFlight.fareCategories,
      ECONOMY: {
        subcategories: [],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the lowest economy price without promo', () => {
    getFarePriceMock
      .mockReturnValueOnce(100) // ecoFly
      .mockReturnValueOnce(150) // extraFly
      .mockReturnValueOnce(200); // primeFly

    expect(getLowestEconomyPrice(mockFlight, false)).toBe(100);
    expect(getFarePriceMock).toHaveBeenCalledTimes(3);
    expect(getFarePriceMock).toHaveBeenCalledWith(mockEcoFlyFare, false);
    expect(getFarePriceMock).toHaveBeenCalledWith(mockExtraFlyFare, false);
    expect(getFarePriceMock).toHaveBeenCalledWith(mockPrimeFlyFare, false);
  });

  it('should consider promo discount when calculating lowest price', () => {
    // Arrange & Act
    getFarePriceMock.mockReturnValueOnce(50).mockReturnValueOnce(150).mockReturnValueOnce(200);

    // Assert
    expect(getLowestEconomyPrice(mockFlight, true)).toBe(50);
    expect(getFarePriceMock).toHaveBeenCalledTimes(3);
    expect(getFarePriceMock).toHaveBeenCalledWith(mockEcoFlyFare, true);
    expect(getFarePriceMock).toHaveBeenCalledWith(mockExtraFlyFare, false);
    expect(getFarePriceMock).toHaveBeenCalledWith(mockPrimeFlyFare, false);
  });

  it('should return null if no economy fares are available', () => {
    // Assert
    expect(getLowestEconomyPrice(mockFlightNoEconomy, false)).toBeNull();
    expect(getFarePriceMock).not.toHaveBeenCalled();
  });
});
