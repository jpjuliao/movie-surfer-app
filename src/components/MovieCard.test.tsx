import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from './MovieCard';
import '@testing-library/jest-dom';

describe('MovieCard', () => {
  const movie = {
    id: 1,
    title: 'Movie 1',
    poster_path: '/poster1.jpg',
    overview: '',
    vote_average: 0,
    release_date: '',
    original_title: '',
  };

  it('renders the movie poster image', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    const img = screen.getByAltText('Movie 1');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining(movie.poster_path));
  });

  it('links to the movie details page', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/movie/${movie.id}`);
  });
});