"use client";

import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap"; // Import Row and Col
import { Link } from "react-router-dom"; // Assuming Link is used for navigation to movie details

export const ProfileView = ({ user }) => (
  <div className="profile-view">
    <h2 className="mb-4">User Profile</h2>
    <p>Username: {user.Username}</p>{" "}
    {/* Corrected to user.Username based on propTypes */}
    <p>Email: {user.Email}</p>
    <h3 className="mt-5">Your Watchlist</h3>
    <Row className="watchlist">
      {" "}
      {/* Use Row for the grid container */}
      {user.Watchlist && user.Watchlist.length > 0 ? (
        user.Watchlist.map((movie) => (
          <Col xs={6} md={4} lg={3} className="mb-4" key={movie._id}>
            {" "}
            {/* Use Col for responsive columns */}
            <Card>
              {/* Add Link around the image/card to navigate to movie details if applicable */}
              <Link to={`/movies/${movie._id}`}>
                <Card.Img
                  variant="top"
                  src={movie.ImagePath}
                  alt={`${movie.Title} Poster`}
                  fluid // Add the fluid prop here for responsive scaling
                />
              </Link>
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                {/* You might want to add a button to remove from watchlist here */}
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          {" "}
          {/* Wrap the message in a Col too */}
          <p>You have not added any movies to your watchlist.</p>
        </Col>
      )}
    </Row>
  </div>
);

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Watchlist: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string, // Added ImagePath to propTypes
      })
    ),
  }).isRequired,
};
