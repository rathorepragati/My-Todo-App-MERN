import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Use createRoot instead of ReactDOM.render
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
