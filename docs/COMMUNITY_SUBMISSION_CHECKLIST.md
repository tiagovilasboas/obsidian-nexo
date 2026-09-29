# Community Theme submission checklist

This is the reproducible gate for Nexo's first submission to the [Obsidian Community directory](https://community.obsidian.md). It reflects the official guidance checked on 29 September 2026. It is deliberately a record of evidence, not proof that the directory has accepted the theme.

## Current decision

**Do not submit yet.** Nexo 0.6.0 is released, but the required repository screenshot does not exist. It must be a real capture from Obsidian with the released Nexo files installed; a rendered SVG, mockup, or generated image is not acceptable evidence.

## Requirement and evidence

| Requirement | Status | Evidence or next action |
| --- | --- | --- |
| Public GitHub repository with theme source | **done** | [`tiagovilasboas/obsidian-nexo`](https://github.com/tiagovilasboas/obsidian-nexo) is public; `main` is the default branch. |
| Root `README.md` describing the theme | **done** | [`README.md`](../README.md) describes Nexo, installation, both appearances, graph behavior, optional Style Settings, and the MIT license. |
| Root `LICENSE` and licensing clarity | **done** | [`LICENSE`](../LICENSE) exists; [`README.md`](../README.md) identifies it as MIT. |
| Valid root `manifest.json` | **done** | [`manifest.json`](../manifest.json) has `name`, `author`, semantic `version` `0.6.0`, and semantic `minAppVersion` `1.13.0`. The name avoids prohibited `Obsidian` and `Theme` terms. |
| Theme does not load network assets | **done** | [`theme.css`](../theme.css) has no `@import` or remote `url(...)`; `npm run check:css` enforces this. |
| Current version has a published matching release | **done** | [release `0.6.0`](https://github.com/tiagovilasboas/obsidian-nexo/releases/tag/0.6.0) is published, its tag matches `manifest.json`, and it contains `manifest.json` and `theme.css`. Asset verification and the release workflow passed on 29 September 2026. |
| Screenshot path in repository | **blocked** | No tracked `screenshots/` directory or screenshot currently exists. Capture an actual 512 × 288 (16:9) Obsidian screenshot, save it as `screenshots/nexo-0.6.0.png`, commit it to the default branch, then use that exact relative path in the directory form. |
| Screenshot accurately represents the release | **blocked** | In a clean Obsidian profile, install the published `0.6.0` files into the demo vault, select Nexo, and capture a safe synthetic view. Record Obsidian version, Nexo tag, appearance, and enabled community plugins in the PR or release notes. Do not use a mock, SVG, or private vault content. |
| Supported modes chosen in the form | **pending** | Select **Dark** and **Light** only after verifying the real captures and manual review in both modes. [`theme.css`](../theme.css) and automated checks support both, but the directory form has not been completed. |
| Obsidian account and linked GitHub account | **pending** | Sign in at [community.obsidian.md](https://community.obsidian.md), connect the GitHub owner account, then select the owner in the submission form. This requires the maintainer's account session. |
| Directory submission and automated review | **blocked** | After the preceding gates, create **Themes → New theme**, provide repository URL, owner, `screenshots/nexo-0.6.0.png`, and supported modes, accept the developer policies, and submit. Record the resulting directory URL and review outcome here. |
| Installable from Obsidian Community Themes | **blocked** | Verify only after automated review clears and the entry appears in the official directory: install it through Obsidian and confirm the installed files are from the version-matched release. |

## Reproducible pre-submission procedure

1. Start from a clean checkout of `main`; `manifest.json` must be committed there before the form is submitted.
2. Install dependencies and run the source checks:

   ```sh
   npm ci
   npm run check
   npm run check:css
   bash scripts/verify-release-assets.sh 0.6.0
   ```

3. In a clean Obsidian profile, open `demo-vault/`, install the published `0.6.0` `manifest.json` and `theme.css`, and follow the visual checks in [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md). Repeat for Dark and Light.
4. Capture the directory thumbnail from that real Obsidian session. Remove any private content, make it 16:9 at 512 × 288, save it at `screenshots/nexo-0.6.0.png`, and confirm it renders in the GitHub repository.
5. Commit the screenshot and any README caption on `main`. Re-run the checks and re-check that release `0.6.0` still matches the committed root assets. If source assets change, increment the manifest version and publish a matching release before submitting.
6. With the maintainer's Obsidian account, link GitHub and submit the exact repository URL and screenshot path. Choose both supported modes only after the manual validation above.
7. Resolve every directory review error through a new committed version and matching release. Do not claim completion until Nexo appears at [community.obsidian.md/themes](https://community.obsidian.md/themes) and installs in Obsidian.

## Official sources

- [Submit your theme](https://docs.obsidian.md/themes/app-themes/submit-theme): required root files, semantic release version, matching tag, release attachments, default-branch manifest, screenshot, and review flow.
- [Set up and claim](https://docs.obsidian.md/community-directory/set-up-and-claim): account, GitHub connection, owner, screenshot path, and supported-mode form fields.
- [Developer policies](https://docs.obsidian.md/community-directory/developer-policies): license, attribution, trademark, telemetry, ads, and no remote theme assets.
- [Manifest reference](https://docs.obsidian.md/Reference/Manifest): mandatory theme fields and naming constraints.
- [Theme self-critique checklist](https://docs.obsidian.md/oo/theme): current compatibility and thumbnail guidance, including the recommended 512 × 288 screenshot size.

## Related issue acceptance

No issue was closed or edited during this audit:

- [#1](https://github.com/tiagovilasboas/obsidian-nexo/issues/1) remains open because it requires real Obsidian verification and README previews in both modes.
- [#2](https://github.com/tiagovilasboas/obsidian-nexo/issues/2) remains open because the existing CSS checks do not prove controls visibly update in a live Obsidian session.
- [#3](https://github.com/tiagovilasboas/obsidian-nexo/issues/3) remains open because real, checked-in screenshots are absent.
- [#6](https://github.com/tiagovilasboas/obsidian-nexo/issues/6) remains open because the screenshot and account-bound directory submission/review gates are incomplete.
