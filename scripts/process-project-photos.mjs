import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const projectsPath = path.join(root, "src/data/projects.ts");
const sourceDir = path.join(root, "Assets/project-photos");
const libraryDir = path.join(root, "public/images/projects/library");
const scratchDir = String.raw`C:\Users\cina_\AppData\Local\Temp\claude\C--Users-cina--Desktop-Jun---Claude\ac93a709-6d4b-4515-b5ed-8acf6ae170bb\scratchpad`;
const fallbackDir = path.join(scratchDir, "sharp-fallback");
const source = await fs.readFile(projectsPath, "utf8");
const arrayStart = source.indexOf("export const PROJECTS:");
const firstEntry = source.indexOf("  {", arrayStart);
if (arrayStart < 0 || firstEntry < 0) throw new Error("PROJECTS data not found");
const header = source.slice(0, firstEntry);
const entryRe = /^\s*\{\s*name:\s*"([^"]*)",\s*category:\s*"([^"]*)",(?:\s*location:\s*"([^"]*)",)?\s*image:\s*"[^"]*"\s*\},?\s*$/gm;
const projects = [...source.matchAll(entryRe)].map((m) => ({ name: m[1], category: m[2], ...(m[3] ? { location: m[3] } : {}) }));
if (projects.length !== 120) throw new Error(`Expected 120 projects, parsed ${projects.length}`);
const safeDecode = (v) => { try { return decodeURIComponent(v); } catch { return v; } };
const normalize = (v) => safeDecode(v).replace(/\.[^.]+$/, "").replace(/\s*-\s*local\s*-\s*.*$/i, "").toUpperCase().replace(/[^A-Z0-9]/g, "");
const slugify = (v) => safeDecode(v).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const pins = new Map(Object.entries({
  "petronas twin tower": "PETRONAS TWIN TOWERS", "sankyu": "SANKYU OFFICE", "guan%20chong_2": "GUAN CHONG COCOA MANUFACTURER",
  "NATIONAL STADIUM BUKIT JALIL": "NATIONAL STADIUM BUKIT JALIL (TM STADIUM NASIONAL)",
  "LIGHT RAPID TRANSIT LINE 1 & 2 & 3": "(LRT) LIGHT RAPID TRANSIT LINE 1 & 2 & 3",
  "UNIVERSITI TEKNOLOGI MARA": "UNIVERSITI TEKNOLOGI MARA (UiTM) - ALL STATES",
  "PUTRAJAYA GOVERNMENT OFFICE COMPLEXES": "PUTRAJAYA GOVERNMENT OFFICE COMPLEXES (PARCELS A-F)"
}).map(([f, p]) => [normalize(f), p]));
const allFiles = (await fs.readdir(sourceDir, { withFileTypes: true })).filter((e) => e.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(e.name)).map((e) => ({ file: e.name, base: e.name.replace(/\.[^.]+$/, ""), norm: normalize(e.name) }));
const projectByName = new Map(projects.map((p) => [p.name, p]));
const usedProjects = new Set(), usedFiles = new Set(), assignments = [];
for (const file of allFiles) {
  const pinnedName = pins.get(file.norm);
  if (!pinnedName) continue;
  const project = projectByName.get(pinnedName);
  if (!project) throw new Error(`Pinned project not found: ${pinnedName}`);
  if (!usedProjects.has(project.name)) { assignments.push({ file, project }); usedFiles.add(file.file); usedProjects.add(project.name); }
}
const candidates = [];
for (const file of allFiles) {
  if (usedFiles.has(file.file)) continue;
  for (const project of projects) {
    if (usedProjects.has(project.name)) continue;
    const pn = normalize(project.name), exact = file.norm === pn;
    if (exact || file.norm.includes(pn) || pn.includes(file.norm)) candidates.push({ file, project, exact, score: Math.min(file.norm.length, pn.length) });
  }
}
candidates.sort((a, b) => Number(b.exact) - Number(a.exact) || b.score - a.score || a.file.file.localeCompare(b.file.file));
for (const c of candidates) {
  if (usedFiles.has(c.file.file) || usedProjects.has(c.project.name)) continue;
  assignments.push(c); usedFiles.add(c.file.file); usedProjects.add(c.project.name);
}
await fs.mkdir(libraryDir, { recursive: true });
await fs.mkdir(fallbackDir, { recursive: true });
const matched = [], aiList = [], failed = [];
const successfulProjects = new Set();
for (const { file, project } of assignments) {
  const input = path.join(sourceDir, file.file), slug = slugify(project.name), output = path.join(libraryDir, `${slug}.jpg`), tmp = `${output}.tmp-${process.pid}`;
  try {
    const stat = await fs.stat(input), metadata = await sharp(input).metadata(), w = metadata.width, h = metadata.height;
    if (!w || !h) throw new Error("Missing image dimensions");
    const kb = stat.size / 1024;
    let bucket;
    let pipeline = sharp(input).rotate();
    if (w < 620 || kb < 25) { bucket = "SMALL"; pipeline = pipeline.resize({ width: 900, kernel: "lanczos3" }).sharpen({ sigma: 1, m1: 1, m2: 2 }).jpeg({ quality: 85 }); }
    else if (w < 900) { bucket = "MID"; pipeline = pipeline.resize({ width: 900, kernel: "lanczos3" }).sharpen({ sigma: 0.8, m1: 0.8, m2: 1.6 }).jpeg({ quality: 82 }); }
    else { bucket = "BIG"; pipeline = pipeline.resize({ width: 900, withoutEnlargement: true }).jpeg({ quality: 80 }); }
    await pipeline.toFile(tmp);
    await fs.rename(tmp, output);
    if (bucket === "SMALL") { await fs.copyFile(output, path.join(fallbackDir, `${slug}.jpg`)); aiList.push({ slug, name: project.name, w, h, kb }); }
    matched.push({ file: file.file, name: project.name, slug, w, h, kb, bucket });
    successfulProjects.add(project.name);
  } catch (error) {
    await fs.rm(tmp, { force: true });
    failed.push({ file: file.file, name: project.name, error: error instanceof Error ? error.message : String(error) });
  }
}
const matchedByName = new Map(matched.map((x) => [x.name, x]));
const keptProjects = projects.filter((p) => successfulProjects.has(p.name));
const removedProjects = projects.filter((p) => !successfulProjects.has(p.name)).map((p) => p.name);
const lines = keptProjects.map((p) => {
  const x = matchedByName.get(p.name);
  const loc = p.location ? `, location: ${JSON.stringify(p.location)}` : "";
  return `  { name: ${JSON.stringify(p.name)}, category: ${JSON.stringify(p.category)}${loc}, image: ${JSON.stringify(`/images/projects/library/${x.slug}.jpg`)} },`;
});
await fs.writeFile(projectsPath, `${header}${lines.join("\n")}\n];\n`, "utf8");
const referenced = new Set(matched.map((x) => `${x.slug}.jpg`));
for (const e of await fs.readdir(libraryDir, { withFileTypes: true })) {
  if (e.isFile() && !referenced.has(e.name)) await fs.rm(path.join(libraryDir, e.name));
}
const unmatchedFiles = allFiles.filter((f) => !matched.some((x) => x.file === f.file)).map((f) => f.base);
await fs.mkdir(scratchDir, { recursive: true });
await fs.writeFile(path.join(scratchDir, "photo-manifest.json"), `${JSON.stringify({ matched, removedProjects, unmatchedFiles, aiList }, null, 2)}\n`);
console.log(`matched: ${matched.length}\nremoved: ${removedProjects.length}\nunmatchedFiles: ${unmatchedFiles.length}\naiList: ${aiList.length}`);
console.log("removedProjects:\n" + removedProjects.join("\n"));
console.log("aiList slugs:\n" + aiList.map((x) => x.slug).join("\n"));
console.log("unmatchedFiles:\n" + unmatchedFiles.join("\n"));
console.log("failed sharp processing:\n" + (failed.length ? failed.map((x) => `${x.file}: ${x.error}`).join("\n") : "none"));
