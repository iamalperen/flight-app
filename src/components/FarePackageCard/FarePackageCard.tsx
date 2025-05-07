import React from 'react';

import { Flight, FareSubcategory } from '../../types';

interface FarePackageCardProps {
  subCategory: FareSubcategory;
  flight: Flight;
  isPromoActive: boolean;
  onSelectFare: (flight: Flight, subCategory: FareSubcategory) => void;
}

const FarePackageCard: React.FC<FarePackageCardProps> = ({
  subCategory,
  flight,
  isPromoActive,
  onSelectFare,
}) => {
  const getFarePrice = (fare: FareSubcategory, applyPromo: boolean): number | null => {
    let price = fare.price.amount;
    if (applyPromo && fare.brandCode === 'ecoFly') {
      price /= 2;
    }
    return price;
  };

  const isEcoFly = subCategory.brandCode === 'ecoFly';
  const isDisabledByPromo = isPromoActive && !isEcoFly;
  const isBusiness = !['ecoFly', 'extraFly', 'primeFly'].includes(subCategory.brandCode);
  const isDisabled =
    isDisabledByPromo || subCategory.status !== 'AVAILABLE' || (isBusiness && isPromoActive);

  const finalPrice = getFarePrice(subCategory, isPromoActive);

  return (
    <div className="w-full sm:w-1/3 p-2" data-testid={`fare-package-${subCategory.brandCode}`}>
      <div
        className="rounded-md overflow-hidden border border-gray-200 h-full flex flex-col"
        data-testid="fare-package-card"
      >
        <div
          style={{ backgroundColor: '#f9f9f9' }}
          className="p-3 flex justify-between items-center"
          data-testid="fare-package-header"
        >
          <h3 className="font-semibold text-gray-700 text-sm" data-testid="fare-package-title">
            {subCategory.brandCode || 'Business'}
          </h3>
          <span className="text-md font-bold text-gray-800" data-testid="fare-package-price">
            TRY {finalPrice ?? 'N/A'}
          </span>
        </div>
        <div
          className="p-3 flex-grow flex flex-col justify-between"
          data-testid="fare-package-content"
        >
          <ul
            className="text-xs text-gray-600 list-none mb-3 space-y-1 flex-grow"
            data-testid="fare-package-rights"
          >
            {subCategory.rights.map((right, rIndex) => (
              <li key={rIndex} data-testid={`fare-package-right-${rIndex}`}>
                {right}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onSelectFare(flight, subCategory)}
            disabled={isDisabled}
            className={`w-full py-2 px-3 rounded text-white font-semibold text-sm transition-colors duration-150 ease-in-out 
                        ${isDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'text-white hover:bg-red-700'}`}
            style={!isDisabled ? { backgroundColor: '#E81932' } : {}}
            data-testid="fare-package-select-button"
          >
            Uçuşu Seç
          </button>
        </div>
        {subCategory.status !== 'AVAILABLE' && (
          <p
            className="text-red-500 text-xs p-2 text-center bg-red-50"
            data-testid="fare-package-unavailable-message"
          >
            Bu kategori için seçim yapılamamaktadır.
          </p>
        )}
      </div>
    </div>
  );
};

export default FarePackageCard;
