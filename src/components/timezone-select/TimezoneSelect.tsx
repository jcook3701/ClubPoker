import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import styles from "./TimezoneSelect.module.scss";
import Timezone from "../../types/Timezone";
import { sendMessage, sendTabMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";
import SaveButton from "../buttons/SaveButton";

// Dynamically generate timezone options
const timezones = Intl.supportedValuesOf("timeZone");
const timezoneOptions: Timezone[] = timezones.map((tz) => ({
  value: tz,
  label: tz.replace("_", " "),
}));

const TimezoneSelect: React.FC = () => {
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(
    null
  );

  // Load saved timezone on mount
  useEffect(() => {
    const loadSavedTimezone = async () => {
      const saved = await sendMessage(MessageTypes.GET_TIMEZONE);
      if (saved) {
        console.log("Timezone Select: ", saved);
        const match = timezoneOptions.find(
          (tz) => tz.value === saved.timezone.value
        );
        if (match) {
          setSelectedTimezone(match);
        }
      } else {
        // fallback to default (America/Los_Angeles in this case, index 133)
        setSelectedTimezone(timezoneOptions[133]);
      }
    };
    loadSavedTimezone();
  }, []);

  const handleSelectChange = (
    _event: React.SyntheticEvent,
    option: Timezone | null
  ) => {
    setSelectedTimezone(option);
    console.log("Selected Timezone:", option?.value);
  };

  const handleClick = async () => {
    if (selectedTimezone) {
      sendMessage(MessageTypes.SAVE_TIMEZONE, {
        timeZone: selectedTimezone,
      });
    }
    // await setSyncStorageItem(SYNC_STORAGE_KEYS.timezone, selectedTimezone);
    console.log("Timezone saved: ", selectedTimezone);

    /*
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId !== undefined) {
        sendTabMessage(tabId, MessageTypes.SAVE_TIMEZONE, {
          timeZone: selectedTimezone,
        });
      }
    });
    */
  };

  return (
    <Box className={styles.timezoneSelect}>
      <Typography variant="subtitle1" noWrap>
        {"Select Timezone:"}
      </Typography>

      <Autocomplete
        options={timezoneOptions}
        value={selectedTimezone}
        onChange={handleSelectChange}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Timezone" variant="outlined" />
        )}
        fullWidth
      />
      <SaveButton onClick={handleClick} />
    </Box>
  );
};

export default TimezoneSelect;
