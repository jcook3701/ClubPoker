/*!
 * messageService.ts for ClubPoker Chrome Extension
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

import { Message, MessageMap } from "../constants/messages";
import { ResponseMap } from "../constants/responses";

/*
 * Strongly-typed chrome.runtime.sendMessage wrapper
 */
export const sendMessage = <T extends keyof MessageMap>(
  type: T,
  payload?: MessageMap[T]
): Promise<ResponseMap[T]> => {
  return chrome.runtime.sendMessage({ type, payload } as Message<T>);
};

/*
 * Strongly-typed chrome.tab.sendMessage wrapper
 */
export const sendTabMessage = <T extends keyof MessageMap>(
  tabId: number,
  type: T,
  payload: MessageMap[T]
): Promise<ResponseMap[T]> => {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, { type, payload } as Message<T>, resolve);
  });
};

/*
 * Strongly-typed onMessage wrapper
 */
export const onMessage = <T extends keyof MessageMap>(
  type: T,
  handler: (
    payload: MessageMap[T],
    sender: chrome.runtime.MessageSender
  ) => ResponseMap[T] | Promise<ResponseMap[T]> | void
): (() => void) => {
  const listener = (
    message: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: ResponseMap[T]) => void
  ) => {
    if (message.type === type) {
      try {
        const result = handler(message.payload as MessageMap[T], sender);

        // Support async handlers (returning Promise)
        if (result instanceof Promise) {
          result.then((res) => sendResponse(res));
          return true; // keep channel open for async responses
        } else if (result !== undefined) {
          sendResponse(result);
        }
      } catch (err) {
        console.error(`Error handling message ${type}:`, err);
        sendResponse(undefined); // optional: send empty response on error
      }
      return true;
    }
  };

  chrome.runtime.onMessage.addListener(listener);

  // Return unsubscribe so you can remove listener later if needed
  return () => chrome.runtime.onMessage.removeListener(listener);
};

const messageService = {
  sendMessage,
  sendTabMessage,
  onMessage,
};

export default messageService;
