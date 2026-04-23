import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import SearchResults from './pages/SearchResults/SearchResults.jsx'
import MovieDetails from './pages/MovieDetails/MovieDetails.jsx'
import Auth from './pages/Auth/Auth.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import {onAuthStateChanged} from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { auth } from './firebase.js'

function App() {

  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  const ProtectedRoute = ({ children, user }) => {
    if (!user && authLoaded) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setUser(user);
      setAuthLoaded(true);
    });
    return unsubscribe;
  }, [])

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={
          <ProtectedRoute user={user}>
            <SearchResults />
          </ProtectedRoute>
        } />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
