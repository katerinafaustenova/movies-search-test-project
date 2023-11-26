import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../assets/star.svg";
import styles from "./MoviesList.module.css";

function MoviesList({ movies }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites"));
    favoriteIds?.length > 0 && setFavorites(favoriteIds);
  }, []);

  const handleSetFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleFavoriteToggle = (e, id) => {
    e.preventDefault();
    let newFavorites = [];
    if (favorites.find((item) => item === id)) {
      newFavorites = favorites.filter((item) => item !== id);
      handleSetFavorites(newFavorites);
    } else {
      newFavorites = [...favorites, id];
      handleSetFavorites(newFavorites);
    }
  };

  return (
    <ul className={styles.list}>
      {movies.map(({ Title, Poster, Year, imdbID }) => {
        const isFavorite = favorites.find((item) => item === imdbID);
        return (
          <li key={imdbID} className={styles.item}>
            <Link to={`/movie/${imdbID}`} className={styles.link}>
              <img src={Poster} alt="Poster" className={styles.image} />
              <div className={styles.title}>
                {Title}, <span className={styles.year}>{Year}</span>
              </div>
              <button
                onClick={(e) => handleFavoriteToggle(e, imdbID)}
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
