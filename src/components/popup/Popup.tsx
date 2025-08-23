import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TimezoneSelect from "../timezone-select/TimezoneSelect";
import Header from "../header/Header";

import styles from "./Popup.module.scss";

const Popup: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [timezone, setTimezone] = useState(
    localStorage.getItem("timezone") || "America/New_York"
  );

  useEffect(() => {
    // This code will run after the component renders
    console.log("Component mounted");
    console.log("styles: ", styles);

    // Cleanup function (optional)
    return () => {
      console.log("Component unmounted");
    };
  }, []); // Empty dependency array means the effect runs once on mount

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setTimezone(event.target.value);
  };

  const handleClick = (): void => {
    // const extraction = extractTournamentData;
    console.log("Save Button");
    //console.log(extraction);
    // injectDataToPage(tournaments);
  };

  // <ThemeProvider />
  return (
    <div className={styles.popup}>
      <Header />
      <TimezoneSelect />
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

export default Popup;
