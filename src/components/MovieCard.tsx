import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100px', height: '150px' }}
        />
      </Link>
    </div>
  );
}
export default MovieCard;