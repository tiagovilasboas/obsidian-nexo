# Nexo

![Nexo: connected green and aqua signals](assets/nexo-banner.svg)

**An original Matrix-inspired theme for Obsidian.** Nexo gives your notes a calm canvas, a deliberate green hierarchy, and a graph that feels like a living network in dark and light appearances.

[Get Nexo](../../releases/latest) · [Graph palette](docs/GRAPH.md) · [Report an issue](../../issues)

Release candidate: **0.5.0** · [Changelog](CHANGELOG.md)

[![Buy me a coffee](https://raw.githubusercontent.com/tiagovilasboas/tiagovilasboas/main/assets/buy-me-a-coffee.svg)](https://buymeacoffee.com/tiagovilasboas)

## What makes Nexo different

- **Signal, not noise.** Bright green marks navigation and important headings; neutral text keeps long notes comfortable to read.
- **A graph with depth.** Mode-aware links and nodes, a subtle radial backdrop, and four distinct green tones for groups.
- **A consistent workspace.** Tabs, navigation, code, tags, tasks, callouts, and links share the same palette.
- **A support card you control.** The optional `buy` callout gives a note a clear support button without inserting ads into Obsidian.

Nexo supports both Obsidian appearances. Dark mode uses a near-black canvas and luminous Matrix greens; light mode uses soft neutral surfaces, forest-green text, and graph colors tuned for contrast. The theme is written from scratch and has no runtime build dependencies, bundled fonts, remote CSS assets, or required community plugins.

## Graph palette

The theme styles Obsidian's built-in graph in both appearances. Folder groups are saved by Obsidian in each vault, so use **Graph view → Settings → Groups** to assign your own queries. These suggested group colors are tuned for Dark mode; see the [graph guide](docs/GRAPH.md) for light-mode suggestions too:

| Group | Suggested color |
| --- | --- |
| Personal | Mint `#84f5b2` |
| Career | Signal `#00ff41` |
| Operations | Lime `#b8ff5a` |
| Meta | Aqua `#00e5a0` |

The included demo vault comes with the four sample groups configured, so its built-in graph shows the palette as soon as you open it. In your own vault, create groups under **Graph view → Settings → Groups**; the theme cannot set vault-specific folder queries for you. The [graph guide](docs/GRAPH.md) includes example queries. For a dedicated graph view with configurable groups and its own controls, see the separate [Nexo Graph plugin](https://github.com/tiagovilasboas/obsidian-nexo-graph).

If you install the optional Style Settings plugin, **Settings → Style Settings → Nexo Graph** lets you customize link, note, focus, tag, attachment, and unresolved-note colors, plus the native graph's background glow. Use that section's reset control to restore Nexo's defaults. Nexo works with its defaults when Style Settings is absent.

Maintainers can use the [safe demo vault and release checklist](docs/RELEASE_CHECKLIST.md) to check a release without private notes. The demo vault includes the current theme assets and selects Nexo automatically; the quality check verifies those assets match the release files.

## Install

1. Download `manifest.json` and `theme.css` from the [latest release](../../releases/latest).
2. Place both files in `<your-vault>/.obsidian/themes/Nexo/`.
3. In Obsidian, choose **Settings → Appearance → Themes → Nexo**.
4. Choose **Base color scheme → Dark** or **Light** to match your preference.

Installable theme releases are published on GitHub; the latest release includes the native graph controls described above. A Community Themes submission is planned.

## Add a support button to a note

The button above supports the project from GitHub. To add a clickable button inside Obsidian, copy this optional callout into a note. Nexo styles the link as a button; it appears only in notes where you add it.

```md
> [!buy] Support my work
> [Buy me a coffee](https://buymeacoffee.com/tiagovilasboas)
```

The callout opens the same support page. Nexo does not insert it into your notes or workspace automatically.

## Make it yours

Edit [theme.css](theme.css) directly. Obsidian reloads the theme after you update the installed file. Colors and component styles are grouped by purpose in the stylesheet. Contributions and bug reports are welcome in [Issues](../../issues).

## Design and license

Nexo's visual system, palette, and CSS are original and made for Obsidian.

Nexo is available under the [MIT license](LICENSE).
