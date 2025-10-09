import { Tournament } from "@types";

/*
 * Filter state of all filters
 */
export type FiltersState = Record<string, FilterState>;

/*
 * Filter state of individual filter
 */
export type FilterState = Record<string, boolean>;

/*
 *
 */
export interface Filter {
  title: string;
  filterKey: string;
  filter: FilterItem[];
  filterFn: (tournament: Tournament, values: FilterState) => boolean;
  className?: string;
}

/*
 * Individual Filter Item.
 */
export interface FilterItem {
  id: string;
  label: string;
  defaultChecked?: boolean;
}
