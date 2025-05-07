import { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SortByType, ExpandedState, Flight, FareSubcategory } from '../types';
import { getActualEcoFlyPrice } from '../utils';

import { useFlights } from './index';

interface LocationState {
  from: string;
  to: string;
  passengerCount: number;
}

export interface FlightListManagerReturn {
  isLoading: boolean;
  hasCriteria: boolean;
  sortedFlights: Flight[];
  sortBy: SortByType;
  promoCodeActive: boolean;
  expandedDetails: ExpandedState;
  fromCityName: string | undefined;
  toCityName: string | undefined;
  actualPassengerCount: number;
  setSortBy: Dispatch<SetStateAction<SortByType>>;
  setPromoCodeActive: Dispatch<SetStateAction<boolean>>;
  toggleExpand: (flightKey: string, section: 'ECONOMY' | 'BUSINESS') => void;
  handleSelectFare: (flight: Flight, subcategory: FareSubcategory) => void;
}

export function useFlightListManager(): FlightListManagerReturn {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location as { state: LocationState | null };
  const { flightsData, loading: flightsLoading } = useFlights();

  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [sortedFlights, setSortedFlights] = useState<Flight[]>([]);
  const [sortBy, setSortBy] = useState<SortByType>('ecoFlyPrice');
  const [promoCodeActive, setPromoCodeActive] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<ExpandedState>({
    flightKey: null,
    section: null,
  });

  // Handle redirection if no search criteria
  useEffect(() => {
    if (!state && !flightsLoading) {
      navigate('/');
    }
  }, [state, navigate, flightsLoading]);

  const { fromCityName, toCityName, actualPassengerCount } = useMemo(() => {
    if (!state || !flightsData)
      return {
        fromCityName: state?.from,
        toCityName: state?.to,
        actualPassengerCount: state?.passengerCount || 1,
      };

    const firstMatch = flightsData.flights.find(
      f => f.originAirport.city.code === state.from && f.destinationAirport.city.code === state.to
    );

    return {
      fromCityName: firstMatch?.originAirport.city.name || state.from,
      toCityName: firstMatch?.destinationAirport.city.name || state.to,
      actualPassengerCount: state.passengerCount,
    };
  }, [state, flightsData]);

  // Filter flights by origin and destination
  useEffect(() => {
    if (!flightsData || !state) {
      setFilteredFlights([]);
      return;
    }

    const relevantFlights = flightsData.flights.filter(
      flight =>
        flight.originAirport.city.code === state.from &&
        flight.destinationAirport.city.code === state.to
    );

    setFilteredFlights(relevantFlights);
  }, [flightsData, state]);

  // Sort flights by selected criteria
  useEffect(() => {
    if (filteredFlights.length === 0) {
      setSortedFlights([]);
      return;
    }

    const tempSortedFlights = [...filteredFlights];

    if (sortBy === 'ecoFlyPrice') {
      tempSortedFlights.sort((a, b) => {
        const priceA = getActualEcoFlyPrice(a, promoCodeActive);
        const priceB = getActualEcoFlyPrice(b, promoCodeActive);
        if (priceA === null) return 1;
        if (priceB === null) return -1;
        return priceA - priceB;
      });
    } else if (sortBy === 'departureTime') {
      tempSortedFlights.sort((a, b) => {
        return a.departureDateTimeDisplay.localeCompare(b.departureDateTimeDisplay);
      });
    }

    setSortedFlights(tempSortedFlights);
  }, [filteredFlights, sortBy, promoCodeActive]);

  // Handle flight detail expansion toggling
  const toggleExpand = (flightKey: string, section: 'ECONOMY' | 'BUSINESS') => {
    setExpandedDetails(prevDetails => {
      const isCurrentlyExpanded =
        prevDetails.flightKey === flightKey && prevDetails.section === section;

      return isCurrentlyExpanded ? { flightKey: null, section: null } : { flightKey, section };
    });
  };

  const handleSelectFare = (flight: Flight, subcategory: FareSubcategory) => {
    navigate('/cabin-selection', {
      state: {
        flightDetails: flight,
        selectedFare: subcategory,
        status: subcategory.status,
      },
    });
  };

  return {
    isLoading: flightsLoading,
    hasCriteria: !!state,
    sortedFlights,
    sortBy,
    promoCodeActive,
    expandedDetails,
    fromCityName,
    toCityName,
    actualPassengerCount,
    setSortBy,
    setPromoCodeActive,
    toggleExpand,
    handleSelectFare,
  };
}
