/*!
 * listCalendarsListener.ts for ClubPoker Chrome Extension
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

import { listCalendars } from "@/api/googleCalendarApi";
import { MessageTypes } from "@/constants/messages";
import { ResponseMap } from "@/constants/responses";
import { WarningCodeMap } from "@/constants/warnings";
import { onMessage, sendMessage } from "@/services/messageService";
import { createWarning } from "@/utils/messages/warnings";

/*
 * Returns Calendars List object from  Google Calendar API
 */
const listCalendarsListener = (): void => {
  const messageType = MessageTypes.LIST_CALENDARS;
  const warningCode = WarningCodeMap.LIST_CALENDARS;
  onMessage(messageType, async () => {
    const calendars = await listCalendars();
    if (!calendars) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    const resolvedCalendars = calendars;
    // console.log("Resolved Calendars: ", resolvedCalendars);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendars: resolvedCalendars,
    };
    return response;
  });
};

export default listCalendarsListener;
