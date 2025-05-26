import { useCallback } from 'react';
import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../hooks/useMovies';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  const { movies, loading, error } = useMovies();
  const navigate = useNavigate();

  const handlePosterClick = useCallback((id: number) => {
    navigate(`/movie/${id}`);
  }, [navigate]);

  return (
    <div data-testid="home-page">
      <Header />
      <MovieGrid
        movies={movies}
        loading={loading}
        error={error}
        onPosterClick={handlePosterClick}
      />
    </div>
  );
}

export default Home;