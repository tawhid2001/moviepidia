import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${searchTerm}`)
  }


  return (
    <div className="home">
        <h1 className="home-title">Welcome to MoviePidia</h1>
        <p className="home-subtitle">Your ultimate movie database</p>
        <form className="home-form" onSubmit={handleSearch}>
          <input className="home-input" type="text" placeholder="Search movies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="home-button" type="submit">Search</button>
        </form>
    </div>
  )
}

export default Home