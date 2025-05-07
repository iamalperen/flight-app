import { render, screen } from '@testing-library/react';
import React from 'react';

import StatusMessage from './StatusMessage';

describe('StatusMessage', () => {
  it('should render the success message when status is AVAILABLE', () => {
    // Arrange

    // Act
    render(<StatusMessage status="AVAILABLE" />);

    // Assert
    expect(screen.getByTestId('status-message-container')).toBeInTheDocument();
    expect(screen.getByTestId('status-message-text')).toBeInTheDocument();
    expect(screen.getByTestId('status-message-text')).toHaveTextContent(
      'Kabin seçiminiz tamamlandı.'
    );
  });

  it('should render the error message when status is ERROR', () => {
    // Arrange

    // Act
    render(<StatusMessage status="ERROR" />);

    // Assert
    expect(screen.getByTestId('status-message-container')).toBeInTheDocument();
    expect(screen.getByTestId('status-message-text')).toBeInTheDocument();
    expect(screen.getByTestId('status-message-text')).toHaveTextContent(
      'Kabin seçiminiz tamamlanamadı.'
    );
  });

  it('should have correct styling for the container', () => {
    // Arrange

    // Act
    render(<StatusMessage status="AVAILABLE" />);

    // Assert
    const container = screen.getByTestId('status-message-container');
    expect(container).toHaveClass('text-center');
    expect(container).toHaveClass('mb-8');
  });

  it('should have correct styling for the message text', () => {
    // Arrange

    // Act
    render(<StatusMessage status="AVAILABLE" />);

    // Assert
    const textElement = screen.getByTestId('status-message-text');
    expect(textElement).toHaveClass('text-lg');
    expect(textElement).toHaveClass('font-medium');
    expect(textElement).toHaveClass('text-gray-700');
  });

  it('should render as an h2 element', () => {
    // Arrange

    // Act
    render(<StatusMessage status="AVAILABLE" />);

    // Assert
    const textElement = screen.getByTestId('status-message-text');
    expect(textElement.tagName).toBe('H2');
  });

  it('should change message correctly when status changes', () => {
    // Arrange
    const { rerender } = render(<StatusMessage status="AVAILABLE" />);

    // Assert
    expect(screen.getByTestId('status-message-text')).toHaveTextContent(
      'Kabin seçiminiz tamamlandı.'
    );

    // Act
    rerender(<StatusMessage status="ERROR" />);

    // Assert
    expect(screen.getByTestId('status-message-text')).toHaveTextContent(
      'Kabin seçiminiz tamamlanamadı.'
    );
  });
});
