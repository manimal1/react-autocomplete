import mockApiResponse from 'classicMovies.json';

export interface Movie {
  id: number;
  title: string;
}

export const mockApiCall: Promise<Movie[]> = new Promise((resolve) => resolve(mockApiResponse.data));

export const getMovieData = (title: string) => fetch(`https://omdbapi.com/?s=${title}&apikey=b23ed79b`);
