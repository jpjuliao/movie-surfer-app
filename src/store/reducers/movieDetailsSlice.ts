import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Movie } from '../../types/movie';
import movieApi from '../../services/movieApi';

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const api = movieApi();
      const data = await api.getMovieDetails(movieId);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message || 'Unknown error');
      }
      return rejectWithValue('Unknown error');
    }
  }
);

interface MovieDetailsState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailsState = {
  movie: null,
  loading: false,
  error: null,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movie = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.movie = null;
      });
  },
});

export default movieDetailsSlice.reducer;
