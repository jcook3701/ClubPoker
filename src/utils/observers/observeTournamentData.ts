import TournamentData from "../../types/TournamentData";
import getTournamentsData from "../scrapers/getTournamentData";

const observeTournamentData = (
  callback: (data: TournamentData[]) => void
): void => {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver(() => {
    const tournaments = getTournamentsData();
    if (tournaments.length > 0) {
      callback(tournaments);
    }
  });

  observer.observe(targetNode, config);
};

export default observeTournamentData;
