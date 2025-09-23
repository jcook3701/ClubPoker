import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Filter from "./Filter/Filter";
import { SYNC_STORAGE_KEYS } from "../../config/chrome";
import { WpwFilterMap } from "../../constants/filters";
import {
  getSyncStorageItem,
  setSyncStorageItem,
} from "../../services/storageService";
import { FiltersState } from "../../types/filter";
import styles from "./Filters.module.scss";

const Filters: React.FC = () => {
  const [filterState, setFilterState] = useState<FiltersState>({});

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const saved = await getSyncStorageItem<FiltersState>(
          SYNC_STORAGE_KEYS.filters
        );
        if (saved) {
          setFilterState(saved);
        } else {
          // fallback: build from defaults
          const initial: FiltersState = {};
          Object.values(WpwFilterMap).forEach((group) => {
            initial[group.filterKey] = {};
            group.filter.forEach((opt) => {
              initial[group.filterKey][opt.id] = !!opt.defaultChecked;
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
    filterKey: string,
    updated: Record<string, boolean>
  ) => {
    setFilterState((prev) => {
      const newState = {
        ...prev,
        [filterKey]: {
          ...prev[filterKey],
          ...updated,
        },
      };
      return newState;
    });
  };

  const handleClick = async () => {
    console.log("Update Filter Options");
    await setSyncStorageItem(SYNC_STORAGE_KEYS.filters, filterState);
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Filters:</h3>
      <div className={styles.filters}>
        {Object.values(WpwFilterMap).map((FILTER) => (
          <Filter
            key={FILTER.title} // unique key required by React
            className={FILTER.className}
            title={FILTER.title}
            filters={FILTER.filter}
            checkedState={filterState[FILTER.title] || {}}
            onChange={(updated) =>
              handleFilterUpdate(FILTER.filterKey, updated)
            }
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
