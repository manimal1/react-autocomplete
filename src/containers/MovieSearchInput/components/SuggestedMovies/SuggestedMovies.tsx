import { FC, SyntheticEvent } from 'react';
import './SuggestedMovies.css';

interface Props {
  isMovieSelected: boolean;
  suggestedMovies: string[];
  suggestedMovieIndex: number;
  selectSuggestedMovie: (value: string) => void;
}

export const SuggestedMovies: FC<Props> = ({
  suggestedMovies,
  suggestedMovieIndex,
  isMovieSelected,
  selectSuggestedMovie,
}) => {
  if (!suggestedMovies[0] || isMovieSelected) {
    return null;
  }

  const onClick = (e: SyntheticEvent) => {
    const movieTitle = (e.target as HTMLInputElement).innerText;
    selectSuggestedMovie(movieTitle);
  };

  return (
    <ul className="suggested-values">
      {suggestedMovies.map((suggestion, index) => {
        return (
          <li key={suggestion} className={index === suggestedMovieIndex ? 'active' : 'inactive'} onClick={onClick}>
            {suggestion}
          </li>
        );
      })}
    </ul>
  );
};
