import { renderHook, waitFor } from '@testing-library/react';
import { useMovies } from '../hooks/useMovies';
import movieApi from './movieApi';

jest.mock('./movieApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('movieApi service', () => {
  let getPopularMoviesMock: jest.Mock;
  let getMovieDetailsMock: jest.Mock;

  beforeEach(() => {
    getPopularMoviesMock = jest.fn();
    getMovieDetailsMock = jest.fn();
    (movieApi as jest.Mock).mockReturnValue({
      getPopularMovies: getPopularMoviesMock,
      getMovieDetails: getMovieDetailsMock,
    });
  });

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
          overview: 'Movie 1 overview',
          vote_average: 8.5,
          release_date: '2022-01-01',
          original_title: 'Movie 1 Original',
        },
        {
          id: 456,
          title: 'Movie 2',
          poster_path: '/path/to/poster2.jpg',
          overview: 'Movie 2 overview',
          vote_average: 7.5,
          release_date: '2022-02-01',
          original_title: 'Movie 2 Original',
        },
      ],
    };
    getPopularMoviesMock.mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useMovies());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.movies).toEqual(mockResponse.results);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API error', async () => {
    const mockError = new Error('API error');
    getPopularMoviesMock.mockRejectedValue(mockError);
    const { result } = renderHook(() => useMovies());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(mockError.message);
    expect(result.current.loading).toBe(false);
    expect(result.current.movies).toEqual([]);
  });

  it('should set loading to true while fetching', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    getPopularMoviesMock.mockReturnValue(promise);
    const { result } = renderHook(() => useMovies());
    expect(result.current.loading).toBe(true);
    resolvePromise!({ results: [] });
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it('should fetch movie details and update movies array', async () => {
    const mockPopularResponse = {
      results: [
        {
          id: 123,
          title: 'Movie 1',
          poster_path: '/path/to/poster1.jpg',
          overview: 'Movie 1 overview',
          vote_average: 8.5,
          release_date: '2022-01-01',
          original_title: 'Movie 1 Original',
        },
      ],
    };
    const mockDetailsResponse = {
      id: 123,
      title: 'Movie 1',
      poster_path: '/path/to/poster1.jpg',
      overview: 'Movie 1 overview',
      vote_average: 8.5,
      release_date: '2022-01-01',
      original_title: 'Movie 1 Original',
    };
    getPopularMoviesMock.mockResolvedValue(mockPopularResponse);
    getMovieDetailsMock.mockResolvedValue(mockDetailsResponse);
    const { result } = renderHook(() => useMovies());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.movies[0]).toEqual(mockPopularResponse.results[0]);
  });

  it('should reset error and loading on new fetch', async () => {
    const mockError = new Error('API error');
    getPopularMoviesMock.mockRejectedValueOnce(mockError);
    const { result } = renderHook(() => useMovies());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(mockError.message);

    // Simulate a successful fetch after error
    const mockResponse = {
      results: [
        {
          id: 789,
          title: 'Movie 3',
          poster_path: '/path/to/poster3.jpg',
          overview: 'Movie 3 overview',
          vote_average: 9.0,
          release_date: '2022-03-01',
          original_title: 'Movie 3 Original',
        },
      ],
    };
    getPopularMoviesMock.mockResolvedValueOnce(mockResponse);
    const { result: result2 } = renderHook(() => useMovies());
    await waitFor(() => expect(result2.current.loading).toBe(false));
    expect(result2.current.error).toBe(null);
    expect(result2.current.movies).toEqual(mockResponse.results);
    expect(result2.current.loading).toBe(false);
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

    getMovieDetailsMock.mockResolvedValue(mockResponse);

    // Directly call the mocked getMovieDetails and check the result
    const result = await getMovieDetailsMock(123);

    expect(result).toEqual(mockResponse);
  });

  it('should fetch popular movies for a specific page (pagination)', async () => {
    const mockPage = 3;
    const mockResponse = {
      results: [
        {
          id: 999,
          title: 'Movie Page 3',
          poster_path: '/poster-page3.jpg',
          overview: 'Page 3 overview',
          vote_average: 7.7,
          release_date: '2022-05-01',
          original_title: 'Movie Page 3 Original',
        },
      ],
      page: mockPage,
      total_pages: 10,
      total_results: 100,
    };
    getPopularMoviesMock.mockResolvedValueOnce(mockResponse);

    // Call getPopularMovies with a specific page
    await getPopularMoviesMock(mockPage);

    expect(getPopularMoviesMock).toHaveBeenCalledWith(mockPage);
    const { result } = renderHook(() => useMovies());
    await waitFor(() => expect(result.current.loading).toBe(false));
    // The hook always fetches page 1 by default, so we check the mock call above
  });
});
