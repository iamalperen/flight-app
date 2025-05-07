import React from 'react';

import { SortByType } from '../../types';

interface SortControlsProps {
  currentSortBy: SortByType;
  onSetSortBy: (sortBy: SortByType) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ currentSortBy, onSetSortBy }) => {
  return (
    <div
      className="mb-6 bg-white p-2 rounded-md shadow-md flex items-center justify-between"
      data-testid="sort-controls-section"
    >
      <span className="text-sm font-medium text-gray-700 pl-2" data-testid="sort-controls-label">
        Sıralama Kriteri
      </span>
      <div data-testid="sort-controls-buttons">
        <button
          onClick={() => onSetSortBy('ecoFlyPrice')}
          className={`px-4 py-2 text-sm rounded-md font-medium transition-colors duration-150 ease-in-out 
                      ${currentSortBy === 'ecoFlyPrice' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          data-testid="sort-by-eco-fly-price"
        >
          Ekonomi Kabin Ücreti
        </button>
        <button
          onClick={() => onSetSortBy('departureTime')}
          className={`ml-2 px-4 py-2 text-sm rounded-md font-medium transition-colors duration-150 ease-in-out 
                      ${currentSortBy === 'departureTime' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          data-testid="sort-by-departure-time"
        >
          Kalkış Saati
        </button>
      </div>
    </div>
  );
};

export default SortControls;
