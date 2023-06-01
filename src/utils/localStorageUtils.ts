import { UserSettings } from "@/types/UserSettings";

export const saveSettings = (settings: UserSettings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const getSettings = (): UserSettings | null => {
  const settingsString = localStorage.getItem("settings");
  return settingsString ? JSON.parse(settingsString) : null;
};

export const clearSettings = () => {
  localStorage.removeItem("settings");
};
