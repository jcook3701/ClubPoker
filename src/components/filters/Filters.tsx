import React from "react";

import styles from "./Filters.module.scss";
import GameFilter from "./game-filter/GameFilter";
import BuyInFilter from "./buy-in-filter/BuyInFilter";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const Filters: React.FC = () => {
  const handleClick = (): void => {
    console.log("Update Filter Options");
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Filters:</h3>
      <div className={styles.filters}>
        <GameFilter />
        <BuyInFilter />
      </div>
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

export default Filters;
