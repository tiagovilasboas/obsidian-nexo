import { readFileSync } from 'node:fs';
import postcss from 'postcss';

const css = readFileSync(new URL('../theme.css', import.meta.url), 'utf8');
const root = postcss.parse(css, { from: 'theme.css' });
const remoteAssets = [];

root.walkAtRules('import', rule => {
  if (/https?:\/\//i.test(rule.params)) remoteAssets.push(`@import ${rule.params}`);
});
root.walkDecls(declaration => {
  if (/url\(\s*['"]?https?:\/\//i.test(declaration.value)) {
    remoteAssets.push(`${declaration.prop}: ${declaration.value}`);
  }
});

if (remoteAssets.length) {
  throw new Error(`Theme CSS must not load remote assets:\n${remoteAssets.join('\n')}`);
}

const settingsComment = css.match(/@settings([\s\S]*?)\*\//)?.[1];
if (!settingsComment) throw new Error('Style Settings declaration block was not found');
const settingIds = [...settingsComment.matchAll(/^\s+id:\s*([a-z0-9-]+)\s*$/gm)].map(match => match[1]);
if (new Set(settingIds).size !== settingIds.length) throw new Error('Style Settings IDs must be unique');

console.log(`CSS parsed; ${settingIds.length} unique Style Settings controls; no remote assets.`);
