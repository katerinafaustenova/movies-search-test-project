import React, { useEffect, useState } from "react";
import Movies from "./MoviesList";

const fetchURL = "http://www.omdbapi.com/?apikey=2b50e0d8&s=star&page=1";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFn = async () => {
      try {
        const response = await fetch(fetchURL);
        const result = await response.json();
        setMovies(result.Search);
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchFn();
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit, e");
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </form>
      {movies?.length > 0 && <Movies movies={movies} />}
    </main>
  );
}

export default Search;
