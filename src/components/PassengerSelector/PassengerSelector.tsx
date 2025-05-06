import { faUser, faMinus, faPlus, faChair, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState, useEffect } from 'react';

import { CabinType, PassengerValue } from '../../types/flightSearch';

export interface PassengerSelectorProps {
  value: PassengerValue;
  onChange: (value: PassengerValue) => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountChange = (newCount: number) => {
    if (newCount >= 1) {
      onChange({ ...value, count: newCount });
    }
  };

  const handleCabinChange = (newCabin: CabinType) => {
    onChange({ ...value, cabin: newCabin });
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen);
  };

  const handleDecreaseClick = () => {
    handleCountChange(value.count - 1);
  };

  const handleIncreaseClick = () => {
    handleCountChange(value.count + 1);
  };

  const handleCabinEconomyChange = () => {
    handleCabinChange('economy');
  };

  const handleCabinBusinessChange = () => {
    handleCabinChange('business');
  };

  const handleCabinEconomyRadio = () => {
    handleCabinChange('economy');
  };

  const handleCabinBusinessRadio = () => {
    handleCabinChange('business');
  };

  const isDecreaseDisabled = value.count <= 1;

  return (
    <div
      data-testid="passenger-selector"
      ref={wrapperRef}
      className="relative flex items-center bg-white rounded-r-md px-4 min-w-[120px] h-11 min-h-[44px] box-border cursor-pointer"
    >
      <div
        data-testid="passenger-selector-trigger"
        className="flex items-center w-full"
        onClick={handleTriggerClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleTriggerKeyDown}
      >
        <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
        <span className="text-gray-700">{value.count} Yolcu</span>
      </div>
      {isOpen && (
        <div
          data-testid="passenger-selector-dropdown"
          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg z-10"
        >
          <div className="p-4">
            <div className="mb-4">
              <label
                htmlFor="passenger-count-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Yolcu Sayısı
              </label>
              <div className="flex items-center">
                <button
                  data-testid="passenger-count-decrease"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  onClick={handleDecreaseClick}
                  disabled={isDecreaseDisabled}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    className={isDecreaseDisabled ? 'text-gray-300' : 'text-gray-600'}
                  />
                </button>
                <input
                  id="passenger-count-input"
                  data-testid="passenger-count"
                  className="mx-4 w-10 text-center border-none bg-transparent focus:ring-0"
                  type="number"
                  value={value.count}
                  readOnly
                  aria-label="Yolcu Sayısı"
                />
                <button
                  data-testid="passenger-count-increase"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  onClick={handleIncreaseClick}
                >
                  <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
                </button>
              </div>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Kabin Sınıfı</span>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="cabin-economy-input" className="w-full">
                  <input
                    id="cabin-economy-input"
                    type="radio"
                    name="cabin-type"
                    value="economy"
                    checked={value.cabin === 'economy'}
                    onChange={handleCabinEconomyRadio}
                    className="sr-only"
                  />
                  <button
                    type="button"
                    data-testid="cabin-economy"
                    className={`p-2 rounded flex items-center gap-2 w-full ${
                      value.cabin === 'economy'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={handleCabinEconomyChange}
                  >
                    <FontAwesomeIcon
                      icon={faChair}
                      className={value.cabin === 'economy' ? 'text-white' : 'text-blue-500'}
                    />
                    Ekonomi
                  </button>
                </label>
                <label htmlFor="cabin-business-input" className="w-full">
                  <input
                    id="cabin-business-input"
                    type="radio"
                    name="cabin-type"
                    value="business"
                    checked={value.cabin === 'business'}
                    onChange={handleCabinBusinessRadio}
                    className="sr-only"
                  />
                  <button
                    type="button"
                    data-testid="cabin-business"
                    className={`p-2 rounded flex items-center gap-2 w-full ${
                      value.cabin === 'business'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    onClick={handleCabinBusinessChange}
                  >
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className={value.cabin === 'business' ? 'text-white' : 'text-blue-500'}
                    />
                    Business
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerSelector;
