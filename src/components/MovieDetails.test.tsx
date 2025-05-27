import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import '@testing-library/jest-dom';

const mockMovie = {
  id: 1,
  original_title: 'Movie 1',
  title: 'Movie 1',
  poster_path: '/poster1.jpg',
  overview: 'A great movie.',
  vote_average: 8.5,
  release_date: '2024-01-01',
  runtime: 120
};

describe('MovieDetails', () => {
  it('renders movie details', () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText('A great movie.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Movie 1' })).toBeInTheDocument();
    // expect(screen.getByText('8.5')).toBeInTheDocument();
    // expect(screen.getByText('2024')).toBeInTheDocument();
  });
});