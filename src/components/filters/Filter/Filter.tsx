import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

import styles from "./Filter.module.scss";
import { Checkbox } from "@mui/material";

type Filter = {
  id: string;
  label: string;
  defaultChecked?: boolean;
};

type FilterProps = {
  title: string;
  filters: Filter[];
  className?: string;
  onChange?: string;
};

const Filter: React.FC<FilterProps> = ({
  title,
  filters,
  className,
  onChange,
}) => {
  const defaultState = filters.reduce<Record<string, boolean>>((acc, opt) => {
    acc[opt.id] = opt.defaultChecked ?? false;
    return acc;
  }, {});

  const [checkedItems, setCheckedItems] = useState(defaultState);

  const handleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: e.target.checked,
      }));
    };

  return (
    <div className={`${styles.filter} ${className ?? ""}`}>
      <h3>{title}</h3>
      {filters.map((opt) => (
        <FormControlLabel
          key={opt.id}
          control={
            <Checkbox
              checked={checkedItems[opt.id]}
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
