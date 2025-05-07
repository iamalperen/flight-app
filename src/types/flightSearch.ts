export interface AutocompleteOption {
  value: string;
  label: string;
  recent?: boolean;
  popular?: boolean;
  price?: number;
  times?: string[];
}

export type CabinType = 'economy' | 'business' | 'first';

export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

export interface FlightSearchCriteria {
  from: AutocompleteOption | null;
  to: AutocompleteOption | null;
  passengers: PassengerCounts;
  cabin: CabinType;
}

export interface FlightSearchFormProps {
  from: AutocompleteOption | null;
  to: AutocompleteOption | null;
  passengers: PassengerCounts;
  cabin: CabinType;
  fromOptions: AutocompleteOption[];
  toOptions: AutocompleteOption[];
  loading: boolean;
  onFromChange: (city: AutocompleteOption | null) => void;
  onToChange: (city: AutocompleteOption | null) => void;
  onPassengersChange: (counts: PassengerCounts) => void;
  onCabinChange: (cabin: CabinType) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface PassengerValue {
  count: number;
  cabin: CabinType;
}
