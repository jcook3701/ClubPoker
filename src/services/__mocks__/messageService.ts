/*!
 * __mocks__/messageService.ts for ClubPoker Chrome Extension
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

import { MessageTypes } from "@/constants/messages";
import { MOCK_CALENDAR, createMockCalendarEvent } from "@/testing/mockData";

export const sendMessage = async (
  type: string,
  payload?: unknown
): Promise<unknown> => {
  console.log(`[Storybook Mock] sendMessage called: ${type}`, payload);

  switch (type) {
    case MessageTypes.GET_CALENDAR:
      return { calendar: MOCK_CALENDAR };

    case MessageTypes.LIST_CALENDARS:
      return {
        calendars: [MOCK_CALENDAR, { id: "personal", summary: "Personal" }],
      };

    case MessageTypes.FETCH_CALENDAR_EVENTS:
      // Return empty to simulate a clean calendar we can add to
      return { calendarData: { calendarEvents: [] } };

    case MessageTypes.GET_CALENDAR_EVENTS:
      // These are the "Poker Tournaments" that appear in your list
      return {
        calendarData: {
          calendarEvents: [
            createMockCalendarEvent({
              summary: "Nightly $500 GTD",
              description: "Buy-in: 500 TP",
            }),
            createMockCalendarEvent({
              summary: "WPT 10k Saturday",
              description: "Buy-in: 1000 TP",
            }),
            createMockCalendarEvent({
              summary: "Turbo Tuesday",
              description: "Buy-in: 200 TP",
            }),
          ],
        },
      };

    case MessageTypes.GET_FILTERS:
      return {
        filters: {
          gameType: { nlh: true, plo: false },
          buyin: { free: true, points: true },
        },
      };

    case MessageTypes.SAVE_FILTERS:
    case MessageTypes.SAVE_TIMEZONE:
    case MessageTypes.SAVE_CALENDAR: // Added this case for your CalendarProvider
    case MessageTypes.CREATE_EVENT: // Added this case for your handleCreateEvents
      return { success: true };

    case MessageTypes.GET_TIMEZONE:
      return {
        timezone: { value: "America/New_York", label: "America/New York" },
      };

    default:
      return null;
  }
};

export const sendTabMessage = async () => {};
export const onMessage = () => () => {};

const messageService = {
  sendMessage,
  sendTabMessage,
  onMessage,
};

export default messageService;
