import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LandingIcons from "../Components/LandingIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Components/Navbar"

const API_KEY = "15ed1230";

const Movie = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    axios
      .get("https://www.omdbapi.com/", {
        params: { i: imdbID, plot: "full", apikey: API_KEY },
      })

      .then(({ data }) => {
        if (!ignore) {
          if (data?.Response === "True") setMovie(data);
          else setError("Not found");
        }
      })

      .catch(() => !ignore && setError("Something went wrong"))
      .finally(() => !ignore && setLoading(false));
  }, [imdbID]);

  if (loading) {
    return (
      <div className="movie__container">
        <section className="selected__movie">
          <div className="selected__movie--card skeleton__card">
            <div className="skeleton skeleton__img" />
            <div className="skeleton skeleton__title" />
            <div className="skeleton skeleton__text" />
            <div className="skeleton skeleton__text short" />

            <div className="loading-overlay" aria-live="polite">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            </div>

            <div className="search__box">
              <Link className="movie__link">Loading…</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : `https://img.omdbapi.com/?apikey=${API_KEY}&=${encodeURIComponent(
          imdbID
        )}`;

  return (
    <>
    <nav className="navbar">
    <Navbar />
    </nav>
    <div className="movie__wrapper">
    <div style={{ margin: "24px auto" }} className="movie__container">
      <section className="selected__movie">
        <div className="selected__movie--card">
          <img className="movie__img" src={posterSrc} alt={movie.Title} />
          <h3 className="selected__movie--title">{movie.Title}</h3>
          <p>{movie.Year}</p>
          <p className="selected__movie--plot">{movie.Plot}</p>
          <div className="search__box">
            <Link to="/Movies" className="movie__link">
              Search More Movies!
            </Link>
          </div>
        </div>
      </section>
      <LandingIcons />
    </div>
    </div>
    </>
  );
};

export default Movie;
