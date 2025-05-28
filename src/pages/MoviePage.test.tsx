import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MoviePage from './MoviePage';
import '../types/global.d.ts';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import movieDetailsReducer from '../store/reducers/movieDetailsSlice';

const mockStore = configureStore({
  reducer: { movieDetails: movieDetailsReducer },
  preloadedState: { movieDetails: { movie: null, loading: true, error: null } }
});

describe('MoviePage', () => {
  it('renders loading state with router', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviePage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviePage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders movie details when data is loaded', async () => {
    // TODO: implement test
  });

  it('shows error message on fetch failure', async () => {
    // TODO: implement test
  });
});
