/*!
 * UpdateCalendarButton.stories.tsx for ClubPoker Chrome Extension
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
import { fn } from "@storybook/test";
import { Box } from "@mui/material";
import UpdateCalendarButton from "./UpdateCalendarButton";

const meta = {
  title: "Components/Buttons/Action/UpdateCalendar",
  component: UpdateCalendarButton,
  tags: ["autodocs", "vitest"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    // This 'fn' is now your Vitest-powered spy
    onClick: fn(),
  },
} satisfies Meta<typeof UpdateCalendarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Helpful to see how it looks if it were placed in a dense layout
export const Small: Story = {
  render: (args) => (
    <Box sx={{ width: 150 }}>
      <UpdateCalendarButton {...args} />
    </Box>
  ),
};
