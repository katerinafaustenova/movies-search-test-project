import { useEffect, useState } from "react";

export function useFetchMovies(query, page) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, msg: "" });

  useEffect(() => {
    if (query === "") {
      setMovies([]);
      setError({ isError: false, msg: "" });
    } else {
      const fetchFn = setTimeout(async () => {
        setLoading(true);
        try {
          const fetchURL = `${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_APIKEY}&s=${query}&page=${page}`;
          const response = await fetch(fetchURL);
          const result = await response.json();

          if (result.Search) {
            const resultNumber = parseInt(result.totalResults);
            const pagesNumber = Math.ceil(resultNumber / 10);
            setTotalPages(pagesNumber);
            setMovies(result.Search);
            setError({ isError: false, msg: "" });
          } else {
            setMovies([]);
            setError({ isError: true, msg: result.Error });
          }
          setLoading(false);
        } catch (error) {
          setError({
            isError: true,
            msg: "There is an error while fetching movies. Please try again later.",
          });
          setLoading(false);
        }
      }, 1000);

      return () => clearTimeout(fetchFn);
    }
  }, [query, page]);

  return [movies, totalPages, loading, error];
}
