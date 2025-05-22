import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import * as movieApi from '../services/movieApi';
import '@testing-library/jest-dom';

jest.mock('../../services/movieApi');

const mockMovie = {
  id: 1,
  original_title: 'Movie 1',
  poster_path: '/poster1.jpg',
  overview: 'A great movie.',
  vote_average: 8.5,
  release_date: '2024-01-01',
};

describe('MovieDetails', () => {
  it('renders movie details after fetch', async () => {
    (movieApi.fetchMovieDetails as jest.Mock).mockResolvedValueOnce(mockMovie);

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('A great movie.')).toBeInTheDocument();
      expect(screen.getByText(/User Rating/i)).toHaveTextContent(String(mockMovie.vote_average));
      expect(screen.getByText(/Release Date/i)).toHaveTextContent(mockMovie.release_date);
      expect(screen.getByAltText('Movie 1')).toBeInTheDocument();
    });
  });
});