import { AutocompleteOption, FlightsData } from '../types';

export function isValidRoute(
  flightsData: FlightsData,
  from: AutocompleteOption | null,
  to: AutocompleteOption | null
): boolean {
  if (!from || !to) return false;
  const flights = flightsData.flights;
  return flights.some(
    f => f.originAirport.city.code === from.value && f.destinationAirport.city.code === to.value
  );
}
