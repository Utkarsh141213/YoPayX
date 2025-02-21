import React from "react";
import ReactDOM from "react-dom/client"; // ✅ React 19 ke liye sahi import
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

// Get the root element
const rootElement = document.getElementById("root");

// Create root using React 19 syntax
const root = ReactDOM.createRoot(rootElement);

// Render the App inside <BrowserRouter>
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
