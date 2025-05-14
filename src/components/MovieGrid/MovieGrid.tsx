import style from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MoviesProps {
  movies: Movie[];
  open: () => void;
  setMovie: (id: number) => void;
}

export default function MovieGrid({ movies, open, setMovie }: MoviesProps) {
  return (
    <ul className={style.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map((movie, index) => {
        return (
          <li
            onClick={() => {
              setMovie(movie.id);
            }}
            key={index}
          >
            <div className={style.card}>
              <img
                onClick={open}
                className={style.image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="movie title"
                loading="lazy"
              />
              <h2 className={style.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
