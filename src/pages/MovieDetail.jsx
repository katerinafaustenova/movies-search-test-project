import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../assets/star.svg";
import Spinner from "../components/Spinner";
import styles from "./MovieDetail.module.css";

function MovieDetail() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ isError: false, msg: "" });
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchFn = async () => {
      try {
        const fetchURL = `${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&i=${id}`;
        const response = await fetch(fetchURL);
        const result = await response.json();
        setMovie(result);
        setError({ isError: false, msg: "" });
        setLoading(false);
      } catch (error) {
        setError({
          isError: true,
          msg: "There is an error while fetching movie details. Please try again later.",
        });
        setMovie({});
        setLoading(false);
      }
    };
    fetchFn();
  }, [id]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites"));
    if (favoriteIds?.length > 0 && favoriteIds.find((item) => item === id)) {
      setIsFavorite(true);
    } else setIsFavorite(false);
  }, [id, favorites]);

  const handleSetFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleFavoriteToggle = (e, id) => {
    e.preventDefault();
    let newFavorites = [];
    if (favorites.find((item) => item === id)) {
      newFavorites = favorites.filter((item) => item !== id);
      handleSetFavorites(newFavorites);
    } else {
      newFavorites = [...favorites, id];
      handleSetFavorites(newFavorites);
    }
  };

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

  const ReleaseDate = new Date(Released);

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <Link to={`/`} className={styles.back}>
          Back
        </Link>
        <h1 className={styles.title}>{Title}</h1>
      </section>
      <section className={styles.content}>
        <img src={Poster} alt="Poster" className={styles.image} />
        <div className={styles.text}>
          <button
            onClick={(e) => handleFavoriteToggle(e, id)}
            className={classNames(styles.starBtn, {
              [styles.isFavorite]: isFavorite,
            })}
          >
            <Star />
          </button>
          <p>
            <span className={styles.label}>Year:</span> {Year}
          </p>
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
