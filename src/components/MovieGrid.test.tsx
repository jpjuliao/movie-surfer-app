import { render, screen, fireEvent } from '@testing-library/react';
import MovieGrid from './MovieGrid';
import '@testing-library/jest-dom';

describe('MovieGrid', () => {
  it('renders a grid of movie posters on initial load', () => {
    // Mock movies data
    const movies = [
      {
        id: 1,
        title: 'Movie 1',
        original_title: 'Movie 1',
        poster_path: '/poster1.jpg',
        overview: '',
        vote_average: 0,
        release_date: '',
      },
      {
        id: 2,
        title: 'Movie 2',
        original_title: 'Movie 2',
        poster_path: '/poster2.jpg',
        overview: '',
        vote_average: 0,
        release_date: '',
      },
    ];
    render(<MovieGrid movies={movies} loading={false} error={null} />);
    // Check that each movie poster is rendered
    expect(screen.getByAltText('Movie 1')).toBeInTheDocument();
    expect(screen.getByAltText('Movie 2')).toBeInTheDocument();
  });

  it('each poster displays an image and is clickable', () => {
    const movies = [
      {
        id: 1,
        title: 'Movie 1',
        original_title: 'Movie 1',
        poster_path: '/poster1.jpg',
        overview: '',
        vote_average: 0,
        release_date: '',
      },
    ];
    const onPosterClick = jest.fn();
    render(
      <MovieGrid
        movies={movies}
        loading={false}
        error={null}
        onPosterClick={onPosterClick}
      />
    );
    const poster = screen.getByAltText('Movie 1');
    expect(poster).toBeInTheDocument();
    fireEvent.click(poster);
    expect(onPosterClick).toHaveBeenCalledWith(1);
  });

  it('shows a loading state when loading', () => {
    render(<MovieGrid movies={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows an error message when error occurs', () => {
    render(<MovieGrid movies={[]} loading={false} error="Failed to load" />);
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
});