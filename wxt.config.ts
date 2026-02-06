/*!
 * wxt.config.ts for ClubPoker Chrome Extension
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

import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  vite: () => ({
    plugins: [react(), tsconfigPaths()],
    build: {
      chunkSizeWarningLimit: 1000,
    },
  }),
  manifest: {
    name: "ClubPoker",
    description:
      "This is a Chrome extension for clubwpt.com. Offers the ability to modify page timezone and save tournaments to Google Calendar.",
    permissions: ["identity", "storage"],
    // Keep your specific key for identity/OAuth stability
    key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnc18UA0sDRR3OqfTZbB9AG9kQy9vPVacmW+Rvx/Yk7oO6Tabumvc5EsyyBVKFCGS6zrOKcDQB6z9ImaQe31DvBGaNx31NaY8mALhQFJAY9RsXNt1IG1FWzO+8V2xDJFSZFgufchwx7k5nWeTZJRN7sZ6EluLdpDd8HATPG4yatwFmtrgwMUBFIq9f3zDK9DWZ/qDmayrHln7kyjqbNswgZuHDrqmTV12HLMEmCAbYr3ZWMPW/bAU4HjiXOo6Bb68kIynXnj8w+rpTsw52vgz0XIQYLtJBYb+xLiAVh14KMxV0+nQfJTc8p87QE1mzOxUeP0vSwHc+qVKbnlcovpWzwIDAQAB",
    oauth2: {
      client_id:
        "643848225094-6vo6fa1grd1he703fl6cmcha71l53m81.apps.googleusercontent.com",
      scopes: ["https://www.googleapis.com/auth/calendar"],
    },
    icons: {
      "16": "icon/icon16.png",
      "48": "icon/icon48.png",
      "128": "icon/icon128.png",
    },
  },
});
