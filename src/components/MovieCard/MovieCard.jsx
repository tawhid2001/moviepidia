import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"


const MovieCard = ({ movie, isFavorite = false, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="relative cursor-pointer rounded-lg bg-card shadow-[0_2px_5px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:-translate-y-[5px]" onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      <button className={`absolute right-3 top-3 z-1 grid size-9 cursor-pointer place-items-center rounded-full border-0 bg-black/65 ${isFavorite ? 'text-red-500' : 'text-white'}`} onClick={(event) => {
        event.stopPropagation();
        onToggleFavorite(movie);
      }}>
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </button>
      <img
        className="w-full rounded-t-lg object-cover"
        src={movie.Poster}
        alt="Movie Poster"
      />
      <div className="p-4">
        <h3 className="mb-2 text-[1.2rem]">{movie.Title}</h3>
        <p className="mb-1 text-[0.9rem] text-muted">{movie.Year}</p>
        <p className="mb-1 text-[0.85rem] text-muted">{movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;
