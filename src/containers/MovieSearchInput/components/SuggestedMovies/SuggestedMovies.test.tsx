import { render } from '@testing-library/react';
import { test, describe, vi } from 'vitest';
import { SuggestedMovies } from './SuggestedMovies';

beforeEach(vi.clearAllMocks);

describe('<SuggestedMovies />', () => {
  test('should render a list of suggestedMovies with the first selection having the active class', () => {
    const { getByText } = render(
      <SuggestedMovies
        isMovieSelected={false}
        suggestedMovies={['The Godfather', 'Unforgiven']}
        suggestedMovieIndex={0}
        selectSuggestedMovie={() => null}
      />,
    );

    getByText('The Godfather');
    expect(getByText('The Godfather').classList.contains('active')).toBe(true);
    getByText('Unforgiven');
    expect(getByText('Unforgiven').classList.contains('inactive')).toBe(true);
  });
});
