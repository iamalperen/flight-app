import { getUniqueCities } from './getUniqueCities';
import { FlightsData } from '../types/flight';

describe('getUniqueCities', () => {
  it('returns unique cities from flights data', () => {
    // Arrange
    const flightsData: FlightsData = {
      flights: [
        {
          originAirport: { city: { code: 'IST', name: 'İstanbul' }, name: '', code: '', country: { code: '', name: '' } },
          destinationAirport: { city: { code: 'ESB', name: 'Ankara' }, name: '', code: '', country: { code: '', name: '' } },
          departureDateTimeDisplay: '',
          arrivalDateTimeDisplay: '',
          flightDuration: '',
          fareCategories: {} as any,
        },
        {
          originAirport: { city: { code: 'IST', name: 'İstanbul' }, name: '', code: '', country: { code: '', name: '' } },
          destinationAirport: { city: { code: 'ADB', name: 'İzmir' }, name: '', code: '', country: { code: '', name: '' } },
          departureDateTimeDisplay: '',
          arrivalDateTimeDisplay: '',
          flightDuration: '',
          fareCategories: {} as any,
        },
        {
          originAirport: { city: { code: 'ESB', name: 'Ankara' }, name: '', code: '', country: { code: '', name: '' } },
          destinationAirport: { city: { code: 'IST', name: 'İstanbul' }, name: '', code: '', country: { code: '', name: '' } },
          departureDateTimeDisplay: '',
          arrivalDateTimeDisplay: '',
          flightDuration: '',
          fareCategories: {} as any,
        },
      ]
    };

    // Act
    const result = getUniqueCities(flightsData);

    // Assert
    expect(result).toEqual([
      { label: 'İstanbul', value: 'IST' },
      { label: 'Ankara', value: 'ESB' },
      { label: 'İzmir', value: 'ADB' },
    ]);
  });
}); 