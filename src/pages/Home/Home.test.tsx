import { render, screen } from '@testing-library/react';
import React from 'react';

import { FlightSearchForm, PopularRoutes } from '../../components';
import { useFlightSearchForm } from '../../hooks/useFlightSearchForm';
import { AutocompleteOption, CabinType } from '../../types/flightSearch';

import Home from './Home';

jest.mock('../../components', () => ({
  FlightSearchForm: jest.fn(() => <div data-testid="flight-search-form" />),
  PopularRoutes: jest.fn(() => <div data-testid="popular-routes" />),
}));
jest.mock('../../hooks/useFlightSearchForm', () => ({
  useFlightSearchForm: jest.fn(),
}));

const mockForm = {
  from: { value: 'IST', label: 'İstanbul' },
  to: { value: 'ESB', label: 'Esenboğa' },
  passengers: { count: 1, cabin: 'economy' as CabinType },
  fromOptions: [] as AutocompleteOption[],
  toOptions: [] as AutocompleteOption[],
  loading: false,
  setFrom: jest.fn(),
  setTo: jest.fn(),
  setPassenger: jest.fn(),
  setFromAndTo: jest.fn(),
  handleSubmit: jest.fn(),
  popularRoutes: [{ label: 'test', value: 'test' }],
  handleCitySelect: jest.fn() as (city: AutocompleteOption | null, type: 'from' | 'to') => void,
};

const useFlightSearchFormMock = jest.mocked(useFlightSearchForm);
const FlightSearchFormMock = jest.mocked(FlightSearchForm);
const PopularRoutesMock = jest.mocked(PopularRoutes);

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useFlightSearchFormMock.mockReturnValue(mockForm);
  });

  it('renders all required elements with correct data-testid attributes', () => {
    // Arrange & Act
    render(<Home />);

    // Assert
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
    expect(screen.getByTestId('home-greeting')).toHaveTextContent('Merhaba');
    expect(screen.getByTestId('home-subtitle')).toHaveTextContent('Nereyi keşfetmek istersiniz?');
  });

  it('calls FlightSearchForm with correct props', () => {
    // Arrange & Act
    render(<Home />);

    // Assert
    expect(FlightSearchFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: mockForm.from,
        to: mockForm.to,
        passengers: mockForm.passengers,
        fromOptions: mockForm.fromOptions,
        toOptions: mockForm.toOptions,
        loading: mockForm.loading,
        onFromChange: mockForm.setFrom,
        onToChange: mockForm.setTo,
        onPassengersChange: mockForm.setPassenger,
        onSubmit: mockForm.handleSubmit,
      }),
      undefined
    );
  });

  it('calls PopularRoutes with correct props', () => {
    // Arrange & Act
    render(<Home />);

    // Assert
    expect(PopularRoutesMock).toHaveBeenCalledWith(
      expect.objectContaining({
        routes: mockForm.popularRoutes,
        onSelect: expect.any(Function),
      }),
      undefined
    );
  });

  it('calls setFromAndTo with correct cities when handlePopularRouteSelect is triggered', () => {
    // Arrange
    render(<Home />);
    const onSelect = PopularRoutesMock.mock.calls[0][0].onSelect;
    mockForm.fromOptions.push({ value: 'IST', label: 'İstanbul' } as never);
    mockForm.toOptions.push({ value: 'ESB', label: 'Esenboğa' } as never);

    // Act
    onSelect('IST', 'ESB');

    // Assert
    expect(mockForm.setFromAndTo).toHaveBeenCalledWith(
      { value: 'IST', label: 'İstanbul' },
      { value: 'ESB', label: 'Esenboğa' }
    );
  });
});
