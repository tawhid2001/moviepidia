import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <form className="mt-5 flex w-full max-w-[400px] flex-col gap-[15px] min-[601px]:flex-row min-[601px]:gap-2.5" onSubmit={handleSearch}>
        <input
          className="min-w-0 w-full rounded-[5px] border border-border bg-input p-2.5 text-xl text-white placeholder:text-xl focus:border-primary focus:outline-none"
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="inline-flex min-w-[100px] cursor-pointer items-center justify-center rounded-[5px] bg-primary px-5 py-2.5 text-xl text-white transition-colors duration-300 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70 min-[601px]:min-w-[120px] min-[601px]:text-2xl" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
