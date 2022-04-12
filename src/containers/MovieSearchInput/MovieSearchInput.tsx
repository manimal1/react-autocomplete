import { FC, SyntheticEvent, KeyboardEvent, useState, useEffect, useCallback, useTransition } from 'react';
import { mockApiCall, getMovieData } from 'api';
import { SuggestedMovies } from './components';
import { getSuggestedMovies } from './utils';
import './MovieSearchInput.css';

export const MovieSearchInput: FC = () => {
  const [userInputValue, setUserInputValue] = useState<string>('');
  const [suggestedMovies, setSuggestedMovies] = useState<string[]>(['']);
  const [suggestedMovieIndex, setSuggestedMovieIndex] = useState<number>(0);
  const [isMovieSelected, setIsMoviesSelected] = useState<boolean>(false);
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (userInputValue) {
      mockApiCall
        .then((res) => {
          const movieList = res.map((movie) => movie.title);
          setSuggestedMovies(getSuggestedMovies(movieList, userInputValue));
        })
        .catch((err) => err);
    }

    if (!userInputValue) {
      setPosterUrl('');
    }
  }, [userInputValue]);

  const getPoster = useCallback((value: string) => {
    void getMovieData(value)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { Poster } = data.Search[0];
        setPosterUrl(Poster);
      });
  }, []);

  const onChange = (e: SyntheticEvent) => {
    const userInput = (e.target as HTMLInputElement).value;
    setUserInputValue(userInput);
    setSuggestedMovieIndex(0);
    setIsMoviesSelected(false);
  };

  const selectSuggestedMovie = (value: string) => {
    setUserInputValue(value);
    setSuggestedMovies(['']);
    setSuggestedMovieIndex(0);
    setIsMoviesSelected(true);
    startTransition(() => getPoster(value));
  };

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'Enter': {
        return selectSuggestedMovie(suggestedMovies[suggestedMovieIndex]);
      }
      case 'ArrowUp': {
        if (suggestedMovieIndex === 0) {
          return;
        }
        return setSuggestedMovieIndex(suggestedMovieIndex - 1);
      }
      case 'ArrowDown': {
        if (suggestedMovieIndex + 1 === suggestedMovies.length) {
          return;
        }
        return setSuggestedMovieIndex(suggestedMovieIndex + 1);
      }
    }
  };

  return (
    <div className="auto-complete">
      <input type="text" className="input" onChange={onChange} onKeyDown={onKeyDown} value={userInputValue} />
      {!!suggestedMovies.length && userInputValue && (
        <SuggestedMovies
          isMovieSelected={isMovieSelected}
          suggestedMovies={suggestedMovies}
          suggestedMovieIndex={suggestedMovieIndex}
          selectSuggestedMovie={selectSuggestedMovie}
        />
      )}
      <div>
        {isLoading && <div>Loading . . .</div>}
        {posterUrl && !isLoading && <img className="poster" src={posterUrl} />}
      </div>
    </div>
  );
};
