import Timezone from "./Timezone";
import ViewMode from "./ViewMode";

export interface Tournaments {
  timeZone: Timezone;
  tournaments: Tournament[];
  domViewMode: ViewMode;
  timestamp: Date;
}

export interface Tournament {
  start: string; // ISO 8601
  game: string;
  buyin: string;
  name: string;
  id: string;
  status: string;
  enrolled: number;
}
