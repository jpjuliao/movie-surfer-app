import type { MovieGridProps, Movie } from "../types/movie";

const MovieGrid = (movies: MovieGridProps) => {
  if (movies.error) {
    return <p>Error: {movies.error}</p>;
  }
  if (movies.loading) {
    return <p>Loading...</p>;
  }
  if (movies.movies.length === 0) {
    return <p>No movies found.</p>;
  }
  const handlePosterClick = (id: number) => {
    if (movies.onPosterClick) {
      movies.onPosterClick(id);
    }
  };

  return (
    <>
      {movies.movies.map((movie: Movie) => (
        <div key={movie.id} onClick={() => handlePosterClick(movie.id)}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100px', height: '150px' }}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </>
  );
};

export default MovieGrid;