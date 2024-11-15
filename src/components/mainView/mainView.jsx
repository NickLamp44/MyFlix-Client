import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { RegisterView } from "../RegisterView/RegisterView";
import { NavigationBar } from "../NavigationBar/navigationBar";
import { ProfileView } from "../ProfileView/profileView";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const urlAPI = "http://localhost:8080/movies";

  useEffect(() => {
    if (!token) {
      console.log("No token found. Skipping fetch.");
      return;
    }

    console.log("Fetching movies with token:", token);

    fetch(urlAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => {
        console.log("API Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Movies data received:", data);
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

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
          <Route
            path="/"
            element={
              user ? <MovieList movies={movies} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <LoginView onLoggedIn={setUser} />
            }
          />
          <Route path="/signup" element={<RegisterView />} />
          <Route path="/profile" element={<ProfileView user={user} />} />
          <Route
            path="/movies/:movieId"
            element={<MovieView movies={movies} />}
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

const MovieList = ({ movies }) => (
  <>
    {movies.length === 0 ? (
      <Col>The list is empty!</Col>
    ) : (
      movies.map((movie) => (
        <Col className="mb-5" key={movie._id} md={3}>
          <MovieCard movie={movie} />
        </Col>
      ))
    )}
  </>
);
