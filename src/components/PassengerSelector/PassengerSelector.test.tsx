import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { PassengerValue } from '../../types';

import PassengerSelector, { PassengerSelectorProps } from './PassengerSelector';

describe('PassengerSelector', () => {
  const defaultValue: PassengerValue = { count: 2, cabin: 'economy' };
  const setup = (props?: Partial<PassengerSelectorProps>) => {
    const defaultProps: PassengerSelectorProps = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    return render(<PassengerSelector {...defaultProps} {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders trigger with user icon and count', () => {
    // Arrange
    setup();
    // Act
    // (no user interaction needed)
    // Assert
    expect(screen.getByTestId('passenger-selector')).toBeInTheDocument();
    expect(screen.getByTestId('passenger-selector-trigger')).toBeInTheDocument();
    expect(screen.getByText('2 Yolcu')).toBeInTheDocument();
  });

  it('opens and closes dropdown on trigger click', () => {
    // Arrange
    setup();
    // Act
    fireEvent.click(screen.getByTestId('passenger-selector-trigger'));
    // Assert
    expect(screen.getByTestId('passenger-selector-dropdown')).toBeInTheDocument();
    // Act (close)
    fireEvent.click(screen.getByTestId('passenger-selector-trigger'));
    // Assert
    expect(screen.queryByTestId('passenger-selector-dropdown')).not.toBeInTheDocument();
  });

  it('calls onChange with decreased count, disables at min', () => {
    // Arrange
    const onChange = jest.fn();
    setup({ value: { count: 1, cabin: 'economy' }, onChange });
    fireEvent.click(screen.getByTestId('passenger-selector-trigger'));
    // Act & Assert: decrease is disabled at min
    expect(screen.getByTestId('passenger-count-decrease')).toBeDisabled();
    // Act: increase
    fireEvent.click(screen.getByTestId('passenger-count-increase'));
    expect(onChange).toHaveBeenCalledWith({ count: 2, cabin: 'economy' });
  });

  it('increase is always enabled (no upper limit)', () => {
    // Arrange
    const onChange = jest.fn();
    setup({ value: { count: 99, cabin: 'economy' }, onChange });
    fireEvent.click(screen.getByTestId('passenger-selector-trigger'));
    // Assert: increase is enabled
    expect(screen.getByTestId('passenger-count-increase')).not.toBeDisabled();
    // Act: increase
    fireEvent.click(screen.getByTestId('passenger-count-increase'));
    expect(onChange).toHaveBeenCalledWith({ count: 100, cabin: 'economy' });
  });

  it('calls onChange with correct cabin when cabin is changed', () => {
    // Arrange
    const onChange = jest.fn();
    setup({ value: { count: 2, cabin: 'economy' }, onChange });
    fireEvent.click(screen.getByTestId('passenger-selector-trigger'));
    // Act
    fireEvent.click(screen.getByTestId('cabin-business'));
    // Assert
    expect(onChange).toHaveBeenCalledWith({ count: 2, cabin: 'business' });
    // Act
    fireEvent.click(screen.getByTestId('cabin-economy'));
    // Assert
    expect(onChange).toHaveBeenCalledWith({ count: 2, cabin: 'economy' });
  });

  it('renders icons for count and cabin buttons', () => {
    // Arrange
    setup();
    fireEvent.click(screen.getByTestId('passenger-selector-trigger'));
    // Act & Assert
    expect(screen.getByTestId('passenger-count-decrease').querySelector('svg')).toBeInTheDocument();
    expect(screen.getByTestId('passenger-count-increase').querySelector('svg')).toBeInTheDocument();
    expect(screen.getByTestId('cabin-economy').querySelector('svg')).toBeInTheDocument();
    expect(screen.getByTestId('cabin-business').querySelector('svg')).toBeInTheDocument();
  });
});

export {};
