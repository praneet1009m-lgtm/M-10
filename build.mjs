// Static site: copy the site files into dist/ so Vercel can serve them.
import { cpSync, rmSync, mkdirSync } from "node:fs";
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
for (const f of ["index.html", "script.js", "style.css", "assets", "demos"]) {
  cpSync(f, `dist/${f}`, { recursive: true });
}
console.log("Built static site into dist/");
