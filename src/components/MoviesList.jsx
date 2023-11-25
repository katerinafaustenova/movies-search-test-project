import React from "react";

function MoviesList({ movies }) {
  console.log("moviesList", movies);
  return (
    <ul>
      {movies.map(({ Title, Poster, Type, Year, imdbID }) => {
        return <li key={imdbID}>{Title}</li>;
      })}
    </ul>
  );
}

export default MoviesList;
