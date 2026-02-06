/*!
 * WptIconButton.stories.tsx for ClubPoker Chrome Extension
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
import { Box } from "@mui/material";
import WptIconButton from "./WptIconButton";

const meta = {
  title: "Components/Buttons/Icons/Wpt",
  component: WptIconButton,
  tags: ["autodocs", "vitest"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    title: "ClubWPT",
    link: "https://www.clubwpt.com",
  },
} satisfies Meta<typeof WptIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomStyle: Story = {
  args: {
    sx: {
      border: "1px solid",
      borderColor: "divider",
      borderRadius: "50%",
    },
  },
};
