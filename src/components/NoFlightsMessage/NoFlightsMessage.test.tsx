import { render, screen } from '@testing-library/react';
import React from 'react';

import NoFlightsMessage from './NoFlightsMessage';

describe('NoFlightsMessage', () => {
  it('should render the no flights message', () => {
    // Arrange

    // Act
    render(<NoFlightsMessage />);

    // Assert
    expect(screen.getByTestId('no-flights-message')).toBeInTheDocument();
    expect(screen.getByTestId('no-flights-message')).toHaveTextContent(
      'Bu kriterlere uygun uçuş bulunamadı.'
    );
  });

  it('should have correct styling classes', () => {
    // Arrange

    // Act
    render(<NoFlightsMessage />);

    // Assert
    const messageElement = screen.getByTestId('no-flights-message');
    expect(messageElement).toHaveClass('text-center');
    expect(messageElement).toHaveClass('text-gray-500');
    expect(messageElement).toHaveClass('py-10');
    expect(messageElement).toHaveClass('bg-white');
    expect(messageElement).toHaveClass('rounded-md');
    expect(messageElement).toHaveClass('shadow-md');
  });

  it('should be accessible', () => {
    // Arrange

    // Act
    render(<NoFlightsMessage />);

    // Assert
    const messageElement = screen.getByTestId('no-flights-message');
    expect(messageElement).not.toHaveAttribute('aria-hidden', 'true');
    expect(messageElement).toBeVisible();
  });

  it('should be a div element', () => {
    // Arrange

    // Act
    render(<NoFlightsMessage />);

    // Assert
    const messageElement = screen.getByTestId('no-flights-message');
    expect(messageElement.tagName).toBe('DIV');
  });

  it('should not have any interactive elements', () => {
    // Arrange

    // Act
    render(<NoFlightsMessage />);

    // Assert
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });
});
