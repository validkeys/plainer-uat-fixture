// The repo's own typecheck: every script parses (node --check).
const { readdirSync, statSync } = require("node:fs");
const { execFileSync } = require("node:child_process");
const join = require("node:path").join;
const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (entry === ".git" || entry === "node_modules") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".js")) files.push(full);
  }
};
walk(".");
for (const file of files) {
  execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
}
console.log(`typecheck: ${files.length} file(s) parse clean`);
