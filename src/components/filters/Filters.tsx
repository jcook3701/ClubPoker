import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Filter from "./Filter/Filter";
import { WptFilterMap } from "../../constants/filters";
import { FiltersState } from "@types";
import styles from "./Filters.module.scss";
import { sendMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";
import SaveButton from "../buttons/SaveButton";
import { useGoogleCalendar } from "../../context/GoogleCalendarContext";

const Filters: React.FC = () => {
  const { setEventsRefresh } = useGoogleCalendar();

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
    sendMessage(MessageTypes.SAVE_FILTERS, { filters: filterState });
    setEventsRefresh(true);
  };

  return (
    <Box className={styles.filterContainer}>
      <Typography variant="subtitle1" noWrap>
        {"Filters:"}
      </Typography>

      <Box className={styles.filters}>
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
      </Box>
      <SaveButton onClick={handleClick} />
    </Box>
  );
};

export default Filters;
