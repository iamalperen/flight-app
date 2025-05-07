import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Flight, FareSubcategory } from '../../types/flight';

import FlightCard from './FlightCard';

jest.mock('../FarePackageCard', () => {
  return function MockFarePackageCard({
    subCategory,
    flight,
    isPromoActive,
    onSelectFare,
  }: {
    subCategory: FareSubcategory;
    flight: Flight;
    isPromoActive: boolean;
    onSelectFare: (flight: Flight, subCategory: FareSubcategory) => void;
  }) {
    return (
      <button
        data-testid={`mock-fare-package-${subCategory.brandCode}`}
        onClick={() => onSelectFare(flight, subCategory)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            onSelectFare(flight, subCategory);
          }
        }}
      >
        {subCategory.brandCode} - {isPromoActive ? 'Promo Active' : 'No Promo'}
      </button>
    );
  };
});

const mockFlight: Flight = {
  departureDateTimeDisplay: '10:00',
  arrivalDateTimeDisplay: '12:00',
  flightDuration: '2s',
  originAirport: {
    code: 'IST',
    name: 'Istanbul Airport',
    city: {
      code: 'IST',
      name: 'Istanbul',
    },
    country: {
      code: 'TR',
      name: 'Turkey',
    },
  },
  destinationAirport: {
    code: 'ESB',
    name: 'Ankara Esenboga',
    city: {
      code: 'ANK',
      name: 'Ankara',
    },
    country: {
      code: 'TR',
      name: 'Turkey',
    },
  },
  fareCategories: {
    ECONOMY: {
      subcategories: [
        {
          brandCode: 'ecoFly',
          price: {
            amount: 100,
            currency: 'TRY',
          },
          order: 1,
          status: 'AVAILABLE',
          rights: ['5kg Cabin Baggage', 'Ticket Change Allowed'],
        },
        {
          brandCode: 'extraFly',
          price: {
            amount: 150,
            currency: 'TRY',
          },
          order: 2,
          status: 'AVAILABLE',
          rights: ['8kg Cabin Baggage', 'Free Ticket Change', 'Seat Selection'],
        },
      ],
    },
    BUSINESS: {
      subcategories: [
        {
          brandCode: 'ecoFly',
          price: {
            amount: 300,
            currency: 'TRY',
          },
          order: 1,
          status: 'AVAILABLE',
          rights: ['Priority Boarding', 'Lounge Access', 'Premium Meal'],
        },
      ],
    },
  },
};

