import { Flight } from '../types';

export const getBusinessPrice = (flight: Flight): number | null => {
  const businessSubcategories = flight.fareCategories.BUSINESS?.subcategories;
  if (!businessSubcategories || businessSubcategories.length === 0) return null;
  return businessSubcategories[0].price.amount;
};
