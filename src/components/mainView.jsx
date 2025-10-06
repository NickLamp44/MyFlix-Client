import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "./movieCard";
import { MovieView } from "./movieView";
import { LoginView } from "./loginView";
import { RegisterView } from "./registerView";
import { NavigationBar } from "./navigationBar";
import { ProfileView } from "./profileView";
import "bootstrap/dist/css/bootstrap.min.css";

const urlAPI = "https://nicks-flix-364389a40fe7.herokuapp.com";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return null;
  }
};

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    console.error("Invalid token:", e);
    return true;
  }
};

const useFetchMovies = (token) => {
  const [movies, setMovies] = useState(null); // null during loading
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) {
        console.log("No token found. Skipping fetch.");
        return;
      }

      try {
        const url = `${urlAPI}/movies`;
        console.log("Request URL:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre?.Name || "Unknown",
          Director: movie.Director?.Name || "Unknown",
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));
        setMovies(moviesFromApi);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      }
    };

    fetchMovies();
  }, [token]);

  return { movies, error };
};

export const MainView = () => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { movies, error } = useFetchMovies(token);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.warn("Token expired. Logging out.");
      setToken(null);
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <MovieList
                  movies={movies}
                  error={error}
                  user={user}
                  token={token}
                  onWatchlistUpdate={(updatedUser) => {
                    setUser(updatedUser);
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                  }}
                />
              ) : (
                <Navigate to="/login" />
              )
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
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                  }}
                />
              )
            }
          />

          {/* SignUp Route */}
          <Route path="/signup" element={<RegisterView />} />

          {/* UserProfile Route */}
          <Route
            path="/profile"
            element={
              user ? <ProfileView user={user} /> : <Navigate to="/login" />
            }
          />

          {/* Movie Route */}
          <Route
            path="/movies/:movieId"
            element={
              user ? <MovieView movies={movies} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

// MovieList component
const MovieList = ({ movies, error, user, token, onWatchlistUpdate }) => {
  if (error) {
    return <Col md={8}>{error}</Col>;
  }

  if (movies === null) {
    return <Col md={8}>Loading movies...</Col>;
  }

  if (movies.length === 0) {
    return <Col md={8}>The list is empty! Please try refreshing the page.</Col>;
  }

  return (
    <>
      {movies.map((movie) => (
        <Col className="mb-5 p-5" key={movie._id} md={4}>
          <MovieCard
            movie={movie}
            user={user}
            token={token}
            onWatchlistUpdate={onWatchlistUpdate}
          />
        </Col>
      ))}
    </>
  );
};
