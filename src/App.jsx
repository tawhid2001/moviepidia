import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import SearchResults from "./pages/SearchResults/SearchResults.jsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";

import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!authLoaded) {
      return null;
    }

    if (!user) {
      return <Navigate to="/auth" replace />;
    }

    return children;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoaded(true);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        toastClassName="bg-card! text-white!"
        progressClassName="bg-green-600!"
      />

      <Navbar user={user} authLoaded={authLoaded} />

      <main className="min-h-screen bg-linear-to-br from-background via-slate-900 to-black">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResults user={user} />
              </ProtectedRoute>
            }
          />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites user={user} />
              </ProtectedRoute>
            }
          />

          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
