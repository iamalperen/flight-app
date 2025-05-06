import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { AutocompleteOption, PassengerValue } from '../../types/flightSearch';
import {AutocompleteInputProps} from "../AutocompleteInput/AutocompleteInput";
import {PassengerSelectorProps} from "../PassengerSelector/PassengerSelector";

import FlightSearchForm, { FlightSearchFormProps } from './FlightSearchForm';

// eslint-disable-next-line react/display-name
jest.mock('../AutocompleteInput', () => (props: AutocompleteInputProps) => (
  <input
    data-testid={'mock-autocomplete'}
    value={props.value}
    onChange={e => props.onChange({ value: e.target.value, label: e.target.value })}
    placeholder={props.placeholder}
    disabled={props.disabled}
  />
));

// eslint-disable-next-line react/display-name
jest.mock('../PassengerSelector', () => (props: PassengerSelectorProps) => (
  <button data-testid="mock-passenger-selector" onClick={() => props.onChange({ count: 2, cabin: 'business' })}>
    PassengerSelectorMock
  </button>
));

const mockFromOptions: AutocompleteOption[] = [
  { value: 'IST', label: 'İstanbul' },
  { value: 'ESB', label: 'Ankara' },
];
const mockToOptions: AutocompleteOption[] = [
  { value: 'AYT', label: 'Antalya' },
  { value: 'ADB', label: 'İzmir' },
];
const mockPassengers: PassengerValue = { count: 1, cabin: 'economy' };

describe('FlightSearchForm', () => {
  const setup = (props?: Partial<FlightSearchFormProps>) => {
    const defaultProps: FlightSearchFormProps = {
      from: mockFromOptions[0],
      to: mockToOptions[0],
      passengers: mockPassengers,
      fromOptions: mockFromOptions,
      toOptions: mockToOptions,
      loading: false,
      onFromChange: jest.fn(),
      onToChange: jest.fn(),
      onPassengersChange: jest.fn(),
      onSubmit: jest.fn(e => e.preventDefault()),
    };
    return render(<FlightSearchForm {...defaultProps} {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and the submit button', () => {
    // Arrange
    setup();
    // Act
    // (no user interaction needed)
    // Assert
    expect(screen.getByTestId('from-input-container')).toBeInTheDocument();
    expect(screen.getByTestId('to-input-container')).toBeInTheDocument();
    expect(screen.getByTestId('date-input-container')).toBeInTheDocument();
    expect(screen.getByTestId('mock-passenger-selector')).toBeInTheDocument();
    expect(screen.getByTestId('flight-search-submit')).toBeInTheDocument();
  });

  it('passes correct values to AutocompleteInput and PassengerSelector', () => {
    // Arrange
    setup();
    // Act
    // (no user interaction needed)
    // Assert
    expect(screen.getAllByDisplayValue('İstanbul')[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('Antalya')[0]).toBeInTheDocument();
    expect(screen.getByTestId('mock-passenger-selector')).toBeInTheDocument();
  });

  it('disables submit button if from is missing', () => {
    // Arrange
    setup({ from: null });
    // Act
    // (no user interaction needed)
    // Assert
    expect(screen.getByTestId('flight-search-submit')).toBeDisabled();
  });

  it('disables submit button if to is missing', () => {
    // Arrange
    setup({ to: null });
    // Act
    // (no user interaction needed)
    // Assert
    expect(screen.getByTestId('flight-search-submit')).toBeDisabled();
  });

  it('disables submit button if loading', () => {
    // Arrange
    setup({ loading: true });
    // Act
    // (no user interaction needed)
    // Assert
    expect(screen.getByTestId('flight-search-submit')).toBeDisabled();
  });

  it('calls onSubmit when form is submitted', () => {
    // Arrange
    const onSubmit = jest.fn(e => e.preventDefault());
    setup({ onSubmit });
    // Act
    fireEvent.click(screen.getByTestId('flight-search-submit'));
    // Assert
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onFromChange, onToChange, and onPassengersChange when inputs change', () => {
    // Arrange
    const onFromChange = jest.fn();
    const onToChange = jest.fn();
    const onPassengersChange = jest.fn();
    setup({ onFromChange, onToChange, onPassengersChange });
    // Act
    fireEvent.change(screen.getAllByTestId('mock-autocomplete')[0], { target: { value: 'ESB' } });
    fireEvent.change(screen.getAllByTestId('mock-autocomplete')[1], { target: { value: 'ADB' } });
    fireEvent.click(screen.getByTestId('mock-passenger-selector'));
    // Assert
    expect(onFromChange).toHaveBeenCalledWith({ value: 'ESB', label: 'ESB' });
    expect(onToChange).toHaveBeenCalledWith({ value: 'ADB', label: 'ADB' });
    expect(onPassengersChange).toHaveBeenCalledWith({ count: 2, cabin: 'business' });
  });
});
