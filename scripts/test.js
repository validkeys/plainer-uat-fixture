// The repo's own test: behavioral assertions over the fixture content.
const { readFileSync, existsSync } = require("node:fs");
if (!existsSync("NOTES.md")) {
  throw new Error("test: NOTES.md is missing — every change must keep it");
}
const notes = readFileSync("NOTES.md", "utf8");
if (!notes.includes("Real checks marker: keep this line")) {
  throw new Error("test: NOTES.md lost the 'Real checks marker: keep this line' line — the marker is load-bearing");
}
if (!/## Loop notes/.test(notes)) {
  throw new Error("test: NOTES.md lost the '## Loop notes' section heading");
}
console.log("test: NOTES.md invariants hold");
