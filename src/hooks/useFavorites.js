import { useEffect, useState } from "react";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/favorites";

const useFavorites = (user) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoriteMovies([]);
        setLoading(false);
        return;
      }

      try {
        const favorites = await getFavorites(user.uid);
        setFavoriteMovies(favorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (movie) => {
    if (!user) {
      return;
    }

    const alreadyFavorite = favoriteMovies.some(
      (favorite) => favorite.imdbID === movie.imdbID,
    );

    if (alreadyFavorite) {
      await removeFavorite(user.uid, movie.imdbID);

      setFavoriteMovies((currentMovies) =>
        currentMovies.filter(
          (favorite) => favorite.imdbID !== movie.imdbID,
        ),
      );
    } else {
      await addFavorite(user.uid, movie);
      setFavoriteMovies((currentMovies) => [...currentMovies, movie]);
    }
  };

  const isFavorite = (movieId) => {
    return favoriteMovies.some((movie) => movie.imdbID === movieId);
  };

  return {
    favoriteMovies,
    loading,
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorites;