#!/usr/bin/env bash
set -euo pipefail

tag="${1:?Usage: scripts/verify-release-assets.sh <tag> [download-directory]}"
version="${tag#v}"
manifest_version="$(node -p "JSON.parse(require('node:fs').readFileSync('manifest.json', 'utf8')).version")"

if [[ "$manifest_version" != "$version" ]]; then
  echo "Tag $tag does not match manifest version $manifest_version" >&2
  exit 1
fi

download_dir="${2:-}"
cleanup_dir=""
if [[ -z "$download_dir" ]]; then
  cleanup_dir="$(mktemp -d)"
  download_dir="$cleanup_dir"
  gh release download "$tag" --dir "$download_dir" --pattern manifest.json --pattern theme.css
fi
trap '[[ -z "$cleanup_dir" ]] || rm -rf "$cleanup_dir"' EXIT

for asset in manifest.json theme.css; do
  if [[ ! -f "$download_dir/$asset" ]]; then
    echo "Release $tag is missing $asset" >&2
    exit 1
  fi
  if ! cmp -s "$asset" "$download_dir/$asset"; then
    echo "Release asset $asset differs from the tagged source" >&2
    exit 1
  fi
done

echo "Release $tag matches manifest.json and theme.css in this checkout."
