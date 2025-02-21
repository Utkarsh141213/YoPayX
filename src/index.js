import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";  // ✅ BrowserRouter ki jagah HashRouter
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; 

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <HashRouter>  {/* ⬅️ Yeh important hai! */}
    <App />
  </HashRouter>
);
