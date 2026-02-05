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

import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import { fileURLToPath } from "url";

// 1. Manually define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },

  addons: ["@storybook/addon-webpack5-compiler-swc"],
  webpackFinal: async (config) => {
    // 1. Ensure config.module and config.module.rules exist
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      });
    }

    // 2. Pro-tip: Add your path aliases here so Storybook can find them too!
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@types": path.resolve(__dirname, "../src/types"),
        "@api": path.resolve(__dirname, "../src/api"),
        "@services": path.resolve(__dirname, "../src/services"),
      };
    }

    return config;
  },
};

export default config;
