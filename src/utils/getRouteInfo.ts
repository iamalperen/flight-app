import { City, Flight } from '../types/flight';

interface RouteInfo {
  from: City;
  to: City;
  flightCount: number;
  minPrice: number;
  popularTimes: string[];
}

export function getRouteInfo(flights: Flight[]): RouteInfo[] {
  const routeMap = new Map<string, RouteInfo>();

  flights.forEach(flight => {
    const from = flight.originAirport.city;
    const to = flight.destinationAirport.city;
    const key = `${from.code}-${to.code}`;

    if (!routeMap.has(key)) {
      routeMap.set(key, {
        from,
        to,
        flightCount: 0,
        minPrice: Infinity,
        popularTimes: [],
      });
    }

    const route = routeMap.get(key)!;
    route.flightCount++;

    const economyPrice = flight.fareCategories.ECONOMY.subcategories[0].price.amount;
    if (economyPrice < route.minPrice) {
      route.minPrice = economyPrice;
    }

    route.popularTimes.push(flight.departureDateTimeDisplay);
  });

  return Array.from(routeMap.values());
} 