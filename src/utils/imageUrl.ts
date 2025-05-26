/**
 * Builds a full TMDB image URL from a poster path.
 * @param posterPath The relative poster path from the API (e.g. "/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg")
 * @param size The image size (default "w185")
 * @returns The full image URL
 */
export function getTmdbImageUrl(posterPath: string, size: string = "w185"): string {
  if (!posterPath) return "";
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}
