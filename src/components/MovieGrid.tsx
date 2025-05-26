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
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        xl:grid-cols-6 
        gap-0
      "
    >
      {movies.movies.map((movie: Movie) => (
        <div
          key={movie.id}
          className="relative cursor-pointer group"
          onClick={() => handlePosterClick(movie.id)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover"
          />
          <div
            className="
              absolute inset-0 
              bg-black bg-opacity-60 
              opacity-0 group-hover:opacity-100 
              flex items-center justify-center
              transition-opacity
            "
          >
            <span className="text-white text-lg font-semibold text-center px-2">
              {movie.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;