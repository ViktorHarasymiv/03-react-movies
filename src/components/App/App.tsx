import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<number>(0);

  // MODAL FUNCTION

  function isActive(): void {
    setIsOpen((prev) => !prev);
  }

  function onSelect(id: number): void {
    setMovie(id);
    isActive();
  }

  // SEARCH
  const handleSearch = async (search: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      const data = await fetchMovies(search);
      setMovies(data);

      if (!data || data.length === 0) {
        toast.error("No movies found.");
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // BODY
  return (
    <div className={styles.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies && <MovieGrid movies={movies} onSelect={onSelect} />}
      {isOpen && (
        <MovieModal onClose={isActive} movies={movies} movie={movie} />
      )}
    </div>
  );
}
