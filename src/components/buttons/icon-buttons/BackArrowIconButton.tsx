import React from "react";
import { Box, IconButton, SxProps, Theme, Tooltip } from "@mui/material";
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
    <Box sx={sx}>
      <Tooltip title="back" placement="top-start" arrow>
        <IconButton color="inherit" onClick={onClick}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BackArrowIconButton;
