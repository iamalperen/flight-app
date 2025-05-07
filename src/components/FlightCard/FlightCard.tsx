import React from 'react';

import { Flight, FareSubcategory } from '../../types';
import { generateFlightKey } from '../../utils';
import FarePackageCard from '../FarePackageCard';

interface FlightCardProps {
  flight: Flight;
  isEconomyExpanded: boolean;
  isBusinessExpanded: boolean;
  promoCodeActive: boolean;
  onToggleExpand: (section: 'ECONOMY' | 'BUSINESS') => void;
  onSelectFare: (flight: Flight, subCategory: FareSubcategory) => void;
  getLowestEconomyPrice: (flight: Flight, applyPromo: boolean) => number | null;
  getBusinessPrice: (flight: Flight) => number | null;
}

const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  isEconomyExpanded,
  isBusinessExpanded,
  promoCodeActive,
  onToggleExpand,
  onSelectFare,
  getLowestEconomyPrice,
  getBusinessPrice,
}) => {
  const flightKey = generateFlightKey(flight);

  return (
    <div
      className="bg-white rounded-md shadow-lg"
      style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,.05)' }}
      data-testid="flight-card"
    >
      <div className="flex items-stretch justify-between" data-testid="flight-card-header">
        <div
          className="p-4 flex-grow-[2] flex items-center border-r border-gray-200 min-w-0"
          data-testid="flight-details-section"
        >
          <div className="text-left pr-3 truncate" data-testid="departure-details">
            <div
              className="text-lg font-semibold text-gray-800 truncate"
              data-testid="departure-time"
            >
              {flight.departureDateTimeDisplay}
            </div>
            <div className="text-sm text-gray-500 truncate" data-testid="departure-code">
              {flight.originAirport.code}
            </div>
            <div className="text-xs text-gray-400 truncate" data-testid="departure-city">
              {flight.originAirport.city.name}
            </div>
          </div>
          <div
            className="px-3 text-center flex flex-col items-center justify-center flex-shrink-0"
            data-testid="flight-duration-section"
          >
            <div className="text-xs text-gray-400 mb-0.5" data-testid="flight-duration-label">
              Uçuş Süresi
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div
              className="text-sm font-medium text-gray-600 mt-0.5"
              data-testid="flight-duration-value"
            >
              {flight.flightDuration}
            </div>
          </div>
          <div className="text-left pl-3 truncate" data-testid="arrival-details">
            <div
              className="text-lg font-semibold text-gray-800 truncate"
              data-testid="arrival-time"
            >
              {flight.arrivalDateTimeDisplay}
            </div>
            <div className="text-sm text-gray-500 truncate" data-testid="arrival-code">
              {flight.destinationAirport.code}
            </div>
            <div className="text-xs text-gray-400 truncate" data-testid="arrival-city">
              {flight.destinationAirport.city.name}
            </div>
          </div>
        </div>
        <div
          className="p-4 flex-grow-[1] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border-r border-gray-200 min-w-0"
          onClick={() => onToggleExpand('ECONOMY')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') onToggleExpand('ECONOMY');
          }}
          role="button"
          tabIndex={0}
          aria-expanded={isEconomyExpanded}
          aria-controls={`economy-details-${flightKey}`}
          data-testid="economy-section"
        >
          <div className="flex items-center">
            <span
              className={`flex-shrink-0 w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${isEconomyExpanded ? 'border-blue-600' : 'border-gray-400'}`}
              data-testid="economy-toggle-indicator"
            >
              {isEconomyExpanded && <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>}
            </span>
            <div className="truncate">
              <span className="text-xs text-gray-500 block truncate" data-testid="economy-label">
                ECONOMY
              </span>
              <span
                className="text-xs text-gray-400 block truncate"
                data-testid="per-passenger-label-economy"
              >
                Yolcu Başına
              </span>
            </div>
          </div>
          <div className="text-right flex items-center flex-shrink-0">
            <span className="text-md font-bold text-gray-800 mr-2" data-testid="economy-price">
              TRY {getLowestEconomyPrice(flight, promoCodeActive) ?? '-'}
            </span>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform ${isEconomyExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-testid="economy-chevron"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="p-4 flex-grow-[1] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors min-w-0"
          onClick={() => onToggleExpand('BUSINESS')}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') onToggleExpand('BUSINESS');
          }}
          role="button"
          tabIndex={0}
          aria-expanded={isBusinessExpanded}
          aria-controls={`business-details-${flightKey}`}
          data-testid="business-section"
        >
          <div className="flex items-center">
            <span
              className={`flex-shrink-0 w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${isBusinessExpanded ? 'border-blue-600' : 'border-gray-400'}`}
              data-testid="business-toggle-indicator"
            >
              {isBusinessExpanded && <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>}
            </span>
            <div className="truncate">
              <span className="text-xs text-gray-500 block truncate" data-testid="business-label">
                BUSINESS
              </span>
              <span
                className="text-xs text-gray-400 block truncate"
                data-testid="per-passenger-label-business"
              >
                Yolcu Başına
              </span>
            </div>
          </div>
          <div className="text-right flex items-center flex-shrink-0">
            <span className="text-md font-bold text-gray-800 mr-2" data-testid="business-price">
              TRY {getBusinessPrice(flight) ?? '-'}
            </span>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform ${isBusinessExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-testid="business-chevron"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {(isEconomyExpanded || isBusinessExpanded) && (
        <div className="border-t border-gray-200 bg-white" data-testid="expanded-details">
          {isEconomyExpanded && (
            <div
              id={`economy-details-${flightKey}`}
              className="flex flex-wrap justify-start p-2"
              data-testid="economy-details"
            >
              {flight.fareCategories.ECONOMY?.subcategories.map((subCategory, subIndex) => (
                <FarePackageCard
                  key={`eco-${subCategory.brandCode}-${subIndex}`}
                  subCategory={subCategory}
                  flight={flight}
                  isPromoActive={promoCodeActive}
                  onSelectFare={onSelectFare}
                />
              ))}
            </div>
          )}
          {isBusinessExpanded && (
            <div
              id={`business-details-${flightKey}`}
              className="flex flex-wrap justify-start p-2"
              data-testid="business-details"
            >
              {flight.fareCategories.BUSINESS?.subcategories
                .slice(0, 1)
                .map((subCategory, subIndex) => (
                  <FarePackageCard
                    key={`biz-${subCategory.brandCode}-${subIndex}`}
                    subCategory={subCategory}
                    flight={flight}
                    isPromoActive={promoCodeActive}
                    onSelectFare={onSelectFare}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightCard;
