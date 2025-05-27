import type { Movie } from "../types/movie";
import { getTmdbImageUrl } from "../utils/imageUrl";

const MovieDetails = ({ movie }: { movie: Movie }) => {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

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
          flex-row
          gap-6
          justify-center
          w-full
          max-w-4xl
          items-stretch
        "
      >
        <img
          src={getTmdbImageUrl(movie.poster_path, "w342")}
          alt={movie.title}
          className="
            max-w-xs
            rounded-md
            w-[160px]
            sm:w-[220px]
            md:h-auto
            object-cover
            flex-shrink-0
          "
        />
        <div
          className="
              flex
              flex-col
              flex-1
              gap-1
              text-[#212121]
              justify-between
            "
        >
          <div>
            <h3>{releaseYear}</h3>
            <div className="mb-6">
              <i>
                {movie.runtime} min
              </i>
            </div>
          </div>
          <div>
            <div className="mb-2">
              <strong>
                {movie.vote_average} / 10
              </strong>
            </div>
            <div>
              <button type="button" className="bg-[#746A64] text-white p-5" style={{ borderRadius: ".125rem", fontSize: "1rem" }}>Add to Favorite</button>
            </div>
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
        <div
          className="
          w-full
          mt-5
        "
        >
          <h2 style={{ fontSize: ".9rem" }} className="mb-2">
            TRAILERS
          </h2>
          <hr style={{ color: "#DEDEDE" }} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;