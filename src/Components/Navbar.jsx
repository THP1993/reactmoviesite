import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  return (
    <nav className="navbar">
      <div className="nav content-wrapper">
        <div className="logo">
          <img src="./Assets/reff.png" className="logo__img" />
          <span className="logo__text">Film Fanatics</span>
        </div>

        <div className="links">
          <ul className="nav__links">
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Movies" className="link">
                Movies
              </Link>
            </li>
            <li>
              <a href="#" className="btn-contact">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <button className="btn__menu" onClick={openMenu}>
          <FontAwesomeIcon icon={faFilm} />
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
              <a href="#" className="menu__link" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
