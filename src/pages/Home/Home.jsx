import React from 'react'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'

const Home = () => {
  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-5 pb-10 pt-28">
        <h1 className="text-center text-[2.5rem] text-primary min-[601px]:text-5xl">Welcome to MoviePidia</h1>
        <p className="text-center text-xl text-muted min-[601px]:text-2xl">Your ultimate movie database</p>
        <SearchForm />
        <p className="mt-5 max-w-[90%] text-center text-base text-white min-[601px]:max-w-[600px] min-[601px]:text-xl">
            Discover movies, TV shows, and celebrities. Search for your favorite films, explore new releases, and find detailed information about cast, crew, and more.
        </p>
        
    </div>
  )
}

export default Home
