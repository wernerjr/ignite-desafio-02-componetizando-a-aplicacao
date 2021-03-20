import { useMovies } from "../hooks/useMovies"
import { MovieCard } from "./MovieCard";

import '../styles/main.scss';

export function Main() {
  const {movies} = useMovies();

  return (      
    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  )
}