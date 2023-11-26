import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { apikey, baseURL } from "../components/MoviesSearch";

function MovieDetail() {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState({ isError: false, msg: "" });
  const { id } = useParams();

  useEffect(() => {
    const fetchFn = async () => {
      try {
        const fetchURL = `${baseURL}?apikey=${apikey}&i=${id}`;
        const response = await fetch(fetchURL);
        const result = await response.json();
        setMovie(result);
        setError({ isError: false, msg: "" });
      } catch (error) {
        setError({
          isError: true,
          msg: "There is an error while fetching movie details. Please try again later",
        });
        setMovie({});
      }
    };
    fetchFn();
  }, [id]);

  if (!movie)
    return <p>There are no movie details we can display right now.</p>;
  if (error.isError) return <p>{error.msg}</p>;

  const {
    Poster,
    Title,
    Year,
    Language,
    Actors,
    Plot,
    Writer,
    Director,
    Released,
    imdbRating,
    imdbVotes,
  } = movie;

  return (
    <main>
      <h1 className="title">
        {Title}, {Year}
      </h1>
      <div>
        <img src={Poster} alt="Poster" />
        <p>Language: {Language}</p>
        <p>Actors: {Actors}</p>
        <p>Description: {Plot}</p>
        <p>
          Writer: {Writer}, Director: {Director}
        </p>
        <p>Released: {Released}</p>
        <p>
          IMDB Rating: {imdbRating}, Votes: {imdbVotes}
        </p>
      </div>
      {/* TODO mam pri prechodu zpet ulozit predchozi data hledani ? */}
      <Link to={`/`}>Zpět</Link>
    </main>
  );
}

export default MovieDetail;
