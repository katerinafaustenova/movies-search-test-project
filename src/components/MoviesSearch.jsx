import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchMovies } from "../utils/useFetchMovies";
import Button from "./Button";
import MoviesList from "./MoviesList";
import styles from "./MoviesSearch.module.css";
import Spinner from "./Spinner";

function MoviesSearch() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [movies, totalPages, loading, error] = useFetchMovies(query, page);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("q");
    const pageParam = searchParams.get("page");
    (queryParam || queryParam === "") && setQuery(queryParam);
    pageParam && setPage(parseInt(pageParam));
  }, [searchParams]);

  const handleChange = (e) => {
    setSearchParams({ page: page, q: e.target.value });
  };

  const handleFetchMore = async (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage, q: query });
  };

  const showPrevious = page > 1 && !error.isError;
  const showNext = page < totalPages && !error.isError;

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
      <div
        className={classNames(styles.pagination, {
          [styles.showPrevious]: showPrevious,
        })}
      >
        {showPrevious && (
          <Button
            handleClick={() => handleFetchMore(page - 1)}
            label="Previous"
          />
        )}
        {showNext && (
          <Button handleClick={() => handleFetchMore(page + 1)} label="Next" />
        )}
      </div>
      {movies?.length > 0 && <MoviesList movies={movies} />}
    </main>
  );
}

export default MoviesSearch;
