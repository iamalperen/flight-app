import { useCallback, useEffect, useState } from 'react';

import { AutocompleteOption } from '../types/flightSearch';

const STORAGE_KEY = 'recentFlightSearches';
const MAX_RECENT = 5;

export interface RecentSearch {
  from: AutocompleteOption;
  to: AutocompleteOption;
}

export function useRecentSearches() {
  const [recent, setRecent] = useState<RecentSearch[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRecent(JSON.parse(stored));
    }
  }, []);

  const addSearch = useCallback((search: RecentSearch) => {
    setRecent(prev => {
      const filtered = prev.filter(
        s => !(s.from.value === search.from.value && s.to.value === search.to.value)
      );
      const updated = [search, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recent, addSearch };
}
