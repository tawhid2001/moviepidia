import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      <img
        className="movie-card__poster"
        src={movie.Poster}
        alt="Movie Poster"
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__year">{movie.Year}</p>
        <p className="movie-card__type">{movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;
