import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"


const MovieCard = ({ movie, isFavorite = false, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} onClick={(event) => {
        event.stopPropagation();
        onToggleFavorite(movie);
      }}>
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </button>
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
