/*!
 * .storybook/main.ts for ClubPoker Chrome Extension
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

import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";

// 1. Manually define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-vitest",
    "@storybook/addon-essentials",
  ],
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      esbuild: {
        logOverride: { "this-is-undefined-in-esm": "silent" },
        banner: 'import React from "react";', // Helps with some MUI edge cases
      },
      // 2. Fix the Rollup resolution for MUI directives
      build: {
        rollupOptions: {
          onwarn(warning, warn) {
            if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
            warn(warning);
          },
        },
      },
      resolve: {
        alias: {
          "@/services/messageService": path.resolve(
            __dirname,
            "../src/services/__mocks__/messageService.ts"
          ),
          "@/services/storageService": path.resolve(
            __dirname,
            "../src/services/__mocks__/storageService.ts"
          ),
          // One alias to rule them all (matches your tsconfig)
          "@": path.resolve(__dirname, "../src"),
          "@types": path.resolve(__dirname, "../src/types"),
          "@api": path.resolve(__dirname, "../src/api"),
          "@services": path.resolve(__dirname, "../src/services"),
        },
      },
    });
  },
};

export default config;
