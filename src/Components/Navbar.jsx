import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTimes, faAdjust } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  let contrastToggle = false;

  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  function openContact(event) {
    document.body.classList.add("contact--open");
  }

  function closeContact() {
    document.body.classList.remove("contact--open");
  }

  function onKeyDown(event) {
    if (event.key === "Escape") closeContact();
  }

  function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
      document.body.classList += "dark-theme";
    } else {
      document.body.classList.remove("dark-theme");
    }
  }

  return (
    <nav className="navbar">
      <div className="nav content-wrapper">
        <div className="logo">
          <img
            src="/Assets/reff.png"
            className="logo__img"
            alt="Film Fanatics"
          />
          <span className="logo__text">Film Fanatics</span>
        </div>

        <div className="links">
          <ul className="nav__links">
            <li>
              <Link to="/" className="link nav__link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Movies" className="link nav__link">
                Movies
              </Link>
            </li>
            <li>
              <a onClick={openContact} className="btn-contact">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <button className="btn__menu" onClick={openMenu}>
          <FontAwesomeIcon icon={faFilm} />
        </button>
        <button className="btn__menu" onClick={toggleContrast}>
          <FontAwesomeIcon icon={faAdjust} />
        </button>

        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeMenu}>
            <FontAwesomeIcon className="close--icon" icon={faTimes} />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="menu__list">
              {" "}
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
        <div
          className="contact__backdrop"
          onKeyDown={onKeyDown}
          aria-hidden={!document.body.classList.contains("contact--open")}
        >
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
      </div>
    </nav>
  );
};

export default Navbar;
