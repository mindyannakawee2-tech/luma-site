# LUMA Hub Repo Website

A GitHub-like static repository website for `.luma` packages.

## What this does

- Hosts a package index at `packages/index.json`
- Shows a searchable package website
- Gives users copyable install commands
- Supports local package files in `/storage`
- Supports external storage links such as Cloudflare R2, S3, Google Drive direct links, or your own API

## Important: Infinite storage

Real infinite storage does not exist. GitHub Pages is not infinite either.

The correct design is:

```text
GitHub Pages = website + package index
External storage = actual .luma files
```

Examples of external storage:

- Cloudflare R2
- Amazon S3
- Backblaze B2
- Google Cloud Storage
- Your own VPS
- Any direct-download CDN

## GitHub Pages setup

1. Create a GitHub repo, for example:

```bash
luma-repo-website
```

2. Upload all files from this folder.

3. Go to:

```text
GitHub Repo → Settings → Pages
```

4. Set:

```text
Source: Deploy from branch
Branch: main
Folder: /root
```

5. Your repo website becomes:

```text
https://YOUR_USERNAME.github.io/luma-repo-website/
```

6. Your LUMA index URL becomes:

```text
https://YOUR_USERNAME.github.io/luma-repo-website/packages/index.json
```

## Add a package

1. Put your `.luma` file in `storage/` or upload it to external storage.
2. Edit `packages/index.json`.
3. Add a new package object:

```json
{
  "id": "my-app",
  "name": "My App",
  "version": "1.0.0",
  "description": "My first LUMA app.",
  "language": "Python",
  "tags": ["app", "demo"],
  "file": "../storage/my-app_1.0.0.luma",
  "sha256": "replace-with-real-sha256",
  "size": "5.2 MB",
  "downloads": 0,
  "homepage": "https://github.com/username/my-app",
  "install": "luma install my-app"
}
```

## Connect LUMA package manager

Your package manager should download:

```text
/packages/index.json
```

Then find the package by ID, download the `file` URL, verify `sha256`, and install the `.luma`.

Example command:

```bash
luma repo add official https://YOUR_USERNAME.github.io/luma-repo-website/packages/index.json
luma update
luma install aurora-notes
```
