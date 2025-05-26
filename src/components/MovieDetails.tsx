import type { Movie } from "../types/movie";
import { getTmdbImageUrl } from "../utils/imageUrl";

const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div
      className="
        w-screen
        bg-white
        p-5
      "
    >
      <img
        src={getTmdbImageUrl(movie.poster_path, "w342")}
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