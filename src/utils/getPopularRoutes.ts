import { FlightsData } from '../types/flight';
import { AutocompleteOption } from '../types/flightSearch';

import { getRouteInfo } from './getRouteInfo';

export function getPopularRoutes(flightsData: FlightsData): AutocompleteOption[] {
  const routeInfo = getRouteInfo(flightsData.flights);

  return routeInfo
    .sort((a, b) => b.flightCount - a.flightCount)
    .slice(0, 5)
    .map(route => ({
      label: `${route.from.name} → ${route.to.name}`,
      value: `${route.from.code}-${route.to.code}`,
      popular: true,
      price: route.minPrice,
      times: route.popularTimes,
    }));
}
