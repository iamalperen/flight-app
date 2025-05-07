import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { AutocompleteOption } from '../../types/flightSearch';

import AutocompleteInput, { AutocompleteInputProps } from './AutocompleteInput';

const options: AutocompleteOption[] = [
  { value: 'IST', label: 'İstanbul', recent: true },
  { value: 'ESB', label: 'Ankara' },
  { value: 'AYT', label: 'Antalya', price: 1200, times: ['09:00', '13:00'] },
];

describe('AutocompleteInput', () => {
  const setup = (props?: Partial<AutocompleteInputProps>) => {
    const defaultProps: AutocompleteInputProps = {
      value: '',
      onChange: jest.fn(),
      options,
      placeholder: 'Şehir seçin',
      disabled: false,
      onSearch: jest.fn().mockResolvedValue(undefined),
    };
    return render(<AutocompleteInput {...defaultProps} {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays input and placeholder correctly on initial render', () => {
    // Arrange & Act
    setup();
    // Assert
    const input = screen.getByTestId('autocomplete-input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe('Şehir seçin');
    expect(input.value).toBe('');
  });

  it('calls onChange(null) and onSearch when user types in input', async () => {
    // Arrange
    const onChange = jest.fn();
    const onSearch = jest.fn().mockResolvedValue(undefined);
    setup({ onChange, onSearch });
    const input = screen.getByTestId('autocomplete-input') as HTMLInputElement;
    // Act
    fireEvent.change(input, { target: { value: 'Ank' } });
    // Assert
    expect(onChange).toHaveBeenCalledWith(null);
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('Ank');
    });
  });

  it('shows options list when input is focused and options exist', () => {
    // Arrange
    setup();
    const input = screen.getByTestId('autocomplete-input');
    // Act
    fireEvent.focus(input);
    // Assert
    expect(screen.getByTestId('options-list')).toBeInTheDocument();
  });

  it('shows correct headers: if recent exists, shows both; if not, shows "Tüm Şehirler"', () => {
    // Arrange
    setup();
    const input = screen.getByTestId('autocomplete-input');
    fireEvent.focus(input);
    // Assert
    expect(screen.getByTestId('recent-searches-header')).toBeInTheDocument();
    expect(screen.getByTestId('other-options-header')).toBeInTheDocument();
    // Act: test again with no recent
    const noRecent = options.map(o => ({ ...o, recent: false }));
    render(
      <AutocompleteInput
        value=""
        onChange={jest.fn()}
        options={noRecent}
        placeholder="Şehir seçin"
      />
    );
    fireEvent.focus(screen.getAllByTestId('autocomplete-input')[1]);
    // Assert
    expect(screen.getByTestId('all-options-header')).toBeInTheDocument();
  });

  it('calls onChange with correct option and closes list when an option is clicked', () => {
    // Arrange
    const onChange = jest.fn();
    setup({ onChange });
    fireEvent.focus(screen.getByTestId('autocomplete-input'));
    const optionButton = screen.getAllByTestId('recent-option')[0];
    // Act
    fireEvent.click(optionButton);
    // Assert
    expect(onChange).toHaveBeenCalledWith(options[0]);
    expect(screen.queryByTestId('options-list')).not.toBeInTheDocument();
  });

  it('allows selecting an option with keyboard (Enter/Space)', () => {
    // Arrange
    const onChange = jest.fn();
    setup({ onChange });
    fireEvent.focus(screen.getByTestId('autocomplete-input'));
    const optionButton = screen.getAllByTestId('recent-option')[0];
    // Act
    fireEvent.keyDown(optionButton, { key: 'Enter' });
    // Assert
    expect(onChange).toHaveBeenCalledWith(options[0]);
  });

  it('disables input and options when disabled prop is true', () => {
    // Arrange
    setup({ disabled: true });
    const input = screen.getByTestId('autocomplete-input');
    // Assert
    expect(input).toBeDisabled();
    expect(screen.queryByTestId('options-list')).not.toBeInTheDocument();
  });

  it('shows loading spinner while searching', async () => {
    // Arrange
    let resolve: (() => void) | undefined;
    const onSearch = jest.fn(() => new Promise<void>(r => { resolve = r; }));
    setup({ onSearch });
    const input = screen.getByTestId('autocomplete-input');
    // Act
    fireEvent.change(input, { target: { value: 'Ant' } });
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
    // Cleanup
    if (resolve) resolve();
  });

  it('displays error message if onSearch throws', async () => {
    // Arrange
    const onSearch = jest.fn().mockRejectedValue(new Error('Arama hatası'));
    setup({ onSearch });
    const input = screen.getByTestId('autocomplete-input');
    // Act
    fireEvent.change(input, { target: { value: 'Antalya' } });
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Arama hatası');
    });
  });

  it('accessibility: sets aria-invalid and aria-describedby if error exists', async () => {
    // Arrange
    const onSearch = jest.fn().mockRejectedValue(new Error('Arama hatası'));
    setup({ onSearch });
    const input = screen.getByTestId('autocomplete-input');
    // Act
    fireEvent.change(input, { target: { value: 'Antalya' } });
    // Assert
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'autocomplete-error');
    });
  });
});
