import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MoviePage from './MoviePage';

jest.mock('../assets/arrow-left.svg', () => 'ArrowLeft');

describe('MoviePage', () => {
  it('renders without crashing', () => {
    render(<MoviePage />);
    // Add a basic assertion to ensure the component renders
    expect(screen.getByTestId('movie-page')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    render(<MoviePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders movie details when data is loaded', async () => {
    // Mock fetch or data loading logic here as needed
    // For example, if using react-query or SWR, mock the hook
    // This is a placeholder for actual implementation
    // Example:
    // jest.mock('../hooks/useMovie', () => ({
    //   useMovie: () => ({ data: mockMovie, isLoading: false }),
    // }));

    // render(<MoviePage />);
    // expect(await screen.findByText(mockMovie.title)).toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    // Mock error state
    // Example:
    // jest.mock('../hooks/useMovie', () => ({
    //   useMovie: () => ({ error: new Error('Failed to fetch'), isLoading: false }),
    // }));

    // render(<MoviePage />);
    // expect(await screen.findByText(/failed to fetch/i)).toBeInTheDocument();
  });
});
