// import React from "react";
// import PropTypes from "prop-types";
// import { Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export const MovieCard = ({ movie }) => {
//   return (
//     <Card>
//       <Card.Img varient="top" src={movie.Image} />
//       <Card.Body>
//         <Card.Title>{movie.Title}</Card.Title>
//         <Card.Text>{movie.Description}</Card.Text>

//         <Link to={`/books/${encodeURIComponent(movie.id)}`}>
//           <Button variant="link">Find out more!</Button>
//         </Link>
//       </Card.Body>
//     </Card>
//   );
// };

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//   }).isRequired,
// };

import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Find out more!</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
};
