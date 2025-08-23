import React from "react";
import ReactDOM from "react-dom/client";
import TournamentData from "../../../types/TournamentData";
import TournamentsRowModifier from "./TournamentsRowModifier";

// Instead of injecting React through executeScript, we mount React directly
const TournamentsGridUpdater = (tournaments: TournamentData[]) => {
  const gridElement = document.querySelector("tournaments-grid ion-grid");

  if (!gridElement) {
    console.log("Tournament grid not found.");
    return;
  }

  // Look for the row container
  const targetRowContainer = gridElement.querySelector(".grid-rows.row");

  if (!targetRowContainer) {
    console.log("Row container not found, skipping updates.");
    return;
  }

  // Clear or reuse the container
  while (targetRowContainer.firstChild) {
    targetRowContainer.removeChild(targetRowContainer.firstChild);
  }

  // Use React 18 API
  const root = ReactDOM.createRoot(targetRowContainer);
  root.render(<TournamentsRowModifier tournaments={tournaments} />);
};

export default TournamentsGridUpdater;
