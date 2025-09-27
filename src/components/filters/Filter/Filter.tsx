import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./Filter.module.scss";
import { Checkbox } from "@mui/material";
import { FilterState, FilterItem } from "../../../types/filter";

type FilterProps = {
  title: string;
  filters: FilterItem[];
  checkedState: FilterState;
  className?: string;
  onChange?: (filterState: Record<string, boolean>) => void;
};

const Filter: React.FC<FilterProps> = ({
  title,
  filters,
  checkedState,
  className,
  onChange,
}) => {
  const handleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({ [id]: e.target.checked });
    };

  return (
    <div className={`${styles.filter} ${className ?? ""}`}>
      <h3>{title}</h3>
      {filters.map((opt) => (
        <FormControlLabel
          key={opt.id}
          control={
            <Checkbox
              checked={checkedState[opt.id] ?? !!opt.defaultChecked}
              onChange={handleChange(opt.id)}
            />
          }
          label={opt.label}
        />
      ))}
    </div>
  );
};

export default Filter;
