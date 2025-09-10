import React, { useState } from "react";
import Select from "react-select";
import SaveIcon from "@mui/icons-material/Save";
import { STORAGE_KEYS } from "../../config/chrome";

// Helpful: https://mui.com/material-ui/material-icons/?query=ques
//
// import SaveIcon from "@mui/icons-material/Save";
// Maybe for saving settings within the app.

import { Button } from "@mui/material";

import styles from "./TimezoneSelect.module.scss";
import Timezone from "../../types/Timezone";
import { setSyncStorageItem } from "../../services/storageService";

// Dynamically generate timezone options
const timezones = Intl.supportedValuesOf("timeZone");
const timezoneOptions: Timezone[] = timezones.map((tz) => ({
  value: tz,
  label: tz.replace("_", " "),
}));

const TimezoneSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Timezone | null>(
    timezoneOptions[133]
  );

  const handleChange = (option: Timezone | null) => {
    setSelectedOption(option);
    console.log("Selected Timezone:", option?.value);
  };

  const handleClick = async () => {
    await setSyncStorageItem(STORAGE_KEYS.timezone, selectedOption);
    console.log("Timezone saved: ", selectedOption);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      const tabUrl = tabs[0]?.url;
      console.log(tabId, tabUrl);
      if (tabId !== undefined) {
        chrome.tabs.sendMessage(tabId, {
          type: "TIMEZONE_UPDATED",
          payload: selectedOption,
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
