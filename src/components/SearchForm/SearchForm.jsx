import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";

const SearchForm = ({ query }) => {
  const [searchTerm, setSearchTerm] = useState(query || "");
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${searchTerm}`)
  }

  return (
    <>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
