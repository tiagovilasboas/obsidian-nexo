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
const settings = [];
let currentSetting = null;
for (const line of settingsComment.split('\n')) {
  if (/^\s+-\s*$/.test(line)) {
    if (currentSetting) settings.push(currentSetting);
    currentSetting = {};
    continue;
  }
  const field = line.match(/^\s+(id|title|type|format|opacity|default|min|max|step):\s*(.*?)\s*$/);
  if (field && currentSetting) currentSetting[field[1]] = field[2];
}
if (currentSetting) settings.push(currentSetting);

for (const setting of settings) {
  if (!setting.id || !setting.title || !setting.type) throw new Error('Every graph setting needs an id, title, and type');
  const defaultValue = setting.default?.replace(/^['"]|['"]$/g, '');
  if (setting.type === 'variable-color' && (setting.format !== 'hex' || !/^#[0-9a-f]{3,8}$/i.test(defaultValue || ''))) {
    throw new Error(`Color setting ${setting.id} needs format: hex and a hex default`);
  }
  if (setting.type === 'variable-number-slider') {
    const numbers = ['default', 'min', 'max', 'step'].map(key => Number(setting[key]));
    if (numbers.some(number => !Number.isFinite(number)) || numbers[1] > numbers[0] || numbers[0] > numbers[2] || numbers[3] <= 0) {
      throw new Error(`Slider setting ${setting.id} needs valid numeric default, min, max, and step`);
    }
  }
}

const settingIds = settings.map(setting => setting.id);
if (new Set(settingIds).size !== settingIds.length) throw new Error('Style Settings IDs must be unique');

console.log(`CSS parsed; ${settingIds.length} unique Style Settings controls; no remote assets.`);
