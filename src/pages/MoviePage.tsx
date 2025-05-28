import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import MovieDetails from "../components/MovieDetails";
import Header from "../components/Header";
import type { RootState, AppDispatch } from '../store/store';
import { fetchMovieDetails } from '../store/reducers/movieDetailsSlice';

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector((state: RootState) => state.movieDetails.movie);
  const loading = useSelector((state: RootState) => state.movieDetails.loading);
  const error = useSelector((state: RootState) => state.movieDetails.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
    }
  }, [id, dispatch]);

  return (
    <div data-testid="movie-page" className="flex flex-col items-center">
      <Header movieTitle={movie?.title} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {movie && <MovieDetails movie={movie} />}
    </div>
  );
};

export default MoviePage;