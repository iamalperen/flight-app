export type ButtonColor = 'red' | 'blue' | 'green';

export type SortByType = 'ecoFlyPrice' | 'departureTime';

export interface ExpandedState {
  flightKey: string | null;
  section: 'ECONOMY' | 'BUSINESS' | null;
}
