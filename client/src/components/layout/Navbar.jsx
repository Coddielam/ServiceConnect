import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/Logo.png";
import { connect } from "react-redux";

const Navbar = ({ dispatch, isAuthenticated }) => {
  const toggleTranslateX = () => {
    const hiddenNavBar = document.querySelector("ul.visible-sm");
    hiddenNavBar.classList.toggle("visible-sm-active");
    hiddenNavBar.classList.toggle("visible");
  };

  // the two different nav based on isAuthenticated
  const guestNav = (
    <nav className="container">
      <Link className="nav-item logo-nav" to="/">
        <img className="logo" src={logo} alt="Service Connect HK" />
        <h3 className="brandName">ServiceConnect HK</h3>
      </Link>
      <ul className="normal-navbar">
        <li>
          <Link className="nav-item" to="/services">
            Find Services
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/register">
            Register
          </Link>
        </li>
      </ul>
      <button className="nav-burger" onClick={toggleTranslateX}>
        +
      </button>

      {/* visible on small screen */}
      <ul className="visible-sm">
        <button className="nav-burger" onClick={toggleTranslateX}>
          x
        </button>
        <li className="space-top-bg">
          <Link className="nav-item logo-nav" to="/" onClick={toggleTranslateX}>
            <img className="logo" src={logo} alt="Service Connect HK" />
          </Link>
        </li>
        <hr className="space-top-bg" />
        <li className="space-top-bg">
          <Link className="nav-item" to="/services" onClick={toggleTranslateX}>
            Find Services
          </Link>
        </li>
        <li className="space-top-bg">
          <Link className="nav-item" to="/login" onClick={toggleTranslateX}>
            Login
          </Link>
        </li>
        <li className="space-top-bg">
          <Link className="nav-item" to="/register" onClick={toggleTranslateX}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );

  const authNav = (
    <nav className="container">
      <Link className="nav-item logo-nav" to="/">
        <img className="logo" src={logo} alt="Service Connect HK" />
        <h3 className="brandName">ServiceConnect HK</h3>
      </Link>
      <ul className="normal-navbar">
        <li>
          <Link className="nav-item" to="/services">
            Find Services
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className="nav-item"
            to="/"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
            }}
          >
            Log Out
          </Link>
        </li>
      </ul>
      <button className="nav-burger" onClick={toggleTranslateX}>
        +
      </button>

      {/* visible on small screen */}
      <ul className="visible-sm">
        <button className="nav-burger" onClick={toggleTranslateX}>
          x
        </button>
        <li className="space-top-bg">
          <Link className="nav-item logo-nav" to="/" onClick={toggleTranslateX}>
            <img className="logo" src={logo} alt="Service Connect HK" />
          </Link>
        </li>
        <hr className="space-top-bg" />
        <li className="space-top-bg">
          <Link className="nav-item" to="/services" onClick={toggleTranslateX}>
            Find Services
          </Link>
        </li>
        <li className="space-top-bg">
          <Link className="nav-item" to="/dashboard" onClick={toggleTranslateX}>
            Dashboard
          </Link>
        </li>
        <li className="space-top-bg">
          <Link
            className="nav-item"
            to="/"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              toggleTranslateX();
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );

  return isAuthenticated ? authNav : guestNav;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Navbar);
