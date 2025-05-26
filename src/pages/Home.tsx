import { useCallback, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../hooks/useMovies';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Pagination from '../components/Pagination';

const Home = () => {
  const [page, setPage] = useState(1);
  const { movies, loading, error } = useMovies(page);
  const navigate = useNavigate();

  const handlePosterClick = useCallback((id: number) => {
    navigate(`/movie/${id}`);
  }, [navigate]);

  const handlePrev = () => {
    setPage((p) => {
      const newPage = Math.max(1, p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return newPage;
    });
  };

  const handleNext = () => {
    setPage((p) => {
      const newPage = p + 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return newPage;
    });
  };

  return (
    <div data-testid="home-page" className="min-h-screen">
      <Header />
      <MovieGrid
        movies={movies}
        loading={loading}
        error={error}
        onPosterClick={handlePosterClick}
      />
      <Pagination
        page={page}
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={page === 1}
      />
    </div>
  );
}

export default Home;