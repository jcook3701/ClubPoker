import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type BackArrowIconButtonProps = {
  onClick: () => void;
};

const BackArrowIconButton: React.FC<BackArrowIconButtonProps> = ({
  onClick,
}) => {
  return (
    <Tooltip title="back" placement="top-start" arrow>
      <IconButton color="inherit" onClick={onClick}>
        <ArrowBackIosNewIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BackArrowIconButton;
