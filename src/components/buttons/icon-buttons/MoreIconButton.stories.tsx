/*!
 * MoreIconButton.stories.tsx for ClubPoker Chrome Extension
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
import MoreIconButton from "./MoreIconButton";

const meta = {
  title: "Components/Buttons/Icons/More",
  component: MoreIconButton,
  tags: ["autodocs", "vitest"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof MoreIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Useful if you want to test how it looks in a header/app bar context
export const HeaderContext: Story = {
  decorators: [
    (Story) => (
      <Box
        sx={{
          bgcolor: "primary.main",
          p: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
