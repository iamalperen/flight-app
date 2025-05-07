import { FlightsData } from '../types/flight';
import { AutocompleteOption } from '../types/flightSearch';

export function getAvailableDestinations(
  flightsData: FlightsData,
  originCode: string
): AutocompleteOption[] {
  const flights = flightsData.flights;
  const destinations = flights
    .filter(flight => flight.originAirport.city.code === originCode)
    .map(flight => flight.destinationAirport.city);

  const uniqueDestinations = Array.from(new Set(destinations.map(d => d.code))).map(
    code => destinations.find(d => d.code === code)!
  );

  return uniqueDestinations.map(city => ({
    label: city.name,
    value: city.code,
  }));
} 