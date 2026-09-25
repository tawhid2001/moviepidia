import React, { useState } from "react";
import logo from "../../assets/clapperboard.svg";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth.js";
import { Menu, X } from "lucide-react";

const Navbar = ({ user, authLoaded }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let authContent;

  if (!authLoaded) {
    authContent = (
      <div className="flex items-center gap-3">
        <div className="h-5 w-[150px] animate-pulse rounded bg-input"></div>
        <div className="h-9 w-[75px] animate-pulse rounded bg-input"></div>
      </div>
    );
  } else if (user) {
    authContent = (
      <>
        <span>Welcome,</span>

        <div className="group relative">
          <span
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-input text-base text-muted"
          >
            {user.email[0].toUpperCase()}
          </span>

          <div className="absolute right-1/2 top-12 hidden translate-x-1/2 whitespace-nowrap rounded-md bg-card px-3 py-2 text-sm text-white group-hover:block">
            {user.email}
          </div>
        </div>

        <Link
          to="/favorites"
          className="p-4 text-primary transition hover:text-primary-light"
        >
          Favorites
        </Link>

        <button
          onClick={logout}
          className="cursor-pointer text-xl text-danger transition-transform hover:-translate-y-0.5"
        >
          Logout
        </button>
      </>
    );
  } else {
    authContent = (
      <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
        <Link
          to="/auth?mode=signin"
          className="inline-block rounded-full border-2 border-primary bg-primary px-4 py-2 text-center text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[0_4px_8px_rgba(6,182,212,0.3)]"
        >
          Sign In
        </Link>

        <Link
          to="/auth?mode=signup"
          className="inline-block rounded-full border-2 border-primary bg-transparent px-4 py-2 text-center text-base font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-[0_4px_8px_rgba(6,182,212,0.3)]"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <nav className="fixed z-10 flex w-full items-center justify-between border-b border-border bg-navbar px-[5%] py-5 text-xl">
      <div className="flex items-center gap-2.5">
        <img src={logo} alt="logo" />

        <Link
          to="/"
          className="text-2xl font-bold text-white no-underline"
        >
          Movie<span className="text-primary">Pidia</span>
        </Link>
      </div>

      <button
        className="cursor-pointer text-white md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`
          absolute right-0 top-[70px] flex h-screen w-[200px]
          flex-col items-start gap-4 bg-card p-5
          transition-transform duration-300
          md:static md:h-auto md:w-auto md:translate-x-0
          md:flex-row md:items-center md:bg-transparent md:p-0
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {authContent}
      </div>
    </nav>
  );
};

export default Navbar;