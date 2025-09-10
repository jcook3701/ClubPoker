export type FilterState = Record<string, boolean>;
export type AllFilterState = Record<string, FilterState>;

export interface Filter {
  title: string;
  filter: FilterItem[];
  className?: string;
}

export interface FilterItem {
  id: string;
  label: string;
  defaultChecked?: boolean;
}
