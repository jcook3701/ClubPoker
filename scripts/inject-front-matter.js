// scripts/inject-front-matter.js
const fs = require("fs");
const path = require("path");
const typedocConfig = require("../typedoc.json");

const DOCS_DIR = path.join(__dirname, "../", typedocConfig.out);

// Add YAML front matter
function addFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  if (content.startsWith("---")) return;
  const title = path.basename(filePath, ".md");
  const frontMatter = `---
title: ${title}
---
`;
  fs.writeFileSync(filePath, frontMatter + content, "utf-8");
}

// Walk through directory
function walk(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath);
    else if (fullPath.endsWith(".md")) addFrontMatter(fullPath);
  }
}

walk(DOCS_DIR);
console.log("Front matter injected.");
