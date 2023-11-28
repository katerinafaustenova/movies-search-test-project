import classNames from "classnames";
import React from "react";
import { ReactComponent as Star } from "../assets/star.svg";
import styles from "./FavoriteButton.module.css";

function FavoriteButton({
  id,
  isFavorite = false,
  toggleFavorite,
  positionTop = false,
}) {
  if (!id || !toggleFavorite) return;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(id);
      }}
      className={classNames(styles.favoriteBtn, {
        [styles.isFavorite]: isFavorite,
        [styles.positionTop]: positionTop,
      })}
    >
      <Star />
    </button>
  );
}

export default FavoriteButton;
