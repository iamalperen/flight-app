import { render, screen } from '@testing-library/react';
import React from 'react';

import PriceDisplay from './PriceDisplay';

describe('PriceDisplay', () => {
  it('should render the price display component', () => {
    // Arrange
    const amount = 100;
    const currency = 'TRY';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    expect(screen.getByTestId('price-display-container')).toBeInTheDocument();
    expect(screen.getByTestId('price-display-label')).toBeInTheDocument();
    expect(screen.getByTestId('price-display-amount')).toBeInTheDocument();
  });

  it('should display the correct amount and currency', () => {
    // Arrange
    const amount = 250;
    const currency = 'USD';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    expect(screen.getByTestId('price-display-amount')).toHaveTextContent('USD 250');
  });

  it('should format the price with thousands separator for large amounts', () => {
    // Arrange
    const amount = 1500;
    const currency = 'EUR';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    expect(screen.getByTestId('price-display-amount')).toHaveTextContent('EUR 1.500');
  });

  it('should display the correct label text', () => {
    // Arrange
    const amount = 100;
    const currency = 'TRY';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    expect(screen.getByTestId('price-display-label')).toHaveTextContent('Toplam tutar');
  });

  it('should have correct styling for the container', () => {
    // Arrange
    const amount = 100;
    const currency = 'TRY';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    const container = screen.getByTestId('price-display-container');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('justify-between');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('border-b');
    expect(container).toHaveClass('border-gray-200');
    expect(container).toHaveClass('pb-4');
    expect(container).toHaveClass('mb-6');
  });

  it('should have correct styling for the label', () => {
    // Arrange
    const amount = 100;
    const currency = 'TRY';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    const label = screen.getByTestId('price-display-label');
    expect(label).toHaveClass('text-gray-600');
  });

  it('should have correct styling for the amount', () => {
    // Arrange
    const amount = 100;
    const currency = 'TRY';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    const amountElement = screen.getByTestId('price-display-amount');
    expect(amountElement).toHaveClass('text-blue-600');
    expect(amountElement).toHaveClass('font-medium');
    expect(amountElement).toHaveClass('text-2xl');
  });

  it('should work with zero amount', () => {
    // Arrange
    const amount = 0;
    const currency = 'TRY';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    expect(screen.getByTestId('price-display-amount')).toHaveTextContent('TRY 0');
  });

  it('should work with decimal amounts', () => {
    // Arrange
    const amount = 99.99;
    const currency = 'USD';

    // Act
    render(<PriceDisplay amount={amount} currency={currency} />);

    // Assert
    expect(screen.getByTestId('price-display-amount')).toHaveTextContent('USD 99,99');
  });
});
