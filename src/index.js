import { StrictMode } from "react";
import ReactDOM from "react-dom";

import RoutesPage from "./routes/RoutesPage";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <RoutesPage />
  </StrictMode>,
  rootElement
);
