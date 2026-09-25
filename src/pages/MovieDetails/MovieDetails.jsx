import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import backIcon from "../../assets/circle-arrow-left.svg";


const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  function renderLoader() {
    return (
      <div className="relative mx-auto grid max-w-[1000px] grid-cols-1 items-start gap-10 bg-background px-5 pb-20 pt-28 md:grid-cols-[280px_1fr]">
        <div className="h-[450px] w-full max-w-[300px] animate-pulse rounded-lg bg-gray-700"></div>
        <div className="min-w-0">
          <div className="mb-5 h-10 w-3/5 animate-pulse rounded-lg bg-gray-700"></div>
          <div className="mb-[15px] h-5 w-2/5 animate-pulse rounded-lg bg-gray-700"></div>
          <div className="mb-[15px] h-5 w-2/5 animate-pulse rounded-lg bg-gray-700"></div>
          <div className="mb-[15px] h-5 w-2/5 animate-pulse rounded-lg bg-gray-700"></div>
          <div className="mb-[15px] h-5 w-2/5 animate-pulse rounded-lg bg-gray-700"></div>
          <div className="mb-3 h-5 w-[90%] animate-pulse rounded-lg bg-gray-700"></div>
          <div className="mb-3 h-5 w-[90%] animate-pulse rounded-lg bg-gray-700"></div>
          <div className="mb-3 h-5 w-[90%] animate-pulse rounded-lg bg-gray-700"></div>
        </div>
      </div>
    ) 
  }

  function renderMovieDetails() {
    return (
      <div className="relative mx-auto grid max-w-[1000px] grid-cols-1 items-start gap-10 px-5 pb-20 pt-32 md:grid-cols-[280px_1fr] md:px-20">
        <div className="absolute left-[15px] top-24 mt-5" onClick={() => navigate(-1)}>
          <img className="size-5 cursor-pointer invert" src={backIcon} alt="Back" />
        </div>

        {movie.Poster && movie.Poster !== "N/A" && (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full rounded-xl shadow-[0_20px_60px_rgba(255,255,255,0.1)]"
          />
        )}
        <div className="flex min-w-0 flex-col gap-3">
          <h1 className="mb-2.5">{movie.Title}</h1>
          <p className="leading-[1.6]">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="leading-[1.6]">
            <strong>Rated:</strong> {movie.Rated}
          </p>
          <p className="leading-[1.6]">
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p className="leading-[1.6]">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="leading-[1.6]">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="leading-[1.6]">
            <strong>Writer:</strong> {movie.Writer}
          </p>
          <p className="leading-[1.6]">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="leading-[1.6]">
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p className="leading-[1.6]">
            <strong>Language:</strong> {movie.Language}
          </p>
          <p className="leading-[1.6]">
            <strong>Country:</strong> {movie.Country}
          </p>
          <p className="leading-[1.6]">
            <strong>Awards:</strong> {movie.Awards}
          </p>
          <p className="leading-[1.6]">
            <strong>Box Office:</strong> {movie.BoxOffice}
          </p>
          <p className="leading-[1.6]">
            <strong>Metascore:</strong> {movie.Metascore}
          </p>
          <p className="leading-[1.6]">
            <strong>IMDB Rating:</strong> {movie.imdbRating} ({movie.imdbVotes}{" "}
            votes)
          </p>
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="leading-[1.6]">
              <strong>Ratings:</strong>
              <ul className="mt-2.5 list-none p-0">
                {movie.Ratings.map((rating) => (
                  <li className="mb-1.5" key={`${rating.Source}-${rating.Value}`}>
                    {rating.Source}: {rating.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }

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
    loading ? renderLoader() : renderMovieDetails()
  );
};

export default MovieDetails;
