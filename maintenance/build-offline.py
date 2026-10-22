#!/usr/bin/env python3
"""Package one presentation for opening from disk without a web server."""

import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import tempfile
import zipfile


ROOT = Path(__file__).resolve().parent.parent
SLUG = re.compile(r"\d{4}-\d{2}-\d{2}-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*")
ASSET_TYPES = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".css", ".ttf", ".otf", ".woff", ".woff2", ".txt"}
COMPRESSED_TYPES = {".mp4", ".mov", ".png", ".jpg", ".jpeg", ".webp", ".woff2"}


def build(slug):
    if not SLUG.fullmatch(slug):
        raise ValueError("Use a presentation folder named YYYY-MM-DD-Location")
    folder = (ROOT / slug).resolve(strict=True)
    raw_slides = (folder / "slides.js").read_text()
    deck = json.loads(raw_slides.split("window.DECK = ", 1)[1].rsplit(";", 1)[0])
    videos = [slide for slide in deck["slides"] if slide["type"] == "video"]
    files = {"index.html", "app.js", "styles.css", "slides.js"}
    for path in (folder / "assets").rglob("*"):
        if path.is_file() and path.suffix.lower() in ASSET_TYPES:
            files.add(path.relative_to(folder).as_posix())
    for slide in deck["slides"]:
        for field in ("src", "poster", "captions", "image"):
            if slide.get(field):
                files.add(slide[field])
    for name in files:
        source = (folder / name).resolve(strict=True)
        if not source.is_relative_to(folder) or not source.is_file():
            raise ValueError(f"Asset must be a file inside the presentation: {name}")

    # The offline copy opens directly in the deck; the online library is separate.
    html = (folder / "index.html").read_text()
    html, removed = re.subn(r'\s*<a\b[^>]*\bclass="library-link"[^>]*>.*?</a>', "", html, flags=re.S)
    if removed != 1:
        raise ValueError("Expected one library link in the presentation template")

    built_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    readme = f"""{deck['talkTitle']}
{deck['speaker']} — {deck['role']}, {deck['company']}
{deck['event']} — {deck['date']} — {deck['location']}

OFFLINE PRESENTATION

1. Copy this ZIP to the presentation computer or a USB drive.
2. Extract the entire ZIP. On Windows, right-click and choose Extract All.
   On macOS, double-click the ZIP to extract it.
3. Open index.html from the extracted folder in Google Chrome or Microsoft Edge.
   Do not open index.html while it is still inside the ZIP.
4. Click Present, or press F, for full screen.

Left / Right: previous / next slide
Space: play / pause the current video; selecting the video is unnecessary
G: slide overview; choose a slide to jump to it
N: speaker notes
B: black screen / resume
Home / End: first / last slide
?: all keyboard shortcuts

All {len(deck['slides'])} slides and {len(videos)} referenced videos are included, with images and fonts.
No internet, installation, or local web server is required to present.
Keep index.html, app.js, slides.js, styles.css, assets/ and media/ together.
Sound comes from the browser; select the presentation computer's audio output.
External reference and LinkedIn links need internet only if opened.

This is a snapshot built at {built_at}. Re-download after later deck changes.
Online presentation: https://sa-dev.agora.io/pr/{slug}/
SHA256SUMS.txt records the included files for integrity checking.
"""
    generated = {"index.html": html.encode(), "README-OFFLINE.txt": readme.encode()}
    output = folder / "media" / f"{slug}-offline.zip"
    prefix = f"{slug}-offline"
    checksums = []
    # The temporary extension keeps a partially written archive off the public URL.
    with tempfile.NamedTemporaryFile(dir=output.parent, suffix=".pending", delete=False) as temp:
        pending = Path(temp.name)
    try:
        with zipfile.ZipFile(pending, "w", allowZip64=True) as archive:
            for name in sorted(files | generated.keys()):
                data = generated[name] if name in generated else (folder / name).read_bytes()
                compression = zipfile.ZIP_STORED if Path(name).suffix.lower() in COMPRESSED_TYPES else zipfile.ZIP_DEFLATED
                archive.writestr(f"{prefix}/{name}", data, compress_type=compression)
                checksums.append(f"{hashlib.sha256(data).hexdigest()}  {name}")
            archive.writestr(f"{prefix}/SHA256SUMS.txt", "\n".join(checksums) + "\n", compress_type=zipfile.ZIP_DEFLATED)
        with zipfile.ZipFile(pending) as archive:
            if archive.testzip() is not None:
                raise ValueError("Archive integrity check failed")
        pending.chmod(0o644)
        pending.replace(output)
    finally:
        pending.unlink(missing_ok=True)
    return {
        "file": str(output),
        "url": f"https://sa-dev.agora.io/pr/{slug}/media/{output.name}",
        "bytes": output.stat().st_size,
        "slideCount": len(deck["slides"]),
        "videoCount": len(videos),
        "builtAt": built_at,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("presentation", help="Presentation folder, for example 2026-10-23-Beijing")
    args = parser.parse_args()
    print(json.dumps(build(args.presentation), indent=2))
