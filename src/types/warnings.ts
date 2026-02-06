/*!
 * warnings.ts for ClubPoker Chrome Extension
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

/*
 * Warning Codes
 */
export enum WarningCode {
  emptySyncStorage,
  emptyLocalStorage,
  missingPayload,
  googleCalendar,
}

/*
 * Warning Message
 */
export interface WarningMessage {
  code: WarningCode;
  origin: MessageTypes;
  timestamp: Date;
}

/*
 * Formats a Warning object as a string.
 */
export const formatWarningMessage = (warning: WarningMessage): string => {
  return `[${warning.code}] (origin: ${
    warning.origin
  }, time: ${warning.timestamp.toISOString()})`;
};
