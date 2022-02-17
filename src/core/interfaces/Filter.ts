export type FilterType = "text" | "number" | "radio" | "selector" | "date";
export type FilterOpt = "$like" | "$nlike" | "$eq" | "$ne";

export interface FilterOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SearchGroup {
  name: string;
  convertHTML?: boolean;
  type: "text" | "number" | "radio" | "selector" | "group" | "date" | "rangeDate" | "checkbox";
  data?: string | number | FilterOption[] | SearchGroup[];
  opt: FilterOpt;
  removeWhenValueIsAll?: boolean;
  className?: string;
}

export interface SearchFieldAttr extends SearchGroup {
  label: string;
  span?: number;
}
