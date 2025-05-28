import { useCallback, useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../hooks/useMovies';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Pagination from '../components/Pagination';

const Home = () => {
  const params = useParams<{ pageNumber?: string }>();
  const initialPage = params.pageNumber ? parseInt(params.pageNumber, 10) : 1;
  const [page, setPage] = useState(initialPage);
  const { movies, loading, error } = useMovies(page);
  const navigate = useNavigate();

  // Sync state with URL if user navigates directly to /page/:pageNumber
  useEffect(() => {
    const urlPage = params.pageNumber ? parseInt(params.pageNumber, 10) : 1;
    if (urlPage !== page) setPage(urlPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.pageNumber]);

  // Update URL when page changes
  useEffect(() => {
    const urlPage = params.pageNumber ? parseInt(params.pageNumber, 10) : 1;
    if (page !== urlPage) {
      if (page === 1) {
        navigate('/', { replace: true });
      } else {
        navigate(`/page/${page}`, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlePosterClick = useCallback((id: number) => {
    navigate(`/movie/${id}`);
  }, [navigate]);

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    setPage((p) => p + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFirst = () => {
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {movies.length > 0 && (
        <Pagination
          page={page}
          onPrev={handlePrev}
          onNext={handleNext}
          onFirst={handleFirst}
          disablePrev={page === 1}
          disableFirst={page === 1}
        />
      )}
    </div>
  );
}

export default Home;