import React from "react";
import icon16 from "../../icons/icon16.png";
import icon48 from "../../icons/icon48.png";
import icon128 from "../../icons/icon128.png";

interface IconProps {
  src: "icon16.png" | "icon48.png" | "icon128.png";
  alt: string;
  className?: string;
}

const icons = {
  "icon16.png": icon16,
  "icon48.png": icon48,
  "icon128.png": icon128,
};

const Icon: React.FC<IconProps> = ({ src, alt, className }) => {
  return <img src={icons[src]} alt={alt} className={className} />;
};

export default Icon;
