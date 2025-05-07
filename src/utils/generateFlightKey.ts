import { Flight } from '../types';

export const generateFlightKey = (flight: Flight): string => {
  const originCode = flight?.originAirport?.code || 'UNKNOWN';
  const destCode = flight?.destinationAirport?.code || 'UNKNOWN';
  const departureTime = flight?.departureDateTimeDisplay || 'NODATE';

  return `${originCode}-${destCode}-${departureTime}`;
};
