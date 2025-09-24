import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingIcons from "../Components/LandingIcons";
import Navbar from "../Components/Navbar"

const Home = () => {

const [term, setTerm] = useState("");
const navigate = useNavigate();

function goToMovies(event) {
  const q = term
  navigate(`/Movies?q=${encodeURIComponent(q)}`);
}


  return (
    <main>
      <div class="flex flex-col">
      <nav className="navbar"> 
          <Navbar />
      </nav>
     </div>
      <section id="landing__page">
        <div id="bg-icons" aria-hidden="true">
          <LandingIcons />
        </div>
        <div className="landing__page--content-wrapper">
          <div className="search__bar">
            <div className="searchbar-body">
              <h1 className="searchbar-body--text">
                Your <span className="red">go-to</span> website for finding the
                <span className="red"> newest </span>and{" "}
                <span className="red">hottest</span> movies out!
              </h1>
            </div>
          </div>

          <div className="landing__page-second">
            <div className="landing__page-second-body">
              <h2 className="searchbar-body--para">
                No matter what you are in the mood for{" "}
                <span className="red">Film Fanatics</span> will help you find
                your next <span className="red">favorite</span> movie!
              </h2>
            </div>
          </div>

          <div className="input__container">
            <div className="input__row">
              <form onSubmit={goToMovies} className="input__wrapper horizontal">
                <input
                  className="input"
                  type="text"
                  placeholder="Search for movies here!"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                />
                <button className="search__btn--home" aria-label="Search" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fa-solid fa-magnifying-glass"
                    viewBox="0 0 640 640"
                  >
                    <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="image-wrapper">
  <img className="landing-img" src="/Assets/LandingImgRed.png" alt="Home cinema illustration" />
</div>

      </section>
    </main>
  );
};

export default Home;
