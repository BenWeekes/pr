Ben Weekes — Chief Architect, Agora — Presentation library

Table of contents: https://sa-dev.agora.io/pr/
Repository: https://github.com/BenWeekes/pr
First presentation: https://sa-dev.agora.io/pr/2026-10-23-Beijing/

The root URL is a searchable table of contents, listed newest first.
Each presentation is a self-contained folder named YYYY-MM-DD-Location.
Use a capitalized, hyphen-separated location, for example:
    2026-10-23-Beijing
    2027-03-15-San-Francisco
The date is the presentation's event date, not its creation date.

LAYOUT

index.html           Table of contents
catalog.css          Table-of-contents styling
catalog.js           TOC rendering, search, and legacy link support
presentations.js     Catalog entries (one per presentation)
YYYY-MM-DD-Location/  HTML, JavaScript, styles, assets, and media for a talk
templates/           Original conference PowerPoint templates
maintenance/         Font helper and server-specific nginx route snippet

The original RTE2026.pptx is preserved in templates/. Its dark palette,
pixel background, conference logo, and bilingual styling are reused in
2026-10-23-Beijing/. That deck is a 15-minute talk with an opening, nine
video slots, two brief slides on early access and avatar integration,
and a closing. All nine demo clips are included: MrBeast on Whatnot,
GPT-Live with delegation, a Chinese avatar comparison followed by a separate
English TTS avatar comparison, avatar-assisted gaming, Human Driven Avatars
for Live Broadcast, an AI card-dealing avatar,
bilingual AI football commentary, and Signing Avatar. Card dealing and
AI commentary remain marked as work in progress.
The sequence is a working draft; review the visuals and flow before choosing
the final slides and timings.
The date and location come from slide 3 of the PowerPoint; update the
folder, catalog entry, and slides.js if necessary. Pacing and media source
details are in the presentation's run-of-show.txt and media/sources.json.
The opening and closing use Ben's circular portrait. The closing includes
a large LinkedIn QR code and a clickable profile URL. Edit speakerPhoto,
linkedinUrl and linkedinQr in slides.js to change these; provenance is in
assets/profile-sources.json. The QR is a local SVG and needs no third-party
service when presenting.

ADDING A PRESENTATION

1. Create a YYYY-MM-DD-Location folder. To reuse the starter deck:
       cp -a 2026-10-23-Beijing 2027-03-15-San-Francisco
2. Edit its slides.js: title, speaker, event, date, location, content, notes.
   Replace conference-specific artwork and branding as appropriate.
3. Add an entry to presentations.js with slug, date (YYYY-MM-DD), location,
   event, title, status, slideCount, optional durationMinutes, and thumbnail.
4. Put video and image files inside that presentation's media/ or assets/.
5. If adding Chinese text, update its self-hosted font subsets:
       python3 maintenance/update-chinese-fonts.py 2027-03-15-San-Francisco
6. Refresh the live TOC and deck, then commit and push the changes.

There is no build, npm installation, or CDN. nginx serves this checkout
directly, so local edits are live on refresh. No nginx reload is needed
when adding a folder that follows the naming convention. A GitHub push
stores the source; changes made on GitHub must be pulled to this server
to update the live site. No automatic GitHub deployment is configured.

EDITING A DECK

Edit YYYY-MM-DD-Location/slides.js to change the title, speaker details,
content, order, and notes. Add or duplicate objects in DECK.slides for
more slides. Types: title, agenda, section, content, columns, table, protocol,
video, qa, thanks, and cover. A cover uses the conference opening artwork:
    { id: "conference", type: "cover", label: "Conference" }

Edit the deck's styles.css for styling and app.js for player behavior.
The canvas is 1600 x 900 (16:9), scaled to fit the browser without cropping.
Each deck's index.html also works when opened directly from disk.
The All presentations link returns to the table of contents.

VIDEOS AND IMAGES

Put videos in the deck's media/ folder and set a video slide's src:
    src: "media/demo-01.mp4"
Optional: poster: "media/demo-01.jpg", captions: "media/demo-01.vtt".
Use H.264 video and AAC audio in MP4 for broad browser compatibility.
Videos have native controls and pause when changing slides or blanking
the screen. Duplicate video slides for more clips. Keep clips within the
talk's time budget when choosing the final presentation sequence.

For a content slide, set image to a relative path in assets/ or media/
and set imageAlt to describe the visual. Media paths are relative to the
presentation folder, so the whole folder can be copied or downloaded.

CONTROLS

Left / Right arrows or Page Up / Page Down: previous or next slide
Space: play / pause the current slide's video; no action on other slides
Home / End: first / last slide
F: full screen (or use the Present button)
G: slide overview
N: speaker notes
B: black screen / resume
K: play / pause the current video
?: keyboard help
Esc: close a panel or exit full screen
Swipe left / right on touch screens to change slides.
Arrows and Space work without selecting the video, including when a video
control or toolbar button has focus. Enter still activates focused buttons.
Direct slide links use YYYY-MM-DD-Location/#/1, #/2, etc.
Original /pr/#/N links redirect to 2026-10-23-Beijing/#/N.
Browser printing prints one page per slide.

LOCAL FONTS

Small Noto Sans SC subsets are self-hosted inside each deck's assets/fonts/
for the current Chinese text. The maintenance command needs internet
access during development; the finished presentation loads fonts only
from this server. The SIL Open Font License is included alongside them.
Additional Chinese text also falls back to the viewing computer's fonts.

HOSTING

nginx route: /etc/nginx/snippets/pr-slides.locations.conf
Source copy: maintenance/pr-slides.locations.conf
Included inside the existing sa-dev.agora.io HTTPS server in:
    /etc/nginx/conf.d/sa-dev.conf

The route publishes the TOC and public files in dated presentation
folders. Git metadata, maintenance scripts, this README, and templates
are not served by nginx. Directory listing is disabled. Files use no-cache
so browser refreshes pick up edits; byte range requests support videos.
HTTP redirects to HTTPS, and directory URLs redirect to a trailing slash.

A named ACL gives www-data traverse permission on /home/ubuntu, without
read or directory-listing permission there. Keep presentation folders
traversable and public files readable by www-data (normally 755 / 644).

After modifying server configuration, test before reloading:
    sudo nginx -t
    sudo systemctl reload nginx

Prior server config, route, and ACL backups are under /var/backups/pr-slides/.
