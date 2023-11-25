import React, { useEffect, useState } from "react";
import Movies from "./MoviesList";

const baseURL = "http://www.omdbapi.com/";
const apikey = "2b50e0d8";
const page = 1;

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ isError: false, msg: "" });

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
    <main>
      <form>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </form>
      {error.isError && <p>{error.msg}</p>}
      {movies?.length > 0 && <Movies movies={movies} />}
    </main>
  );
}

export default Search;
