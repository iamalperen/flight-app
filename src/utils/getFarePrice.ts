import { FareSubcategory } from '../types';

export const getFarePrice = (
  fare: FareSubcategory | undefined,
  applyPromo: boolean
): number | null => {
  if (!fare) return null;
  let price = fare.price.amount;
  if (applyPromo && fare.brandCode === 'ecoFly') {
    price /= 2;
  }
  return price;
};
