import {
  FlightsData,
  Flight,
  Airport,
  FareCategories,
  City,
  Country,
  FareCategory,
} from '../types/flight';
import { AutocompleteOption } from '../types/flightSearch';

import { isValidRoute } from './isValidRoute';

const mockAirport = (cityCode: string, cityName: string): Airport => ({
  name: `${cityName} Airport`,
  code: cityCode,
  city: { code: cityCode, name: cityName } as City,
  country: { code: 'TR', name: 'Turkey' } as Country,
});

const mockFareCategories = (): FareCategories => ({
  ECONOMY: { subcategories: [] } as FareCategory,
  BUSINESS: { subcategories: [] } as FareCategory,
});

const mockFlight = (
  originCityCode: string,
  originCityName: string,
  destCityCode: string,
  destCityName: string
): Flight => ({
  originAirport: mockAirport(originCityCode, originCityName),
  destinationAirport: mockAirport(destCityCode, destCityName),
  arrivalDateTimeDisplay: '12:00',
  departureDateTimeDisplay: '10:00',
  flightDuration: '2h',
  fareCategories: mockFareCategories(),
});

describe('isValidRoute', () => {
  it('returns true if a valid route exists', () => {
    // Arrange
    const flightsData: FlightsData = {
      flights: [mockFlight('IST', 'İstanbul', 'ESB', 'Ankara')],
    };
    const from: AutocompleteOption = { value: 'IST', label: 'İstanbul' };
    const to: AutocompleteOption = { value: 'ESB', label: 'Ankara' };

    // Act
    const result = isValidRoute(flightsData, from, to);

    // Assert
    expect(result).toBe(true);
  });

  it('returns false if no valid route exists', () => {
    // Arrange
    const flightsData: FlightsData = {
      flights: [mockFlight('IST', 'İstanbul', 'ESB', 'Ankara')],
    };
    const from: AutocompleteOption = { value: 'IST', label: 'İstanbul' };
    const to: AutocompleteOption = { value: 'ADB', label: 'İzmir' };

    // Act
    const result = isValidRoute(flightsData, from, to);

    // Assert
    expect(result).toBe(false);
  });

  it('returns false if from or to is null', () => {
    // Arrange
    const flightsData: FlightsData = { flights: [] };
    const toArg: AutocompleteOption = { value: 'ESB', label: 'Ankara' };
    const fromArg: AutocompleteOption = { value: 'IST', label: 'İstanbul' };

    // Act & Assert
    expect(isValidRoute(flightsData, null, toArg)).toBe(false);
    expect(isValidRoute(flightsData, fromArg, null)).toBe(false);
  });
});
