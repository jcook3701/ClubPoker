import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Filter from "./Filter/Filter";
import { WptFilterMap } from "../../constants/filters";
import { FiltersState } from "../../types/filter";
import styles from "./Filters.module.scss";
import { sendMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";

const Filters: React.FC = () => {
  const [filterState, setFilterState] = useState<FiltersState>({});

  useEffect(() => {
    const loadFilters = async () => {
      try {
        sendMessage(MessageTypes.GET_FILTERS).then((saved) => {
          setFilterState(saved.filters);
        });
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
    sendMessage(MessageTypes.SAVE_FILTERS, { filters: filterState });
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Filters:</h3>
      <div className={styles.filters}>
        {Object.values(WptFilterMap).map((FILTER) => (
          <Filter
            key={FILTER.filterKey} // unique key required by React
            className={FILTER.className}
            title={FILTER.title}
            filters={FILTER.filter}
            checkedState={filterState[FILTER.filterKey] || {}}
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
