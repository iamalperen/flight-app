import { Flight } from '../types';

import { getFarePrice } from './getFarePrice';

export const getActualEcoFlyPrice = (flight: Flight, applyPromo: boolean): number | null => {
  const ecoFlySub = flight.fareCategories.ECONOMY?.subcategories.find(
    sc => sc.brandCode === 'ecoFly'
  );
  if (!ecoFlySub) return null;
  return getFarePrice(ecoFlySub, applyPromo);
};
