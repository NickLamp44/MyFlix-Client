import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const urlAPI = "http://localhost:8080";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };
    console.log("Login request data:", data);

    fetch(urlAPI + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Correct the body structure here
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);

        if (data.user) {
          console.log("User authenticated:", data.user);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Something went wrong during login. Please try again.");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          minLength="5"
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength="5"
          required
        />
      </Form.Group>

      <Button varient="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
