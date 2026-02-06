/*!
 * createEventListener.ts for ClubPoker Chrome Extension
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

import { createEvent } from "@/api/googleCalendarApi";
import { MessageTypes } from "@/constants/messages";
import { ResponseMap } from "@/constants/responses";
import { WarningCodeMap } from "@/constants/warnings";
import { onMessage, sendMessage } from "@/services/messageService";
import { CalendarEvent, CalendarEvents } from "@types";
import { createWarning } from "@/utils/messages/warnings";

/*
 * Creates Google Calendar Event using the Google Calendar API
 * Returns CalendarEvents
 */
const createEventsListener = (): void => {
  const messageType = MessageTypes.CREATE_EVENT;
  const warningCode = WarningCodeMap.CREATE_EVENT;
  onMessage(messageType, async (payload) => {
    const calendar = payload.calendarData.calendar;
    const events = payload.calendarData.calendarEvents;
    const timestamp = payload.calendarData.timestamp;
    if (calendar) {
      const savedEvents: CalendarEvent[] = await Promise.all(
        events.map((event) => {
          return createEvent(calendar.id, event);
        })
      );

      const resolvedEvents: CalendarEvents = {
        calendar: calendar,
        calendarEvents: savedEvents,
        timestamp: timestamp,
      };
      const response: ResponseMap[typeof messageType] = {
        success: false,
        calendarData: resolvedEvents,
      };
      return response;
    } else {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const response: ResponseMap[typeof messageType] = {
        success: false,
        calendarData: undefined,
      };
      return response;
    }
  });
};

export default createEventsListener;
