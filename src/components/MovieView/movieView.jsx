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
