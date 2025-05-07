import { AutocompleteOption, FlightsData } from '../types';

export function getUniqueCities(flightsData: FlightsData): AutocompleteOption[] {
  const flights = flightsData.flights;
  const origins = flights.map(f => f.originAirport.city);
  const destinations = flights.map(f => f.destinationAirport.city);
  const all = [...origins, ...destinations];
  const unique: { [code: string]: (typeof origins)[0] } = {};
  all.forEach(c => {
    unique[c.code] = c;
  });
  return Object.values(unique).map(city => ({ label: city.name, value: city.code }));
}
