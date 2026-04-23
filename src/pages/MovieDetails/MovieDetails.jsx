import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import backIcon from "../../assets/circle-arrow-left.svg";


const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_APIKEY_OMDB}&i=${id}`,
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovie({});
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    loading ? (
      <div className="movie-details skeleton-container">
        <div className="skeleton skeleton-poster"></div>
        <div className="skeleton-content">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-plot"></div>
          <div className="skeleton skeleton-plot"></div>
          <div className="skeleton skeleton-plot"></div>
        </div>
      </div>
    ) : (
      <div className="movie-details">
        <div className="back-icon" onClick={() => navigate(-1)}>
          <img src={backIcon} alt="Back" />
        </div>

        {movie.Poster && movie.Poster !== "N/A" && (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="movie-details-poster"
          />
        )}
        <div className="movie-details-content">
          <h1>{movie.Title}</h1>
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Rated:</strong> {movie.Rated}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Writer:</strong> {movie.Writer}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
          <p>
            <strong>Awards:</strong> {movie.Awards}
          </p>
          <p>
            <strong>Box Office:</strong> {movie.BoxOffice}
          </p>
          <p>
            <strong>Metascore:</strong> {movie.Metascore}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {movie.imdbRating} ({movie.imdbVotes}{" "}
            votes)
          </p>
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="movie-details-ratings">
              <strong>Ratings:</strong>
              <ul>
                {movie.Ratings.map((rating) => (
                  <li key={`${rating.Source}-${rating.Value}`}>
                    {rating.Source}: {rating.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default MovieDetails;
