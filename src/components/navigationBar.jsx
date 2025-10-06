import React from "react";
import { Film } from "lucide-react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => (
  <Navbar
    className="p-3 text-primary-emphasis bg-primary border border-warning n  rounded-3"
    expand="lg"
  >
    <Container className="p-2">
      <Film className="text-white m-2" />
      <Navbar.Brand as={Link} to="/" className="m-2 text-white ">
        NicksFlix
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto ">
          {!user ? (
            <>
              <Nav.Link as={Link} to="/login" className="m-2 text-white">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className="m-2 text-white">
                Signup
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/profile" className="m-2  text-white">
                Profile
              </Nav.Link>

              <Nav.Link onClick={onLoggedOut} className="m-2 text-white">
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
