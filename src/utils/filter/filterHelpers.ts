import { WptFilterMap } from "../../constants/filters";
import { FiltersState, Tournament, Tournaments } from "@types";

/*
 * Builds the default FiltersState for the very first run.
 * Ensures every filter option has an explicit boolean value.
 */
export const buildDefaultFilters = (): FiltersState => {
  return Object.values(WptFilterMap).reduce<FiltersState>((acc, group) => {
    const groupState = group.filter.reduce<Record<string, boolean>>(
      (gAcc, opt) => {
        gAcc[opt.id] = !!opt.defaultChecked; // true if defaultChecked, else false
        return gAcc;
      },
      {}
    );

    return {
      ...acc,
      [group.filterKey]: groupState,
    };
  }, {});
};

/*
 * This returns a list of filtered tournenets
 */
export const applyTournamentFilters = (
  data: Tournaments,
  filterState: FiltersState
): Tournaments => {
  const filtered = data.tournaments.filter((t: Tournament) =>
    Object.values(WptFilterMap).every((filter) => {
      if (!filter.filterFn) return true;
      const groupState = filterState[filter.filterKey] || {};
      return filter.filterFn(t, groupState);
    })
  );

  return {
    ...data,
    tournaments: filtered,
  };
};
