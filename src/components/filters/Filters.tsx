import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Filter from "./Filter/Filter";
import { STORAGE_KEYS } from "../../config/chrome";
import { WPTFILTERS } from "../../config/filters";
import {
  getSyncStorageItem,
  setSyncStorageItem,
} from "../../services/storageService";
import { AllFilterState } from "../../types/filter";
import styles from "./Filters.module.scss";

const Filters: React.FC = () => {
  const [filterState, setFilterState] = useState<AllFilterState>({});

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const saved = await getSyncStorageItem<AllFilterState>(
          STORAGE_KEYS.filters
        );
        if (saved) {
          setFilterState(saved);
        } else {
          // fallback: build from defaults
          const initial: AllFilterState = {};
          Object.values(WPTFILTERS).forEach((group) => {
            initial[group.title] = {};
            group.filter.forEach((opt) => {
              initial[group.title][opt.id] = !!opt.defaultChecked;
            });
          });
          setFilterState(initial);
        }
      } catch (err) {
        console.error("Error loading filter state:", err);
      }
    };

    loadFilters();
  }, []);

  const handleFilterUpdate = async (
    groupTitle: string,
    updated: Record<string, boolean>
  ) => {
    setFilterState((prev) => {
      const newState = {
        ...prev,
        [groupTitle]: {
          ...prev[groupTitle],
          ...updated,
        },
      };
      return newState;
    });
  };

  const handleClick = async () => {
    console.log("Update Filter Options");
    await setSyncStorageItem(STORAGE_KEYS.filters, filterState);
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Filters:</h3>
      <div className={styles.filters}>
        {Object.values(WPTFILTERS).map((FILTER) => (
          <Filter
            key={FILTER.title} // unique key required by React
            className={FILTER.className}
            title={FILTER.title}
            filters={FILTER.filter}
            checkedState={filterState[FILTER.title] || {}}
            onChange={(updated) => handleFilterUpdate(FILTER.title, updated)}
          />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        endIcon={<SaveIcon />}
        onClick={handleClick}
      >
        Save
      </Button>
    </div>
  );
};

export default Filters;
