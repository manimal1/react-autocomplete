import { render, fireEvent, screen } from '@testing-library/react';
import { test, describe, vi } from 'vitest';
import { MovieSearchInput } from './MovieSearchInput';

vi.mock('api', () => {
  return {
    mockApiCall: () => Promise.resolve(['movie 1']),
    getMovieData: () => Promise.resolve(),
  };
});

describe('MovieSearchInput', () => {
  test('renders input', () => {
    render(<MovieSearchInput />);
    const input = screen.getByTestId('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'movie' } });
    expect(input.value).toBe('movie');
  });
});
