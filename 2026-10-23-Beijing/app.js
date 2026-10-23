(() => {
  "use strict";

  const deck = window.DECK;
  const stage = document.getElementById("stage");
  const viewport = document.getElementById("viewport");
  const overview = document.getElementById("overview-dialog");
  const notes = document.getElementById("notes-dialog");
  const help = document.getElementById("help-dialog");
  const blackout = document.getElementById("blackout");
  const previous = document.getElementById("previous-button");
  const next = document.getElementById("next-button");
  let current = -1;
  let controlsTimer;
  let toastTimer;
  let touchStart = null;

  // Content is text, never executable HTML. This also keeps later edits simple.
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function svgIcon(kind) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", kind === "play" ? "M23 15v34l27-17Z" : "M8 10h48v44H8zM8 42l14-14 11 12 9-9 14 15M41 19h.01");
    svg.append(path);
    return svg;
  }

  function image(path, alt, className) {
    const img = el("img", className);
    img.src = path;
    img.alt = alt;
    img.draggable = false;
    return img;
  }

  function header(slide) {
    const heading = el("div", "slide-header");
    heading.append(el("p", "kicker", slide.kicker), el("h2", "", slide.title));
    if (slide.subtitle) heading.append(el("p", "slide-subtitle", slide.subtitle));
    return heading;
  }

  function videoPlaceholder(slide) {
    const placeholder = el("div", "video-placeholder");
    const symbol = el("div", "play-symbol");
    symbol.append(svgIcon("play"));
    placeholder.append(symbol, el("h3", "", slide.caption || "Demo video"), el("p", "", slide.src ? "Video demonstration" : "Video to be added"));
    if (slide.poster) {
      placeholder.style.backgroundImage = `linear-gradient(#080c1499, #080c1499), url(${JSON.stringify(slide.poster)})`;
      placeholder.style.backgroundSize = "cover";
      placeholder.style.backgroundPosition = "center";
    }
    return placeholder;
  }

  function renderSlide(slide, index, thumbnail = false) {
    const section = el("section", `slide slide-${slide.type}`);
    section.dataset.slideId = slide.id;
    if (slide.portrait) section.classList.add("portrait-video");
    if (slide.type === "video" && slide.subtitle) section.classList.add("has-subtitle");
    section.setAttribute("aria-label", `${index + 1}. ${slide.label}`);
    if (thumbnail) {
      section.setAttribute("aria-hidden", "true");
      section.inert = true;
    }
    if (["title", "section", "qa", "thanks"].includes(slide.type)) section.classList.add("artwork");
    if (slide.type !== "cover") section.append(image("assets/event-logo.png", "iRTE 2026 / 实时智能大会", "event-logo"));

    switch (slide.type) {
      case "cover":
        section.classList.add("slide-cover");
        break;
      case "title": {
        const content = el("div", "title-content");
        content.append(el("p", "kicker", slide.kicker), el("h1", "", slide.title));
        if (slide.subtitle) content.append(el("p", "title-subtitle", slide.subtitle));
        const speaker = el("div", "title-speaker");
        if (deck.speakerPhoto) speaker.append(image(deck.speakerPhoto, `${deck.speaker} portrait`, "speaker-portrait"));
        const details = el("div", "speaker-details");
        details.append(el("p", "speaker-name", deck.speaker), el("p", "speaker-role", `${deck.role} · ${deck.company}`), el("p", "event-date", `${deck.date} · ${deck.location}`));
        speaker.append(details);
        section.append(content, speaker);
        break;
      }
      case "agenda": {
        section.append(header(slide));
        const list = el("div", "agenda-list");
        slide.items.forEach((item, i) => {
          const row = el("div", "agenda-row");
          row.append(el("span", "agenda-number", String(i + 1).padStart(2, "0")), el("h3", "", item.title), el("p", "", item.detail));
          list.append(row);
        });
        section.append(list);
        break;
      }
      case "section": {
        const content = el("div", "section-content");
        content.append(el("div", "section-number", slide.number), el("h2", "", slide.title), el("p", "section-subtitle", slide.subtitle));
        section.append(content, el("span", "section-next", "> NEXT"));
        break;
      }
      case "content": {
        section.append(header(slide));
        const layout = el("div", "content-layout");
        const copy = el("div", "content-copy");
        copy.append(el("h3", "", slide.heading), el("p", "", slide.body));
        if (slide.bullets?.length) {
          const list = el("ul");
          slide.bullets.forEach(point => list.append(el("li", "", point)));
          copy.append(list);
        }
        let visual;
        if (slide.image) {
          visual = image(slide.image, slide.imageAlt || "", "content-image");
        } else {
          visual = el("div", "visual-placeholder");
          visual.append(svgIcon("image"), el("span", "", slide.visualLabel || "Image or diagram"));
        }
        layout.append(copy, visual);
        section.append(layout);
        break;
      }
      case "columns": {
        section.append(header(slide));
        const columns = el("div", "columns-layout");
        slide.items.forEach((item, i) => {
          const column = el("div", "point-column");
          column.append(el("span", "point-index", `0${i + 1} /`), el("h3", "", item.title), el("p", "", item.body));
          columns.append(column);
        });
        section.append(columns);
        break;
      }
      case "table": {
        section.append(header(slide));
        const table = el("table", "model-table");
        table.setAttribute("aria-label", slide.title);
        const head = el("thead");
        const headings = el("tr");
        slide.headers.forEach(text => {
          const cell = el("th", "", text);
          cell.scope = "col";
          headings.append(cell);
        });
        head.append(headings);
        const body = el("tbody");
        slide.rows.forEach(row => {
          const tr = el("tr");
          row.forEach((text, column) => {
            const cell = el(column === 0 ? "th" : "td", column === 2 ? "model-name" : "", text);
            if (column === 0) cell.scope = "row";
            if (column === 1) {
              cell.textContent = "";
              const badge = el("span", "model-type", text);
              badge.dataset.type = text;
              cell.append(badge);
            }
            tr.append(cell);
          });
          body.append(tr);
        });
        table.append(head, body);
        section.append(table);
        if (slide.legend) section.append(el("p", "model-legend", slide.legend));
        break;
      }
      case "protocol": {
        section.append(header(slide));
        if (slide.sessionNote) section.append(el("p", "protocol-session", slide.sessionNote));
        const flow = el("div", "protocol-flow");
        flow.setAttribute("role", "img");
        flow.setAttribute("aria-label", slide.diagramDescription || slide.nodes.map(node => node.title.replaceAll("\n", " ")).join(" → "));
        slide.nodes.forEach((item, i) => {
          if (i) {
            const arrow = el("div", "protocol-arrow");
            arrow.setAttribute("aria-hidden", "true");
            const link = slide.links?.[i - 1];
            if (link?.label) arrow.append(el("span", "protocol-link-label", link.label));
            arrow.append(el("span", "protocol-link-arrow", "→"));
            if (link?.detail) arrow.append(el("span", "protocol-link-detail", link.detail));
            flow.append(arrow);
          }
          const node = el("div", `protocol-node protocol-node-${i + 1}`);
          node.append(el("span", "protocol-node-label", item.label), el("h3", "", item.title), el("p", "", item.detail));
          flow.append(node);
        });
        section.append(flow, el("p", "protocol-takeaway", slide.takeaway));
        if (slide.sourceUrl) {
          const source = el("a", "protocol-source", slide.sourceLabel || "Reference implementation ↗");
          source.href = slide.sourceUrl;
          source.target = "_blank";
          source.rel = "noopener noreferrer";
          section.append(source);
        }
        break;
      }
      case "video": {
        section.append(header(slide));
        const frame = el("div", "video-frame");
        if (slide.src && !thumbnail) {
          const video = el("video");
          video.controls = true;
          video.playsInline = true;
          video.preload = "metadata";
          video.setAttribute("aria-label", slide.caption || slide.title);
          video.dataset.src = slide.src;
          // Native media buttons can trap keys inside the browser's controls.
          // Keep focus on the page so presentation shortcuts always receive them.
          video.addEventListener("focusin", () => video.blur());
          if (slide.poster) video.poster = slide.poster;
          if (slide.captions) {
            const track = el("track");
            track.kind = "captions";
            track.src = slide.captions;
            track.srclang = slide.captionsLanguage || "en";
            track.label = "Captions";
            video.append(track);
          }
          video.addEventListener("error", () => {
            if (frame.querySelector(".video-error")) return;
            const message = el("div", "video-error");
            message.append(el("strong", "", "Video unavailable"), el("span", "", "Check the video file and format, then reload the presentation."));
            frame.append(message);
          });
          frame.append(video);
        } else {
          frame.append(videoPlaceholder(slide));
        }
        section.append(frame);
        if (slide.heroNumber) {
          const intro = el("div", "video-intro");
          intro.append(el("p", "video-hero-number", slide.heroNumber), el("p", "video-hero-label", slide.heroLabel));
          if (slide.context) intro.append(el("p", "video-context", slide.context));
          if (slide.sourceUrl) {
            const source = el("a", "video-source", slide.sourceLabel || "Source");
            source.href = slide.sourceUrl;
            source.target = "_blank";
            source.rel = "noopener noreferrer";
            intro.append(source);
          }
          section.append(intro);
        }
        break;
      }
      case "qa": {
        const content = el("div", "qa-content");
        content.append(el("h2", "", slide.title), el("p", "qa-subtitle", slide.subtitle));
        if (slide.chinese) content.append(el("p", "qa-chinese", slide.chinese));
        content.append(el("p", "qa-speaker", `${deck.speaker} / ${deck.role} · ${deck.company}`));
        section.append(content);
        break;
      }
      case "thanks": {
        const content = el("div", "thanks-content");
        content.append(el("h2", "", slide.title), el("p", "thanks-chinese", slide.subtitle));
        const speaker = el("div", "thanks-identity");
        if (deck.speakerPhoto) speaker.append(image(deck.speakerPhoto, `${deck.speaker} portrait`, "speaker-portrait"));
        const details = el("div", "speaker-details");
        details.append(el("p", "thanks-speaker", deck.speaker), el("p", "thanks-role", `${deck.role} · ${deck.company}`));
        speaker.append(details);
        content.append(speaker);
        const pixels = el("div", "color-pixels");
        pixels.setAttribute("aria-hidden", "true");
        for (let i = 0; i < 4; i++) pixels.append(el("span"));
        content.append(pixels);
        section.append(content);
        if (deck.linkedinUrl && deck.linkedinQr) {
          const contact = el("aside", "contact-panel");
          contact.setAttribute("aria-label", "Connect with the speaker");
          contact.append(el("h3", "contact-heading", "Connect on LinkedIn"));
          const code = el("a", "contact-code");
          code.href = deck.linkedinUrl;
          code.target = "_blank";
          code.rel = "noopener noreferrer";
          code.setAttribute("aria-label", `Open ${deck.speaker}'s LinkedIn profile`);
          code.append(image(deck.linkedinQr, `QR code for ${deck.speaker}'s LinkedIn profile`, "contact-qr"));
          const link = el("a", "contact-link", deck.linkedinUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""));
          link.href = deck.linkedinUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          contact.append(code, link);
          section.append(contact);
        }
        break;
      }
      default:
        throw new Error(`Unknown slide type: ${slide.type}`);
    }

    if (slide.type !== "cover") {
      const footer = el("div", "slide-footer");
      footer.append(el("span", "footer-speaker", `${deck.speaker} / ${deck.company}`), el("span", "page-number", String(index + 1).padStart(2, "0")));
      section.append(footer);
    }
    return section;
  }

  const slides = deck.slides.map((slide, index) => {
    const node = renderSlide(slide, index);
    node.hidden = true;
    node.inert = true;
    stage.append(node);
    return node;
  });

  const thumbnailButtons = deck.slides.map((slide, index) => {
    const button = el("button", "thumbnail");
    button.setAttribute("aria-label", `Go to slide ${index + 1}: ${slide.label}`);
    const frame = el("div", "thumbnail-frame");
    frame.append(renderSlide(slide, index, true));
    const caption = el("div", "thumbnail-caption");
    caption.append(el("span", "", String(index + 1).padStart(2, "0")), el("strong", "", slide.label));
    button.append(frame, caption);
    button.addEventListener("click", () => {
      overview.close();
      goTo(index);
    });
    document.getElementById("thumbnails").append(button);
    return button;
  });

  function resize() {
    const style = getComputedStyle(viewport);
    const availableWidth = viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const availableHeight = viewport.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const scale = Math.max(0, Math.min(availableWidth / 1600, availableHeight / 900));
    stage.style.width = `${1600 * scale}px`;
    stage.style.height = `${900 * scale}px`;
    slides.forEach(slide => { slide.style.transform = `scale(${scale})`; });
  }
  new ResizeObserver(resize).observe(viewport);

  function updateNotes() {
    document.getElementById("notes-slide-number").textContent = `SLIDE ${current + 1} / ${deck.slides[current].label.toUpperCase()}`;
    document.getElementById("notes-content").textContent = deck.slides[current].notes || "No notes for this slide.";
  }

  function goTo(index, updateHash = true) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    if (index === current) return;
    if (current >= 0) {
      slides[current].querySelectorAll("video").forEach(video => video.pause());
      slides[current].hidden = true;
      slides[current].inert = true;
    }
    current = index;
    slides[current].hidden = false;
    slides[current].inert = false;
    const video = slides[current].querySelector("video");
    if (video && !video.hasAttribute("src")) video.src = video.dataset.src;
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    document.getElementById("slide-count").textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    document.getElementById("slide-label").textContent = deck.slides[current].label;
    document.getElementById("progress").style.width = `${((current + 1) / slides.length) * 100}%`;
    thumbnailButtons.forEach((button, i) => button.setAttribute("aria-current", String(i === current)));
    document.getElementById("announcement").textContent = `Slide ${current + 1} of ${slides.length}: ${deck.slides[current].label}`;
    document.title = `${deck.slides[current].label} · ${deck.speaker} · ${deck.event}`;
    updateNotes();
    if (updateHash) history.replaceState(null, "", `#/` + (current + 1));
  }

  function fromHash() {
    const match = location.hash.match(/^#\/(\d+)$/);
    goTo(match ? Number(match[1]) - 1 : 0, false);
  }
  window.addEventListener("hashchange", fromHash);
  previous.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));

  function openDialog(dialog) {
    if (!dialog.open) {
      dialog.showModal();
      if (dialog === overview) thumbnailButtons[current].focus();
    }
  }
  document.getElementById("overview-button").addEventListener("click", () => openDialog(overview));
  document.getElementById("notes-button").addEventListener("click", () => openDialog(notes));
  document.getElementById("help-button").addEventListener("click", () => openDialog(help));
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });

  function toast(message) {
    const node = document.getElementById("toast");
    clearTimeout(toastTimer);
    node.textContent = message;
    node.hidden = false;
    toastTimer = setTimeout(() => { node.hidden = true; }, 4500);
  }

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else toast("Use your browser’s full-screen option to present.");
    } catch {
      toast("Full screen is unavailable here. Use your browser’s full-screen option.");
    }
  }
  document.getElementById("fullscreen-button").addEventListener("click", fullscreen);
  document.addEventListener("fullscreenchange", () => {
    const active = Boolean(document.fullscreenElement);
    document.body.classList.toggle("presenting", active);
    const button = document.getElementById("fullscreen-button");
    button.querySelector("span").textContent = active ? "Exit" : "Present";
    button.title = active ? "Exit full screen (F / Esc)" : "Full screen (F)";
    showControls();
    requestAnimationFrame(resize);
  });

  function showControls() {
    if (!document.fullscreenElement) return;
    document.body.classList.add("show-controls");
    clearTimeout(controlsTimer);
    controlsTimer = setTimeout(() => document.body.classList.remove("show-controls"), 1800);
  }
  document.addEventListener("pointermove", showControls);

  function toggleBlackout() {
    blackout.hidden = !blackout.hidden;
    if (!blackout.hidden) {
      slides[current].querySelectorAll("video").forEach(video => video.pause());
      document.getElementById("resume-button").focus();
    } else {
      document.getElementById("fullscreen-button").focus();
    }
  }
  document.getElementById("resume-button").addEventListener("click", toggleBlackout);

  document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.target.closest("input, textarea, select, [contenteditable=true]")) return;
    if (document.querySelector("dialog[open]")) return;
    const key = event.key.toLowerCase();
    if (!blackout.hidden) {
      if (["b", "escape", " ", "enter"].includes(key)) { event.preventDefault(); toggleBlackout(); }
      return;
    }
    // Presentation shortcuts work regardless of focus, including native video controls.
    if (!["arrowdown", "pagedown", "arrowup", "pageup", "home", "end", "f", "g", "n", "?", "b", " ", "k"].includes(key)) return;
    event.preventDefault();
    event.stopPropagation();
    switch (key) {
      case "arrowdown": case "pagedown": goTo(current + 1); break;
      case "arrowup": case "pageup": goTo(current - 1); break;
      case "home": goTo(0); break;
      case "end": goTo(slides.length - 1); break;
      case "f": fullscreen(); break;
      case "g": openDialog(overview); break;
      case "n": openDialog(notes); break;
      case "?": openDialog(help); break;
      case "b": toggleBlackout(); break;
      case " ": case "k": {
        if (event.repeat) break;
        const video = slides[current].querySelector("video");
        if (video) {
          if (video.paused) video.play().catch(() => toast("The video could not play. Check its file and format."));
          else video.pause();
        }
        break;
      }
    }
  }, { capture: true });

  viewport.addEventListener("touchstart", event => {
    if (event.target.closest("video, button") || !blackout.hidden || event.touches.length !== 1) { touchStart = null; return; }
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  viewport.addEventListener("touchend", event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  viewport.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });

  fromHash();
  resize();
})();
