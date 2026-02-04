/*!
 * errors.ts for ClubPoker Chrome Extension
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

import { MessageTypes } from "../constants/messages";

/*
 * Error Codes
 */
export enum ErrorCode {
  emptySyncStorage,
  emptyLocalStorage,
  missingPayload,
}

/*
 * Error Message
 */
export interface ErrorMessage {
  code: ErrorCode;
  origin: MessageTypes;
  timestamp: Date;
}

/*
 * Formats a Error object as a string.
 */
export const formatErrorMessage = (error: ErrorMessage): string => {
  return `[${error.code}] (origin: ${
    error.origin
  }, time: ${error.timestamp.toISOString()})`;
};
