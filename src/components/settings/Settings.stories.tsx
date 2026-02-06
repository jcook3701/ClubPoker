/*!
 * Settings.stories.tsx for ClubPoker Chrome Extension
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
import Settings from "./Settings";
import { createMockSettings } from "@/testing/mockData";
import { ThemeMode } from "@/constants/settings";

const meta = {
  title: "Components/Pages/Settings",
  component: Settings,
  tags: ["autodocs", "vitest"],
  args: {
    // 1. Initial state from your factory
    settings: createMockSettings(),
    settingsSelected: true,
    // 2. Mocking the React state setters
    setSettings: fn(),
    setSettingsSelected: fn(),
  },
} satisfies Meta<typeof Settings>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Standard Dark Mode view
export const Default: Story = {};

// 2. Light Mode view
export const LightMode: Story = {
  args: {
    settings: createMockSettings({ theme: ThemeMode.lightMode }),
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

// 3. The "Save" Interaction
/*
export const SaveAction: Story = {
  args: {
    settings: createMockSettings({ name: "Testing Save" } as any),
  },
  play: async ({ canvasElement }) => {
    // You can click the save button here and verify the mock log in console
    console.log(
      "Tip: Click 'Save' to see the [Storybook Mock] log in the terminal"
    );
  },
};
*/
