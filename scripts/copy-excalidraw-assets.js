#!/usr/bin/env node
/**
 * Copies Excalidraw font/asset folders into public/ so the whiteboard
 * can load them from the same origin.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DIST = path.join(
  ROOT,
  "node_modules",
  "@excalidraw",
  "excalidraw",
  "dist",
);

const COPIES = [
  {
    from: path.join(SRC_DIST, "excalidraw-assets"),
    to: path.join(ROOT, "public", "excalidraw-assets"),
  },
  {
    from: path.join(SRC_DIST, "excalidraw-assets-dev"),
    to: path.join(ROOT, "public", "excalidraw-assets-dev"),
  },
];

function copyDir(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`[copy-excalidraw-assets] Missing ${from}`);
    return false;
  }
  fs.mkdirSync(to, { recursive: true });
  fs.cpSync(from, to, { recursive: true });
  return true;
}

let ok = true;
for (const { from, to } of COPIES) {
  if (copyDir(from, to)) {
    console.log(`[copy-excalidraw-assets] Copied → ${path.relative(ROOT, to)}`);
  } else {
    ok = false;
  }
}

if (!ok) {
  console.warn(
    "[copy-excalidraw-assets] Whiteboard fonts may be missing until @excalidraw/excalidraw is installed.",
  );
}
