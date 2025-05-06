import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Flight } from '../types/flight';
import { AutocompleteOption, CabinType } from '../types/flightSearch';

type HeaderVariant = 'dark' | 'light';

export interface FlightSearchCriteria {
  from: AutocompleteOption | null;
  to: AutocompleteOption | null;
  passengerCount: number;
  cabin: CabinType;
}

export interface FlightSearchContextType {
  criteria: FlightSearchCriteria;
  setCriteria: (c: FlightSearchCriteria) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (f: Flight | null) => void;
  headerVariant: HeaderVariant;
  setHeaderVariant: (v: HeaderVariant) => void;
}

const defaultCriteria: FlightSearchCriteria = {
  from: null,
  to: null,
  passengerCount: 1,
  cabin: 'economy',
};

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(undefined);

export const FlightSearchProvider = ({ children }: { children: ReactNode }) => {
  const [criteria, setCriteria] = useState<FlightSearchCriteria>(defaultCriteria);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [headerVariant, setHeaderVariant] = useState<HeaderVariant>('light');

  return (
    <FlightSearchContext.Provider
      value={{
        criteria,
        setCriteria,
        selectedFlight,
        setSelectedFlight,
        headerVariant,
        setHeaderVariant,
      }}
    >
      {children}
    </FlightSearchContext.Provider>
  );
};

export function useFlightSearch() {
  const ctx = useContext(FlightSearchContext);
  if (!ctx) throw new Error('useFlightSearch must be used within FlightSearchProvider');
  return ctx;
}
