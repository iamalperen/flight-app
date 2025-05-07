import mockData from '../data/flights.json';
import { FlightsData } from '../types';

class FlightService {
  async getFlights(): Promise<FlightsData> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData as FlightsData);
      }, 1000);
    });
  }
}

export default new FlightService();
