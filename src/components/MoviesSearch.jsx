import React, { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import styles from "./MoviesSearch.module.css";
import Spinner from "./Spinner";

function MoviesSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, msg: "" });

  useEffect(() => {
    if (query === "") {
      setMovies([]);
      setError({ isError: false, msg: "" });
    } else {
      const fetchFn = setTimeout(async () => {
        setLoading(true);
        try {
          const fetchURL = `${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&s=${query}&page=1`;
          const response = await fetch(fetchURL);
          const result = await response.json();

          if (result.Search) {
            setMovies(result.Search);
            setError({ isError: false, msg: "" });
          } else {
            setMovies([]);
            setError({ isError: true, msg: result.Error });
          }
          setLoading(false);
        } catch (error) {
          setError({
            isError: true,
            msg: "There is an error while fetching movies. Please try again later.",
          });
          setLoading(false);
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
      <h1 className={styles.title}>Search Movies</h1>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        className={styles.input}
      />
      {loading && <Spinner />}
      {error.isError && <p className={styles.error}>{error.msg}</p>}
      {movies?.length > 0 && <MoviesList movies={movies} />}
    </main>
  );
}

export default MoviesSearch;
