import React, { useState } from "react";
import Select from "react-select";
import UpdateIcon from "@mui/icons-material/Update";

// Helpful: https://mui.com/material-ui/material-icons/?query=ques
//
// import SaveIcon from "@mui/icons-material/Save";
// Maybe for saving settings within the app.

import { Button } from "@mui/material";

import styles from "./TimezoneSelect.module.scss";
import Timezone from "../../types/Timezone";
import getTournamentsData from "../../utils/scrapers/getTournamentData";

// Dynamically generate timezone options
const timezones = Intl.supportedValuesOf("timeZone");
const timezoneOptions: Timezone[] = timezones.map((tz) => ({
  value: tz,
  label: tz.replace("_", " "),
}));

const TimezoneSelect: React.FC = () => {
  const [timezone, setTimezone] = useState<string>(
    localStorage.getItem("timezone") || "America/Los_Angeles"
  );

  const [selectedOption, setSelectedOption] = useState<Timezone | null>(
    timezoneOptions[133]
  );

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setTimezone(event.target.value);
  };

  const handleChange = (option: Timezone | null) => {
    setSelectedOption(option);
    // onChange(option?.value);
    console.log("Selected Timezone:", option?.value);
    // Trigger logic for the selected timezone if needed
  };

  const handleClick = (): void => {
    // const extraction = extractTournamentData;
    console.log("Update Time");
    const tournaments = getTournamentsData();
    console.log("scraped tournaments: ", tournaments);
    //console.log(extraction);
    // injectDataToPage(tournaments);
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
        endIcon={<UpdateIcon />}
        onClick={handleClick}
      >
        Update
      </Button>
    </div>
  );
};

export default TimezoneSelect;