describe('FlightCard', () => {
  const defaultProps = {
    flight: mockFlight,
    isEconomyExpanded: false,
    isBusinessExpanded: false,
    promoCodeActive: false,
    onToggleExpand: jest.fn(),
    onSelectFare: jest.fn(),
    getLowestEconomyPrice: jest.fn(),
    getBusinessPrice: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps.getLowestEconomyPrice.mockReturnValue(100);
    defaultProps.getBusinessPrice.mockReturnValue(300);
  });

  it('renders flight details correctly', () => {
    // Arrange
    // Act
    render(<FlightCard {...defaultProps} />);

    // Assert
    expect(screen.getByTestId('flight-card')).toBeInTheDocument();
    expect(screen.getByTestId('departure-time')).toHaveTextContent('10:00');
    expect(screen.getByTestId('arrival-time')).toHaveTextContent('12:00');
    expect(screen.getByTestId('departure-code')).toHaveTextContent('IST');
    expect(screen.getByTestId('arrival-code')).toHaveTextContent('ESB');
    expect(screen.getByTestId('departure-city')).toHaveTextContent('Istanbul');
    expect(screen.getByTestId('arrival-city')).toHaveTextContent('Ankara');
    expect(screen.getByTestId('flight-duration-value')).toHaveTextContent('2s');
  });

  it('renders economy and business sections with correct prices', () => {
    // Arrange
    // Act
    render(<FlightCard {...defaultProps} />);

    // Assert
    expect(screen.getByTestId('economy-section')).toBeInTheDocument();
    expect(screen.getByTestId('business-section')).toBeInTheDocument();
    expect(screen.getByTestId('economy-price')).toHaveTextContent('TRY 100');
    expect(screen.getByTestId('business-price')).toHaveTextContent('TRY 300');
  });

  it('calls onToggleExpand when economy section is clicked', () => {
    // Arrange
    // Act
    render(<FlightCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId('economy-section'));

    // Assert
    expect(defaultProps.onToggleExpand).toHaveBeenCalledTimes(1);
    expect(defaultProps.onToggleExpand).toHaveBeenCalledWith('ECONOMY');
  });

  it('calls onToggleExpand when business section is clicked', () => {
    // Arrange
    // Act
    render(<FlightCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId('business-section'));

    // Assert
    expect(defaultProps.onToggleExpand).toHaveBeenCalledTimes(1);
    expect(defaultProps.onToggleExpand).toHaveBeenCalledWith('BUSINESS');
  });

  it('shows economy packages when economy is expanded', () => {
    // Arrange
    const props = {
      ...defaultProps,
      isEconomyExpanded: true,
    };

    // Act
    render(<FlightCard {...props} />);

    // Assert
    expect(screen.getByTestId('economy-details')).toBeInTheDocument();
    expect(screen.queryByTestId('business-details')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-fare-package-ecoFly')).toBeInTheDocument();
    expect(screen.getByTestId('mock-fare-package-extraFly')).toBeInTheDocument();
  });

  it('shows business packages when business is expanded', () => {
    // Arrange
    const props = {
      ...defaultProps,
      isBusinessExpanded: true,
    };

    // Act
    render(<FlightCard {...props} />);

    // Assert
    expect(screen.getByTestId('business-details')).toBeInTheDocument();
    expect(screen.queryByTestId('economy-details')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-fare-package-ecoFly')).toBeInTheDocument();
  });

  it('calls onSelectFare when a fare package is clicked', () => {
    // Arrange
    const props = {
      ...defaultProps,
      isBusinessExpanded: true,
    };

    // Act
    render(<FlightCard {...props} />);
    fireEvent.click(screen.getByTestId('mock-fare-package-ecoFly'));

    // Assert
    expect(defaultProps.onSelectFare).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSelectFare).toHaveBeenCalledWith(
      mockFlight,
      mockFlight.fareCategories.BUSINESS?.subcategories[0]
    );
  });

  it('handles promo code state correctly', () => {
    // Arrange
    const props = {
      ...defaultProps,
      promoCodeActive: true,
      isEconomyExpanded: true,
    };

    // Act
    render(<FlightCard {...props} />);

    // Assert
    expect(screen.getByTestId('mock-fare-package-ecoFly')).toHaveTextContent('Promo Active');
    expect(props.getLowestEconomyPrice).toHaveBeenCalledWith(mockFlight, true);
  });

  it('shows correct toggle state for economy when expanded', () => {
    // Arrange
    const props = {
      ...defaultProps,
      isEconomyExpanded: true,
    };

    // Act
    render(<FlightCard {...props} />);

    // Assert
    const economyToggle = screen.getByTestId('economy-toggle-indicator');
    expect(economyToggle).toHaveClass('border-blue-600');
    expect(economyToggle.firstChild).toBeInTheDocument(); // Blue dot is visible

    const economyChevron = screen.getByTestId('economy-chevron');
    expect(economyChevron).toHaveClass('rotate-180');
  });

  it('shows correct toggle state for business when expanded', () => {
    // Arrange
    const props = {
      ...defaultProps,
      isBusinessExpanded: true,
    };

    // Act
    render(<FlightCard {...props} />);

    // Assert
    const businessToggle = screen.getByTestId('business-toggle-indicator');
    expect(businessToggle).toHaveClass('border-blue-600');
    expect(businessToggle.firstChild).toBeInTheDocument(); // Blue dot is visible

    const businessChevron = screen.getByTestId('business-chevron');
    expect(businessChevron).toHaveClass('rotate-180');
  });

  it('handles keyboard navigation for economy section', () => {
    // Arrange
    // Act
    render(<FlightCard {...defaultProps} />);
    fireEvent.keyDown(screen.getByTestId('economy-section'), { key: 'Enter' });

    // Assert
    expect(defaultProps.onToggleExpand).toHaveBeenCalledWith('ECONOMY');

    // Arrange
    defaultProps.onToggleExpand.mockClear();

    // Act
    fireEvent.keyDown(screen.getByTestId('economy-section'), { key: ' ' });

    // Assert
    expect(defaultProps.onToggleExpand).toHaveBeenCalledWith('ECONOMY');
  });

  it('handles keyboard navigation for business section', () => {
    // Arrange
    // Act
    render(<FlightCard {...defaultProps} />);
    fireEvent.keyDown(screen.getByTestId('business-section'), { key: 'Enter' });

    // Assert
    expect(defaultProps.onToggleExpand).toHaveBeenCalledWith('BUSINESS');

    // Arrange
    defaultProps.onToggleExpand.mockClear();

    // Act
    fireEvent.keyDown(screen.getByTestId('business-section'), { key: ' ' });

    // Assert
    expect(defaultProps.onToggleExpand).toHaveBeenCalledWith('BUSINESS');
  });

  it('maintains accessibility attributes', () => {
    // Arrange
    const props = {
      ...defaultProps,
      isEconomyExpanded: true,
      isBusinessExpanded: false,
    };

    // Act
    render(<FlightCard {...props} />);

    // Assert
    expect(screen.getByTestId('economy-section')).toHaveAttribute('role', 'button');
    expect(screen.getByTestId('economy-section')).toHaveAttribute('tabIndex', '0');
    expect(screen.getByTestId('economy-section')).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByTestId('business-section')).toHaveAttribute('role', 'button');
    expect(screen.getByTestId('business-section')).toHaveAttribute('tabIndex', '0');
    expect(screen.getByTestId('business-section')).toHaveAttribute('aria-expanded', 'false');
  });
});
