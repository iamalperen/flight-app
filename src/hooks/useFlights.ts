import { useState, useEffect } from 'react';

import flightService from '../services/flightService';
import { FlightsData } from '../types/flight';

export const useFlights = () => {
  const [flightsData, setFlightsData] = useState<FlightsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    flightService
      .getFlights()
      .then(setFlightsData)
      .catch(() => setFlightsData(null))
      .finally(() => setLoading(false));
  }, []);

  return { flightsData, loading };
};
