import { FC, SyntheticEvent, KeyboardEvent, useState, useEffect, useCallback, useTransition } from 'react';
import { debounce } from 'lodash';
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

  const getMovieList = useCallback(
    debounce(
      (inputValue) =>
        mockApiCall()
          .then((res) => {
            const movieList = res.map((movie) => movie.title);
            setSuggestedMovies(getSuggestedMovies(movieList, inputValue));
          })
          .catch((err) => err),
      400,
    ),
    [],
  );

  useEffect(() => {
    if (userInputValue) {
      getMovieList(userInputValue);
    }

    if (!userInputValue) {
      setPosterUrl('');
      setSuggestedMovies(['']);
    }
  }, [userInputValue, getMovieList]);

  const getPoster = useCallback((movieTitle: string) => {
    void getMovieData(movieTitle)
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

  const selectSuggestedMovie = (movieTitle: string) => {
    setUserInputValue(movieTitle);
    setSuggestedMovies(['']);
    setSuggestedMovieIndex(0);
    setIsMoviesSelected(true);
    startTransition(() => getPoster(movieTitle));
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
      <input
        type="text"
        className="input"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInputValue}
        data-testid="input"
      />
      <SuggestedMovies
        isMovieSelected={isMovieSelected}
        suggestedMovies={suggestedMovies}
        suggestedMovieIndex={suggestedMovieIndex}
        selectSuggestedMovie={selectSuggestedMovie}
      />
      <div>
        {isLoading && <div>Loading . . .</div>}
        {posterUrl && !isLoading && <img className="poster" src={posterUrl} />}
      </div>
    </div>
  );
};
