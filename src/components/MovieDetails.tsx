import type { Movie } from "../types/movie";

const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div
      className="
        max-w-md
        w-full
        bg-white
        dark:bg-gray-900
        rounded-lg
        shadow-lg
        p-4
      "
    >
      <img
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={movie.title}
        className="
          w-full
          rounded-md
          mb-4
        "
      />
      <h2
        className="
          text-2xl
          font-bold
          mb-2
          text-gray-900
          dark:text-white
        "
      >
        {movie.title}
      </h2>
      <p
        className="
          mb-2
          text-gray-700
          dark:text-gray-300
        "
      >
        {movie.overview}
      </p>
      <div
        className="
          flex
          flex-col
          gap-1
          text-gray-800
          dark:text-gray-200
        "
      >
        <span>
          <strong>User Rating:</strong> {movie.vote_average}
        </span>
        <span>
          <strong>Release Date:</strong> {movie.release_date}
        </span>
        <span>
          <strong>Original Title:</strong> {movie.original_title}
        </span>
      </div>
    </div>
  );
};

export default MovieDetails;