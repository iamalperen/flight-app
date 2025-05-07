import mockData from '../data/flights.json';

import flightService from './flightService';

jest.setTimeout(10000);

describe('FlightService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return flights data', async () => {
    // Arrange
    const expectedData = mockData;

    // Act
    const promise = flightService.getFlights();
    jest.runAllTimers();
    const result = await promise;

    // Assert
    expect(result).toEqual(expectedData);
  });
});
