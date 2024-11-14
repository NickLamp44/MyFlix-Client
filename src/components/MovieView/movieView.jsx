import PropTypes from "prop-types";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./movieView.scss";

export const MovieView = ({ movie, onBackClick }) => {
  console.log("VIEW INSIDE");
  console.log(movie);

  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={`${movie.Title} poster`} />{" "}
        {/* Updated to use `ImagePath` */}
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span> {/* Updated to use `Title` */}
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span> {/* Updated to use `Description` */}
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre?.Name || "Unknown Genre"}</span>{" "}
        {/* Updated to use `Genre.Name` */}
        <p>{movie.Genre?.Description || "No description available"}</p>{" "}
        {/* Updated to use `Genre.Description` */}
      </div>
      <div>
        <span>Directed by: </span>
        <span>{movie.Director?.Name || "Unknown Director"}</span>{" "}
        {/* Updated to use `Director.Name` */}
        <p>{movie.Director?.Bio || "No bio available"}</p>{" "}
        {/* Updated to use `Director.Bio` */}
      </div>
      <button
        onClick={onBackClick}
        className="btn btn-primary"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired, // Updated to `Title`
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
