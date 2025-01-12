import ReactDOM from "react-dom/client";
import TournamentData from "../../../types/TournamentData";
import TournamentsRowModifier from "./TournamentsRowModifier";

const TournamentsGridUpdater = (tournaments: TournamentData[]) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (data) => {
          // Find the container within the existing grid
          const gridElement = document.querySelector(
            "tournaments-grid ion-grid"
          );

          if (gridElement) {
            // Ensure there's a known target element inside the grid to update (e.g., existing rows)            const targetRowContainer = gridElement.querySelector(".grid-rows");
            const targetRowContainer =
              gridElement.querySelector(".grid-rows.row");

            // Ensure target container exists before proceeding
            if (targetRowContainer) {
              // Clear existing rows in the grid
              while (gridElement.firstChild) {
                gridElement.removeChild(gridElement.firstChild);
              }
              // Render updated tournament rows using React
              const root = ReactDOM.createRoot(targetRowContainer);
              root.render(<TournamentsRowModifier tournaments={data} />);
            } else {
              console.log("Row container not found, skipping updates.");
            }
          } else {
            console.log("Tournament grid not found.");
          }
        },
        args: [tournaments],
      });
    }
  });
};  

export default TournamentsGridUpdater;
