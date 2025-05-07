import { isValidRoute } from './isValidRoute';

describe('isValidRoute', () => {
  it('returns true if a valid route exists', () => {
    // Arrange
    const flightsData = {
      flights: [
        { originAirport: { city: { code: 'IST', name: 'İstanbul' } }, destinationAirport: { city: { code: 'ESB', name: 'Ankara' } } },
      ]
    };
    const from = { value: 'IST', label: 'İstanbul' };
    const to = { value: 'ESB', label: 'Ankara' };

    // Act
    const result = isValidRoute(flightsData as any, from, to);

    // Assert
    expect(result).toBe(true);
  });

  it('returns false if no valid route exists', () => {
    // Arrange
    const flightsData = {
      flights: [
        { originAirport: { city: { code: 'IST', name: 'İstanbul' } }, destinationAirport: { city: { code: 'ESB', name: 'Ankara' } } },
      ]
    };
    const from = { value: 'IST', label: 'İstanbul' };
    const to = { value: 'ADB', label: 'İzmir' };

    // Act
    const result = isValidRoute(flightsData as any, from, to);

    // Assert
    expect(result).toBe(false);
  });

  it('returns false if from or to is null', () => {
    // Arrange
    const flightsData = { flights: [] };

    // Act & Assert
    expect(isValidRoute(flightsData as any, null, { value: 'ESB', label: 'Ankara' })).toBe(false);
    expect(isValidRoute(flightsData as any, { value: 'IST', label: 'İstanbul' }, null)).toBe(false);
  });
}); 