/*
 * clubWpt app settings
 */
export interface AppSettings {
  theme?: Theme;
  club?: Club;
}

/*
 * Light and Dark mode theme options
 */
export enum Theme {
  lightMode,
  darkMode,
}

/*
 * Map of avaliable poker clubs that this application serves
 */
export const ClubTypes = {
  clubWpt: "Club_WPT",
} as const;

export type ClubType = (typeof ClubTypes)[keyof typeof ClubTypes];

/*
 * Club value label pair for Autocomplete objects
 */
export interface Club {
  value: string;
  label: string;
}

/*
 * Convert to a list of values
 */
export const ClubTypeValues: Club[] = Object.values(ClubTypes).map((club) => {
  return {
    value: club,
    label: club.replace("_", " "),
  };
});

/*
 * Converts Theme enumeration to boolean
 */
export const themeToBool = (theme: Theme | undefined): boolean =>
  theme === Theme.darkMode;

/*
 * Converts boolean to Theme enumeration
 */
export const boolToTheme = (checked: boolean | undefined): Theme =>
  checked ? Theme.darkMode : Theme.lightMode;
