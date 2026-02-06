/*!
 * Header.stories.tsx for ClubPoker Chrome Extension
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
import Header from "./Header";

const meta = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs", "vitest"],
  // Industry Standard: Provide global defaults for the component's props
  args: {
    title: "ClubWPT Poker",
    settingsSelected: false,
    setSettingsSelected: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SettingsActive: Story = {
  args: {
    settingsSelected: true,
  },
};

// Test specific for interaction
export const Interaction: Story = {
  play: async ({ _args, _canvasElement, _step }) => {
    // This allows you to write actual Vitest tests for the Header toggle
    // inside Storybook!
  },
};
