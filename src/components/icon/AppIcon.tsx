/*!
 * AppIcon.tsx for ClubPoker Chrome Extension
 *
 * SPDX-FileCopyrightText: Copyright (c) 2025-2026, Jared Cook
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <www.gnu.org>.
 */

import React from "react";
import icon16 from "@/assets/icons/icon16.png";
import icon48 from "@/assets/icons/icon48.png";
import icon128 from "@/assets/icons/icon128.png";
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
