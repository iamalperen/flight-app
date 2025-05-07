import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ActionButton, PriceDisplay, StatusIcon, StatusMessage } from '../../components';
import { Flight, FareSubcategory, FareStatus } from '../../types';

interface LocationState {
  flightDetails?: Flight;
  selectedFare?: FareSubcategory;
  status?: FareStatus;
}

const CabinSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectionStatus, setSelectionStatus] = useState<FareStatus>('AVAILABLE');
  const [totalAmount, setTotalAmount] = useState<number>(470);
  const [currency, setCurrency] = useState<string>('TRY');

  useEffect(() => {
    const state = location.state as LocationState;

    if (state && state.status) {
      setSelectionStatus(state.status === 'AVAILABLE' ? 'AVAILABLE' : 'ERROR');
    }

    if (state && state.selectedFare && state.selectedFare.price) {
      setTotalAmount(state.selectedFare.price.amount);
      if (state.selectedFare.price.currency) {
        setCurrency(state.selectedFare.price.currency);
      }
    }
  }, [location]);

  const handleReturnClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white" data-testid="cabin-selection-page">
      <main
        className="flex-1 flex flex-col items-center justify-center px-4 pt-10"
        data-testid="cabin-selection-content"
      >
        <div className="max-w-md w-full" data-testid="cabin-selection-container">
          <StatusIcon status={selectionStatus} />
          <StatusMessage status={selectionStatus} />

          {selectionStatus === 'AVAILABLE' && (
            <PriceDisplay
              amount={totalAmount}
              currency={currency}
              data-testid="cabin-price-display"
            />
          )}

          {selectionStatus === 'ERROR' && (
            <div className="mt-4 flex justify-center" data-testid="cabin-error-actions">
              <ActionButton
                label="Başa Dön"
                onClick={handleReturnClick}
                color="red"
                data-testid="cabin-return-button"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CabinSelection;
