import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ignored = new Set(['/en/', '/livro/', '/AppSec-Motherfucker/', '/TheAnt/', '/IronSoftware/', '/oincidente/', '/yass/']);

async function walk(dir) {
  const results = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...await walk(full));
    else if (entry.name.endsWith('.html')) results.push(full);
  }
  return results;
}

const failures = [];
for (const file of await walk(ROOT)) {
  const html = await fs.readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
    const url = match[1];
    if (ignored.has(url) || url.startsWith('/assets/downloads/')) continue;
    const target = path.join(ROOT, url.replace(/^\//, ''));
    const candidates = url.endsWith('/') ? [path.join(target, 'index.html')] : [target, path.join(target, 'index.html')];
    if (!(await Promise.any(candidates.map(candidate => fs.access(candidate).then(() => true))).catch(() => false))) failures.push(`${path.relative(ROOT, file)} -> ${url}`);
  }
}
if (failures.length) {
  console.error(`Links internos quebrados:\n${failures.join('\n')}`);
  process.exitCode = 1;
} else console.log('Links internos: OK');
