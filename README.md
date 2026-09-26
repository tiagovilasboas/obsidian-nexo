# Nexo

![Nexo: connected green and aqua signals](assets/nexo-banner.svg)

**An original Matrix-inspired theme for Obsidian.** Nexo gives your notes a calm, near-black canvas, a deliberate green hierarchy, and a graph that feels like a living network.

[Get Nexo](../../releases/latest) · [Graph palette](docs/GRAPH.md) · [Report an issue](../../issues)

## What makes Nexo different

- **Signal, not noise.** Bright green marks navigation and important headings; neutral text keeps long notes comfortable to read.
- **A graph with depth.** Dark green links, luminous nodes, a subtle radial backdrop, and four distinct green tones for groups.
- **A consistent workspace.** Tabs, navigation, code, tags, tasks, callouts, and links share the same palette.
- **A support card you control.** The optional `buy` callout gives a note a clear support button without inserting ads into Obsidian.

Nexo is designed for Obsidian's dark appearance. The theme is written from scratch and has no build dependencies, bundled fonts, remote assets, or required community plugins.

## Graph palette

The theme styles Obsidian's built-in graph. Folder groups are saved by Obsidian in each vault, so use **Graph view → Settings → Groups** to assign your own queries:

| Group | Suggested color |
| --- | --- |
| Personal | Mint `#84f5b2` |
| Career | Signal `#00ff41` |
| Operations | Lime `#b8ff5a` |
| Meta | Aqua `#00e5a0` |

The [graph guide](docs/GRAPH.md) includes example queries. For a dedicated graph view with configurable groups and its own controls, see the separate [Nexo Graph plugin](https://github.com/tiagovilasboas/obsidian-nexo-graph).

## Install

1. Download `manifest.json` and `theme.css` from the [latest release](../../releases/latest).
2. Place both files in `<your-vault>/.obsidian/themes/Nexo/`.
3. In Obsidian, choose **Settings → Appearance → Themes → Nexo**.
4. Set **Base color scheme → Dark**.

The theme is currently distributed through GitHub releases. A Community Themes submission is planned.

## Optional support callout

Put this in a note after replacing the example address with your own support page:

```md
> [!buy] Support Nexo
> [Buy me a coffee](https://buymeacoffee.com/your-page)
```

The callout is just CSS. It does not create an account, collect payments, or contact a third party on its own.

## Make it yours

Edit [theme.css](theme.css) directly. Obsidian reloads the theme after you update the installed file. Colors and component styles are grouped by purpose in the stylesheet. Contributions and bug reports are welcome in [Issues](../../issues).

## Credits and license

The care and approachability of [Things 2](https://github.com/colineckert/obsidian-things) inspired the experience. Nexo's design and CSS are original; no Things 2 code or assets are included.

Nexo is available under the [MIT license](LICENSE).
