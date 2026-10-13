#!/usr/bin/env python3
"""Save small, local Noto Sans SC subsets for the Chinese text in the deck.

Run after adding Chinese text. Requires network only during development;
the presentation itself loads fonts exclusively from this server.
"""
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import argparse
import re

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("presentation", help="Presentation folder, e.g. 2026-10-23-Beijing")
args = parser.parse_args()
if not re.fullmatch(r"\d{4}-\d{2}-\d{2}-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*", args.presentation):
    parser.error("Use a YYYY-MM-DD-Location folder name.")
root = Path(__file__).resolve().parent.parent / args.presentation
if not (root / "slides.js").is_file():
    parser.error("Presentation folder must contain slides.js.")
content = (root / "slides.js").read_text() + (root / "app.js").read_text()
characters = "".join(sorted(set(re.findall(r"[\u3000-\u9fff]", content))))
destination = root / "assets" / "fonts"
destination.mkdir(parents=True, exist_ok=True)
css_url = "https://fonts.googleapis.com/css2?" + urlencode({
    "family": "Noto Sans SC:wght@400;700", "text": characters, "display": "swap"
})
with urlopen(Request(css_url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30) as response:
    css = response.read().decode()
faces = re.findall(r"@font-face\s*\{(.*?)\}", css, re.S)
if len(faces) != 2:
    raise RuntimeError("Expected regular and bold font subsets; no fonts changed.")
local_faces = []
files = {}
for face in faces:
    weight = re.search(r"font-weight:\s*(\d+)", face).group(1)
    url = re.search(r"url\(([^)]+)\)", face).group(1)
    font_format = re.search(r"format\('([^']+)'\)", face).group(1)
    extension = {"truetype": "ttf", "woff2": "woff2", "woff": "woff"}[font_format]
    name = f"chinese-{weight}.{extension}"
    with urlopen(url, timeout=30) as response:
        files[name] = response.read()
    ranges = ", ".join(f"U+{ord(c):04X}" for c in characters)
    local_faces.append(
        "@font-face {\n"
        "  font-family: 'iRTE CJK';\n"
        "  font-style: normal;\n"
        f"  font-weight: {weight};\n"
        "  font-display: swap;\n"
        f"  src: url('{name}') format('{font_format}');\n"
        f"  unicode-range: {ranges};\n"
        "}\n"
    )
with urlopen("https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/OFL.txt", timeout=30) as response:
    license_text = ("\n".join(line.rstrip() for line in response.read().decode().splitlines()) + "\n").encode()
for name, data in files.items():
    (destination / name).write_bytes(data)
(destination / "OFL.txt").write_bytes(license_text)
(destination / "fonts.css").write_text("\n".join(local_faces))
print(f"Saved local regular/bold fonts for {len(characters)} Chinese characters ({sum(map(len, files.values())):,} bytes).")
