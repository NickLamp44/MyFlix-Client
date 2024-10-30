import { useState } from "react";
import { MovieCard } from "../MovieCard/movieCard";
import { MovieView } from "../MovieView/movieView";
import { loginView } from "../LoginView/loginView";
import { registerView } from "../RegisterView/registerView";

export const MainView = () => {
  // const url = "http://localhost:8080/movies";
  // const [movies, setMovies] = useState([]);
  // console.log("tEST");
  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setMovies(data);
  //     });
  // });
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image:
        "https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      director: "Christopher Nolan",
      genre: "Sci-Fi",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    },
    {
      id: 2,
      title: "Interstellar",
      image:
        "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      director: "Christopher Nolan",
      genre: "Sci-Fi",
      description:
        "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    },
    {
      id: 3,
      title: "The Matrix",
      image:
        "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      director: "Lana Wachowski, Lilly Wachowski",
      genre: "Sci-Fi",
      description:
        "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    },
    {
      id: 4,
      title: "The Godfather",
      image:
        "https://image.tmdb.org/t/p/original/d4KNaTrltq6bpkFS01pYtyXa09m.jpg",
      director: "Francis Ford Coppola",
      genre: "Crime",
      description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    },
    {
      id: 5,
      title: "The Dark Knight",
      image:
        "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      director: "Christopher Nolan",
      genre: "Action",
      description:
        "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as The Joker.",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  const [user, setUser] = useState(null);

  const [register, setRegister] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          alert("Nice!");
        }}
      >
        Click me!
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          }
        />
      ))}
    </div>
  );
};
