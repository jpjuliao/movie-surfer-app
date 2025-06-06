import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movieSlice';
import paginationReducer from './reducers/paginationSlice';
import movieDetailsReducer from './reducers/movieDetailsSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    pagination: paginationReducer,
    movieDetails: movieDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 