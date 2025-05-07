import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock';
import React from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

import CabinSelection from './CabinSelection';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../../components/ActionButton', () => {
  return function MockActionButton({
    label,
    onClick,
    'data-testid': testId,
  }: {
    label: string;
    onClick: () => void;
    'data-testid'?: string;
  }) {
    return (
      <button data-testid={testId || 'mock-action-button'} onClick={onClick}>
        {label}
      </button>
    );
  };
});

jest.mock('../../components/PriceDisplay', () => {
  return function MockPriceDisplay({
    amount,
    currency,
    'data-testid': testId,
  }: {
    amount: number;
    currency: string;
    'data-testid'?: string;
  }) {
    return <div data-testid={testId || 'mock-price-display'}>{`${amount} ${currency}`}</div>;
  };
});

jest.mock('../../components/StatusIcon', () => {
  return function MockStatusIcon({ status }: { status: string }) {
    return <div data-testid="mock-status-icon">Status: {status}</div>;
  };
});

jest.mock('../../components/StatusMessage', () => {
  return function MockStatusMessage({ status }: { status: string }) {
    return <div data-testid="mock-status-message">Message: {status}</div>;
  };
});

const mockedUseNavigate = mocked(useNavigate);
const mockedUseLocation = mocked(useLocation);

describe('CabinSelection', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseNavigate.mockReturnValue(mockNavigate);
  });

  it('should render with default values when no state is provided', () => {
    // Arrange
    mockedUseLocation.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: 'default',
      state: null,
    } as Location);

    // Act
    render(<CabinSelection />);

    // Assert
    expect(screen.getByTestId('cabin-selection-page')).toBeInTheDocument();
    expect(screen.getByTestId('cabin-selection-content')).toBeInTheDocument();
    expect(screen.getByTestId('cabin-selection-container')).toBeInTheDocument();

    expect(screen.getByTestId('mock-status-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-status-icon')).toHaveTextContent('Status: AVAILABLE');
    expect(screen.getByTestId('mock-status-message')).toBeInTheDocument();
    expect(screen.getByTestId('mock-status-message')).toHaveTextContent('Message: AVAILABLE');
    expect(screen.getByTestId('cabin-price-display')).toBeInTheDocument();
    expect(screen.getByTestId('cabin-price-display')).toHaveTextContent('470 TRY');
  });

  it('should render with AVAILABLE status and correct price when state is provided', () => {
    // Arrange
    mockedUseLocation.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: 'available-test',
      state: {
        status: 'AVAILABLE',
        selectedFare: {
          price: {
            amount: 300,
            currency: 'EUR',
          },
        },
      },
    } as Location);

    // Act
    render(<CabinSelection />);

    // Assert
    expect(screen.getByTestId('mock-status-icon')).toHaveTextContent('Status: AVAILABLE');
    expect(screen.getByTestId('mock-status-message')).toHaveTextContent('Message: AVAILABLE');
    expect(screen.getByTestId('cabin-price-display')).toHaveTextContent('300 EUR');
  });

  it('should render with ERROR status and return button when error status is provided', () => {
    // Arrange
    mockedUseLocation.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: 'error-test',
      state: {
        status: 'ERROR',
      },
    } as Location);

    // Act
    render(<CabinSelection />);

    // Assert
    expect(screen.getByTestId('mock-status-icon')).toHaveTextContent('Status: ERROR');
    expect(screen.getByTestId('mock-status-message')).toHaveTextContent('Message: ERROR');
    expect(screen.queryByTestId('cabin-price-display')).not.toBeInTheDocument();
    expect(screen.getByTestId('cabin-error-actions')).toBeInTheDocument();
    expect(screen.getByTestId('cabin-return-button')).toBeInTheDocument();
    expect(screen.getByTestId('cabin-return-button')).toHaveTextContent('Başa Dön');
  });

  it('should navigate back when return button is clicked', () => {
    // Arrange
    mockedUseLocation.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: 'navigation-test',
      state: {
        status: 'ERROR',
      },
    } as Location);

    // Act
    render(<CabinSelection />);
    fireEvent.click(screen.getByTestId('cabin-return-button'));

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should update price details when selectedFare is provided in state', () => {
    // Arrange
    mockedUseLocation.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: 'price-test',
      state: {
        status: 'AVAILABLE',
        selectedFare: {
          price: {
            amount: 550,
            currency: 'USD',
          },
        },
      },
    } as Location);

    // Act
    render(<CabinSelection />);

    // Assert
    expect(screen.getByTestId('cabin-price-display')).toHaveTextContent('550 USD');
  });

  it('should keep default currency if currency is not provided in state', () => {
    // Arrange
    mockedUseLocation.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: 'currency-test',
      state: {
        status: 'AVAILABLE',
        selectedFare: {
          price: {
            amount: 200,
          },
        },
      },
    } as Location);

    // Act
    render(<CabinSelection />);

    // Assert
    expect(screen.getByTestId('cabin-price-display')).toHaveTextContent('200 TRY');
  });

  it('should set the status correctly based on state', () => {
    // Arrange
    mockedUseLocation.mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: 'status-test',
      state: {
        status: 'ERROR',
        selectedFare: {
          price: {
            amount: 300,
            currency: 'EUR',
          },
        },
      },
    } as Location);

    // Act
    render(<CabinSelection />);

    // Assert
    expect(screen.getByTestId('mock-status-icon')).toHaveTextContent('Status: ERROR');
    expect(screen.queryByTestId('cabin-price-display')).not.toBeInTheDocument();
    expect(screen.getByTestId('cabin-error-actions')).toBeInTheDocument();
  });
});
