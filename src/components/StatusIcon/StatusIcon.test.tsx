import { render, screen } from '@testing-library/react';
import React from 'react';

import StatusIcon from './StatusIcon';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({
    icon,
    className,
    'data-testid': testId,
  }: {
    icon: object;
    className: string;
    'data-testid': string;
  }) => (
    <span className={className} data-testid={testId} data-icon-id={JSON.stringify(icon)}></span>
  ),
}));

describe('StatusIcon', () => {
  it('should render the success icon when status is AVAILABLE', () => {
    // Arrange

    // Act
    render(<StatusIcon status="AVAILABLE" />);

    // Assert
    expect(screen.getByTestId('status-icon-container')).toBeInTheDocument();
    expect(screen.getByTestId('success-icon-container')).toBeInTheDocument();
    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('error-icon-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-icon')).not.toBeInTheDocument();
  });

  it('should render the error icon when status is ERROR', () => {
    // Arrange

    // Act
    render(<StatusIcon status="ERROR" />);

    // Assert
    expect(screen.getByTestId('status-icon-container')).toBeInTheDocument();
    expect(screen.getByTestId('error-icon-container')).toBeInTheDocument();
    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('success-icon-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-icon')).not.toBeInTheDocument();
  });

  it('should have correct styling for success state', () => {
    // Arrange

    // Act
    render(<StatusIcon status="AVAILABLE" />);

    // Assert
    const successContainer = screen.getByTestId('success-icon-container');
    expect(successContainer).toHaveClass('bg-green-100');
    expect(successContainer).toHaveClass('rounded-full');
    expect(successContainer).toHaveClass('flex');
    expect(successContainer).toHaveClass('items-center');
    expect(successContainer).toHaveClass('justify-center');

    const successIcon = screen.getByTestId('success-icon');
    expect(successIcon).toHaveClass('text-green-500');
    expect(successIcon).toHaveClass('text-2xl');
  });

  it('should have correct styling for error state', () => {
    // Arrange

    // Act
    render(<StatusIcon status="ERROR" />);

    // Assert
    const errorContainer = screen.getByTestId('error-icon-container');
    expect(errorContainer).toHaveClass('bg-red-100');
    expect(errorContainer).toHaveClass('rounded-full');
    expect(errorContainer).toHaveClass('flex');
    expect(errorContainer).toHaveClass('items-center');
    expect(errorContainer).toHaveClass('justify-center');

    const errorIcon = screen.getByTestId('error-icon');
    expect(errorIcon).toHaveClass('text-red-500');
    expect(errorIcon).toHaveClass('text-2xl');
  });

  it('should have correct container styling regardless of status', () => {
    // Arrange

    // Act
    render(<StatusIcon status="AVAILABLE" />);

    // Assert
    const container = screen.getByTestId('status-icon-container');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('mb-6');
  });

  it('should use the correct FontAwesome icons', () => {
    // Arrange

    // Act
    const { rerender } = render(<StatusIcon status="AVAILABLE" />);

    // Assert
    const successIcon = screen.getByTestId('success-icon');
    expect(successIcon).toHaveAttribute(
      'data-icon-id',
      expect.stringContaining('"iconName":"check"')
    );

    // Act
    rerender(<StatusIcon status="ERROR" />);

    // Assert
    const errorIcon = screen.getByTestId('error-icon');
    expect(errorIcon).toHaveAttribute(
      'data-icon-id',
      expect.stringContaining('"iconName":"xmark"')
    );
  });
});
