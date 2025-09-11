import React, { useEffect, useState } from "react";
import Select from "react-select";
import SaveIcon from "@mui/icons-material/Save";
import { STORAGE_KEYS } from "../../config/chrome";
import { Button } from "@mui/material";
import styles from "./TimezoneSelect.module.scss";
import Timezone from "../../types/Timezone";
import {
  getSyncStorageItem,
  setSyncStorageItem,
} from "../../services/storageService";
import { sendTabMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";

// Dynamically generate timezone options
const timezones = Intl.supportedValuesOf("timeZone");
const timezoneOptions: Timezone[] = timezones.map((tz) => ({
  value: tz,
  label: tz.replace("_", " "),
}));

const TimezoneSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Timezone | null>(null);

  // Load saved timezone on mount
  useEffect(() => {
    const loadSavedTimezone = async () => {
      const saved = await getSyncStorageItem<Timezone>(STORAGE_KEYS.timezone);
      if (saved) {
        const match = timezoneOptions.find((tz) => tz.value === saved.value);
        if (match) {
          setSelectedOption(match);
        }
      } else {
        // fallback to default (Pacific/Auckland in this case, index 133)
        setSelectedOption(timezoneOptions[133]);
      }
    };
    loadSavedTimezone();
  }, []);

  const handleChange = (option: Timezone | null) => {
    setSelectedOption(option);
    console.log("Selected Timezone:", option?.value);
  };

  const handleClick = async () => {
    await setSyncStorageItem(STORAGE_KEYS.timezone, selectedOption);
    console.log("Timezone saved: ", selectedOption);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId !== undefined) {
        sendTabMessage(tabId, MessageTypes.TIMEZONE_UPDATED, {
          timeZone: selectedOption,
        });
      }
    });
  };

  return (
    <div className={styles.timezoneSelect}>
      <h3>Select Timezone:</h3>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={timezoneOptions}
        placeholder="Choose a timezone"
        isSearchable
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<SaveIcon />}
        onClick={handleClick}
      >
        Save
      </Button>
    </div>
  );
};

export default TimezoneSelect;
