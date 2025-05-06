export interface City {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface Airport {
  name: string;
  code: string;
  city: City;
  country: Country;
}

export type FareStatus = 'AVAILABLE' | 'ERROR';

export interface FarePrice {
  amount: number;
  currency: string;
}

export interface FareSubcategory {
  brandCode: 'ecoFly' | 'extraFly' | 'primeFly';
  price: FarePrice;
  order: number;
  status: FareStatus;
  rights: string[];
}

export interface FareCategory {
  subcategories: FareSubcategory[];
}

export interface FareCategories {
  BUSINESS: FareCategory;
  ECONOMY: FareCategory;
}

export interface Flight {
  originAirport: Airport;
  destinationAirport: Airport;
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  fareCategories: FareCategories;
}

export interface FlightsData {
  flights: Flight[];
}
