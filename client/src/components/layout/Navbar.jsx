import React, { useRef, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { logoutAction } from "../../context/actions";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { loadUserAction } from "../../context/actions";
import "./styles/layout.css";

const NavBar = () => {
  const { user, dispatch } = useContext(UserContext);
  const { name, token, isAuthenticated } = user;
  const handleLogout = () => logoutAction(dispatch);
  const navitemsRef = useRef(null);
  const burgericonRef = useRef(null);

  useEffect(() => {
    if (token) loadUserAction(dispatch); // eslint-disable-next-line
  }, []);

  const menuHandler = () => {
    const navitems = ReactDOM.findDOMNode(navitemsRef.current);
    // Toggle nav
    navitems.classList.toggle("main-nav-active");
    // Animate nav
    const navlinks = navitems.childNodes;
    navlinks.forEach((link, index) => {
      link.style.animation = link.style.animation
        ? ""
        : `navLinkFade 0.5s ease forwards ${index / 3 + 0.9}s`;
    });
    // Animate burger icon
    const burgericon = ReactDOM.findDOMNode(burgericonRef.current);
    burgericon.classList.toggle("toggle");
  };

  return (
    <header>
      <Link className="logo" to="/" style={{ textDecoration: "none" }}>
        GAME SHARE
      </Link>
      <nav className="nav-wrapper">
        <div ref={burgericonRef} onClick={menuHandler} className="burger-icon">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul ref={navitemsRef} className="nav-items main-nav mobile-hide">
          <li>
            <Link
              onClick={menuHandler}
              className="nav-links"
              to="/games"
              style={{ textDecoration: "none" }}
            >
              GAMES
            </Link>
          </li>

          <li>
            <Link
              onClick={menuHandler}
              className="nav-links"
              to="/latest"
              style={{ textDecoration: "none" }}
            >
              LATEST GAMES
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link
                  style={{ textDecoration: "none" }}
                  className="nav-links"
                  to="/profile"
                >
                  {name}
                </Link>
              </li>
              <li>
                <Link
                  style={{ textDecoration: "none" }}
                  className="nav-links"
                  to="/"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                style={{ textDecoration: "none" }}
                onClick={menuHandler}
                className="nav-links"
                to="/login"
              >
                MEMBERS
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
