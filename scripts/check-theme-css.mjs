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

for (const mode of ['.theme-dark', '.theme-light']) {
  let graphBackground = '';
  root.walkRules(rule => {
    if (rule.selectors?.map(value => value.trim()).includes(`${mode} .graph-view`)) {
      graphBackground = rule.nodes?.find(node => node.type === 'decl' && node.prop === 'background')?.value || '';
    }
  });
  const radialLayers = (graphBackground.match(/radial-gradient\(/g) || []).length;
  if (radialLayers < 4 || !graphBackground.includes('var(--graph-field-opacity, 6)')) {
    throw new Error(`${mode} graph needs layered Signal Field gradients and a fallback intensity control`);
  }
}

const modeGraphVariables = new Map([
  ['.theme-dark', new Set()],
  ['.theme-light', new Set()]
]);
root.walkRules(rule => {
  const variables = modeGraphVariables.get(rule.selector);
  if (!variables) return;
  rule.walkDecls(declaration => {
    if (declaration.prop.startsWith('--graph-')) variables.add(declaration.prop.slice(2));
  });
});

for (const setting of settings.filter(setting => setting.type === 'variable-color')) {
  for (const [mode, variables] of modeGraphVariables) {
    if (!variables.has(setting.id)) {
      throw new Error(`Style Settings control ${setting.id} is missing its ${mode} CSS variable`);
    }
  }
}

for (const setting of settings.filter(setting => setting.type === 'variable-number-slider')) {
  if (!css.includes(`var(--${setting.id},`)) {
    throw new Error(`Style Settings control ${setting.id} is not used with a no-plugin fallback`);
  }
}

const buyLink = '.callout[data-callout="buy"] .callout-content a';
for (const mode of ['.theme-dark', '.theme-light']) {
  const selector = `${mode} ${buyLink}:focus-visible`;
  let focusRule;
  root.walkRules(rule => {
    if (rule.selectors?.map(value => value.trim()).includes(selector)) focusRule = rule;
  });
  if (!focusRule) throw new Error(`Missing keyboard focus rule: ${selector}`);
  const color = focusRule.nodes?.find(node => node.type === 'decl' && node.prop === 'outline-color');
  const shorthand = focusRule.nodes?.find(node => node.type === 'decl' && node.prop === 'outline');
  const outlineValue = shorthand?.value ?? '';
  const hasColor = Boolean(color?.value || outlineValue.split(/\s+/).some(token => /^#[\da-f]{3,8}$/i.test(token)));
  if (!/\b3px\b/.test(outlineValue) || !/\bsolid\b/.test(outlineValue) || !hasColor) {
    throw new Error(`${selector} must define a 3px solid outline with a visible color`);
  }
  const offset = focusRule.nodes?.find(node => node.type === 'decl' && node.prop === 'outline-offset');
  if (offset?.value !== '3px') {
    throw new Error(`${selector} must set outline-offset: 3px`);
  }
}

let reducedMotionRule;
root.walkAtRules('media', rule => {
  if (rule.params.trim() === '(prefers-reduced-motion: reduce)') reducedMotionRule = rule;
});
if (!reducedMotionRule) throw new Error('Buy callout must respect prefers-reduced-motion');
for (const selector of [
  `.theme-dark ${buyLink}`,
  `.theme-light ${buyLink}`
]) {
  let transitionDisabled = false;
  reducedMotionRule.walkRules(rule => {
    if (rule.selectors?.map(value => value.trim()).includes(selector)) {
      transitionDisabled = rule.nodes?.some(node => node.type === 'decl' && node.prop === 'transition' && node.value === 'none') ?? false;
    }
  });
  if (!transitionDisabled) throw new Error(`${selector} must disable transitions for reduced motion`);
}

console.log(`CSS parsed; ${settingIds.length} unique Style Settings controls; no remote assets.`);
