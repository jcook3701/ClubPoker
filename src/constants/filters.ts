import { Filter, FilterState } from "../types/filter";
import styles from "../components/filters/Filters.module.scss";
import { FILTER_KEYS } from "../config/chrome";

/*
 * Buy-In Filter Constants
 */
const BUYINFILTER: Filter = {
  title: "Buy-In Filter:",
  filterKey: FILTER_KEYS.buyInFilter,
  filter: [
    { id: "FREEROLE", label: "FREEROLE" },
    { id: "50", label: "50" },
    { id: "75", label: "75" },
    { id: "250", label: "250" },
    { id: "400", label: "400", defaultChecked: true },
    { id: "500", label: "500", defaultChecked: true },
    { id: "1000", label: "1000", defaultChecked: true },
    { id: "2000", label: "2000", defaultChecked: true },
  ],
  filterFn: (tournament, values: FilterState) => {
    return values[tournament.buyin] ?? false;
  },
  className: styles.buyInFilter,
};

/*
 * Game Filter Constants
 */
const GAMEFILTER: Filter = {
  title: "Game Filter:",
  filterKey: FILTER_KEYS.gameFilter,
  filter: [
    { id: "PL OMAHAHL", label: "PL OmahaHL" },
    { id: "PL OMAHA", label: "PL Omaha" },
    { id: "NL HOLDEM", label: "NL Holdem", defaultChecked: true },
    { id: "PL HOLDEM", label: "PL Holdem" },
    { id: "FL HOLDEM", label: "FL Holdem" },
  ],
  filterFn: (tournament, values: FilterState) => {
    return values[tournament.game] ?? false;
  },
  className: styles.gameFilter,
};

/*
 * All filters for club wpt tournaments object
 */
export const WpwFilterMap = {
  [FILTER_KEYS.gameFilter]: GAMEFILTER,
  [FILTER_KEYS.buyInFilter]: BUYINFILTER,
};
