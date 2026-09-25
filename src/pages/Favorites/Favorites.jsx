import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import useFavorites from "../../hooks/useFavorites.js";

const Favorites = ({ user }) => {
  const {
    favoriteMovies,
    loading,
    isFavorite,
    toggleFavorite,
  } = useFavorites(user);

  return (
    <div className="mx-auto min-h-[60vh] w-[90%] max-w-[1200px] pb-12 pt-28">
      <h1 className="my-8">My Favorites</h1>
      {!loading && favoriteMovies.length === 0 ? (
        <p className="text-muted">You have not saved any movies yet.</p>
      ) : (
        <div aria-busy={loading} aria-label="Favorite movies" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1200px]:grid-cols-5">
          {loading ? Array.from({ length: 10 }, (_, index) => (
            <div key={index} aria-hidden="true" className="overflow-hidden rounded-lg bg-card shadow-[0_2px_5px_rgba(0,0,0,0.1)] motion-safe:animate-pulse">
              <div className="h-[330px] w-full rounded-lg bg-gray-700" />
              <div className="p-4">
                <div className="my-3 h-6 w-4/5 rounded-lg bg-gray-700" />
                <div className="my-2 h-4 w-3/5 rounded-lg bg-gray-700" />
                <div className="my-2 h-4 w-3/5 rounded-lg bg-gray-700" />
              </div>
            </div>
          )) : favoriteMovies.map((movie) => (
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
