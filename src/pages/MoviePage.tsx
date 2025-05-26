import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../services/movieApi";
import MovieDetails from "../components/MovieDetails";
import Header from "../components/Header";
import type { Movie } from "../types/movie";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = movieApi();
        const data = await api.getMovieDetails(Number(id));
        setMovie(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMovie();
  }, [id]);

  return (
    <div data-testid="movie-page" className="flex flex-col items-center w-screen">
      <Header movieTitle={movie?.title} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {movie && <MovieDetails movie={movie} />}
    </div>
  );
};

export default MoviePage;