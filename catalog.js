(() => {
  "use strict";

  // Keep links shared before this library was introduced working.
  function redirectLegacySlideLink() {
    if (!/^#\/\d+$/.test(location.hash)) return false;
    location.replace(`2026-10-23-Beijing/${location.hash}`);
    return true;
  }
  if (redirectLegacySlideLink()) return;
  window.addEventListener("hashchange", redirectLegacySlideLink);

  const presentations = [...window.PRESENTATIONS].sort((a, b) => b.date.localeCompare(a.date));
  const list = document.getElementById("presentation-list");
  const search = document.getElementById("search");
  const empty = document.getElementById("empty-message");
  const count = document.getElementById("presentation-count");
  const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

  function el(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  const entries = presentations.map(presentation => {
    if (!/^\d{4}-\d{2}-\d{2}-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(presentation.slug)) {
      throw new Error(`Invalid presentation folder: ${presentation.slug}`);
    }
    const row = el("article", "presentation-row");
    const date = el("time", "presentation-date", dateFormatter.format(new Date(`${presentation.date}T00:00:00Z`)));
    date.dateTime = presentation.date;
    const location = el("div", "presentation-location", presentation.location);
    const details = el("div", "presentation-details");
    const visual = el("div", "presentation-visual");
    if (presentation.thumbnail) {
      const image = el("img");
      image.src = presentation.thumbnail;
      image.alt = "";
      image.loading = "lazy";
      visual.append(image);
    } else {
      visual.append(el("span", "visual-monogram", presentation.event));
    }
    const copy = el("div", "presentation-copy");
    copy.append(el("h2", "", presentation.event), el("p", "presentation-title", presentation.title), el("p", "presentation-slug", presentation.slug));
    details.append(visual, copy);
    const status = el("div", "presentation-status");
    status.append(el("span", "status-tag", presentation.status));
    if (presentation.slideCount) status.append(el("span", "slide-total", `${presentation.slideCount} slides${presentation.durationMinutes ? ` · ${presentation.durationMinutes} min` : ""}`));
    const link = el("a", "open-slides", "Open slides");
    link.href = `${presentation.slug}/`;
    link.setAttribute("aria-label", `Open ${presentation.event} presentation in ${presentation.location}, ${presentation.date}`);
    link.append(el("span", "open-arrow", "↗"));
    row.append(date, location, details, status, link);
    list.append(row);
    return {
      row,
      text: `${presentation.date} ${presentation.location} ${presentation.event} ${presentation.title} ${presentation.status} ${presentation.slug}`.toLowerCase()
    };
  });

  function filter() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    entries.forEach(entry => {
      entry.row.hidden = !entry.text.includes(query);
      if (!entry.row.hidden) visible++;
    });
    empty.hidden = visible > 0;
    count.textContent = `${visible} presentation${visible === 1 ? "" : "s"}`;
  }
  search.addEventListener("input", filter);
  filter();
})();
