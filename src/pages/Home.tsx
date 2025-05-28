import { useCallback, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMovies } from '../store/reducers/movieSlice';
import { setPage } from '../store/reducers/paginationSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import type { RootState, AppDispatch } from '../store/store';

const Home = () => {
  const params = useParams<{ pageNumber?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const page = useSelector((state: RootState) => state.pagination.page);
  const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  // Sync state with URL if user navigates directly to /page/:pageNumber
  useEffect(() => {
    const urlPage = params.pageNumber ? parseInt(params.pageNumber, 10) : 1;
    if (urlPage !== page) {
      dispatch(setPage(urlPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.pageNumber]);

  // Fetch movies when page changes
  useEffect(() => {
    dispatch(fetchPopularMovies(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
    dispatch(setPage(Math.max(1, page - 1)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    dispatch(setPage(page + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFirst = () => {
    dispatch(setPage(1));
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