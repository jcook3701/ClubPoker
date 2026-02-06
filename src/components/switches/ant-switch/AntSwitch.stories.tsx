/*!
 * AntSwitch.stories.tsx for ClubPoker Chrome Extension
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
import AntSwitch from "./AntSwitch";
import { Stack, Typography } from "@mui/material";

const meta = {
  title: "Components/Switches/AntSwitch",
  component: AntSwitch,
  tags: ["autodocs", "vitest"],
  args: {
    checked: false,
  },
} satisfies Meta<typeof AntSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Basic Off state
export const Off: Story = {
  args: {
    checked: false,
  },
};

// 2. Basic On state
export const On: Story = {
  args: {
    checked: true,
  },
};

// 3. The "Stack" layout from your code comments
export const WithLabels: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Typography>Off</Typography>
      <AntSwitch {...args} />
      <Typography>On</Typography>
    </Stack>
  ),
  args: {
    checked: true,
  },
};
