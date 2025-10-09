import { AppSettings, Club, ClubTypeValues, ThemeMode } from "@types";

const DEFAULT_THEME = ThemeMode.lightMode;
const DEFAULT_CLUB: Club = ClubTypeValues[0];

/*
 * Default Settings object
 */
export const DEFAULT_SETTINGS: AppSettings = {
  theme: DEFAULT_THEME,
  club: DEFAULT_CLUB,
};
