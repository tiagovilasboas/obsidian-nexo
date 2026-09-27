import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));
const css = readFileSync(new URL('../theme.css', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const requiredSettings = [
  'graph-line',
  'graph-node',
  'graph-node-unresolved',
  'graph-node-focused',
  'graph-node-tag',
  'graph-node-attachment',
  'graph-glow-opacity'
];

if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error('manifest.version must use semantic versioning');
if (!manifest.name || !manifest.author || !manifest.minAppVersion) throw new Error('manifest is missing a required theme field');
if (!css.includes('name: Nexo Graph') || !css.includes('id: nexo-graph')) throw new Error('Style Settings section is missing its stable Nexo Graph identity');
for (const id of requiredSettings) {
  if (!css.includes(`id: ${id}`)) throw new Error(`Missing Style Settings control: ${id}`);
}
if (!readme.includes('Settings → Style Settings → Nexo Graph')) throw new Error('README must explain where graph controls are found');
if (!readme.includes('reset control')) throw new Error('README must explain how to restore defaults');

console.log(`Theme checks passed for Nexo ${manifest.version}`);
