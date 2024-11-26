import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const ProfileView = ({ user }) => (
  <div className="profile-view">
    <h2 className="mb-4">User Profile</h2>
    <p>Username: {user.Username}</p>
    <p>Email: {user.Email}</p>
    <p>Birthday: {user.Birthday}</p>

    {/* <h3 className="mt-5">Your Watchlist</h3>
    <div className="watchlist">
      {user.Watchlist && user.Watchlist.length > 0 ? (
        user.Watchlist.map((movie) => (
          <Card key={movie._id} className="mb-3">
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>You have not added any movies to your watchlist.</p>
      )}
    </div> */}
  </div>
);

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    Watchlist: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
