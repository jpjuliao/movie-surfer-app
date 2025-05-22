export type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export type MovieGridProps = {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onPosterClick?: (id: number) => void;
}