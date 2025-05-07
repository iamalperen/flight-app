import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { AutocompleteOption } from '../../types/flightSearch';

export interface AutocompleteInputProps {
  value: string;
  onChange: (option: AutocompleteOption | null) => void;
  options: AutocompleteOption[];
  placeholder: string;
  disabled?: boolean;
  onSearch?: (query: string) => Promise<void>;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const debouncedSearch = useCallback(
    async (query: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(async () => {
        if (onSearch) {
          try {
            setIsSearching(true);
            setError(null);
            await onSearch(query);
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Arama sırasında bir hata oluştu');
          } finally {
            setIsSearching(false);
          }
        }
      }, 300);
    },
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    onChange(null);
    debouncedSearch(newValue);
  };

  const handleOptionClick = (option: AutocompleteOption) => {
    setInputValue(option.label);
    onChange(option);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent, option: AutocompleteOption) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleOptionClick(option);
    }
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const recentOptions = filteredOptions.filter(option => option.recent);
  const otherOptions = filteredOptions.filter(option => !option.recent);

  return (
    <div className="relative w-full" ref={wrapperRef} data-testid="autocomplete-wrapper">
      <div className="relative">
        <input
          data-testid="autocomplete-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? 'autocomplete-error' : undefined}
        />
        {isSearching && (
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            data-testid="loading-spinner"
          >
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-gray-400 animate-spin"
              aria-label="Yükleniyor..."
            />
          </div>
        )}
      </div>
      {error && (
        <div
          id="autocomplete-error"
          className="text-red-500 text-sm mt-1"
          data-testid="error-message"
          role="alert"
        >
          {error}
        </div>
      )}
      {isOpen && filteredOptions.length > 0 && !disabled && (
        <div
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
          data-testid="options-list"
        >
          {recentOptions.length === 0 && otherOptions.length === 1 ? (
            <button
              key={otherOptions[0].value}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleOptionClick(otherOptions[0])}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, otherOptions[0])}
              data-testid="single-option"
            >
              <div className="font-medium text-gray-800">{otherOptions[0].label}</div>
              {otherOptions[0].price && (
                <div className="text-sm text-gray-600 mt-1">
                  <span className="text-flightred font-medium">{otherOptions[0].price} TL</span>
                  {otherOptions[0].times && (
                    <span className="ml-2 text-gray-500">
                      {otherOptions[0].times.slice(0, 2).join(', ')}
                    </span>
                  )}
                </div>
              )}
            </button>
          ) : (
            <>
              {recentOptions.length > 0 && (
                <>
                  <div
                    className="px-4 py-2 text-xs text-gray-500 bg-gray-50"
                    data-testid="recent-searches-header"
                  >
                    Son Aramalar
                  </div>
                  {recentOptions.map(option => (
                    <button
                      key={option.value}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleOptionClick(option)}
                      tabIndex={0}
                      onKeyDown={(e) => handleKeyDown(e, option)}
                      data-testid="recent-option"
                    >
                      <span className="text-gray-400 mr-2">🕒</span>
                      {option.label}
                    </button>
                  ))}
                </>
              )}
              {otherOptions.length > 0 && (
                <>
                  <div
                    className="px-4 py-2 text-xs text-gray-500 bg-gray-50"
                    data-testid={recentOptions.length > 0 ? "other-options-header" : "all-options-header"}
                  >
                    {recentOptions.length > 0 ? 'Diğer Şehirler' : 'Tüm Şehirler'}
                  </div>
                  {otherOptions.map(option => (
                    <button
                      key={option.value}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick(option)}
                      tabIndex={0}
                      onKeyDown={(e) => handleKeyDown(e, option)}
                      data-testid="other-option"
                    >
                      <div className="font-medium text-gray-800">{option.label}</div>
                    </button>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
