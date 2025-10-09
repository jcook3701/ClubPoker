import { Filter, FilterState } from "@types";
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
    { id: "50 TP", label: "50 TP" },
    { id: "75 TP", label: "75 TP" },
    { id: "250 TP", label: "250 TP" },
    { id: "400 TP", label: "400 TP", defaultChecked: true },
    { id: "500 TP", label: "500 TP", defaultChecked: true },
    { id: "1,000 TP", label: "1000 TP", defaultChecked: true },
    { id: "2,000 TP", label: "2000 TP", defaultChecked: true },
  ],
  filterFn: (tournament, values: FilterState) => {
    const key = tournament.buyin;
    return values[key] === true; // unspecified or false -> filter out
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
    const key = tournament.game;
    return values[key] === true; // unspecified or false -> filter out
  },
  className: styles.gameFilter,
};

/*
 * All filters for club wpt tournaments object
 */
export const WptFilterMap = {
  [FILTER_KEYS.gameFilter]: GAMEFILTER,
  [FILTER_KEYS.buyInFilter]: BUYINFILTER,
};
