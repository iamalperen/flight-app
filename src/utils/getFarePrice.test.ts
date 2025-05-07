import { FareSubcategory } from '../types';

import { getFarePrice } from './getFarePrice';

describe('getFarePrice', () => {
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

  it('should return null if fare is undefined', () => {
    // Assert
    expect(getFarePrice(undefined, false)).toBeNull();
  });

  it('should return the original price when promo is not applied', () => {
    // Assert
    expect(getFarePrice(mockEcoFlyFare, false)).toBe(100);
    expect(getFarePrice(mockExtraFlyFare, false)).toBe(150);
  });

  it('should return half price for ecoFly when promo is applied', () => {
    // Assert
    expect(getFarePrice(mockEcoFlyFare, true)).toBe(50);
  });

  it('should not discount other fare types even when promo is applied', () => {
    // Assert
    expect(getFarePrice(mockExtraFlyFare, true)).toBe(150);
    expect(getFarePrice(mockPrimeFlyFare, true)).toBe(200);
  });
});
