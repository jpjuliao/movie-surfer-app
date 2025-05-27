import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import '../types/global.d.ts';

describe('Home', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders grid of movie posters when data is loaded', async () => {
    // Example: mock the hook or fetch logic to return movies
    // jest.mock('../hooks/useMovies', () => ({
    //   useMovies: () => ({ data: mockMovies, isLoading: false }),
    // }));

    // render(<Home />);
    // expect(await screen.findAllByAltText(/poster/i)).toHaveLength(mockMovies.length);
  });

  it('navigates to movie details when a poster is clicked', async () => {
    // Example: mock navigation and movies data
    // const mockNavigate = jest.fn();
    // jest.mock('react-router-dom', () => ({
    //   ...jest.requireActual('react-router-dom'),
    //   useNavigate: () => mockNavigate,
    // }));
    // jest.mock('../hooks/useMovies', () => ({
    //   useMovies: () => ({ data: mockMovies, isLoading: false }),
    // }));

    // render(<Home />);
    // fireEvent.click(await screen.findByAltText(mockMovies[0].title));
    // expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovies[0].id}`);
  });

  it('shows error message on fetch failure', async () => {
    // Example: mock error state
    // jest.mock('../hooks/useMovies', () => ({
    //   useMovies: () => ({ error: new Error('Failed to fetch'), isLoading: false }),
    // }));

    // render(<Home />);
    // expect(await screen.findByText(/failed to fetch/i)).toBeInTheDocument();
  });
});
