import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchMovies } from "../utils/useFetchMovies";
import MoviesList from "./MoviesList";
import styles from "./MoviesSearch.module.css";
import Spinner from "./Spinner";

function MoviesSearch() {
  const [query, setQuery] = useState("");
  const [movies, loading, error] = useFetchMovies(query);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParams = searchParams.get("q");
    (queryParams || queryParams === "") && setQuery(queryParams);
  }, [searchParams]);

  const handleChange = (e) => {
    setSearchParams({ q: e.target.value });
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
