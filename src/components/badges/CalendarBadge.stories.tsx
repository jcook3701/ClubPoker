/*!
 * CalendarBadge.tsx the for ClubPoker Chrome Extension
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
import CalendarBadge from "./CalendarBadge";
import { createMockCalendarEvent } from "@/testing/mockData";

const meta = {
  title: "Components/Data Display/CalendarBadge",
  component: CalendarBadge,
  tags: ["autodocs", "vitest"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    events: [],
  },
} satisfies Meta<typeof CalendarBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Empty State (No badge usually shows for 0)
export const Empty: Story = {
  args: {
    events: [],
  },
};

// 2. Single Event
export const SingleEvent: Story = {
  args: {
    events: [
      createMockCalendarEvent({
        id: "1",
        summary: "ClubWPT Tournament",
      }),
    ],
  },
};

// 3. Many Events (Tests the badge positioning)
export const BusyDay: Story = {
  args: {
    // Generate 12 valid mock events instead of using .fill({ id: "x" })
    events: Array.from({ length: 12 }, (_, i) =>
      createMockCalendarEvent({ id: `event-${i}` })
    ),
  },
};
