import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movieCard";
import { MovieView } from "../MovieView/movieView";
import { LoginView } from "../LoginView/loginView";
import { RegisterView } from "../RegisterView/registerView";
import "bootstrap/dist/css/bootstrap.min.css";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  console.log("Movies state:", movies);

  // Check if a movie is selected and render MovieView
  if (selectedMovie) {
    console.log("Selected movie:", selectedMovie);
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          console.log("Back button clicked, resetting selectedMovie");
          setSelectedMovie(null);
        }}
      />
    );
  }

  // If the user is not logged in, show login/register views
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            localStorage.setItem("user", user);
            setToken(token);
            localStorage.setItem("token", token);
          }}
        />
        <RegisterView />
      </>
    );
  }

  // Render the list of movies
  return (
    <div>
      <h1>Movie List</h1>
      {movies.map((movie) => {
        console.log("Rendering movie:", movie);
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(selectedMovie) => {
              console.log("Movie clicked:", selectedMovie);
              setSelectedMovie(selectedMovie);
            }}
          />
        );
      })}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
    </div>
  );
};
