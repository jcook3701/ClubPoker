import { Filter } from "../types/filter";
import styles from "../components/filters/Filters.module.scss";

// Filters
export const BUYINFILTER: Filter = {
  title: "Buy-In Filter:",
  filter: [
    { id: "FREEROLE", label: "FREEROLE" },
    { id: "50", label: "50" },
    { id: "75", label: "75" },
    { id: "200", label: "250" },
    { id: "400", label: "400", defaultChecked: true },
    { id: "500", label: "500", defaultChecked: true },
    { id: "1000", label: "1000", defaultChecked: true },
    { id: "2000", label: "2000", defaultChecked: true },
  ],
  className: styles.buyInFilter,
};

export const GAMEFILTER: Filter = {
  title: "Game Filter:",
  filter: [
    { id: "PL OMAHAHL", label: "PL OmahaHL" },
    { id: "PL OMAHA", label: "PL Omaha" },
    { id: "NL HOLDEM", label: "NL Holdem", defaultChecked: true },
    { id: "PL HOLDEM", label: "PL Holdem" },
    { id: "FL HOLDEM", label: "FL Holdem" },
  ],
  className: styles.gameFilter,
};

export const WPTFILTERS = {
  gameFilter: GAMEFILTER,
  buyInFilter: BUYINFILTER,
};
