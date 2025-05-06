import { FlightsData } from '../types/flight';

import { getAvailableDestinations } from './getAvailableDestinations';

describe('getAvailableDestinations', () => {
  it('returns unique available destinations for a given origin', () => {
    // Arrange
    const flightsData: FlightsData = {
      flights: [
        {
          originAirport: {
            city: { code: 'IST', name: 'İstanbul' },
            name: 'İstanbul Havalimanı',
            code: 'IST',
            country: { code: 'TR', name: 'Türkiye' },
          },
          destinationAirport: {
            city: { code: 'ESB', name: 'Ankara' },
            name: 'Esenboğa Havalimanı',
            code: 'ESB',
            country: { code: 'TR', name: 'Türkiye' },
          },
          departureDateTimeDisplay: '',
          arrivalDateTimeDisplay: '',
          flightDuration: '',
          fareCategories: {
            ECONOMY: {
              subcategories: [
                {
                  price: { amount: 1000, currency: 'TRY' },
                  brandCode: 'ecoFly',
                  order: 0,
                  status: 'AVAILABLE',
                  rights: [],
                },
              ],
            },
            BUSINESS: { subcategories: [] },
          },
        },
        {
          originAirport: {
            city: { code: 'IST', name: 'İstanbul' },
            name: 'İstanbul Havalimanı',
            code: 'IST',
            country: { code: 'TR', name: 'Türkiye' },
          },
          destinationAirport: {
            city: { code: 'ADB', name: 'İzmir' },
            name: 'Adnan Menderes',
            code: 'ADB',
            country: { code: 'TR', name: 'Türkiye' },
          },
          departureDateTimeDisplay: '',
          arrivalDateTimeDisplay: '',
          flightDuration: '',
          fareCategories: {
            ECONOMY: {
              subcategories: [
                {
                  price: { amount: 900, currency: 'TRY' },
                  brandCode: 'ecoFly',
                  order: 0,
                  status: 'AVAILABLE',
                  rights: [],
                },
              ],
            },
            BUSINESS: { subcategories: [] },
          },
        },
        {
          originAirport: {
            city: { code: 'IST', name: 'İstanbul' },
            name: 'İstanbul Havalimanı',
            code: 'IST',
            country: { code: 'TR', name: 'Türkiye' },
          },
          destinationAirport: {
            city: { code: 'ESB', name: 'Ankara' },
            name: 'Esenboğa Havalimanı',
            code: 'ESB',
            country: { code: 'TR', name: 'Türkiye' },
          },
          departureDateTimeDisplay: '',
          arrivalDateTimeDisplay: '',
          flightDuration: '',
          fareCategories: {
            ECONOMY: {
              subcategories: [
                {
                  price: { amount: 950, currency: 'TRY' },
                  brandCode: 'ecoFly',
                  order: 0,
                  status: 'AVAILABLE',
                  rights: [],
                },
              ],
            },
            BUSINESS: { subcategories: [] },
          },
        },
        {
          originAirport: {
            city: { code: 'ESB', name: 'Ankara' },
            name: 'Esenboğa Havalimanı',
            code: 'ESB',
            country: { code: 'TR', name: 'Türkiye' },
          },
          destinationAirport: {
            city: { code: 'IST', name: 'İstanbul' },
            name: 'İstanbul Havalimanı',
            code: 'IST',
            country: { code: 'TR', name: 'Türkiye' },
          },
          departureDateTimeDisplay: '',
          arrivalDateTimeDisplay: '',
          flightDuration: '',
          fareCategories: {
            ECONOMY: {
              subcategories: [
                {
                  price: { amount: 800, currency: 'TRY' },
                  brandCode: 'ecoFly',
                  order: 0,
                  status: 'AVAILABLE',
                  rights: [],
                },
              ],
            },
            BUSINESS: { subcategories: [] },
          },
        },
      ],
    };

    // Act
    const result = getAvailableDestinations(flightsData, 'IST');

    // Assert
    expect(result).toEqual([
      { label: 'Ankara', value: 'ESB' },
      { label: 'İzmir', value: 'ADB' },
    ]);
  });
});
