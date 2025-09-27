export type SettingsState = Record<string, boolean>;
export type AllSettingsState = Record<string, SettingsState>;

/*
 * clubWpt app settings
 */
export interface Settings {
  theme: Theme;
}

/*
 * Light and Dark mode theme options
 */
export enum Theme {
  lightMode,
  darkMode,
}

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
