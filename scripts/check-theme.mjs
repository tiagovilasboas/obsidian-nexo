import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));
const demoAppearance = JSON.parse(readFileSync(new URL('../demo-vault/.obsidian/appearance.json', import.meta.url), 'utf8'));
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
const requiredModes = ['.theme-dark', '.theme-light'];
const requiredLightGraphColors = [
  '--graph-text: #243d2a',
  '--graph-line: #52795d',
  '--graph-node: #3f7450',
  '--graph-node-unresolved: #64756a',
  '--graph-node-focused: #885e00',
  '--graph-node-tag: #776000',
  '--graph-node-attachment: #006f6a'
];

if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error('manifest.version must use semantic versioning');
if (!/^\d+\.\d+\.\d+$/.test(manifest.minAppVersion)) throw new Error('manifest.minAppVersion must use semantic versioning');
if (!manifest.name || !manifest.author || !manifest.minAppVersion) throw new Error('manifest is missing a required theme field');
if (demoAppearance.cssTheme !== manifest.name || demoAppearance.theme !== 'obsidian' || !['dark', 'light'].includes(demoAppearance.baseColorScheme)) {
  throw new Error('Demo vault must select Nexo through cssTheme and keep a valid Obsidian appearance mode');
}
if (!css.includes('name: Nexo Graph') || !css.includes('id: nexo-graph')) throw new Error('Style Settings section is missing its stable Nexo Graph identity');
for (const id of requiredSettings) {
  if (!css.includes(`id: ${id}`)) throw new Error(`Missing Style Settings control: ${id}`);
}
for (const mode of requiredModes) {
  if (!css.includes(mode)) throw new Error(`Theme is missing ${mode} appearance support`);
}
for (const color of requiredLightGraphColors) {
  if (!css.includes(color)) throw new Error(`Light graph palette is missing ${color}`);
}
if (!readme.includes('Settings → Style Settings → Nexo Graph')) throw new Error('README must explain where graph controls are found');
if (!readme.includes('both Obsidian appearances')) throw new Error('README must document both Obsidian appearances');
if (!readme.includes('reset control')) throw new Error('README must explain how to restore defaults');
if (!readme.includes('docs/RELEASE_CHECKLIST.md')) throw new Error('README must link to the visual and release checklist');

console.log(`Theme checks passed for Nexo ${manifest.version}`);
