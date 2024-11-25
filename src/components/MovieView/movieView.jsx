import React from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Row className="g-0">
              {/* Movie Poster */}
              <Col md={4}>
                <Card.Img
                  src={movie.ImagePath}
                  alt={`${movie.Title} poster`}
                  className="img-fluid rounded-start"
                  style={{ objectFit: "cover" }}
                />
              </Col>

              {/* Movie Details */}
              <Col md={8}>
                <Card.Body>
                  <Card.Title as="h2" className="text-center mb-3">
                    {movie.Title}
                  </Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {movie.Description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Genre:</strong> {movie.Genre || "Unknown"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Directed by:</strong> {movie.Director || "Unknown"}
                  </Card.Text>
                  <div className="text-center mt-4">
                    <Link to="/">
                      <Button variant="primary">Back</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.string,
      Director: PropTypes.string,
    })
  ).isRequired,
};
