import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";

type LiveHelpIconButtonProps = {
  link: string;
};

const LiveHelpIconButton: React.FC<LiveHelpIconButtonProps> = ({ link }) => {
  return (
    <Tooltip title="help" placement="top-start" arrow>
      <IconButton
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
      >
        <LiveHelpIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LiveHelpIconButton;
