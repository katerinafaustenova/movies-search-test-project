import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../assets/star.svg";
import { useFavoriteMovies } from "../utils/useFavoriteMovies";
import styles from "./MoviesList.module.css";

function MoviesList({ movies }) {
  const [favorites, toggleFavorite] = useFavoriteMovies();

  return (
    <ul className={styles.list}>
      {movies.map(({ Title, Poster, Year, imdbID }) => {
        const isFavorite = favorites?.find((item) => item === imdbID);
        return (
          <li key={imdbID} className={styles.item}>
            <Link to={`/movie/${imdbID}`} className={styles.link}>
              <img src={Poster} alt="Poster" className={styles.image} />
              <div className={styles.title}>
                {Title}, <span className={styles.year}>{Year}</span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(imdbID);
                }}
                className={classNames(styles.starBtn, {
                  [styles.isFavorite]: isFavorite,
                })}
              >
                <Star />
              </button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesList;
