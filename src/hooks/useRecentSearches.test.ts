import { act, renderHook } from '@testing-library/react';

import { AutocompleteOption } from '../types';

import { useRecentSearches, RecentSearch } from './useRecentSearches';

describe('useRecentSearches', () => {
  const from: AutocompleteOption = { value: 'IST', label: 'İstanbul' };
  const to: AutocompleteOption = { value: 'ESB', label: 'Ankara' };
  const another: AutocompleteOption = { value: 'AYT', label: 'Antalya' };
  const STORAGE_KEY = 'recentFlightSearches';

  let getItemMock: jest.Mock;
  let setItemMock: jest.Mock;

  beforeEach(() => {
    getItemMock = jest.fn();
    setItemMock = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getItemMock,
        setItem: setItemMock,
        clear: jest.fn(),
      },
      writable: true,
    });
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads recent searches from localStorage on mount', () => {
    // Arrange
    const stored: RecentSearch[] = [
      { from, to },
      { from: another, to },
    ];
    getItemMock.mockReturnValueOnce(JSON.stringify(stored));
    // Act
    const { result } = renderHook(() => useRecentSearches());
    // Assert
    expect(result.current.recent).toEqual(stored);
    expect(getItemMock).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('addSearch adds a new search to state and localStorage', () => {
    // Arrange
    getItemMock.mockReturnValueOnce(null);
    const { result } = renderHook(() => useRecentSearches());
    // Act
    act(() => {
      result.current.addSearch({ from, to });
    });
    // Assert
    expect(result.current.recent[0]).toEqual({ from, to });
    expect(setItemMock).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([{ from, to }]));
  });

  it('addSearch moves existing search to top and deduplicates', () => {
    // Arrange
    const stored: RecentSearch[] = [
      { from, to },
      { from: another, to },
    ];
    getItemMock.mockReturnValueOnce(JSON.stringify(stored));
    const { result } = renderHook(() => useRecentSearches());
    // Act
    act(() => {
      result.current.addSearch({ from, to });
    });
    // Assert
    expect(result.current.recent[0]).toEqual({ from, to });
    expect(result.current.recent.length).toBe(2);
  });

  it('addSearch keeps only the most recent 5 searches', () => {
    // Arrange
    const searches: RecentSearch[] = Array.from({ length: 5 }, (_, i) => ({
      from: { value: `F${i}`, label: `From${i}` },
      to: { value: `T${i}`, label: `To${i}` },
    }));
    getItemMock.mockReturnValueOnce(JSON.stringify(searches));
    const { result } = renderHook(() => useRecentSearches());
    // Act
    act(() => {
      result.current.addSearch({ from, to });
    });
    // Assert
    expect(result.current.recent.length).toBe(5);
    expect(result.current.recent[0]).toEqual({ from, to });
  });
});
