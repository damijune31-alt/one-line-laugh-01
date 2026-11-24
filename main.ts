import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One funny line: the standing desk was supposed to fix the slouch.
// It did not. It just gave the slouch a better view.
const LINE =
  "I bought a standing desk to fix my back, so now I slouch while standing.";

// The competition allows a single sentence of 1-200 characters.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = `${outDir}/entry.txt`;
writeFileSync(dst, LINE, "utf8");

// Verify what landed on disk is exactly the line, one sentence, no extra bytes.
const back = readFileSync(dst, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the line");
}
if (back.split(".").filter((p) => p.trim().length > 0).length !== 1) {
  throw new Error("entry must be a single sentence");
}
