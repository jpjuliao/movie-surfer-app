import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useMovies } from './useMovies';

// Mock fetch globally
global.fetch = jest.fn();

const mockMoviesResponse = {
  results: [
    {
      id: 1,
      original_title: 'Interstellar',
      poster_path: '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
      overview: 'A team of explorers travel through a wormhole in space...',
      vote_average: 8.3,
      release_date: '2014-11-07',
    },
    {
      id: 2,
      original_title: 'Inception',
      poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      overview: 'A thief who steals corporate secrets through dream-sharing...',
      vote_average: 8.8,
      release_date: '2010-07-16',
    },
  ],
};

describe('useMovies hook', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch and return movies on mount', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMoviesResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useMovies());

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.movies).toHaveLength(2);
    expect(result.current.movies[0].original_title).toBe('Interstellar');
  });

  it('should handle fetch error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    const { result, waitForNextUpdate } = renderHook(() => useMovies());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBe('Internal Server Error');
  });

  it('should handle network error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const { result, waitForNextUpdate } = renderHook(() => useMovies());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBe('Network Error');
  });

  it('should provide a refetch method', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMoviesResponse,
    });

    const { result, waitForNextUpdate } = renderHook(() => useMovies());

    await waitForNextUpdate();

    expect(result.current.movies).toHaveLength(2);

    // Change mock for refetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.movies).toHaveLength(0);
  });
});