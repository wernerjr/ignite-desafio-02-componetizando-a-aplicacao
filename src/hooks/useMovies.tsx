import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface MoviesContextData {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  setSelectedGenreId: (selectedGenreId: number) => void;
  movies: MovieProps[];
  selectedGenre: GenreResponseProps
}

interface MovieProviderProps {
  children: ReactNode;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

const MoviesContext = createContext<MoviesContextData>(
  {} as MoviesContextData
);

export function MoviesProvider({ children } : MovieProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <MoviesContext.Provider value={ 
      { genres, 
        selectedGenreId, 
        setSelectedGenreId,
        movies,
        selectedGenre
      } 
    }>
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const context = useContext(MoviesContext);

  return context;
}