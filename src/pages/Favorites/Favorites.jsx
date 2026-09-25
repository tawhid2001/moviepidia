import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import useFavorites from "../../hooks/useFavorites.js";
import './Favorites.css'

const Favorites = ({ user }) => {
  const {
    favoriteMovies,
    loading,
    isFavorite,
    toggleFavorite,
  } = useFavorites(user);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>

      {favoriteMovies.length === 0 ? (
        <p>You have not saved any movies yet.</p>
      ) : (
        <div className="favorites-grid">
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite(movie.imdbID)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;