import { render, screen } from '@testing-library/react';
import React from 'react';

import { FlightSearchContextType, useFlightSearch } from '../../context/FlightSearchContext';

import Header from './Header';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  Link: (props: React.PropsWithChildren<Record<string, unknown>>) => <a href="#" {...props}>{props.children}</a>,
}));

jest.mock('../../context/FlightSearchContext', () => ({
  useFlightSearch: jest.fn(),
}));

const useFlightSearchMock = jest.mocked(useFlightSearch);

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly in light mode (default)', () => {
    // Arrange
    useFlightSearchMock.mockReturnValue({ headerVariant: 'light' } as FlightSearchContextType);

    // Act
    render(<Header />);

    // Assert
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    const container = screen.getByTestId('header-container');
    expect(container).toHaveClass('border-b');
    expect(container).toHaveClass('border-black');
  });

  it('renders correctly in dark mode', () => {
    // Arrange
    useFlightSearchMock.mockReturnValue({ headerVariant: 'dark' } as FlightSearchContextType);

    // Act
    render(<Header />);

    // Assert
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    const container = screen.getByTestId('header-container');
    expect(container).toHaveClass('border-b');
    expect(container).toHaveClass('border-white');
  });
});
