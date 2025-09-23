import getTournamentsListener from "./getTournamentsListener";
import getCalendarListener from "./getCalendarListener";
import saveSettingsListener from "./saveSettingsListener";
import saveTimezoneListener from "./saveTimezoneListener";
import saveTournamentsListener from "./saveTournamentsListener";
import pageReloadListener from "./pageReloadListener";
import getCalendarEventsListener from "./getCalendarEventsListener";
import saveCalendarListener from "./saveCalendarListener";
import saveCalendarEventsListener from "./saveCalendarEventsListener";
import getSettingsListener from "./getSettingsListener";
import getFiltersListener from "./getFiltersListener";
import getTimezoneListener from "./getTimezoneListener";
import saveFiltersListener from "./saveFiltersListener";
import timezoneChangeListener from "./timezoneChangeListener";
import errorListener from "./errorListener";
import warningListener from "./warningListener";
import settingsChangeListener from "./settingsChangeListener";

/*
 * Listeners to register in the context script.
 */
export const registerContentListeners = (): void => {
  console.log("register context Listeners");
  /* event listeners */
  timezoneChangeListener();
};

/*
 * Listeners to register in the background script.
 */
export const registerBackgroundListeners = (): void => {
  console.log("register background Listeners");
  /* event listeners */
  pageReloadListener();
  settingsChangeListener();
  errorListener();
  warningListener();

  /* chrome.sync storage listeners */
  getCalendarListener();
  getFiltersListener();
  getSettingsListener();
  getTimezoneListener();

  saveCalendarListener();
  saveFiltersListener();
  saveSettingsListener();
  saveTimezoneListener();
  /* chrome.local storage listeners */
  getCalendarEventsListener();
  getTournamentsListener();

  saveCalendarEventsListener();
  saveTournamentsListener();
};
