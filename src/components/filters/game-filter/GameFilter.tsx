import React, { useState } from "react";

import styles from "./GameFilter.module.scss";
import Filter from "../Filter/Filter";

const gameFilters: Filter[] = [
  { id: "PL OMAHAHL", label: "PL OmahaHL" },
  { id: "PL OMAHA", label: "PL Omaha" },
  { id: "NL HOLDEM", label: "NL Holdem", defaultChecked: true },
  { id: "PL HOLDEM", label: "PL Holdem" },
  { id: "FL HOLDEM", label: "FL Holdem" },
];

const GameFilter: React.FC = () => {
  const title = "Game Filter:";

  return (
    <Filter className={styles.gameFilter} title={title} filters={gameFilters} />
  );
};

export default GameFilter;
