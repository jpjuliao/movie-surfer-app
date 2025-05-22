import { useState, useEffect, useCallback } from 'react';
import type { Movie, UseMoviesResult } from '../types/movie';

const MOVIES_API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY';

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(MOVIES_API_URL);
      if (!response.ok) {
        setMovies([]);
        setError(response.statusText);
      } else {
        const data = await response.json();
        setMovies(data.results || []);
        setError(null);
      }
    } catch (err: any) {
      setMovies([]);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const refetch = useCallback(async () => {
    await fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, refetch };
}