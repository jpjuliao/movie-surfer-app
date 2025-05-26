import { getTmdbApiKey } from '../utils/env';

const movieApi = () => {
  const API_KEY = getTmdbApiKey();
  const BASE_URL = 'https://api.themoviedb.org/3';

  const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    return response.json();
  };

  const getMovieDetails = async (movieId: number) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    return response.json();
  };

  return {
    getPopularMovies,
    getMovieDetails,
  };
};

export default movieApi;