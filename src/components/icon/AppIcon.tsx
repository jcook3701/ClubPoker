import React from "react";
import icon16 from "../../icons/icon16.png";
import icon48 from "../../icons/icon48.png";
import icon128 from "../../icons/icon128.png";
import { Avatar } from "@mui/material";

interface AppIconProps {
  src: "icon16.png" | "icon48.png" | "icon128.png";
  alt: string;
  size?: number;
}

const AppIcon: React.FC<AppIconProps> = ({ src, alt, size }) => {
  const icons = {
    "icon16.png": icon16,
    "icon48.png": icon48,
    "icon128.png": icon128,
  };

  return (
    <Avatar
      src={icons[src]}
      alt={alt}
      sx={{ width: size ?? 32, height: size ?? 32 }}
      variant="square" // or "circular"
    />
  );
};

export default AppIcon;
