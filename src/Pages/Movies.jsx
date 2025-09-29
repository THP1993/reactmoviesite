import React, { useEffect, useState, useMemo } from "react";
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
  const [yearFilter, setYearFilter] = useState("all");
  const location = useLocation();

  const years = useMemo(() => {
    const ys = new Set();
    results.forEach((m) => {
      const y = String(m?.Year ?? "").match(/\b\d{4}\b/)?.[0];
      if (y) ys.add(y);
    });
    return Array.from(ys).sort((a, b) => Number(b) - Number(a));
  }, [results]);

  const filteredResults = useMemo(() => {
    if (yearFilter === "all") return results;
    return results.filter((m) => {
      const y = String(m?.Year ?? "").match(/\b\d{4}\b/)?.[0];
      return y === yearFilter;
    });
  }, [results, yearFilter]);

  async function searchMovies(q) {
    const term = (q ?? query).trim();
    if (!term) return;

    setLoading(true);
    setErr("");
    setResults([]);

    try {
      const { data } = await axios.get("https://www.omdbapi.com/", {
        params: { s: term, apikey: API_KEY },
      });
      if (data.Response === "True" && Array.isArray(data.Search)) {
        setResults(data.Search.slice(0, 100));
      } else {
        setResults([]);
        setErr(`No results found for "${term}".`);
      }
    } catch {
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
      searchMovies(q);
    }
  }, [location.search]);

  return (
    <div className="movies__background">
      <img className="theater__background" src="/Assets/theater.jpg" alt="" />

      <div id="movies__content">
        <MovieNavbar
          query={query}
          setQuery={setQuery}
          onSubmit={() => searchMovies(query)}
          loading={loading}
        />

        {years.length > 0 && (
          <div className="results__controls">
            <label htmlFor="yearFilter">Year</label>
            <select
              id="yearFilter"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              disabled={years.length === 0}
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}

        <MovieSearch
          results={filteredResults}
          loading={loading}
          err={err}
          placeholderPoster={PLACEHOLDER_POSTER}
        />

        <LandingIcons />
      </div>
    </div>
  );
}

export default Movies;
