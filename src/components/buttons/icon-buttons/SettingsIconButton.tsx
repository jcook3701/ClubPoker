import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

type SettingsIconButtonProps = {
  onClick: () => void;
};

const SettingsIconButton: React.FC<SettingsIconButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="settings" placement="top-start" arrow>
      <IconButton color="inherit" onClick={onClick}>
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SettingsIconButton;
