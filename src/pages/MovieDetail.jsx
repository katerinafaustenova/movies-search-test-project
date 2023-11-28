import React from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import FavoriteButton from "../components/FavoriteButton";
import Spinner from "../components/Spinner";
import { useFavoriteMovies } from "../utils/useFavoriteMovies";
import { useFetchMovieById } from "../utils/useFetchMovieById";
import styles from "./MovieDetail.module.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, loading, error] = useFetchMovieById(id);
  const [favorites, toggleFavorite] = useFavoriteMovies();
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (error.isError) return <p>{error.msg}</p>;
  if (!movie || Object.entries(movie).length === 0)
    return <p>There are no movie details we can display right now.</p>;

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

  const releaseDate = new Date(Released);
  const isFavorite = favorites?.find((item) => item === id);

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.btnBack}>
          <Button handleClick={() => navigate(-1)} label="Back" />
        </div>
        <h1 className={styles.title}>{Title}</h1>
      </section>
      <section className={styles.content}>
        <img src={Poster} alt="Poster" className={styles.image} />
        <div className={styles.text}>
          <p>
            <span className={styles.label}>Year:</span>
            {Year}
          </p>
          <p>
            <span className={styles.label}>Type:</span>
            {Type}
          </p>
          <p>
            <span className={styles.label}>Language:</span>
            {Language}
          </p>
          <p>
            <span className={styles.label}>Actors:</span>
            {Actors}
          </p>
          <p>
            <span className={styles.label}>Description:</span>
            {Plot}
          </p>
          <p>
            <span className={styles.label}>Writer:</span>
            {Writer}
          </p>
          <p>
            <span className={styles.label}>Director:</span>
            {Director}
          </p>
          <p>
            <span className={styles.label}>Released:</span>
            {releaseDate.toLocaleDateString()}
          </p>
          <p>
            <span className={styles.label}>IMDB Rating:</span>
            {imdbRating}, <span className={styles.label}>Votes:</span>
            {imdbVotes}
          </p>
        </div>
        <FavoriteButton
          id={id}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          positionTop
        />
      </section>
    </main>
  );
}

export default MovieDetail;
