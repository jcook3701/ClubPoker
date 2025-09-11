import { MessageTypes } from "../constants/messages";
import { onMessage } from "../services/messageService";
import TournamentData from "../types/TournamentData";
import getTournamentsData from "../utils/scrapers/getTournamentData";

let cachedTournaments: TournamentData[] = [];

const tournamentDataListener = (): void => {
  onMessage(MessageTypes.TOURNAMENTS_UPDATED, (payload) => {
    // TODO: Get Current set timezone if it is set.
    const tournaments: TournamentData[] = getTournamentsData();

    const handleNewData = (data: TournamentData[]) =>
      (cachedTournaments = data);
  });
};

export default tournamentDataListener;
