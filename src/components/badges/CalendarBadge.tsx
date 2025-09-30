import React from "react";
import { Badge } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CalendarEvent } from "../../types/calendar";

type CalendarBadgeProps = {
  events: CalendarEvent[];
};

const CalendarBadge: React.FC<CalendarBadgeProps> = ({ events }) => {
  const eventCount = events.length;

  return (
    <Badge badgeContent={eventCount} color="primary" overlap="circular">
      <CalendarMonthIcon color="action" />
    </Badge>
  );
};

export default CalendarBadge;
