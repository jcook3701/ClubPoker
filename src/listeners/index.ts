import getTournamentsListener from "./getTournamentsListener";
import getCalendarListener from "./getCalendarListener";
import saveSettingsListener from "./saveSettingsListener";
import saveTimezoneListener from "./saveTimezoneListener";
import saveTournamentsListener from "./saveTournamentsListener";
import pageReloadListener from "./pageReloadListener";

export const registerContentListeners = (): void => {
  console.log("register context Listeners");
  saveTimezoneListener();
};

export const registerBackgroundListeners = (): void => {
  console.log("register background Listeners");
  getCalendarListener();
  pageReloadListener();
  saveSettingsListener();
  saveTournamentsListener();
  getTournamentsListener();
};
