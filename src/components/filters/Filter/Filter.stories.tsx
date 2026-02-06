/*!
 * Filter.stories.tsx for ClubPoker Chrome Extension
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
import Filter from "./Filter";

const meta = {
  title: "Components/Inputs/Filter",
  component: Filter,
  tags: ["autodocs", "vitest"],
  args: {
    title: "Game Types",
    filters: [
      { id: "nlh", label: "No Limit Hold'em", defaultChecked: true },
      { id: "plo", label: "Pot Limit Omaha", defaultChecked: false },
      { id: "tourney", label: "Tournaments", defaultChecked: true },
    ],
    checkedState: { nlh: true, tourney: true },
    // Use the Vitest-powered spy to fix the 'onChange' lint warning
    onChange: fn(),
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Standard View
export const Default: Story = {};

// 2. All Checked
export const AllChecked: Story = {
  args: {
    title: "All Selected",
    checkedState: { nlh: true, plo: true, tourney: true },
  },
};

// 3. Custom Class (Testing Scss Module integration)
export const CustomClass: Story = {
  args: {
    className: "custom-filter-border",
  },
};
