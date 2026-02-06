/*!
 * getCalendarEventsListener.ts for ClubPoker Chrome Extension
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

import { StorageMap } from "@/constants/chromeStorage";
import { MessageTypes } from "@/constants/messages";
import { ResponseMap } from "@/constants/responses";
import { WarningCodeMap } from "@/constants/warnings";
import { onMessage, sendMessage } from "@/services/messageService";
import { getLocalStorageItem } from "@/services/storageService";
import { CalendarEvents } from "@types";
import { createWarning } from "@/utils/messages/warnings";

/*
 * Returns filtered CalendarEvents object from chrome.local storage.
 */
const getCalendarEventsListener = (): void => {
  const messageType = MessageTypes.GET_CALENDAR_EVENTS;
  const warningCode = WarningCodeMap.GET_CALENDAR_EVENTS;
  const storageKey = StorageMap.GET_CALENDAR_EVENTS;
  onMessage(messageType, async () => {
    const events = await getLocalStorageItem<CalendarEvents>(storageKey);
    if (!events) {
      await sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendarData: events,
    };
    return response;
  });
};

export default getCalendarEventsListener;
