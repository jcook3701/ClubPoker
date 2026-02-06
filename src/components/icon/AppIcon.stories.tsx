/*!
 * AppIcon.stories.tsx for ClubPoker Chrome Extension
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

import type { Meta, StoryObj } from "@storybook/react";
import AppIcon from "./AppIcon";

const meta = {
  title: "Components/Data Display/AppIcon",
  component: AppIcon,
  tags: ["autodocs", "vitest"],
  argTypes: {
    src: {
      control: "select",
      options: ["icon16.png", "icon48.png", "icon128.png"],
      description: "The specific icon file to display",
    },
    size: {
      control: { type: "range", min: 16, max: 256, step: 8 },
      description: "Pixel width and height",
    },
  },
  args: {
    src: "icon48.png",
    alt: "ClubPoker App Icon",
    size: 48,
  },
} satisfies Meta<typeof AppIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// The standard default view
export const Default: Story = {};

// Specific story for the small toolbar icon
export const Small: Story = {
  args: {
    src: "icon16.png",
    size: 16,
  },
};

// Specific story for the large display icon
export const Large: Story = {
  args: {
    src: "icon128.png",
    size: 128,
  },
};
