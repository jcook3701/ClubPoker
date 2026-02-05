/*!
 * WindowSelector.stories.tsx for ClubPoker Chrome Extension
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
import WindowSelector from "./WindowSelector";

const meta = {
  title: "Components/WindowSelector",
  component: WindowSelector,
  argTypes: {
    selectedWindow: {
      control: "inline-radio",
      options: ["timezone", "filter", "calendar"],
      description: "The currently active tab/window",
    },
    onChange: { action: "window-changed" }, // Automatically logs the change in the Actions tab
  },
  args: {
    selectedWindow: "timezone",
  },
} satisfies Meta<typeof WindowSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. The default view (Timezone)
export const Timezone: Story = {};

// 2. The Filter view
export const FilterView: Story = {
  args: {
    selectedWindow: "filter",
  },
};

// 3. The Calendar view
export const CalendarView: Story = {
  args: {
    selectedWindow: "calendar",
  },
};
