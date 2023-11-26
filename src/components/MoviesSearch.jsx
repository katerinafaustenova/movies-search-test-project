import React, { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import styles from "./MoviesSearch.module.css";

export const baseURL = "http://www.omdbapi.com/";
export const apikey = "2b50e0d8";
export const page = 1;

function MoviesSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ isError: false, msg: "" });

  // TODO LOADING !

  useEffect(() => {
    if (query === "") {
      setMovies([]);
      setError({ isError: false, msg: "" });
    } else {
      const fetchFn = setTimeout(async () => {
        try {
          const fetchURL = `${baseURL}?apikey=${apikey}&s=${query}&page=${page}`;
          const response = await fetch(fetchURL);
          const result = await response.json();

          if (result.Search) {
            setMovies(result.Search);
            setError({ isError: false, msg: "" });
          } else {
            setMovies([]);
            setError({ isError: true, msg: result.Error });
          }
        } catch (error) {
          setError({
            isError: true,
            msg: "There is an error while fetching movies. Please try again later",
          });
        }
      }, 1000);

      return () => clearTimeout(fetchFn);
    }
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Movies search</h1>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        className={styles.input}
      />
      {error.isError && <p className={styles.error}>{error.msg}</p>}
      {movies?.length > 0 && <MoviesList movies={movies} />}
    </main>
  );
}

export default MoviesSearch;
