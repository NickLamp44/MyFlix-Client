import React from "react";
import { Container } from "react-bootstrap";
import { MainView } from "./components/mainView.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

export default function App() {
  console.log("Rendering App component");
  return (
    <Container fluid className="bg-primary-subtle min-vh-100">
      <MainView />
    </Container>
  );
}
