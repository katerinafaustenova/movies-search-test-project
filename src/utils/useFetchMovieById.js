import { useEffect, useState } from "react";

export function useFetchMovieById(id) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ isError: false, msg: "" });

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

  return [movie, loading, error];
}
