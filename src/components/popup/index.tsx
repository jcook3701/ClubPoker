import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup";
import { CalendarProvider } from "../../context/GoogleCalendarContext";

// Create a new div for mounting React
const rootElement = document.createElement("div");
rootElement.className = "container";
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <CalendarProvider>
      <Popup></Popup>
    </CalendarProvider>
  </React.StrictMode>
);
