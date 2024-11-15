import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movieCard";
import { MovieView } from "../MovieView/movieView";
import { LoginView } from "../LoginView/loginView";
import { RegisterView } from "../RegisterView/registerView";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  // State variables
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const urlAPI = "http://localhost:8080/movies";

  // Fetch movies from API
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

  console.log("Movies state:", movies);

  // Render MovieView if a movie is selected
  if (selectedMovie) {
    console.log("Selected movie:", selectedMovie);
    return (
      <Row className="justify-content-md-center">
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            style={{ border: "1px solid green" }}
            movie={selectedMovie}
            onBackClick={() => {
              console.log("Back button clicked, resetting selectedMovie");
              setSelectedMovie(null);
            }}
          />
        </Col>
      </Row>
    );
  }

  // If the user is not logged in, show login/register views
  if (!user) {
    return (
      <BrowserRouter>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <RegisterView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    );
  }

  // Render the list of movies
  return (
    <Row className="justify-content-md-center">
      {movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => {
            console.log("Rendering movie:", movie);
            return (
              <Col className="mb-5" key={movie._id} md={3}>
                <MovieCard
                  className="h-100"
                  movie={movie}
                  onMovieClick={(selectedMovie) => {
                    console.log("Movie clicked:", selectedMovie);
                    setSelectedMovie(selectedMovie);
                  }}
                />
              </Col>
            );
          })}
        </>
      )}
      <Col xs={12} className="text-center mt-4">
        <button
          className="btn btn-danger"
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
      </Col>
    </Row>
  );
};
