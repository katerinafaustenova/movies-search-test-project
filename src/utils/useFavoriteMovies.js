import { useEffect, useState } from "react";

export function useFavoriteMovies() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites"));
    favoriteIds?.length > 0 && setFavorites(favoriteIds);
  }, []);

  const toggleFavorite = (id) => {
    let newFavorites = [];
    if (favorites?.length > 0 && favorites.find((item) => item === id)) {
      newFavorites = favorites.filter((item) => item !== id);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      newFavorites = [...favorites, id];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  return [favorites, toggleFavorite];
}
