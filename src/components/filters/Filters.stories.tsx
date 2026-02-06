/*!
 * Filters.stories.tsx for ClubPoker Chrome Extension
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
import Filters from "./Filters";
import { CalendarProvider } from "@/context/GoogleCalendarContext"; // Import your real provider
import { Box } from "@mui/material";

const meta = {
  title: "Components/Pages/Filters",
  component: Filters,
  tags: ["autodocs", "vitest"],
  decorators: [
    (Story) => (
      // 1. Wrap in your Provider so setEventsRefresh doesn't fail
      <CalendarProvider>
        <Box sx={{ width: 320, p: 2, bgcolor: "background.default" }}>
          <Story />
        </Box>
      </CalendarProvider>
    ),
  ],
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
