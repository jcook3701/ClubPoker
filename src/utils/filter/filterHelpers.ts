import { WpwFilterMap } from "../../constants/filters";
import { FiltersState } from "../../types/filter";
import { Tournament, Tournaments } from "../../types/tournament";

export function applyTournamentFilters(
  data: Tournaments,
  filterState: FiltersState
): Tournaments {
  const filtered = data.tournaments.filter((t: Tournament) =>
    Object.values(WpwFilterMap).every((filter) => {
      if (!filter.filterFn) return true;
      return filter.filterFn(t, filterState[filter.filterKey] || {});
    })
  );

  return {
    ...data,
    tournaments: filtered,
  };
}
