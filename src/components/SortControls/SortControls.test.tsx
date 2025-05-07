import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { SortByType } from '../../types/components';

import SortControls from './SortControls';

describe('SortControls', () => {
  it('should render with ecoFlyPrice as the current sort by', () => {
    // Arrange
    const onSetSortBy = jest.fn();
    const currentSortBy: SortByType = 'ecoFlyPrice';

    // Act
    render(<SortControls currentSortBy={currentSortBy} onSetSortBy={onSetSortBy} />);

    // Assert
    expect(screen.getByTestId('sort-controls-section')).toBeInTheDocument();
    expect(screen.getByTestId('sort-controls-label')).toHaveTextContent('Sıralama Kriteri');

    const ecoFlyButton = screen.getByTestId('sort-by-eco-fly-price');
    const departureTimeButton = screen.getByTestId('sort-by-departure-time');

    expect(ecoFlyButton).toBeInTheDocument();
    expect(departureTimeButton).toBeInTheDocument();
    expect(ecoFlyButton).toHaveClass('bg-gray-700');
    expect(ecoFlyButton).toHaveClass('text-white');
    expect(departureTimeButton).not.toHaveClass('bg-gray-700');
    expect(departureTimeButton).toHaveClass('bg-white');
  });

  it('should render with departureTime as the current sort by', () => {
    // Arrange
    const onSetSortBy = jest.fn();
    const currentSortBy: SortByType = 'departureTime';

    // Act
    render(<SortControls currentSortBy={currentSortBy} onSetSortBy={onSetSortBy} />);

    // Assert
    const ecoFlyButton = screen.getByTestId('sort-by-eco-fly-price');
    const departureTimeButton = screen.getByTestId('sort-by-departure-time');

    expect(ecoFlyButton).toBeInTheDocument();
    expect(departureTimeButton).toBeInTheDocument();
    expect(departureTimeButton).toHaveClass('bg-gray-700');
    expect(departureTimeButton).toHaveClass('text-white');
    expect(ecoFlyButton).not.toHaveClass('bg-gray-700');
    expect(ecoFlyButton).toHaveClass('bg-white');
  });

  it('should call onSetSortBy with ecoFlyPrice when Ekonomi Kabin Ücreti button is clicked', () => {
    // Arrange
    const onSetSortBy = jest.fn();
    const currentSortBy: SortByType = 'departureTime';

    // Act
    render(<SortControls currentSortBy={currentSortBy} onSetSortBy={onSetSortBy} />);

    fireEvent.click(screen.getByTestId('sort-by-eco-fly-price'));

    // Assert
    expect(onSetSortBy).toHaveBeenCalledTimes(1);
    expect(onSetSortBy).toHaveBeenCalledWith('ecoFlyPrice');
  });

  it('should call onSetSortBy with departureTime when Kalkış Saati button is clicked', () => {
    // Arrange
    const onSetSortBy = jest.fn();
    const currentSortBy: SortByType = 'ecoFlyPrice';

    // Act
    render(<SortControls currentSortBy={currentSortBy} onSetSortBy={onSetSortBy} />);

    fireEvent.click(screen.getByTestId('sort-by-departure-time'));

    // Assert
    expect(onSetSortBy).toHaveBeenCalledTimes(1);
    expect(onSetSortBy).toHaveBeenCalledWith('departureTime');
  });

  it('should have hover styles for non-active buttons', () => {
    // Arrange
    const onSetSortBy = jest.fn();
    const currentSortBy: SortByType = 'ecoFlyPrice';

    // Act
    render(<SortControls currentSortBy={currentSortBy} onSetSortBy={onSetSortBy} />);

    // Assert
    const departureTimeButton = screen.getByTestId('sort-by-departure-time');
    expect(departureTimeButton).toHaveClass('hover:bg-gray-200');
  });

  it('should display the correct header text', () => {
    // Arrange
    const onSetSortBy = jest.fn();
    const currentSortBy: SortByType = 'ecoFlyPrice';

    // Act
    render(<SortControls currentSortBy={currentSortBy} onSetSortBy={onSetSortBy} />);

    // Assert
    expect(screen.getByTestId('sort-controls-label')).toHaveTextContent('Sıralama Kriteri');
  });

  it('should have proper button container structure', () => {
    // Arrange
    const onSetSortBy = jest.fn();
    const currentSortBy: SortByType = 'ecoFlyPrice';

    // Act
    render(<SortControls currentSortBy={currentSortBy} onSetSortBy={onSetSortBy} />);

    // Assert
    const buttonContainer = screen.getByTestId('sort-controls-buttons');
    expect(buttonContainer).toBeInTheDocument();
    expect(buttonContainer.children.length).toBe(2);
  });
});
