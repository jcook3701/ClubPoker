import fs from "fs";
import path from "path";
import typedocConfig from "../typedoc.json";

// Typedoc output folder
const DOCS_DIR = path.join(__dirname, "../", typedocConfig.out);

// Type for navigation item
interface NavItem {
  title: string;
  url?: string;
  children?: NavItem[];
}

// Add YAML front matter to a Markdown file
function addFrontMatter(filePath: string): void {
  const content = fs.readFileSync(filePath, "utf-8");

  if (content.startsWith("---")) return; // already has front matter

  const title = path.basename(filePath, ".md");
  const frontMatter = `---
title: ${title}
---
`;

  fs.writeFileSync(filePath, frontMatter + content, "utf-8");
}

// Recursively walk through the Typedoc folder and add front matter
function walk(dir: string): void {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".md")) {
      addFrontMatter(fullPath);
    }
  }
}

// Generate navigation.yml for Jekyll
function generateNavigation(dir: string): void {
  const nav: NavItem[] = [];

  function addFolder(folderPath: string, parent: NavItem[]): void {
    const entries = fs.readdirSync(folderPath);

    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const subNav: NavItem[] = [];
        parent.push({ title: entry, children: subNav });
        addFolder(fullPath, subNav);
      } else if (entry.endsWith(".md")) {
        const name = path.basename(entry, ".md");
        parent.push({
          title: name,
          url:
            "/" +
            path
              .relative(DOCS_DIR, fullPath)
              .replace(/\\/g, "/")
              .replace(/\.md$/, ".html"),
        });
      }
    }
  }

  addFolder(dir, nav);

  // Write _data/navigation.yml
  const dataDir = path.join(__dirname, "../_data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  const yamlContent =
    "- title: Auto Docs\n  children: " + JSON.stringify(nav, null, 2);
  fs.writeFileSync(path.join(dataDir, "navigation.yml"), yamlContent, "utf-8");
}

// Run everything
walk(DOCS_DIR);
generateNavigation(DOCS_DIR);
console.log("Front matter injected and navigation.yml generated.");
