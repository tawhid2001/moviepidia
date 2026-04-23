import React from "react";
import "./Navbar.css";
import logo from "../../assets/clapperboard.svg";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth.js";
import { Menu, X} from "lucide-react";
import { useState } from "react";

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {user ? (
          <>
            <span className="user-name">Welcome, {user.email}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="auth-links">
              <Link to="/auth?mode=signin">
                <div className="login-btn">Sign In</div>
              </Link>
              <Link to="/auth?mode=signup">
                <div className="signup-btn">Sign Up</div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
