import React from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

type SaveButtonProps = {
  onClick: () => void;
};

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<SaveIcon />}
      onClick={onClick}
    >
      Save
    </Button>
  );
};

export default SaveButton;
