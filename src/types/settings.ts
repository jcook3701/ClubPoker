export type SettingsState = Record<string, boolean>;
export type AllSettingsState = Record<string, SettingsState>;

export interface Settings {
  theme: string;
}
