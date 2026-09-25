import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm.jsx";
import useFavorites from "../../hooks/useFavorites";

const SearchResults = ({ user }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(totalResults / 10);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const {isFavorite, toggleFavorite} = useFavorites(user);


  function movieCardSkeleton() {
    return (
      Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="rounded-lg bg-card shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
              <div className="h-[330px] w-full animate-pulse rounded-lg bg-gray-700"></div>
              <div className="p-4">
                <div className="my-3 h-6 w-4/5 animate-pulse rounded-lg bg-gray-700"></div>
                <div className="my-2 h-4 w-3/5 animate-pulse rounded-lg bg-gray-700"></div>
                <div className="my-2 h-4 w-3/5 animate-pulse rounded-lg bg-gray-700"></div>
              </div>
            </div>
          ))
    )
  }

  function renderMovieCards() {
    return results.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} isFavorite={isFavorite(movie.imdbID)} onToggleFavorite={toggleFavorite}/>
          ))
  }


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
    <div className="min-h-screen px-5 pb-10 pt-20 md:px-10 xl:px-20">
      <SearchForm query={query} />
      <h1 className="my-5 text-[2rem]">Search Results for "{query}"</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 py-5 sm:px-5 min-[1200px]:grid-cols-5">
        {loading ? (
          movieCardSkeleton()
        ) : (
          renderMovieCards()
        )}
      </div>

      <div className="sticky bottom-0 mt-[30px] flex flex-wrap items-center justify-center gap-5 bg-navbar p-5">
        <button className="cursor-pointer rounded-[5px] bg-primary px-5 py-2.5 text-white transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-input" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button className="cursor-pointer rounded-[5px] bg-primary px-5 py-2.5 text-white transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-input" onClick={() => setPage(page + 1)} disabled={page === totalPages || totalPages === 0}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
