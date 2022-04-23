import { render, fireEvent } from '@testing-library/react';
import { test, describe } from 'vitest';
import { MovieSearchInput } from './MovieSearchInput';

describe('MovieSearchInput', () => {
  test('renders input', () => {
    const { getByTestId } = render(<MovieSearchInput />);
    const input = getByTestId('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'movie' } });
    expect(input.value).toBe('movie');
  });
});
