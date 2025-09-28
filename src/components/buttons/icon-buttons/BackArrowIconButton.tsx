import React from "react";
import { IconButton, SxProps, Theme, Tooltip } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type BackArrowIconButtonProps = {
  onClick: () => void;
  sx?: SxProps<Theme>;
};

const BackArrowIconButton: React.FC<BackArrowIconButtonProps> = ({
  onClick,
  sx,
}) => {
  return (
    <Tooltip title="back" placement="top-start" arrow>
      <IconButton color="inherit" onClick={onClick} sx={sx}>
        <ArrowBackIosNewIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BackArrowIconButton;
