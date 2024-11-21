import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../LoginView/loginView";
import { RegisterView } from "../RegisterView/registerView";
import { NavigationBar } from "../NavigationBar/navigationBar";
import { ProfileView } from "../ProfileView/profileView";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// API URL
const urlAPI = "http://localhost:8080/movies";

// Custom hook for fetching movies
const useFetchMovies = (token) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) {
        console.log("No token found. Skipping fetch.");
        return;
      }

      try {
        console.log("Fetching movies with token:", token);

        const response = await fetch(urlAPI, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Map the API response to match the MovieCard component's expected structure
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre?.Name || "Unknown",
          Director: movie.Director?.Name || "Unknown",
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));

        console.log("Mapped Movies Data:", moviesFromApi);
        setMovies(moviesFromApi);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [token]);

  return movies;
};

// MainView component
export const MainView = () => {
  // State variables
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const movies = useFetchMovies(token);

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />

      <Row className="justify-content-md-center">
        <Routes>
          {/* Home Route - Movie List */}
          <Route
            path="/"
            element={
              user ? <MovieList movies={movies} /> : <Navigate to="/login" />
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                    localStorage.setItem("user", user);
                    localStorage.setItem("token", token);
                  }}
                />
              )
            }
          />

          {/* Signup Route */}
          <Route path="/signup" element={<RegisterView />} />

          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              user ? <ProfileView user={user} /> : <Navigate to="/login" />
            }
          />

          {/* Movie View Route (Dynamic URL) */}
          <Route
            path="/movies/:movieId"
            element={
              user ? (
                <MovieView movies={movies} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

// MovieList component
const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return <Col md={8}>The list is empty! Please try refreshing the page.</Col>;
  }

  return (
    <>
      {movies.map((movie) => (
        <Col className="mb-5" key={movie._id} md={3}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  );
};
