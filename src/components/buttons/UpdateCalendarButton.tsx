import React from "react";
import { Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type UpdateCalendarButtonProps = {
  onClick: () => void;
};

const UpdateCalendarButton: React.FC<UpdateCalendarButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<CalendarMonthIcon />}
      onClick={onClick}
    >
      Update
    </Button>
  );
};

export default UpdateCalendarButton;
