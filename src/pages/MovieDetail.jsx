import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { apikey, baseURL } from "../components/MoviesSearch";
import styles from "./MovieDetail.module.css";

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

  if (!movie || Object.entries(movie).length === 0)
    return <p>There are no movie details we can display right now.</p>;
  if (error.isError) return <p>{error.msg}</p>;

  const {
    Poster,
    Title,
    Year,
    Type,
    Language,
    Actors,
    Plot,
    Writer,
    Director,
    Released,
    imdbRating,
    imdbVotes,
  } = movie;

  const ReleaseDate = new Date(Released);

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <Link to={`/`} className={styles.back}>
          Zpět
        </Link>
        <h1 className={styles.title}>
          {Title}, {Year}
        </h1>
      </section>
      <section className={styles.content}>
        <img src={Poster} alt="Poster" className={styles.image} />
        <div className={styles.text}>
          <p>
            <span className={styles.label}>Type:</span> {Type}
          </p>
          <p>
            <span className={styles.label}>Language:</span> {Language}
          </p>
          <p>
            <span className={styles.label}>Actors:</span> {Actors}
          </p>
          <p>
            <span className={styles.label}>Description:</span> {Plot}
          </p>
          <p>
            <span className={styles.label}>Writer:</span> {Writer}
          </p>
          <p>
            <span className={styles.label}>Director:</span> {Director}
          </p>
          <p>
            <span className={styles.label}>Released:</span>{" "}
            {ReleaseDate.toLocaleDateString()}
          </p>
          <p>
            <span className={styles.label}>IMDB Rating:</span> {imdbRating},{" "}
            <span className={styles.label}>Votes:</span> {imdbVotes}
          </p>
        </div>
      </section>
      {/* TODO mam pri prechodu zpet ulozit predchozi data hledani ? */}
    </main>
  );
}

export default MovieDetail;
