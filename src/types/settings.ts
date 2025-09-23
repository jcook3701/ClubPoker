export type SettingsState = Record<string, boolean>;
export type AllSettingsState = Record<string, SettingsState>;

export const Theme = {
  lightMode: "LIGHT_MODE",
  darkMode: "DARK_MODE",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export interface Settings {
  theme: Theme;
}
