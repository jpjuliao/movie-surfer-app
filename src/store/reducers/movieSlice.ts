import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Movie } from '../../types/movie';
import movieApi from '../../services/movieApi';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const api = movieApi();
      const data = await api.getPopularMovies(page);
      return data.results || [];
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unknown error');
    }
  }
);

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer; 