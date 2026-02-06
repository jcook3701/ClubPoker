/*!
 * .inject-front-matter.cjs for ClubPoker Chrome Extension
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

const fs = require("fs");
const path = require("path");
const typedocConfig = require("../typedoc.json");

const DOCS_DIR = path.join(__dirname, "../", typedocConfig.out);

// Add YAML front matter to a Markdown file
function addFrontMatter(filePath, parentTitle = null, navOrder = 2) {
  let content = fs.readFileSync(filePath, "utf-8");
  if (content.startsWith("---")) return;

  const title = path.basename(filePath, ".md");
  let frontMatter = `---
title: ${title}
nav_order: ${navOrder}
`;
  if (parentTitle) {
    frontMatter += `parent: ${parentTitle}
`;
  }
  frontMatter += `---
`;

  // Update links to README.md -> folder.md
  content = content.replace(
    /\[([^\]]+)\]\(([^)]+)README\.md\)/g,
    (_, text, link) => {
      return `[${text}](${link}${path.basename(link)})`; // folder/README.md -> folder/folder.md
    }
  );

  fs.writeFileSync(filePath, frontMatter + content, "utf-8");
}

// Walk through directories recursively
function walk(dir, parentTitle = null, depth = 0) {
  const entries = fs.readdirSync(dir);

  let navOrder = 2 + depth;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, path.basename(dir), depth + 1);
    } else if (fullPath.endsWith(".md")) {
      let newFilePath = fullPath;

      // Rename README.md to folder.md
      if (path.basename(fullPath).toLowerCase() === "readme.md") {
        const folderName = path.basename(path.dirname(fullPath));
        const renamedPath = path.join(
          path.dirname(fullPath),
          `${folderName}.md`
        );
        fs.renameSync(fullPath, renamedPath);
        newFilePath = renamedPath;
      }

      addFrontMatter(newFilePath, parentTitle, navOrder);
      navOrder++;
    }
  }
}

walk(DOCS_DIR);
console.log("Front matter injected and links updated for renamed files.");
