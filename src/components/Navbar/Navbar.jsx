import React from "react";
import "./Navbar.css";
import logo from "../../assets/clapperboard.svg";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth.js";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = ({ user, authLoaded }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let authContent;

  if (!authLoaded) {
    authContent = (
      <div className="navbar-skeleton">
        <div className="skeleton navbar-skeleton-text"></div>
        <div className="skeleton navbar-skeleton-button"></div>
      </div>
    );
  } else if (user) {
    authContent = (
      <>
        Welcome, <span className="user-name" data-email={user.email}>
          {user.email[0].toUpperCase()}
        </span>
        <Link className="fav" to="/favorites">Favorites</Link>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </>
    );
  } else {
    authContent = (
      <div className="auth-links">
        <Link to="/auth?mode=signin">
          <div className="login-btn">Sign In</div>
        </Link>

        <Link to="/auth?mode=signup">
          <div className="signup-btn">Sign Up</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="logo" />
        <Link to="/" className="navbar-title">
          MoviePidia
        </Link>
      </div>

      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      <div className={`navbar-right ${isMenuOpen ? "active" : ""}`}>
        {authContent}
      </div>
    </div>
  );
};

export default Navbar;
