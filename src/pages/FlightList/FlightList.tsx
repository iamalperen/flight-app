import React, { useEffect } from 'react';

import {
  FlightCard,
  FlightListHeader,
  NoFlightsMessage,
  PromoCodeSection,
  SortControls,
} from '../../components';
import { useFlightSearch } from '../../context';
import { useFlightListManager } from '../../hooks';
import { generateFlightKey, getLowestEconomyPrice, getBusinessPrice } from '../../utils';

const FlightList: React.FC = () => {
  const {
    isLoading,
    hasCriteria,
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
  } = useFlightListManager();

  const { setHeaderVariant } = useFlightSearch();
  useEffect(() => {
    setHeaderVariant('light');
  }, [setHeaderVariant]);

  if (isLoading) {
    return <div className="p-6 text-center text-lg">Uçuşlar yükleniyor...</div>;
  }

  if (!hasCriteria) {
    return <div className="p-6 text-center">Yönlendiriliyor...</div>;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 md:px-0">
      <div className="max-w-4xl mx-auto">
        <FlightListHeader
          fromCityName={fromCityName}
          toCityName={toCityName}
          passengerCount={actualPassengerCount}
        />
        <PromoCodeSection
          promoCodeActive={promoCodeActive}
          onTogglePromo={() => setPromoCodeActive(!promoCodeActive)}
        />
        <SortControls currentSortBy={sortBy} onSetSortBy={setSortBy} />
        {sortedFlights.length > 0 ? (
          <div className="space-y-4">
            {sortedFlights.map(flight => {
              const flightKey = generateFlightKey(flight);
              const isEconomyExpanded =
                expandedDetails.flightKey === flightKey && expandedDetails.section === 'ECONOMY';
              const isBusinessExpanded =
                expandedDetails.flightKey === flightKey && expandedDetails.section === 'BUSINESS';

              return (
                <FlightCard
                  key={flightKey}
                  flight={flight}
                  isEconomyExpanded={isEconomyExpanded}
                  isBusinessExpanded={isBusinessExpanded}
                  promoCodeActive={promoCodeActive}
                  onToggleExpand={section => toggleExpand(flightKey, section)}
                  onSelectFare={handleSelectFare}
                  getLowestEconomyPrice={getLowestEconomyPrice}
                  getBusinessPrice={getBusinessPrice}
                />
              );
            })}
          </div>
        ) : (
          <NoFlightsMessage />
        )}
      </div>
    </div>
  );
};

export default FlightList;
