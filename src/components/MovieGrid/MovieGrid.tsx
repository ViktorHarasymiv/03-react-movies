import style from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (id: number) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={style.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map((movie) => {
        return (
          <li
            onClick={() => {
              onSelect(movie.id);
            }}
            key={movie.id}
          >
            <div className={style.card}>
              <img
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
