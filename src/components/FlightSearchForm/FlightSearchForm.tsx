import { faCalendarAlt, faPlaneDeparture, faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { AutocompleteOption, PassengerValue } from '../../types';
import AutocompleteInput from '../AutocompleteInput';
import PassengerSelector from '../PassengerSelector';

export interface FlightSearchFormProps {
  from: AutocompleteOption | null;
  to: AutocompleteOption | null;
  passengers: PassengerValue;
  fromOptions: AutocompleteOption[];
  toOptions: AutocompleteOption[];
  loading?: boolean;
  onFromChange: (option: AutocompleteOption | null) => void;
  onToChange: (option: AutocompleteOption | null) => void;
  onPassengersChange: (value: PassengerValue) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  from,
  to,
  passengers,
  fromOptions,
  toOptions,
  loading,
  onFromChange,
  onToChange,
  onPassengersChange,
  onSubmit,
}) => {
  return (
    <form
      data-testid="flight-search-form"
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row items-stretch md:items-center w-full px-4 py-4 rounded-md shadow-lg gap-4 md:gap-0"
      style={{ background: 'rgba(96,105,119,0.6)' }}
      autoComplete="off"
    >
      <div
        data-testid="from-input-container"
        className="flex items-center bg-white rounded-l-md px-4 border-r border-gray-300 min-w-[160px] flex-1 h-11 min-h-[44px] box-border"
      >
        <FontAwesomeIcon icon={faPlaneDeparture} className="text-gray-500 mr-2" />
        <AutocompleteInput
          value={from?.label || ''}
          onChange={onFromChange}
          options={fromOptions}
          placeholder="Nereden"
          disabled={loading}
        />
      </div>
      <div
        data-testid="to-input-container"
        className="flex items-center bg-white px-4 border-r border-gray-300 min-w-[160px] flex-1 h-11 min-h-[44px] box-border"
      >
        <FontAwesomeIcon icon={faPlaneArrival} className="text-gray-500 mr-2" />
        <AutocompleteInput
          value={to?.label || ''}
          onChange={onToChange}
          options={toOptions}
          placeholder={from ? 'Nereye' : 'Önce kalkış şehrini seçin'}
          disabled={loading || !from}
        />
      </div>
      <div
        data-testid="date-input-container"
        className="flex items-center bg-[#606977] bg-opacity-60 px-4 border-r border-gray-300 min-w-[120px] relative h-11 min-h-[44px] box-border cursor-pointer"
      >
        <span className="text-white">Tarih</span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
        </span>
      </div>
      <PassengerSelector value={passengers} onChange={onPassengersChange} />
      <button
        type="submit"
        className="md:ml-2 rounded-r-md bg-flightred text-white font-bold text-lg hover:bg-red-700 transition flex items-center justify-center h-11 min-h-[44px] w-14 box-border disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!from || !to || loading}
        data-testid="flight-search-submit"
      >
        Ara
      </button>
    </form>
  );
};

export default FlightSearchForm;
