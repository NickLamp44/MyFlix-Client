// import { useState, useEffect } from "react";
// import { MovieCard } from "../MovieCard/movieCard";
// import { MovieView } from "../MovieView/movieView";
// import { LoginView } from "../LoginView/loginView";
// import { RegisterView } from "../RegisterView/registerView";
// import { Navigationbar } from "../NavigationBar/navigationBar";

// // utils
// import "bootstrap/dist/css/bootstrap.min.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// export const MainView = () => {
//   const storedUser = localStorage.getItem("user");
//   const storedToken = localStorage.getItem("token");

//   // State variables
//   const [user, setUser] = useState(storedUser ? storedUser : null);
//   const [token, setToken] = useState(storedToken ? storedToken : null);
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   const urlAPI = "http://localhost:8080/movies";

//   // Fetch movies from API
//   useEffect(() => {
//     if (!token) {
//       console.log("No token found. Skipping fetch.");
//       return;
//     }

//     console.log("Fetching movies with token:", token);

//     fetch(urlAPI, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     })
//       .then((response) => {
//         console.log("API Response:", response);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Movies data received:", data);
//         setMovies(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching movies:", error);
//       });
//   }, [token]);

//   console.log("Movies state:", movies);

//   // Render MovieView if a movie is selected
//   if (selectedMovie) {
//     console.log("Selected movie:", selectedMovie);
//     return (
//       <Row className="justify-content-md-center">
//         <Col md={8} style={{ border: "1px solid black" }}>
//           <MovieView
//             style={{ border: "1px solid green" }}
//             movie={selectedMovie}
//             onBackClick={() => {
//               console.log("Back button clicked, resetting selectedMovie");
//               setSelectedMovie(null);
//             }}
//           />
//         </Col>
//       </Row>
//     );
//   }

//   // If the user is not logged in, show login/register views
//   if (!user) {
//     return (
//       <BrowserRouter>
//         <NavigationBar
//           user={user}
//           onLoggedOut={() => {
//             setUser(null);
//           }}
//         />
//         <Row className="justify-content-md-center">
//           <Routes>
//             <Route
//               path="/signup"
//               element={
//                 <>
//                   {user ? (
//                     <Navigate to="/" />
//                   ) : (
//                     <Col md={5}>
//                       <RegisterView />
//                     </Col>
//                   )}
//                 </>
//               }
//             />
//             <Route
//               path="/login"
//               element={
//                 <>
//                   {user ? (
//                     <Navigate to="/" />
//                   ) : (
//                     <Col md={5}>
//                       <LoginView />
//                     </Col>
//                   )}
//                 </>
//               }
//             />
//           </Routes>
//         </Row>
//       </BrowserRouter>
//     );
//   }

//   // Render the list of movies
//   return (
//     <BrowserRouter>
//       <NavigationBar
//         user={user}
//         onLoggedOut={() => {
//           setUser(null);
//         }}
//       />
//       <Row>
//         <Routes>
//           <Route
//             path="/movie/:movieID"
//             element={
//               <>
//                 {!user ? (
//                   <Navigate to="/login" replace />
//                 ) : movies.length === 0 ? (
//                   <Col> The List is Empty! </Col>
//                 ) : (
//                   <Col md={8}>
//                     {" "}
//                     <MovieView movies={movies} />
//                   </Col>
//                 )}
//               </>
//             }
//           />

//           <Route
//             path="/"
//             element={
//               <>
//                 {!user ? (
//                   <Navigate to="/login" replace />
//                 ) : movies.length === 0 ? (
//                   <Col> The List is Empty! </Col>
//                 ) : (
//                   <>
//                     {movies.map(
//                       (movie) => (
//                         console.log("Rendering movie:", movie),
//                         (
//                           <Col className="mb-5" key={movie._id} md={3}>
//                             <MovieCard
//                               className="h-100"
//                               movie={movie}
//                               onMovieClick={(selectedMovie) => {
//                                 console.log("Movie clicked:", selectedMovie);
//                                 setSelectedMovie(selectedMovie);
//                               }}
//                             />
//                           </Col>
//                         )
//                       )
//                     )}
//                   </>
//                 )}
//               </>
//             }
//           />
//         </Routes>
//       </Row>
//     </BrowserRouter>
//   );
// };

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
    if (!token) return;

    fetch(urlAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
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
