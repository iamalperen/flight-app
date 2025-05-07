import { Flight } from '../types';

import { getFarePrice } from './getFarePrice';

export const getLowestEconomyPrice = (flight: Flight, applyPromo: boolean): number | null => {
  const economySubcategories = flight.fareCategories.ECONOMY?.subcategories;
  if (!economySubcategories || economySubcategories.length === 0) return null;
  let minPrice: number | null = null;
  economySubcategories.forEach(sub => {
    const currentPrice = getFarePrice(sub, applyPromo && sub.brandCode === 'ecoFly');
    if (currentPrice !== null && (minPrice === null || currentPrice < minPrice)) {
      minPrice = currentPrice;
    }
  });
  return minPrice;
};
