import mockApiResponse from 'classicMovies.json';

export interface Movie {
  id: number;
  title: string;
}

export const mockApiCall: () => Promise<Movie[]> = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockApiResponse.data), 300);
  });
};

export const getMovieData = (title: string) => fetch(`https://omdbapi.com/?s=${title}&apikey=b23ed79b`);
