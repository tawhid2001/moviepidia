import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'

const Home = () => {
  return (
    <div className="home">
        <h1 className="home-title">Welcome to MoviePidia</h1>
        <p className="home-subtitle">Your ultimate movie database</p>
        <SearchForm />
        <p className="home-description">
            Discover movies, TV shows, and celebrities. Search for your favorite films, explore new releases, and find detailed information about cast, crew, and more.
        </p>
        
    </div>
  )
}

export default Home