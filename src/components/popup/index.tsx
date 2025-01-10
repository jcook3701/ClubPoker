import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup";

// Create a new div for mounting React
const rootElement = document.createElement("div");
rootElement.className = "container";
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Popup></Popup>
  </React.StrictMode>
);
