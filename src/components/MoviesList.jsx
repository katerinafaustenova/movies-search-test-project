import React from "react";
import { Link } from "react-router-dom";
import styles from "./MoviesList.module.css";

function MoviesList({ movies }) {
  return (
    <ul className={styles.list}>
      {movies.map(({ Title, Poster, Year, imdbID }) => {
        return (
          <li key={imdbID} className={styles.item}>
            <Link to={`/movie/${imdbID}`} className={styles.link}>
              <img src={Poster} alt="Poster" className={styles.image} />
              <span className={styles.title}>
                {Title}, {Year}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesList;
