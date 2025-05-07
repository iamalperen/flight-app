import React from 'react';

interface FlightListHeaderProps {
  fromCityName?: string;
  toCityName?: string;
  passengerCount?: number;
}

const FlightListHeader: React.FC<FlightListHeaderProps> = ({
  fromCityName = 'N/A',
  toCityName = 'N/A',
  passengerCount = 0,
}) => {
  return (
    <div className="mb-6" data-testid="flight-header">
      <div
        className="bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-t-md inline-block"
        data-testid="flight-label"
      >
        UÇUŞ
      </div>
      <div className="bg-white p-4 rounded-b-md shadow-md" data-testid="flight-content">
        <h1 className="text-xl font-semibold text-gray-800" data-testid="flight-title">
          {fromCityName} - {toCityName}, {passengerCount} Yolcu
        </h1>
      </div>
    </div>
  );
};

export default FlightListHeader;
