// The repo's own check: manifest invariants.
const { readFileSync } = require("node:fs");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
if (typeof pkg.name !== "string" || pkg.name.length === 0) {
  throw new Error("check: package.json carries no name");
}
for (const [name, command] of Object.entries(pkg.scripts || {})) {
  if (typeof command !== "string" || command.trim() === "") {
    throw new Error(`check: script "${name}" is not a non-empty command`);
  }
}
console.log(`check: manifest invariants hold (${Object.keys(pkg.scripts || {}).length} scripts)`);
