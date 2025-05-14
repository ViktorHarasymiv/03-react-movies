import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import styles from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  // STATE
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<number>(0);

  function isActive(): void {
    setIsOpen((prev) => !prev);
  }

  // SEARCH
  const handleSearch = async (search: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      // 2. Використовуємо HTTP-функцію
      const data = await fetchMovies(search);
      setMovies(data);

      if (!data || data.length === 0) {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // BODY
  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} isError={isError} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies && (
        <MovieGrid movies={movies} open={isActive} setMovie={setMovie} />
      )}
      {isOpen && (
        <MovieModal onClose={isActive} movies={movies} movie={movie} />
      )}
    </div>
  );
}
