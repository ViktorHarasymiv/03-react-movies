import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

interface MoviesProps {
  onClose: () => void;
  movies: Movie[];
  movie: number;
}

export default function MovieModal({ onClose, movies, movie }: MoviesProps) {
  const selectedMovie = movies.find((elem) => elem.id === movie);

  if (!selectedMovie) {
    return null; // Не показуємо модальне вікно, якщо фільм не знайдено
  }

  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
          alt={selectedMovie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <p>
            <strong>Release Date:</strong> {selectedMovie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {selectedMovie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );
}
