import React from 'react';

const NoFlightsMessage: React.FC = () => {
  return (
    <div
      className="text-center text-gray-500 py-10 bg-white rounded-md shadow-md"
      data-testid="no-flights-message"
    >
      Bu kriterlere uygun uçuş bulunamadı.
    </div>
  );
};

export default NoFlightsMessage;
