import React, { useState } from "react";

import styles from "./BuyInFilter.module.scss";
import Filter from "../Filter/Filter";

const buyInFilters: Filter[] = [
  { id: "FREEROLE", label: "FREEROLE" },
  { id: "50", label: "50" },
  { id: "75", label: "75" },
  { id: "200", label: "200" },
  { id: "400", label: "400", defaultChecked: true },
  { id: "500", label: "500", defaultChecked: true },
  { id: "1000", label: "1000", defaultChecked: true },
  { id: "2000", label: "2000", defaultChecked: true },
];

const BuyInFilter: React.FC = () => {
  const title = "Buy-In Filter:";

  return (
    <Filter
      className={styles.buyInFilter}
      title={title}
      filters={buyInFilters}
    />
  );
};

export default BuyInFilter;
