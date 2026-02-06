/*!
 * __mocks__/storageService.ts for ClubPoker Chrome Extension
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

// Simulated in-memory storage
const store: Record<string, unknown> = {};

export const setSyncStorageItem = async (
  key: string,
  value: unknown
): Promise<void> => {
  store[key] = value;
  console.log(`[Storage Mock] Saved Sync: ${key}`, value);
};

export const getSyncStorageItem = async (key: string) => {
  return store[key] ?? null;
};

export const removeSyncStorageItem = async (key: string) => {
  delete store[key];
};

export const setLocalStorageItem = async (
  key: string,
  value: unknown
): Promise<void> => {
  store[key] = value;
};

export const getLocalStorageItem = async (key: string) => {
  return store[key] ?? null;
};

export const removeLocalStorageItem = async (key: string) => {
  delete store[key];
};

// Session storage can actually use the real browser sessionStorage
export const setSessionStorageItem = async (key: string, value: unknown) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorageItem = async (key: string) => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const storageService = {
  setSyncStorageItem,
  getSyncStorageItem,
  removeSyncStorageItem,
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
  setSessionStorageItem,
  getSessionStorageItem,
};

export default storageService;
