import TournamentData from "../types/TournamentData";

let cachedTournaments: TournamentData[] = [];

const tournamentDataListener = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
): boolean | void => {
  const handleNewData = (data: TournamentData[]) => (cachedTournaments = data);

  if (message.type === "TOURNAMENTS_FOUND") handleNewData(message.data);
  if (message.type === "GET_TOURNAMENTS") sendResponse(cachedTournaments);
};

export default tournamentDataListener;
