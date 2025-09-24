import { WptFilterMap } from "../../constants/filters";
import { FiltersState } from "../../types/filter";
import { Tournament, Tournaments } from "../../types/tournament";

/*
 * Builds the default filtersState
 */
export const buildDefaultFilters = (): FiltersState => {
  return Object.values(WptFilterMap).reduce<FiltersState>(
    (acc, group) => ({
      ...acc,
      [group.filterKey]: group.filter.reduce<Record<string, boolean>>(
        (gAcc, opt) => ({ ...gAcc, [opt.id]: !!opt.defaultChecked }),
        {}
      ),
    }),
    {}
  );
};

/*
 *
 */
export function applyTournamentFilters(
  data: Tournaments,
  filterState: FiltersState
): Tournaments {
  const filtered = data.tournaments.filter((t: Tournament) =>
    Object.values(WptFilterMap).every((filter) => {
      if (!filter.filterFn) return true;
      return filter.filterFn(t, filterState[filter.filterKey] || {});
    })
  );

  return {
    ...data,
    tournaments: filtered,
  };
}

/*
            const initial: FiltersState = {};
		  Object.values(WpwFilterMap).forEach((group) => {
			initial[group.filterKey] = {};
			group.filter.forEach((opt) => {
			  initial[group.filterKey][opt.id] = !!opt.defaultChecked;
			});
		  });
*/
