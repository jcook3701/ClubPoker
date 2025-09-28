/*
 * clubWpt app settings
 */
export interface AppSettings {
  theme?: ThemeMode;
  club?: Club;
}

/*
 * Light and Dark mode theme options
 */
export enum ThemeMode {
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
export const themeToBool = (theme: ThemeMode | undefined): boolean =>
  theme === ThemeMode.darkMode;

/*
 * Converts boolean to Theme enumeration
 */
export const boolToTheme = (checked: boolean | undefined): ThemeMode =>
  checked ? ThemeMode.darkMode : ThemeMode.lightMode;
