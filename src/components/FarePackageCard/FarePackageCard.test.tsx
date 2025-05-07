import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Flight, FareSubcategory } from '../../types';

import FarePackageCard from './FarePackageCard';

describe('FarePackageCard', () => {
  const mockSubCategory: FareSubcategory = {
    brandCode: 'ecoFly',
    price: {
      amount: 100,
      currency: 'TRY',
    },
    order: 1,
    status: 'AVAILABLE',
    rights: ['8kg Kabin Bagajı', 'Ücretsiz Koltuk Seçimi'],
  };

  const mockFlight: Flight = {
    originAirport: {
      code: 'IST',
      name: 'İstanbul Havalimanı',
      city: {
        code: 'IST',
        name: 'İstanbul',
      },
      country: {
        code: 'TR',
        name: 'Türkiye',
      },
    },
    destinationAirport: {
      code: 'ESB',
      name: 'Ankara Esenboğa Havalimanı',
      city: {
        code: 'ANK',
        name: 'Ankara',
      },
      country: {
        code: 'TR',
        name: 'Türkiye',
      },
    },
    arrivalDateTimeDisplay: '10:00',
    departureDateTimeDisplay: '12:00',
    flightDuration: '2s',
    fareCategories: {
      ECONOMY: {
        subcategories: [],
      },
      BUSINESS: {
        subcategories: [],
      },
    },
  };

  it('should render the fare package card', () => {
    // Arrange
    const onSelectFare = jest.fn();

    // Act
    render(
      <FarePackageCard
        subCategory={mockSubCategory}
        flight={mockFlight}
        isPromoActive={false}
        onSelectFare={onSelectFare}
      />
    );

    // Assert
    expect(screen.getByTestId(`fare-package-${mockSubCategory.brandCode}`)).toBeInTheDocument();
    expect(screen.getByTestId('fare-package-card')).toBeInTheDocument();
    expect(screen.getByTestId('fare-package-header')).toBeInTheDocument();
    expect(screen.getByTestId('fare-package-title')).toBeInTheDocument();
    expect(screen.getByTestId('fare-package-price')).toBeInTheDocument();
    expect(screen.getByTestId('fare-package-content')).toBeInTheDocument();
    expect(screen.getByTestId('fare-package-rights')).toBeInTheDocument();
    expect(screen.getByTestId('fare-package-select-button')).toBeInTheDocument();
  });

  it('should display correct brand code and price', () => {
    // Arrange
    const onSelectFare = jest.fn();

    // Act
    render(
      <FarePackageCard
        subCategory={mockSubCategory}
        flight={mockFlight}
        isPromoActive={false}
        onSelectFare={onSelectFare}
      />
    );

    // Assert
    expect(screen.getByTestId('fare-package-title')).toHaveTextContent('ecoFly');
    expect(screen.getByTestId('fare-package-price')).toHaveTextContent('TRY 100');
  });

  it('should display the correct rights', () => {
    // Arrange
    const onSelectFare = jest.fn();

    // Act
    render(
      <FarePackageCard
        subCategory={mockSubCategory}
        flight={mockFlight}
        isPromoActive={false}
        onSelectFare={onSelectFare}
      />
    );

    // Assert
    expect(screen.getByTestId('fare-package-right-0')).toHaveTextContent('8kg Kabin Bagajı');
    expect(screen.getByTestId('fare-package-right-1')).toHaveTextContent('Ücretsiz Koltuk Seçimi');
  });

  it('should call onSelectFare when the select button is clicked', () => {
    // Arrange
    const onSelectFare = jest.fn();

    // Act
    render(
      <FarePackageCard
        subCategory={mockSubCategory}
        flight={mockFlight}
        isPromoActive={false}
        onSelectFare={onSelectFare}
      />
    );

    fireEvent.click(screen.getByTestId('fare-package-select-button'));

    // Assert
    expect(onSelectFare).toHaveBeenCalledTimes(1);
    expect(onSelectFare).toHaveBeenCalledWith(mockFlight, mockSubCategory);
  });

  it('should apply 50% discount when isPromoActive is true and brandCode is ecoFly', () => {
    // Arrange
    const onSelectFare = jest.fn();

    // Act
    render(
      <FarePackageCard
        subCategory={mockSubCategory}
        flight={mockFlight}
        isPromoActive={true}
        onSelectFare={onSelectFare}
      />
    );

    // Assert
    expect(screen.getByTestId('fare-package-price')).toHaveTextContent('TRY 50');
  });

  it('should not apply discount for non-ecoFly packages', () => {
    // Arrange
    const onSelectFare = jest.fn();
    const nonEcoFlySubCategory: FareSubcategory = {
      ...mockSubCategory,
      brandCode: 'extraFly',
    };

    // Act
    render(
      <FarePackageCard
        subCategory={nonEcoFlySubCategory}
        flight={mockFlight}
        isPromoActive={true}
        onSelectFare={onSelectFare}
      />
    );

    // Assert
    expect(screen.getByTestId('fare-package-price')).toHaveTextContent('TRY 100');
  });

  it('should disable the select button when status is not AVAILABLE', () => {
    // Arrange
    const onSelectFare = jest.fn();
    const unavailableSubCategory: FareSubcategory = {
      ...mockSubCategory,
      status: 'ERROR',
    };

    // Act
    render(
      <FarePackageCard
        subCategory={unavailableSubCategory}
        flight={mockFlight}
        isPromoActive={false}
        onSelectFare={onSelectFare}
      />
    );

    // Assert
    const selectButton = screen.getByTestId('fare-package-select-button');
    expect(selectButton).toBeDisabled();
    expect(selectButton).toHaveClass('bg-gray-300');
    expect(selectButton).toHaveClass('cursor-not-allowed');
    expect(screen.getByTestId('fare-package-unavailable-message')).toBeInTheDocument();
  });

  it('should disable non-ecoFly packages when isPromoActive is true', () => {
    // Arrange
    const onSelectFare = jest.fn();
    const extraFlySubCategory: FareSubcategory = {
      ...mockSubCategory,
      brandCode: 'extraFly',
    };

    // Act
    render(
      <FarePackageCard
        subCategory={extraFlySubCategory}
        flight={mockFlight}
        isPromoActive={true}
        onSelectFare={onSelectFare}
      />
    );

    // Assert
    const selectButton = screen.getByTestId('fare-package-select-button');
    expect(selectButton).toBeDisabled();
    expect(selectButton).toHaveClass('bg-gray-300');
    expect(selectButton).toHaveClass('cursor-not-allowed');
  });

  it('should show business brand code correctly', () => {
    // Arrange
    const onSelectFare = jest.fn();
    const businessStyleSubCategory: FareSubcategory = {
      ...mockSubCategory,
      brandCode: 'primeFly',
    };

    // Act
    render(
      <FarePackageCard
        subCategory={businessStyleSubCategory}
        flight={mockFlight}
        isPromoActive={false}
        onSelectFare={onSelectFare}
      />
    );

    // Assert
    expect(screen.getByTestId('fare-package-title')).toHaveTextContent('primeFly');
    const selectButton = screen.getByTestId('fare-package-select-button');
    expect(selectButton).not.toBeDisabled();
  });
});
