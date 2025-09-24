import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieNavbar from "../Components/MovieNavbar";
import MovieSearch from "../Components/MovieSearch";
import LandingIcons from "../Components/LandingIcons";
import axios from "axios";

const API_KEY = "15ed1230";
const PLACEHOLDER_POSTER = "/placeholder.jpg";

function Movies() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const location = useLocation();

  async function searchMovies(q) {
    const term = (q ?? query).trim();
    if (!term) return;

    setLoading(true);
    setErr("");
    setResults([]);

    try {
      const { data } = await axios.get("https://www.omdbapi.com/", {
        params: {
          s: term,
          apikey: API_KEY,
        },
      });
      if (data.Response === "True" && Array.isArray(data.Search)) {
        setResults(data.Search.slice(0, 10));
      } else {
        setResults([]);
        setErr(`No results found for "${term}".`);
      }
    } catch (e) {
      setErr("Error fetching data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      searchMovies(q)
    }
  }, [location.search] )


  return (
    <div id="movies__page">
      <MovieNavbar
        query={query}
        setQuery={setQuery}
        onSubmit={() => searchMovies(query)}
        loading={loading}
      />

      

      <MovieSearch
        results={results}
        loading={loading}
        err={err}
        placeholderPoster={PLACEHOLDER_POSTER}
      />
      <LandingIcons />
    </div>
  );
}

export default Movies;
