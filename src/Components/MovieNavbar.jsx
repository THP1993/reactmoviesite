import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MovieNavbar = ({ query, setQuery, onSubmit, loading }) => {
  const openMenu = () => {
    document.body.classList.add("menu--open");
  };

  const closeMenu = () => {
    document.body.classList.remove("menu--open");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.();
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit?.();
    }
  };

  function openContact(event) {
    document.body.classList.add("contact--open");
  }

  function closeContact() {
    document.body.classList.remove("contact--open");
  }

  function onKeyDown2(event) {
    if (event.key === "Escape") closeContact();
  }

  return (
    <nav className="navbar">
      <img src="/Assets/Popcorn.webp" alt="" className="header-bg" />
      <div className="header-overlay"></div>

      <div className="nav content-wrapper">
        <div className="logo nav__left">
          <img
            src="/Assets/reff.png"
            className="logo__img"
            alt="Film Fanatics logo"
          />
          <span className="logo__text">Film Fanatics</span>
        </div>

        <div className="links nav__center">
          <ul className="nav__links">
            <li>
              <Link to="/" className="link__movie">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Movies" className="link__movie">
                Movies
              </Link>
            </li>
            <li>
              <a href="#" onClick={openContact} className="btn-contact">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <button
          className="btn__menu btn__menu--movie"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faFilm} />
        </button>

        <div className="menu__backdrop">
          <button
            className="btn__menu btn__menu--close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FontAwesomeIcon className="close--icon" icon={faTimes} />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/Movies" className="menu__link" onClick={closeMenu}>
                Movies
              </Link>
            </li>
            <li className="menu__list">
              <a href="#" className="menu__link" onClick={openContact}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="search-row">
        <div className="input-icon-container">
          <form className="search__btn" onSubmit={handleSubmit}>
            <button
              type="submit"
              aria-label="Search"
              className="unstyled-button"
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="input-icon input-icon-movies"
                viewBox="0 0 640 640"
                aria-hidden="true"
              >
                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
              </svg>
            </button>
            <input
              id="searchInput"
              className="input-bar"
              type="text"
              placeholder="Search for movies here!"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
            />
          </form>
        </div>
      </div>
      <div className="contact__backdrop" onKeyDown={onKeyDown2}>
        <div className="contact__modal" role="dialog">
          <button className="contact__close" onClick={closeContact}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h3 className="contact__title" id="contact--title">
            Contact Us
          </h3>
          <form
            className="contact__form"
            onSubmit={(event) => {
              const fd = new FormData(event.currentTarget);
              const email = fd.get("email");
              const message = fd.get("message");
              console.log({ email, message });
              alert("Thanks! We'll get back to you soon!");
              closeContact();
            }}
          >
            <label className="contact__label">
              Email
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                className="contact__input"
              />
            </label>
            <label className="contact__label">
              Message
              <textarea
                name="message"
                rows="5"
                placeholder="How can we help you?"
                required
                className="contact__textarea"
              ></textarea>
            </label>
            <button className="contact__submit">Send</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default MovieNavbar;
