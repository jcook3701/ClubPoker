import Timezone from "./Timezone";

export interface Tournaments {
  timeZone: Timezone;
  tournaments: Tournament[];
}

export interface Tournament {
  start: string; // Date-time in string format
  game: string;
  buyin: string;
  name: string;
  id: string;
  status: string;
  enrolled: number;
}
