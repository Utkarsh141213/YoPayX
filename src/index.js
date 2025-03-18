import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // ✅ BrowserRouter ki jagah HashRouter
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <HashRouter basename="/">
    {" "}
    {/* ⬅️ Yeh important hai! */}
    <ScrollToTop />
      <App />

  </HashRouter>
);
