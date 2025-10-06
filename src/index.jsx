import { createRoot } from "react-dom/client";

import { MainView } from "./components/mainView.jsx";
import { Container } from "react-bootstrap";
import "./index.scss";

const MyFlixApp = () => {
  return (
    <Container className="bg-primary-subtle">
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApp />);
