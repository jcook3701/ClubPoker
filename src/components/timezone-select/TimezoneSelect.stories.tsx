/*!
 * TimezoneSelect.stories.tsx for ClubPoker Chrome Extension
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
import { userEvent, within } from "@storybook/test";
import TimezoneSelect from "./TimezoneSelect";

const meta = {
  title: "Components/Inputs/TimezoneSelect",
  component: TimezoneSelect,
  tags: ["autodocs", "vitest"],
  parameters: {
    // Add a bit of width so the Autocomplete doesn't look squashed
    layout: "centered",
  },
} satisfies Meta<typeof TimezoneSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // You can test the Autocomplete interaction here
    const input = canvas.getByLabelText(/Timezone/i);
    await userEvent.type(input, "New York");
  },
};
