import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import ActionButton from './ActionButton';

describe('ActionButton', () => {
  it('should render with the provided label', () => {
    // Arrange
    const label = 'Click Me';
    const handleClick = jest.fn();

    // Act
    render(<ActionButton label={label} onClick={handleClick} />);

    // Assert
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
    expect(screen.getByTestId('action-button')).toHaveTextContent('Click Me');
  });

  it('should call the onClick handler when clicked', () => {
    // Arrange
    const label = 'Submit';
    const handleClick = jest.fn();

    // Act
    render(<ActionButton label={label} onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('action-button'));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should use red color by default', () => {
    // Arrange
    const label = 'Default Color';
    const handleClick = jest.fn();

    // Act
    render(<ActionButton label={label} onClick={handleClick} />);

    // Assert
    const button = screen.getByTestId('action-button');
    expect(button).toHaveClass('bg-red-600');
    expect(button).toHaveClass('hover:bg-red-700');
    expect(button).toHaveClass('focus:ring-red-500');
  });

  it('should use blue color when specified', () => {
    // Arrange
    const label = 'Blue Button';
    const handleClick = jest.fn();

    // Act
    render(<ActionButton label={label} onClick={handleClick} color="blue" />);

    // Assert
    const button = screen.getByTestId('action-button');
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('hover:bg-blue-700');
    expect(button).toHaveClass('focus:ring-blue-500');
  });

  it('should use green color when specified', () => {
    // Arrange
    const label = 'Green Button';
    const handleClick = jest.fn();

    // Act
    render(<ActionButton label={label} onClick={handleClick} color="green" />);

    // Assert
    const button = screen.getByTestId('action-button');
    expect(button).toHaveClass('bg-green-600');
    expect(button).toHaveClass('hover:bg-green-700');
    expect(button).toHaveClass('focus:ring-green-500');
  });

  it('should have correct base styling regardless of color', () => {
    // Arrange
    const label = 'Base Styling';
    const handleClick = jest.fn();

    // Act
    render(<ActionButton label={label} onClick={handleClick} />);

    // Assert
    const button = screen.getByTestId('action-button');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('font-medium');
    expect(button).toHaveClass('rounded');
    expect(button).toHaveClass('focus:outline-none');
    expect(button).toHaveClass('focus:ring-2');
    expect(button).toHaveClass('focus:ring-offset-2');
  });

  it('should use custom testId when provided', () => {
    // Arrange
    const label = 'Custom TestId';
    const handleClick = jest.fn();
    const customTestId = 'my-custom-button';

    // Act
    render(<ActionButton label={label} onClick={handleClick} data-testid={customTestId} />);

    // Assert
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
    expect(screen.queryByTestId('action-button')).not.toBeInTheDocument();
  });

  it('should be a button element', () => {
    // Arrange
    const label = 'Button Element';
    const handleClick = jest.fn();

    // Act
    render(<ActionButton label={label} onClick={handleClick} />);

    // Assert
    const button = screen.getByTestId('action-button');
    expect(button.tagName).toBe('BUTTON');
  });
});
