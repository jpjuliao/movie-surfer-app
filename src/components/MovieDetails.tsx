import type { Movie } from "../types/movie";
import { getTmdbImageUrl } from "../utils/imageUrl";

const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div
      className="
        w-screen
        bg-white
        p-5
        flex
        flex-col
        items-center
        justify-center
      "
    >
      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-6
          items-start
          justify-center
          w-full
          max-w-4xl
        "
      >
        <img
          src={getTmdbImageUrl(movie.poster_path, "w342")}
          alt={movie.title}
          className="
            w-full
            max-w-xs
            rounded-md
            mb-4
            md:mb-0
            md:w-[220px]
            md:h-auto
            object-cover
            flex-shrink-0
          "
        />
        <div
          className="
            flex-1
            flex
            flex-col
            justify-start
          "
        >
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
      </div>
      <div
        className="
          w-full
          max-w-4xl
          mt-6
        "
      >
        <h3 className="text-lg font-semibold mb-2 text-gray-900 sr-only">
          Overview
        </h3>
        <p>
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;