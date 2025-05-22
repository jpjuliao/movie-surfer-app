import { renderHook } from '@testing-library/react-hooks';
import { useMovies } from '../hooks/useMovies';
import movieApi from './movieApi';

jest.mock('./movieApi');

describe('movieApi service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch popular movies', async () => {
    const mockResponse = {
      results: [
        {
          id: 123,
          title: 'Movie 1',
          poster_path: '/path/to/poster1.jpg',
        },
        {
          id: 456,
          title: 'Movie 2',
          poster_path: '/path/to/poster2.jpg',
        },
      ],
    };

    (movieApi().getPopularMovies as jest.Mock).mockResolvedValue(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useMovies());

    await waitForNextUpdate();

    expect(result.current.movies).toEqual(mockResponse.results);
  });

  it('should handle API error', async () => {
    const mockError = new Error('API error');

    (movieApi().getPopularMovies as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useMovies());

    await waitForNextUpdate();

    expect(result.current.error).toBe(mockError.message);
  });

  it('should fetch movie details', async () => {
    const mockResponse = {
      id: 123,
      title: 'Movie 1',
      poster_path: '/path/to/poster1.jpg',
      overview: 'Movie 1 overview',
      vote_average: 8.5,
      release_date: '2022-01-01',
    };

    (movieApi().getMovieDetails as jest.Mock).mockResolvedValue(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useMovies());

    await waitForNextUpdate();

    expect(result.current.movies[0]).toEqual(mockResponse);
  });
});
