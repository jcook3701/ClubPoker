/*!
 * GoogleCalendarUpdater.stories.tsx for ClubPoker Chrome Extension
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
import GoogleCalendarUpdater from "./GoogleCalendarUpdater";

const meta = {
  title: "Components/Pages/GoogleCalendarUpdater",
  component: GoogleCalendarUpdater,
  tags: ["autodocs", "vitest"],
  // No local decorators or render functions needed;
  // handled by preview.tsx and mock messageService.
} satisfies Meta<typeof GoogleCalendarUpdater>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  // If you want to force a loading state, you can mock the
  // message service to never resolve, but for a basic
  // view, the Default story will now show your mock data!
  args: {},
};
