import { FareCategories, Flight } from '../types/flight';

import { generateFlightKey } from './generateFlightKey';

const createMockFlight = (
  originCode: string,
  destCode: string,
  departureTime: string
): Partial<Flight> => ({
  originAirport: {
    code: originCode,
    name: 'Origin Airport',
    city: { code: originCode, name: 'Origin City' },
    country: { code: 'TR', name: 'Turkey' },
  },
  destinationAirport: {
    code: destCode,
    name: 'Destination Airport',
    city: { code: destCode, name: 'Destination City' },
    country: { code: 'TR', name: 'Turkey' },
  },
  departureDateTimeDisplay: departureTime,
  arrivalDateTimeDisplay: '',
  flightDuration: '',
  fareCategories: {} as unknown as FareCategories,
});

describe('generateFlightKey', () => {
  it('should generate the correct key for a valid flight', () => {
    // Arrange
    const flight = createMockFlight('IST', 'ESB', '10:30') as Flight;
    const expectedKey = 'IST-ESB-10:30';

    // Act
    const resultKey = generateFlightKey(flight);

    // Assert
    expect(resultKey).toBe(expectedKey);
  });

  it('should handle missing airport codes gracefully', () => {
    // Arrange
    const flightWithoutOrigin = {
      originAirport: { name: 'Origin', city: {}, country: {} },
      destinationAirport: { code: 'ESB', name: '', city: {}, country: {} },
      departureDateTimeDisplay: '12:00',
    } as unknown as Flight;
    const expectedKeyPartialOrigin = 'UNKNOWN-ESB-12:00';

    const flightWithoutDest = {
      originAirport: { code: 'IST', name: '', city: {}, country: {} },
      destinationAirport: { name: 'Dest', city: {}, country: {} },
      departureDateTimeDisplay: '14:00',
    } as unknown as Flight;
    const expectedKeyPartialDest = 'IST-UNKNOWN-14:00';

    // Act
    const resultPartialOrigin = generateFlightKey(flightWithoutOrigin);
    const resultPartialDest = generateFlightKey(flightWithoutDest);

    // Assert
    expect(resultPartialOrigin).toBe(expectedKeyPartialOrigin);
    expect(resultPartialDest).toBe(expectedKeyPartialDest);
  });

  it('should handle missing departure time gracefully', () => {
    // Arrange
    const flight = {
      originAirport: { code: 'SAW', name: '', city: {}, country: {} },
      destinationAirport: { code: 'AYT', name: '', city: {}, country: {} },
    } as unknown as Flight;
    const expectedKey = 'SAW-AYT-NODATE';

    // Act
    const resultKey = generateFlightKey(flight);

    // Assert
    expect(resultKey).toBe(expectedKey);
  });

  it('should handle potentially null or undefined flight properties', () => {
    // Arrange
    const flightWithNulls = {
      originAirport: null,
      destinationAirport: { code: 'ADB', name: '', city: {}, country: {} },
      departureDateTimeDisplay: '09:00',
    } as unknown as Flight;
    const expectedKey = 'UNKNOWN-ADB-09:00';

    // Act
    const resultKey = generateFlightKey(flightWithNulls);

    // Assert
    expect(resultKey).toBe(expectedKey);
  });
});
