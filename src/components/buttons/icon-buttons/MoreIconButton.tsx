import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type MoreIconButtonProps = {
  onClick: () => void;
};

const MoreIconButton: React.FC<MoreIconButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="more" placement="top-start" arrow>
      <IconButton color="inherit" onClick={onClick}>
        <MoreVertIcon />
      </IconButton>
    </Tooltip>
  );
};

export default MoreIconButton;
