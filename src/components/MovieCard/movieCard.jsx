import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, userId, token, onWatchlistUpdate }) => {
  console.log("MovieCard Props:", movie);

  const handleAddToWatchlist = () => {
    fetch(`http://localhost:8080/users/${userId}/watchlist/${movie._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedUser) => {
        console.log("Updated user:", updatedUser);
        if (onWatchlistUpdate) onWatchlistUpdate(updatedUser);
        alert(`${movie.Title} has been added to your watchlist!`);
      })
      .catch((error) => {
        console.error("Error adding to watchlist:", error);
        alert("Failed to add movie to watchlist. Please try again.");
      });
  };

  return (
    <Card className="h-100 movie-card">
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        alt={`${movie.Title} Poster`}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link" className="mb-2">
            Find out more!
          </Button>
        </Link>
        {/* <Button variant="success" onClick={handleAddToWatchlist}>
          Add to Watchlist
        </Button> */}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onWatchlistUpdate: PropTypes.func,
};
