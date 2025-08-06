import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, onWatchlistUpdate }) => {
  console.log("MovieCard Props:", movie, "User:", user);

  // Check if the movie is already in the user's watchlist
  const isInWatchlist =
    user?.Watchlist?.some(
      (watchlistMovie) => watchlistMovie._id === movie._id
    ) || false;

  const handleWatchlistToggle = async () => {
    if (!user?._id) {
      console.error("User is missing!");
      alert("Unable to modify watchlist. Please log in first.");
      return;
    }

    const url = `https://nicks-flix-364389a40fe7.herokuapp.com/users/${user._id}/watchlist/${movie._id}`;
    const method = isInWatchlist ? "DELETE" : "POST";
    const action = isInWatchlist ? "removed from" : "added to";

    console.log(`Making ${method} request to: ${url}`);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status} - ${errorText}`
        );
      }

      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);
      if (onWatchlistUpdate) onWatchlistUpdate(updatedUser);
      alert(`${movie.Title} has been ${action} your watchlist!`);
    } catch (error) {
      console.error(
        `Error ${action.split(" ")[0]}ing ${action.split(" ")[1]} watchlist:`,
        error
      );
      alert(
        `Failed to ${action.split(" ")[0]} movie ${
          action.split(" ")[1]
        } watchlist. Please try again.`
      );
    }
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
        <Button
          variant={isInWatchlist ? "danger" : "success"}
          onClick={handleWatchlistToggle}
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
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
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Watchlist: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  token: PropTypes.string.isRequired,
  onWatchlistUpdate: PropTypes.func,
};
