import { useState, useEffect, useCallback } from 'react';
import type { Movie, UseMoviesResult } from '../types/movie';
import movieApi from '../services/movieApi';

export function useMovies(page: number = 1): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const api = movieApi();
      const data = await api.getPopularMovies(page);
      setMovies(data.results || []);
      setError(null);
    } catch (err: any) {
      setMovies([]);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const refetch = useCallback(async () => {
    await fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, refetch };
}