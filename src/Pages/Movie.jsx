import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LandingIcons from "../Components/LandingIcons";


const API_KEY = "15ed1230";

const Movie = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/", {
        params: { i: imdbID, plot: "short", apikey: API_KEY },
      })

      .then(({ data }) => {
        if (data?.Response === "True") setMovie(data);
      })
      .catch(() => {});
  }, [imdbID]);

  if (!movie) {
    return (
      <div className="movie__container">
        <section className="selected__movie">
          <div className="selected__movie--card">
            <p>Loading...</p>
            <Link to="/Movies" className="movie__link">
              Back to search results
            </Link>
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
    <div style={{ margin: "24px auto" }} className="movie__container">
      <section className="selected__movie">
        <div className="selected__movie--card">
          <img className="movie__img" src={posterSrc} alt={movie.Title} />
          <h3 className="selected__movie--title">{movie.Title}</h3>
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
  );
};

export default Movie;
