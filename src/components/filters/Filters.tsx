import React from "react";

import styles from "./Filters.module.scss";
import GameFilter from "./game-filter/GameFilter";
import BuyInFilter from "./buy-in-filter/BuyInFilter";

const Filters: React.FC = () => {
  return (
    <div className={styles.filters}>
      <GameFilter />
      <BuyInFilter />
    </div>
  );
};

export default Filters;
