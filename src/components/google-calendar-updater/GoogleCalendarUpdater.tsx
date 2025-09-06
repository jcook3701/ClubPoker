import React, { useEffect, useState } from "react";
import {
  authenticate,
  getToken,
  listCalendars,
} from "../../api/googleCalendarApi";

import { Calendar } from "../../types/calendar";

import styles from "./GoogleCalendarUpdater.module.scss";

const GoogleCalendarUpdater: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<string>("");
  const [reminder, setReminder] = useState("10");

  useEffect(() => {
    getToken().then((storedToken) => {
      if (storedToken) {
        setToken(storedToken);
        setIsAuthed(true);
      }
    });
  }, []);

  useEffect(() => {
    if (token) {
      listCalendars(token).then(setCalendars);
    }
  }, [token]);

  const handleAuth = async () => {
    const t = await authenticate();
    if (t) {
      setToken(t);
      setIsAuthed(true);
    }
  };

  const handleSave = () => {
    chrome.storage.sync.set({
      gcal_calendar: selectedCalendar,
      gcal_reminder: reminder,
    });
    alert("Google Calendar settings saved!");
  };

  return (
    <div className={styles.googleCalendarUpdator}>
      <h3>Google Calender Updater:</h3>
      {!isAuthed ? (
        <button
          onClick={handleAuth}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Connect to Google Calendar
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Choose Calendar</label>
            <select
              value={selectedCalendar}
              onChange={(e) => setSelectedCalendar(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">-- Select a calendar --</option>
              {calendars.map((cal) => (
                <option key={cal.id} value={cal.id}>
                  {cal.summary}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Default Reminder</label>
            <select
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="10">10 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendarUpdater;
