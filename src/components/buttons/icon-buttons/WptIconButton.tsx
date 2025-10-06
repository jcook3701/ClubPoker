import React from "react";
import { Box, IconButton, SxProps, Theme, Tooltip } from "@mui/material";
import AppIcon from "../../icon/AppIcon";

type WptIconButtonProps = {
  title: string;
  link: string;
  sx?: SxProps<Theme>;
};

const WptIconButton: React.FC<WptIconButtonProps> = ({ title, link, sx }) => {
  return (
    <Box sx={sx}>
      <Tooltip title={title} placement="top-start" arrow>
        <IconButton href={link} target="_blank" rel="noopener noreferrer">
          <AppIcon src="icon48.png" alt={title} size={24} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default WptIconButton;
