import sharp from "sharp";
import { access } from "fs/promises";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const sourceCandidates = [
  path.join(root, "public", "brand-favicon-source.png"),
  path.join(
    "C:",
    "Users",
    "david",
    ".cursor",
    "projects",
    "d-desktop-projcts-coding-pojects-sites-and-cursor-architectural-glass-showroom",
    "assets",
    "c__Users_david_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Artboard8-39d573fb-b59e-462b-a995-bb78e2f1b38e.png"
  ),
  path.join(root, "public", "brand-favicon-source.jpg"),
];

const publicDir = path.join(root, "public");
const appDir = path.join(root, "src", "app");
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

async function resolveSource() {
  for (const candidate of sourceCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      continue;
    }
  }
  throw new Error("Favicon source not found.");
}

async function loadTransparentSource(sourcePath) {
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

  if (!info.hasAlpha) {
    for (let i = 0; i < width * height; i++) {
      const o = i * channels;
      const r = out[o];
      const g = out[o + 1];
      const b = out[o + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      if (max < 40 || (max - min < 8 && max < 55)) {
        out[o + 3] = 0;
      }
    }
  }

  return sharp(out, { raw: { width, height, channels } }).png();
}

async function iconCrop(sourcePath) {
  const meta = await sharp(sourcePath).metadata();
  const height = meta.height ?? 1024;
  const width = meta.width ?? 1024;
  const cropHeight = Math.round(height * 0.66);

  const base = await loadTransparentSource(sourcePath);
  return base.extract({ left: 0, top: 0, width, height: cropHeight });
}

async function trimmed(pipeline) {
  return sharp(await pipeline.toBuffer()).trim();
}

async function writeSquare(pipeline, size, outputPath, padding = 0) {
  const pad = Math.round(size * padding);
  const inner = Math.max(1, size - pad * 2);

  let image = await trimmed(pipeline);

  if (pad > 0) {
    await image
      .resize(inner, inner, { fit: "contain", background: transparent })
      .extend({
        top: pad,
        bottom: pad,
        left: pad,
        right: pad,
        background: transparent,
      })
      .png()
      .toFile(outputPath);
    return;
  }

  await image
    .resize(size, size, { fit: "contain", background: transparent })
    .png()
    .toFile(outputPath);
}

const sourcePath = await resolveSource();

await mkdir(publicDir, { recursive: true });
await mkdir(appDir, { recursive: true });

const processedSource = await loadTransparentSource(sourcePath);
await processedSource.toFile(path.join(publicDir, "brand-favicon-source.png"));

const icon = await iconCrop(sourcePath);
const full = await loadTransparentSource(sourcePath);

await writeSquare(icon, 48, path.join(appDir, "icon.png"));
await writeSquare(icon, 48, path.join(publicDir, "favicon-48.png"));
await writeSquare(full, 180, path.join(appDir, "apple-icon.png"), 0.02);
await writeSquare(full, 192, path.join(publicDir, "icon-192.png"), 0.02);
await writeSquare(full, 512, path.join(publicDir, "icon-512.png"), 0.02);

console.log("Transparent favicon assets generated from:", sourcePath);
