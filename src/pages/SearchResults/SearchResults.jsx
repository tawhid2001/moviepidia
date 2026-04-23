import React, { useState, useEffect } from "react";
import "./SearchResults.css";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(totalResults / 10);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");


  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_APIKEY_OMDB}&s=${query}&page=${page}`,
        );
        console.log("API Response:", response.data);

        if (response.data.Response === "True") {
          setResults(response.data.Search || []);
          setTotalResults(Number(response.data.totalResults));
        } else {
          setResults([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [page, query]);

  return (
    <div className="search-results">
      <h1 className="search-results-title">Search Results for "{query}"</h1>
      <div className="search-results-grid">
        {loading ? (
          Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="movie-card skeleton">
              <div className="skeleton-poster"></div>
              <div className="skeleton-content">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          ))
        ) : (
          results.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages || totalPages === 0}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
