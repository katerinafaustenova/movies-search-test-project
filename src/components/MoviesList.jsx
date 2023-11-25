import React from "react";
import { Link } from "react-router-dom";

function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map(({ Title, Poster, Type, Year, imdbID }) => {
        return (
          <li key={imdbID}>
            <Link to={`/movie/${imdbID}`}>
              {Title}, {Year}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MoviesList;
