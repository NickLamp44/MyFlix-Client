import { createRoot } from "react-dom/client";

// Import statement to indicate that you need to bundle `index.scss`
import { MainView } from "./components/mainView/mainView";

import "./index.scss";

// Import statement to indicate that you need to bundle `index.scss`
const MyFlixApp = () => {
  return <MainView />;
};

// Find the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tell React to render the app in the root DOM element
root.render(<MyFlixApp />);
