import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../hooks/useMovies';

const Home = () => {
  const { movies, loading, error } = useMovies();

  return (
    <div data-testid="home-page">
      <h1>Movie Surfer</h1>
      <MovieGrid movies={movies} loading={loading} error={error} />
    </div>
  );
}

export default Home;