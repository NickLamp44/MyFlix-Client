// import React from "react";
// import { createRoot } from "react-dom/client";
// import { Container } from "react-bootstrap";
// import { MainView } from "./components/mainView.jsx";
// import "./index.scss";

// const MyFlixApp = () => {
//   console.log("Rendering MyFlixApp");
//   return (
//     <Container className="bg-primary-subtle">
//       {/* <MainView /> */}
//     </Container>
//   );
// };
// console.log("Rendering React app");
// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<MyFlixApp />);
import React from "react";
import { createRoot } from "react-dom/client";

console.log("React is running ✅");

const App = () => {
  return (
    <div>
      <h1>Hello, MyFlix!</h1>
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  console.error("❌ #root element not found in DOM");
} else {
  const root = createRoot(container);
  root.render(<App />);
}
