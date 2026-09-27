# Release and visual checklist

The `../demo-vault/` directory contains synthetic notes organized to show Nexo's four graph groups. It has no private or production data.
The vault's `graph.json` preconfigures those path-based groups with the documented palette; `workspace.json` and other generated Obsidian state are intentionally ignored.

## Automated checks

Run these before tagging a release:

```sh
npm ci
npm run check
npm run check:css
```

Before publishing a release, confirm that the tag matches `manifest.json` and that the GitHub release contains the exact `manifest.json` and `theme.css` from that tag. The `Verify published theme assets` workflow runs this check automatically after publication. It can also be run manually:

```sh
bash scripts/verify-release-assets.sh <tag-version>
```

## Manual visual review

Use the synthetic demo vault in Obsidian and a clean profile with the release files installed. Check:

- Nexo is selected in Dark and Light modes; headings, links, tags, tasks, tables, code, and callouts are readable in both.
- Native Graph view renders the mode-appropriate radial background and distinguishes regular, focused, unresolved, tag, and attachment nodes in both modes.
- Every demo wikilink resolves to a real note; the graph has no duplicate unresolved nodes caused by filename/title mismatches.
- If Style Settings is installed, changing each graph control updates the graph and its reset action restores defaults. Repeat without Style Settings to confirm the theme still loads.
- The optional `buy` callout is clickable in the note where it is authored; no support content appears in other notes or app chrome.
- Graph controls remain usable at narrow and wide pane sizes, and reduced-motion preferences do not cause distracting transitions.
- The demo vault contains only synthetic content before capturing screenshots.

Capture at least one screenshot in each appearance. Record the Obsidian version, Nexo release tag, appearance, and any community plugins used with each screenshot or manual report.
