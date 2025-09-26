import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MovieSearch = ({
  results = [],
  loading = false,
  err = "",
  placeholderPoster = "/placeholder.jpg",
}) => {
  const list = Array.isArray(results) ? results : [];
  return (
    <div className="body__wrapper">
      <section className="search__results">
        <div className="search__results--container" id="searchResults">
          {err && <p>{err}</p>}

          {!err &&
            list.map((movie) => (
              <Link
                to={`/Movie/${movie.imdbID}`}
                className="movie-card"
                key={`${movie.imdbID}-${movie.Title}`}
              >
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <img
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : placeholderPoster
                  }
                  alt={movie.Title}
                  loading="lazy"
                />
              </Link>
            ))}
        </div>

        <div
          id="loadingIndicator"
          className={`loading ${loading ? "" : "hidden"}`}
          aria-live="polite"
        >
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      </section>
    </div>
  );
};

export default MovieSearch;
