export type Movie = {
  [x: string]: ReactNode;
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime?: number;
};

export type UseMoviesResult = {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export type MovieGridProps = {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onPosterClick?: (id: number) => void;
}

