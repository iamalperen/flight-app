import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFlightSearch } from '../context/FlightSearchContext';
import { AutocompleteOption, CabinType } from '../types/flightSearch';
import {
  getUniqueCities,
  getPopularRoutes,
  getAvailableDestinations,
  isValidRoute,
} from '../utils';

import { useFlights } from './useFlights';
import { useRecentSearches } from './useRecentSearches';

export function useFlightSearchForm() {
  const { flightsData, loading } = useFlights();
  const [route, setRoute] = useState<{
    from: AutocompleteOption | null;
    to: AutocompleteOption | null;
  }>({ from: null, to: null });
  const [passenger, setPassenger] = useState<{ count: number; cabin: CabinType }>({
    count: 1,
    cabin: 'economy',
  });
  const navigate = useNavigate();
  const { recent, addSearch } = useRecentSearches();
  const { setHeaderVariant } = useFlightSearch();

  useEffect(() => {
    setHeaderVariant('dark');
    return () => setHeaderVariant('light');
  }, [setHeaderVariant]);

  const cities = useMemo(() => {
    if (!flightsData) return [];
    return getUniqueCities(flightsData);
  }, [flightsData]);

  const availableDestinations = useMemo(() => {
    if (!flightsData || !route.from) return [];
    return getAvailableDestinations(flightsData, route.from.value);
  }, [flightsData, route.from]);

  // Recent options for 'from' and 'to'
  const recentFromOptions: AutocompleteOption[] = useMemo(() => {
    return recent.map(r => ({ ...r.from, recent: true }));
  }, [recent]);
  const recentToOptions: AutocompleteOption[] = useMemo(() => {
    return recent
      .filter(r => route.from && r.from.value === route.from.value)
      .map(r => ({ ...r.to, recent: true }));
  }, [recent, route.from]);

  // Merge recent and all options, avoiding duplicates
  function mergeOptions(recentOpts: AutocompleteOption[], allOpts: AutocompleteOption[]) {
    const seen = new Set(recentOpts.map(o => o.value));
    return [...recentOpts, ...allOpts.filter(o => !seen.has(o.value))];
  }

  const fromOptions = useMemo(
    () => mergeOptions(recentFromOptions, cities),
    [recentFromOptions, cities]
  );
  const toOptions = useMemo(
    () => mergeOptions(recentToOptions, availableDestinations),
    [recentToOptions, availableDestinations]
  );

  const popularRoutes = useMemo(() => {
    if (!flightsData) return [];
    return getPopularRoutes(flightsData);
  }, [flightsData]);

  const setFrom = (city: AutocompleteOption | null, resetTo = true) => {
    setRoute(r => ({
      from: city,
      to: resetTo ? null : r.to,
    }));
  };

  const setTo = (city: AutocompleteOption | null) => {
    setRoute(r => ({ ...r, to: city }));
  };

  const setFromAndTo = (from: AutocompleteOption | null, to: AutocompleteOption | null) => {
    setRoute({ from, to });
  };

  const handleCitySelect = useCallback(
    (city: AutocompleteOption | null, type: 'from' | 'to') => {
      if (city) {
        if (city.value.includes('-')) {
          const [fromCode, toCode] = city.value.split('-');
          const fromCity = cities.find((c: AutocompleteOption) => c.value === fromCode);
          const toCity = cities.find((c: AutocompleteOption) => c.value === toCode);
          if (fromCity && toCity) {
            setFromAndTo(fromCity, toCity);
            return;
          }
        }
        if (type === 'from') {
          setFrom(city, true);
        } else {
          setTo(city);
        }
      }
    },
    [cities]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (flightsData && isValidRoute(flightsData, route.from, route.to)) {
        // Add to recent searches
        if (route.from && route.to) {
          addSearch({ from: route.from, to: route.to });
        }
        navigate('/flights', {
          state: {
            from: route.from!.value,
            to: route.to!.value,
            passengerCount: passenger.count,
            cabin: passenger.cabin,
          },
        });
      }
    },
    [flightsData, route.from, route.to, passenger, addSearch, navigate]
  );

  useEffect(() => {
    if (route.to && !toOptions.some((c: AutocompleteOption) => c.value === route.to?.value)) {
      setRoute(r => ({ ...r, to: null }));
    }
  }, [route.from, route.to, toOptions]);

  return {
    from: route.from,
    to: route.to,
    passengers: passenger,
    fromOptions,
    toOptions,
    loading,
    setFrom,
    setTo,
    setPassenger,
    setFromAndTo,
    handleSubmit,
    popularRoutes,
    handleCitySelect,
  };
}
