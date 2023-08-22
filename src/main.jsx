import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "./components/GlobalStyles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </BrowserRouter>
);
