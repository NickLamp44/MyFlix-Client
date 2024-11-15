// import PropTypes from "prop-types";
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./movieView.scss";
// import { useParams } from "react-router-dom";

// export const MovieView = ({ movie }) => {
//   console.log("VIEW INSIDE");
//   console.log(movie);

//   const { movieID } = useParams();
//   const movie = movies.find((m) => m._id === movieID);

//   return (
//     <div>
//       <div>
//         <img
//           className="w-100"
//           src={movie.image}
//           alt={`${movie.Title} poster`}
//         />{" "}
//         {/* Updated to use `ImagePath` */}
//       </div>
//       <div>
//         <span>Title: </span>
//         <span>{movie.Title}</span> {/* Updated to use `Title` */}
//       </div>
//       <div>
//         <span>Description: </span>
//         <span>{movie.Description}</span> {/* Updated to use `Description` */}
//       </div>
//       <div>
//         <span>Genre: </span>
//         <span>{movie.Genre?.Name || "Unknown Genre"}</span>{" "}
//         {/* Updated to use `Genre.Name` */}
//         <p>{movie.Genre?.Description || "No description available"}</p>{" "}
//         {/* Updated to use `Genre.Description` */}
//       </div>
//       <div>
//         <span>Directed by: </span>
//         <span>{movie.Director?.Name || "Unknown Director"}</span>{" "}
//         {/* Updated to use `Director.Name` */}
//         <p>{movie.Director?.Bio || "No bio available"}</p>{" "}
//         {/* Updated to use `Director.Bio` */}
//       </div>
//       <Link to={"/"}>
//         <button className="btn btn-primary" style={{ cursor: "pointer" }}>
//           Back
//         </button>
//       </Link>
//     </div>
//   );
// };

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired, // Updated to `Title`
//     Description: PropTypes.string,
//     ImagePath: PropTypes.string,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string,
//       Description: PropTypes.string,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string,
//       Bio: PropTypes.string,
//     }),
//   }).isRequired,
// };

import React from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <img
        src={movie.ImagePath}
        alt={`${movie.Title} poster`}
        className="w-100"
      />
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre?.Name}</p>
      <p>Directed by: {movie.Director?.Name}</p>
      <Link to="/">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
      }),
    })
  ).isRequired,
};
