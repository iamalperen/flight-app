import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import PromoCodeSection from './PromoCodeSection';

describe('PromoCodeSection', () => {
  it('should render with inactive promo code state', () => {
    // Arrange
    const onTogglePromo = jest.fn();

    // Act
    render(<PromoCodeSection promoCodeActive={false} onTogglePromo={onTogglePromo} />);

    // Assert
    expect(screen.getByTestId('promo-section')).toBeInTheDocument();
    expect(screen.getByTestId('promo-label')).toHaveTextContent('Promosyon Kodu');
    expect(screen.getByTestId('promo-toggle')).toHaveAttribute('aria-checked', 'false');
    expect(screen.queryByTestId('promo-info-banner')).not.toBeInTheDocument();
  });

  it('should render with active promo code state', () => {
    // Arrange
    const onTogglePromo = jest.fn();

    // Act
    render(<PromoCodeSection promoCodeActive={true} onTogglePromo={onTogglePromo} />);

    // Assert
    expect(screen.getByTestId('promo-toggle')).toHaveAttribute('aria-checked', 'true');
    const infoBanner = screen.getByTestId('promo-info-banner');
    expect(infoBanner).toBeInTheDocument();
    expect(screen.getByTestId('promo-info-text')).toHaveTextContent(/%50 indirimle/);
    expect(screen.getByTestId('promo-info-restriction')).toHaveTextContent(
      /seçim yapılamamaktadır/
    );
  });

  it('should call onTogglePromo when the toggle button is clicked', () => {
    // Arrange
    const onTogglePromo = jest.fn();

    // Act
    render(<PromoCodeSection promoCodeActive={false} onTogglePromo={onTogglePromo} />);

    fireEvent.click(screen.getByTestId('promo-toggle'));

    // Assert
    expect(onTogglePromo).toHaveBeenCalledTimes(1);
  });

  it('should have correct toggle slider position when inactive', () => {
    // Arrange
    const onTogglePromo = jest.fn();

    // Act
    render(<PromoCodeSection promoCodeActive={false} onTogglePromo={onTogglePromo} />);

    // Assert
    const slider = screen.getByTestId('toggle-slider');
    expect(slider).toHaveClass('translate-x-1');
    expect(slider).not.toHaveClass('translate-x-6');
  });

  it('should have correct toggle slider position when active', () => {
    // Arrange
    const onTogglePromo = jest.fn();

    // Act
    render(<PromoCodeSection promoCodeActive={true} onTogglePromo={onTogglePromo} />);

    // Assert
    const slider = screen.getByTestId('toggle-slider');
    expect(slider).toHaveClass('translate-x-6');
    expect(slider).not.toHaveClass('translate-x-1');
  });

  it('should have correct toggle button background color when inactive', () => {
    // Arrange
    const onTogglePromo = jest.fn();

    // Act
    render(<PromoCodeSection promoCodeActive={false} onTogglePromo={onTogglePromo} />);

    // Assert
    const toggleButton = screen.getByTestId('promo-toggle');
    expect(toggleButton).toHaveClass('bg-gray-300');
    expect(toggleButton).not.toHaveClass('bg-red-600');
  });

  it('should have correct toggle button background color when active', () => {
    // Arrange
    const onTogglePromo = jest.fn();

    // Act
    render(<PromoCodeSection promoCodeActive={true} onTogglePromo={onTogglePromo} />);

    // Assert
    const toggleButton = screen.getByTestId('promo-toggle');
    expect(toggleButton).toHaveClass('bg-red-600');
    expect(toggleButton).not.toHaveClass('bg-gray-300');
  });

  it('should maintain accessibility attributes', () => {
    // Arrange
    const onTogglePromo = jest.fn();

    // Act
    render(<PromoCodeSection promoCodeActive={false} onTogglePromo={onTogglePromo} />);

    // Assert
    const toggleButton = screen.getByTestId('promo-toggle');
    expect(toggleButton).toHaveAttribute('role', 'switch');
    expect(toggleButton).toHaveAttribute('aria-checked');
    expect(screen.getByText('Promosyon Kodunu Aktifleştir')).toBeInTheDocument();
  });
});
