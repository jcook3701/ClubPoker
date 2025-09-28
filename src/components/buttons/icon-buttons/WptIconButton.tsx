import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AppIcon from "../../icon/AppIcon";

type WptIconButtonProps = {
  title: string;
  link: string;
};

const WptIconButton: React.FC<WptIconButtonProps> = ({ title, link }) => {
  return (
    <Tooltip title={title} placement="top-start" arrow>
      <IconButton href={link} target="_blank" rel="noopener noreferrer">
        <AppIcon src="icon48.png" alt={title} size={24} />
      </IconButton>
    </Tooltip>
  );
};

export default WptIconButton;
