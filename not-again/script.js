/* =========================================================
   NOT AGAIN. — script.js
   ========================================================= */

/* ---------- 1. Categories ----------
   The order here is the order of the filter buttons. */
const TYPES = ["BAD TIMING", "BAD LUCK", "INTERRUPTION", "EXTRA EFFORT", "WAITING", "ALMOST"];
const BLAMES = ["MYSELF", "SOMEONE ELSE", "AN OBJECT", "THE UNIVERSE"];

/* ---------- TEXT / IMAGE view ----------
   Which view the site opens in. The TEXT / IMAGE buttons switch it live.
   true  = image view: every text box shows a photo; hover reveals the text box
   false = text view: the regular text archive */
const IMAGE_MODE = false; // the site opens in the TEXT view
let imageMode = IMAGE_MODE;

/* ---------- 2. Font sizes (= frustration level) ----------
   Measured from the Figma screenshot, in Figma pixels. */
const SIZE = {
  small: 22,
  medium: 33,
  large: 44
};

/* ---------- 3. The archive ----------
   x, y  = top-left corner in Figma pixels (frame is 1516 × 984)
   w, h  = box width and height in Figma pixels
   z     = stacking order (higher = on top) for overlaps
   text  = use \n where you want a line break (matches the Figma line breaks)
   type  = list of TYPE tags, e.g. ["BAD TIMING", "ALMOST"]
   blame = one WHO TO BLAME category, or a list: ["MYSELF", "THE UNIVERSE"]
   description = the explanation shown in the lightbox (edit freely)
   detailImage = (optional) image shown in the lightbox for a text item,
                 e.g. detailImage: "images/traffic-light.jpg"
   level = (image items only) 1, 2 or 3 — text items get it from their size
   img   = position and size in the IMAGE view (Figma pixels), from the image-view layout.
           rotate: degrees · crop: true fills the box (cropped) · frame: true adds a thin border.
           Items without img don't appear in the IMAGE view.

   Image items use  image: "images/filename.png"  instead of text.
   fit: "cover" fills the box (photos), "contain" keeps the whole image (cut-outs). */
const ITEMS = [
  /* ----- text items ----- */
  {
    id: "fell-asleep-light",
    img: { x: 482, y: 164, w: 132, h: 218, z: 1 },
    cutout: true,
    text: "Almost fell asleep, then\nremembered the light\nwas on.",
    size: SIZE.medium,
    x: 405, y: 199, w: 345, h: 131, z: 2,
    type: ["ALMOST"],
    blame: "MYSELF",
    description: "I was already comfortable in bed when I noticed the light was still on. I tried ignoring it for a minute, but eventually got up to turn it off."
  },
  {
    id: "traffic-light",
    img: { x: 873, y: 171, w: 139, h: 184, z: 1 },
    text: "The traffic light\nturned red just as I\narrived.",
    size: SIZE.small,
    x: 867, y: 241, w: 186, h: 86, z: 3,
    type: ["BAD TIMING"],
    blame: "THE UNIVERSE",
    description: "I could see the countdown getting close to zero as I walked toward the crossing. By the time I got there, the light had already turned red."
  },
  {
    id: "sold-out",
    img: { x: 1178, y: 209, w: 280, h: 146, z: 1, crop: true, frame: true },
    text: "The item sold\nout while I was\nchecking out.",
    size: SIZE.medium,
    x: 1208, y: 233, w: 221, h: 125, z: 3,
    type: ["BAD TIMING"],
    blame: "SOMEONE ELSE",
    description: "I spent a while deciding whether to buy it. By the time I entered my payment information, it was already sold out."
  },
  {
    id: "escalator",
    img: { x: 258, y: 165, w: 145, h: 126, z: 1 },
    text: "The escalator was\nout of order.",
    size: SIZE.small,
    x: 280, y: 303, w: 186, h: 69, z: 2,
    type: ["EXTRA EFFORT"],
    blame: "AN OBJECT",
    description: "I walked toward the escalator expecting a quick ride up. There was a sign at the bottom telling everyone to take the stairs instead."
  },
  {
    id: "under-sofa",
    img: { x: 958, y: 339, w: 277, h: 247, z: 2 },
    cutout: true,
    text: "I dropped\nsomething and it\nrolled under the\nsofa.",
    size: SIZE.medium,
    x: 977, y: 318, w: 257, h: 167, z: 2,
    type: ["BAD LUCK"],
    blame: "MYSELF",
    description: "I dropped something small on the floor and watched it roll straight under the sofa. I ended up lying on the floor trying to reach it."
  },
  {
    id: "download-99",
    cutout: true,
    img: { x: 1243, y: 376, w: 212, h: 129, z: 1 },
    text: "The download\nfailed at 99%.",
    size: SIZE.medium,
    x: 1258, y: 397, w: 200, h: 84, z: 2,
    type: ["INTERRUPTION", "ALMOST"],
    blame: "AN OBJECT",
    description: "I left my computer running while the file downloaded. When I came back, it had stopped at 99%, and I had to start over."
  },
  {
    id: "remote",
    cutout: true,
    img: { x: 356, y: 275, w: 92, h: 118, z: 2 },
    text: "The remote\nwas just\nout of\nreach.",
    size: SIZE.small,
    x: 63, y: 523, w: 116, h: 116, z: 3,
    type: ["EXTRA EFFORT"],
    blame: "AN OBJECT",
    description: "I had finally found a comfortable position on the couch. The remote was sitting on the table, just far enough away that I had to get up."
  },
  {
    id: "packaging-tape",
    img: { x: 315, y: 442, w: 198, h: 120, z: 1, rotate: 90 },
    cutout: true,
    text: "The sticker\nwouldn't peel\noff cleanly.",
    size: SIZE.small,
    x: 537, y: 428, w: 137, h: 115, z: 2,
    type: ["EXTRA EFFORT"],
    blame: "AN OBJECT",
    description: "I bought something new and tried to peel off the sticker. Instead of coming off in one piece, it kept tearing into tiny bits, leaving paper and sticky residue all over it."
  },
  {
    id: "shoes-on",
    img: { x: 92, y: 417, w: 166, h: 223, z: 2 },
    text: "Put my shoes on,\nthen remembered I\nforgot something.",
    size: SIZE.medium,
    x: 161, y: 615, w: 288, h: 127, z: 2,
    type: ["EXTRA EFFORT"],
    blame: "MYSELF",
    description: "I was completely ready to leave when I remembered something I had left inside. I didn't want to take my shoes off again, so I took off just one and hopped back inside on one foot."
  },
  {
    id: "line-closed",
    img: { x: 421, y: 482, w: 186, h: 256, z: 2 },
    cutout: true,
    text: "The line closed\nright before\nmy turn.",
    size: SIZE.large,
    x: 461, y: 538, w: 288, h: 163, z: 3,
    type: ["BAD TIMING", "ALMOST"],
    blame: "SOMEONE ELSE",
    description: "I had been waiting in line for what felt like twenty minutes (probably five). Just as I was getting close to the front, the counter closed and I had to find another line."
  },
  {
    id: "bus-doors",
    img: { x: 852, y: 580, w: 148, h: 220, z: 1 },
    text: "The bus doors\nclosed right in\nfront of me.",
    size: SIZE.medium,
    x: 890, y: 496, w: 221, h: 124, z: 2,
    type: ["BAD TIMING", "ALMOST"],
    blame: "SOMEONE ELSE",
    description: "I saw the bus and walked a little faster to catch it. I reached the door just as it closed and watched the bus pull away."
  },
  {
    id: "elevator-full",
    img: { x: 1244, y: 519, w: 142, h: 188, z: 1 },
    text: "Waited for the\nelevator.\nIt was full.",
    size: SIZE.medium,
    x: 1274, y: 538, w: 214, h: 133, z: 3,
    type: ["WAITING"],
    blame: "SOMEONE ELSE",
    description: "I waited for the elevator and watched the floor numbers slowly change. When it finally arrived, there wasn't enough room for me to get in."
  },
  {
    id: "refreshed-page",
    img: { x: 1123, y: 713, w: 325, h: 182, z: 1 },
    text: "I accidentally\nrefreshed the\npage and lost\neverything.",
    size: SIZE.large,
    x: 1182, y: 664, w: 276, h: 237, z: 2,
    type: ["INTERRUPTION"],
    blame: "MYSELF",
    description: "I was working on something for a while without saving it. I accidentally refreshed the page, and everything I had typed disappeared."
  },
  {
    id: "hot-water",
    img: { x: 458, y: 787, w: 111, h: 146, z: 2 },
    text: "The hot water stopped\nworking mid–shower.",
    size: SIZE.small,
    x: 466, y: 775, w: 213, h: 64, z: 3,
    type: ["INTERRUPTION"],
    blame: "AN OBJECT",
    description: "I was halfway through my shower when the water suddenly turned cold. I waited for it to warm up again, but it never did."
  },
  {
    id: "wet-floor",
    img: { x: 643, y: 800, w: 177, h: 116, z: 1, rotate: -80 },
    cutout: true,
    text: "Stepped on a wet floor\nwearing socks.",
    size: SIZE.small,
    x: 624, y: 854, w: 220, h: 59, z: 2,
    type: ["BAD LUCK"],
    blame: "THE UNIVERSE",
    description: "I walked into the bathroom without realizing the floor was wet. One of my socks got soaked, so I had to go change it."
  },
  {
    id: "printer-offline",
    img: { x: 942, y: 751, w: 135, h: 181, z: 2 },
    text: "The printer was\noffline when I\nneeded it.",
    size: SIZE.medium,
    x: 911, y: 787, w: 228, h: 125, z: 2,
    type: ["INTERRUPTION"],
    blame: "AN OBJECT",
    description: "I had everything ready to print, but my computer couldn't connect to the printer. I tried turning it off and on again before giving up."
  },

  /* ----- image-based frustrations ----- */
  {
    id: "elevator-every-floor",
    img: { x: 40, y: 208, w: 193, h: 242, z: 1 },
    title: "The elevator stopped at every single floor",
    image: "images/elevator-floor-4.jpg",
    fit: "cover",
    level: 2,
    x: 56, y: 200, w: 193, h: 241, z: 1,
    type: ["WAITING"],
    blame: "AN OBJECT",
    description: "I was heading to the top floor when I noticed every single floor button was lit up. The elevator stopped at every floor, even though nobody was getting on or off."
  },

  /* DRAFT classifications for the other images — edit the title, description,
     type and blame to match what each image means to you. */
  {
    id: "image-earphones",
    img: { x: 278, y: 604, w: 143, h: 146, z: 1 },
    title: "My earphones got tangled in my bag.",
    image: "images/earphones.jpg",
    fit: "contain",
    level: 1,
    x: 276, y: 413, w: 140, h: 145, z: 1,
    type: ["EXTRA EFFORT"],
    blame: "AN OBJECT",
    description: "I reached into my bag to grab my earphones, but they were tangled around everything else. I spent the next minute trying to separate the wires."
  },
  {
    id: "image-umbrella",
    img: { x: 1040, y: 225, w: 110, h: 103, z: 1 },
    title: "Carried an umbrella all day. It never rained.",
    image: "images/umbrella.jpg",
    fit: "contain",
    level: 1,
    x: 1092, y: 160, w: 108, h: 106, z: 1,
    type: ["BAD LUCK"],
    blame: "THE UNIVERSE",
    description: "I brought it just in case. The sky stayed perfectly clear, and I held it the whole day."
  },
  {
    id: "image-toilet",
    img: { x: 598, y: 227, w: 272, h: 371, z: 3 },
    title: "My stomach started hurting, and there was no bathroom in sight.",
    image: "images/toilet.png",
    fit: "contain",
    level: 3,
    x: 680, y: 287, w: 212, h: 292, z: 6,
    type: ["BAD TIMING"],
    blame: ["MYSELF", "THE UNIVERSE"],
    description: "I was walking down the street when my stomach suddenly started hurting really badly. I looked around for a bathroom, but there wasn't one anywhere nearby. The more I walked, the more desperate I got."
  },
  {
    id: "image-alarm",
    img: { x: 63, y: 765, w: 422, h: 114, z: 1 },
    title: "Woke up one minute before the alarm.",
    image: "images/alarm-715.jpg",
    fit: "cover",
    level: 2,
    x: 78, y: 794, w: 448, h: 118, z: 1,
    type: ["ALMOST"],
    blame: "THE UNIVERSE",
    description: "7:14. One minute of sleep left, and no way to use it."
  },
  {
    id: "image-door-handle",
    img: { x: 592, y: 644, w: 238, h: 116, z: 3 },
    title: "Pushed a door that said pull.",
    image: "images/door-handle.jpg",
    fit: "contain",
    level: 1,
    x: 665, y: 713, w: 233, h: 82, z: 1,
    type: ["EXTRA EFFORT"],
    blame: "MYSELF",
    description: "The sign was right there. I pushed anyway."
  },
  {
    id: "image-loading",
    img: { x: 1068, y: 610, w: 83, h: 83, z: 1 },
    title: "The page kept loading. And loading.",
    image: "images/loading.jpg",
    fit: "contain",
    level: 1,
    x: 991, y: 658, w: 72, h: 70, z: 1,
    type: ["WAITING"],
    blame: "AN OBJECT",
    description: "No error, no progress. Just the spinner, going around."
  }
];

/* Hover colors for the item boxes (first TYPE tag decides the color) */
const HOVER_COLORS = {
  "BAD TIMING": "#FF2020",
  "BAD LUCK": "#FF00E5",
  "INTERRUPTION": "#2020FF",
  "EXTRA EFFORT": "#FFD000",
  "WAITING": "#00D9D9",
  "ALMOST": "#00E535"
};

/* Text color on top of a filled category color (for the selected filter) */
const ON_COLORS = {
  "BAD TIMING": "#FFFFFF",
  "BAD LUCK": "#FFFFFF",
  "INTERRUPTION": "#FFFFFF",
  "EXTRA EFFORT": "#111111",
  "WAITING": "#111111",
  "ALMOST": "#111111"
};

/* ---------- 4. Filter state ---------- */
const state = {
  type: [],   // e.g. ["BAD TIMING", "ALMOST"]
  blame: []   // e.g. ["MYSELF"]
};

const archive = document.getElementById("archive");
const typeRow = document.getElementById("type-filters");
const blameRow = document.getElementById("blame-filters");
const resetButton = document.getElementById("reset-all");
const statusText = document.getElementById("status");

/* Turns Figma pixels into a CSS value that scales with the screen */
function u(value) {
  return `calc(var(--u) * ${value})`;
}

/* ---------- 5. Build the archive ---------- */
function createItem(item) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "item";
  el.dataset.id = item.id;

  // left and top are set in fitCanvas() so the layout can fit the window
  // IMAGE view uses the item's img layout; TEXT view uses the original box
  const box = imageMode && item.img ? item.img : item;
  el.style.width = u(box.w);
  el.style.height = u(box.h);
  el.style.zIndex = box.z || item.z || 1;

  if (item.image) {
    el.classList.add("item--image");
    el.setAttribute("aria-label", item.title || `Image: ${item.id}`);

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = "";
    img.style.objectFit = imageMode && item.img ? "contain" : item.fit || "contain";

    // If the file isn't in /images yet, show a labelled placeholder
    img.addEventListener("error", () => {
      const ph = document.createElement("span");
      ph.className = "placeholder";
      ph.textContent = item.image;
      img.replaceWith(ph);
    });

    el.appendChild(img);
    if (!isClassified(item)) el.classList.add("is-unclassified");

    // Image-only version: on hover the image is replaced by its text
    if (isClassified(item)) { // both views: hover swaps the image for its text
      el.style.setProperty("--cat-color", HOVER_COLORS[item.type[0]]);
      const text = document.createElement("span");
      text.className = "item-hover-text";
      text.textContent = item.title;
      text.style.fontSize = u([0, SIZE.small, SIZE.medium, SIZE.large][item.level || 1]);
      el.appendChild(text);
    }
  } else {
    el.classList.add("item--text");
    el.style.setProperty("--cat-color", HOVER_COLORS[item.type[0]]); // hover color = first TYPE
    el.style.fontSize = u(item.size);
    el.textContent = item.text;
    el.setAttribute("aria-label", item.text.replace(/\n/g, " "));

    // Image-only version: a photo covers the text box; hovering reveals the box
    if (imageMode) addPhoto(el, item);
  }

  el.addEventListener("click", () => {
    hideNote();
    openLightbox(item);
  });

  // Images get a small note on hover (text version only;
  // in the image-only version the text replaces the image instead)
  if (false) { // hover notes replaced by the image → text swap (both views)
    el.addEventListener("mouseenter", () => showNote(item, el));
    el.addEventListener("mouseleave", hideNote);
    el.addEventListener("focus", () => showNote(item, el));
    el.addEventListener("blur", hideNote);
  }

  return el;
}

function buildArchive() {
  ITEMS.forEach((item) => {
    if (imageMode && !item.img) return; // not part of the image layout
    archive.appendChild(createItem(item));
  });
}

/* Image-only version helpers.
   The photo is images/<item id>.jpg or .png — the same files as the detail view.
   No photo found = a plain gray box. */
function addPhoto(el, item) {
  el.classList.add("item--photo");
  if (item.cutout) el.classList.add("item--cutout"); // transparent PNG

  // The text box from the Figma layout, shown on hover at its original size
  el.textContent = "";
  const box = document.createElement("span");
  box.className = "item-hover-text item-hover-text--box";
  box.textContent = item.text;
  box.style.width = u(item.w);
  box.style.height = u(item.h);
  el.appendChild(box);

  // cutout: true → images/<id>-cutout.png first; the normal photo is the backup
  const tries = item.cutout
    ? [`images/${item.id}-cutout.png`, `images/${item.id}.jpg`, `images/${item.id}.png`]
    : [`images/${item.id}.jpg`, `images/${item.id}.png`];

  const photo = document.createElement("img");
  photo.className = "item-photo";
  photo.alt = "";
  if (item.img) {
    styleLaidOutPhoto(el, item, photo);   // placed exactly as in the image-view layout
  } else {
    photo.addEventListener("load", () => fitToPhoto(el, item, photo));
  }
  photo.addEventListener("error", () => {
    if (tries.length) {
      photo.src = tries.shift();
    } else {
      const empty = document.createElement("span");
      empty.className = "item-photo item-photo--empty";
      photo.replaceWith(empty);
    }
  });
  photo.src = tries.shift();
  el.insertBefore(photo, box);
}

// Photo in the image-view layout: whole image (or cropped with crop: true),
// optional rotation and thin frame.
function styleLaidOutPhoto(el, item, photo) {
  const { w, h, rotate = 0, crop = false, frame = false } = item.img;
  photo.style.objectFit = crop ? "cover" : "contain";
  if (rotate) {
    const sideways = Math.abs(Math.abs(rotate) - 90) < 30; // ~90°: swap width and height
    photo.style.width = u(sideways ? h : w);
    photo.style.height = u(sideways ? w : h);
    photo.style.inset = "auto";   // first, so it doesn't wipe out left/top below
    photo.style.left = "50%";
    photo.style.top = "50%";
    photo.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
  }
  if (frame) el.classList.add("item--frame");
}

// No cropping: the photo keeps its own proportions, but takes up the same AREA
// as its Figma box (so bigger frustrations still look bigger), centered on the box.
// That keeps the dense, overlapping composition of the text layout.
const PHOTO_SCALE = 1.15;  // bigger = larger photos, more overlap
const CUTOUT_SCALE = 1.3;  // cut-outs have empty space around them, so they get a bit more

function fitToPhoto(el, item, photo) {
  const ratio = photo.naturalWidth / photo.naturalHeight;
  const scale = PHOTO_SCALE * (el.classList.contains("item--cutout") ? CUTOUT_SCALE : 1);
  const area = item.w * item.h * scale * scale;
  const w = Math.sqrt(area * ratio);
  const h = Math.sqrt(area / ratio);
  item.dx = (item.w - w) / 2;
  item.dy = (item.h - h) / 2;
  el.style.width = u(w);
  el.style.height = u(h);
  positionItem(item, el);
}

/* ---------- 6. Build the filter buttons ---------- */
function createFilterButton(label, group) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `filter-button filter-button--${group}`;
  btn.textContent = label;
  if (group === "type") {
    btn.style.setProperty("--cat-color", HOVER_COLORS[label]);
    btn.style.setProperty("--on-cat-color", ON_COLORS[label]);
  }
  btn.dataset.group = group;
  btn.dataset.value = label;
  btn.setAttribute("aria-pressed", "false");

  btn.addEventListener("click", () => {
    closeLightbox(false);
    closeAbout();
    // Clicking the active filter again turns it off
    // TYPE: several can be on at once. WHO TO BLAME: only one (you blame one thing).
    // Clicking an active tag turns it off.
    const list = state[group];
    const at = list.indexOf(label);
    if (at !== -1) list.splice(at, 1);
    else if (group === "blame") state.blame = [label];
    else list.push(label);
    applyFilters();
  });

  return btn;
}

function buildFilters() {
  TYPES.forEach((t) => typeRow.appendChild(createFilterButton(t, "type")));
  BLAMES.forEach((b) => blameRow.appendChild(createFilterButton(b, "blame")));
}

/* ---------- 7. Filtering ---------- */
function matches(item) {
  // Inside a group: any selected tag matches (BAD TIMING or ALMOST).
  // Between groups: both must match (TYPE and WHO TO BLAME).
  const blames = [].concat(item.blame); // blame can be one or a list
  const typeOk = !state.type.length || state.type.some((t) => item.type.includes(t));
  const blameOk = !state.blame.length || state.blame.some((b) => blames.includes(b));
  return typeOk && blameOk;
}

function applyFilters() {
  let visible = 0;

  ITEMS.forEach((item) => {
    const el = archive.querySelector(`[data-id="${item.id}"]`);
    if (!el) return; // not shown in this view
    const show = matches(item);
    el.classList.toggle("is-hidden", !show);
    if (show) visible++;
  });

  document.querySelectorAll(".filter-button").forEach((btn) => {
    const active = state[btn.dataset.group].includes(btn.dataset.value);
    btn.setAttribute("aria-pressed", String(active));
  });

  gatherItems();

  // Read out by screen readers only
  const parts = [...state.type, ...state.blame];
  statusText.textContent = parts.length
    ? `Showing ${visible} frustrations: ${parts.join(", ")}`
    : "Showing all frustrations";
}

function resetFilters() {
  state.type = [];
  state.blame = [];
  applyFilters();
}

resetButton.addEventListener("click", () => {
  closeLightbox(false);
  closeAbout();
  resetFilters();
});

/* ---------- 7b. Gather ----------
   When a filter is on, the matching items leave their places and fit together
   in the middle of the page like a puzzle: the biggest goes in the centre,
   each next one slots into the free spot closest to the centre, touching its
   neighbours. Filter off: everything goes back. */
const GATHER_GAP = 14; // space between pieces

function resetGather(el) {
  el._gx = 0;
  el._gy = 0;
  el.style.translate = "";
  el.style.scale = "";
}

// Fits rectangles (w, h) around a centre point. Returns positions or null if they don't fit.
function packPieces(sizes, area) {
  const cx = area.x + area.w / 2;
  const cy = area.y + area.h / 2;
  const g = GATHER_GAP;
  const placed = [];

  const free = (x, y, w, h) =>
    x >= area.x && y >= area.y && x + w <= area.x + area.w && y + h <= area.y + area.h &&
    placed.every((p) =>
      x + w + g <= p.x || p.x + p.w + g <= x || y + h + g <= p.y || p.y + p.h + g <= y
    );

  for (const { w, h } of sizes) {
    if (!placed.length) {
      placed.push({ x: cx - w / 2, y: cy - h / 2, w, h });
      continue;
    }
    let best = null;
    placed.forEach((p) => {
      const xs = [p.x, p.x + p.w - w, p.x + (p.w - w) / 2];
      const ys = [p.y, p.y + p.h - h, p.y + (p.h - h) / 2];
      const spots = [
        ...ys.map((y) => [p.x + p.w + g, y]), // right
        ...ys.map((y) => [p.x - w - g, y]),   // left
        ...xs.map((x) => [x, p.y - h - g]),   // above
        ...xs.map((x) => [x, p.y + p.h + g])  // below
      ];
      spots.forEach(([x, y]) => {
        if (!free(x, y, w, h)) return;
        const dx = x + w / 2 - cx;
        const dy = y + h / 2 - cy;
        const score = dx * dx * 0.35 + dy * dy; // a little wider than tall, like the page
        if (!best || score < best.score) best = { x, y, score };
      });
    });
    if (!best) return null;
    placed.push({ x: best.x, y: best.y, w, h });
  }
  return placed;
}

// The size of what you actually SEE: a "contain" image (cut-outs, rotated photos)
// is usually smaller than its box, so pack by the picture, not the empty box.
function visualSize(el) {
  const W = el.offsetWidth;
  const H = el.offsetHeight;
  const img = el.querySelector(".item-photo, :scope > img");
  if (!img || !img.naturalWidth || getComputedStyle(img).objectFit !== "contain") {
    return { w: W, h: H };
  }
  const rot = parseFloat((img.style.transform.match(/rotate\((-?[\d.]+)deg\)/) || [])[1]) || 0;
  const sideways = Math.abs(Math.abs(rot) - 90) < 30;
  const boxW = img.offsetWidth || W;
  const boxH = img.offsetHeight || H;
  const ratio = img.naturalWidth / img.naturalHeight;
  let fw = boxW;
  let fh = boxW / ratio;
  if (fh > boxH) {
    fh = boxH;
    fw = boxH * ratio;
  }
  return sideways ? { w: fh, h: fw } : { w: fw, h: fh };
}

function gatherItems() {
  const items = [...archive.querySelectorAll(".item")];
  const on = state.type.length > 0 || state.blame.length > 0;
  const shown = items.filter((el) => !el.classList.contains("is-hidden"));

  items.filter((el) => el.classList.contains("is-hidden")).forEach(resetGather);
  if (!on || !shown.length) {
    shown.forEach(resetGather);
    return;
  }

  // biggest pieces first, so they form the core
  const vis = new Map(shown.map((el) => [el, visualSize(el)]));
  shown.sort((a, b) => vis.get(b).w * vis.get(b).h - vis.get(a).w * vis.get(a).h);

  const area = {
    x: 40,
    y: HEADER_HEIGHT + 20,
    w: canvasSize.width - 80,
    h: canvasSize.height - HEADER_HEIGHT - 50
  };

  // shrink a little until everything fits
  let k = 1;
  let spots = null;
  while (!spots && k > 0.3) {
    spots = packPieces(shown.map((el) => ({ w: vis.get(el).w * k, h: vis.get(el).h * k })), area);
    if (!spots) k *= 0.9;
  }
  if (!spots) return;

  shown.forEach((el, n) => {
    const s = spots[n];
    el._gx = s.x + s.w / 2 - (el.offsetLeft + el.offsetWidth / 2);
    el._gy = s.y + s.h / 2 - (el.offsetTop + el.offsetHeight / 2);
    el.style.translate = `${el._gx}px ${el._gy}px`;
    el.style.scale = k < 1 ? String(k) : "";
  });
}

/* ---------- 8. Lightbox ---------- */
// The open card's size follows its photo (see .card-media img in style.css)
const ZOOM_TIME = 450;       // ms, same as --zoom-speed in style.css

const page = document.querySelector(".page");
const lightbox = document.getElementById("lightbox");
const backdrop = document.getElementById("lightbox-backdrop");
const card = document.getElementById("card");
const cardInner = document.getElementById("card-inner");
const cardControls = document.getElementById("card-controls");
const cardMedia = document.getElementById("card-media");
const cardTitle = document.getElementById("card-title");
const cardDescription = document.getElementById("card-description");
const cardTypes = document.getElementById("card-types");
const cardBlame = document.getElementById("card-blame");

let openItem = null;      // the item shown in the card
let returnFocus = null;   // where keyboard focus goes back after closing
let closeTimer = null;

// Items with a TYPE and WHO TO BLAME can be opened
function isClassified(item) {
  return item.type.length > 0 && Boolean(item.blame);
}

const CLASSIFIED = ITEMS.filter(isClassified);

function itemElement(item) {
  return archive.querySelector(`[data-id="${item.id}"]`);
}

// Position and size of an item on the canvas (Figma pixels)
function rectOf(el) {
  // includes the "gather" offset when a filter has pulled the item toward the center
  return {
    left: el.offsetLeft + (el._gx || 0),
    top: el.offsetTop + (el._gy || 0),
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}

// Where the open card sits: centered on the canvas, tall enough for its content
function cardRect() {
  // The card wraps its content: photo width + text column, photo height or text height
  const width = cardInner.offsetWidth + 6;
  const height = cardInner.offsetHeight + 6;
  return {
    left: (canvasSize.width - width) / 2,
    top: (canvasSize.height - height) / 2 + 20,
    width: width,
    height: height
  };
}

// Waits until the card photo has loaded (so its size is known), max 500ms
function whenCardReady(callback) {
  const img = cardMedia.querySelector("img");
  if (!img || img.complete) return callback();
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    callback();
  };
  img.addEventListener("load", finish, { once: true });
  setTimeout(finish, 500);
}

function setRect(el, r) {
  el.style.left = r.left + "px";
  el.style.top = r.top + "px";
  el.style.width = r.width + "px";
  el.style.height = r.height + "px";
}

// group: "type" (rounded, category color) or "blame" (square, black)
function makePill(label, group) {
  const pill = document.createElement("span");
  pill.className = `card-pill card-pill--${group}`;
  pill.textContent = label;
  if (group === "type") pill.style.setProperty("--cat-color", HOVER_COLORS[label]);
  return pill;
}

function fillCard(item) {
  cardTitle.textContent = item.text || item.title;
  cardDescription.textContent = item.description || "";

  cardTypes.innerHTML = "";
  item.type.forEach((t) => cardTypes.appendChild(makePill(t, "type")));

  cardBlame.innerHTML = "";
  [].concat(item.blame).forEach((b) => cardBlame.appendChild(makePill(b, "blame")));

  // Detail image: images/<item id>.jpg or .png (e.g. images/sold-out.png).
  // If neither exists, image items fall back to their archive image,
  // and anything else shows the plain gray box.
  cardMedia.innerHTML = "";
  const tries = [`images/${item.id}.jpg`, `images/${item.id}.png`];
  if (item.cutout) tries.push(`images/${item.id}-cutout.png`); // no normal photo → use the cut-out
  if (item.image) tries.push(item.image);

  const img = document.createElement("img");
  img.alt = item.title || (item.text || "").replace(/\n/g, " ");
  cardMedia.classList.remove("is-empty");
  img.addEventListener("error", () => {
    if (tries.length) {
      img.src = tries.shift();                 // try the next file
    } else {
      img.remove();                            // nothing found → gray box
      cardMedia.classList.add("is-empty");
      if (openItem) placeCard(true);
    }
  });
  img.src = tries.shift();
  cardMedia.appendChild(img);
}

function placeCard(animate) {
  card.classList.toggle("no-animation", !animate);
  const r = cardRect();
  setRect(card, r);
  setRect(cardControls, r);
}

function openLightbox(item) {
  if (!isClassified(item)) return;
  clearTimeout(closeTimer);

  const el = itemElement(item);
  returnFocus = el;
  openItem = item;
  fillCard(item);

  // 1. Put the card exactly on top of the clicked item, without animation
  lightbox.hidden = false;
  page.classList.add("has-lightbox");
  lightbox.classList.remove("is-open");
  card.classList.add("no-animation");
  setRect(card, rectOf(el));
  card.offsetWidth; // forces the browser to apply that position first

  // 2. Once the photo's size is known, animate it to the center
  archive.classList.add("is-dimmed");
  whenCardReady(() => {
    if (openItem !== item) return;
    placeCard(true);
    lightbox.classList.add("is-open");
  });

  document.getElementById("card-close").focus({ preventScroll: true });
}

function hideLightbox() {
  lightbox.hidden = true;
  page.classList.remove("has-lightbox");
}

// animate = true shrinks the card back into its item; false closes instantly
function closeLightbox(animate = true) {
  if (!openItem) return;
  const el = itemElement(openItem);
  openItem = null;

  lightbox.classList.remove("is-open");
  archive.classList.remove("is-dimmed");

  if (animate && el && !el.classList.contains("is-hidden")) {
    card.classList.remove("no-animation");
    setRect(card, rectOf(el));
    closeTimer = setTimeout(hideLightbox, ZOOM_TIME);
  } else {
    hideLightbox();
  }

  if (returnFocus) returnFocus.focus({ preventScroll: true });
}

// PREV / NEXT move through the items that match the current filters
function step(direction) {
  if (!openItem) return;
  const list = CLASSIFIED.filter((it) => matches(it) && itemElement(it));
  const i = list.indexOf(openItem);
  const next = list[(i + direction + list.length) % list.length];

  cardInner.style.opacity = 0; // quick fade out
  setTimeout(() => {
    openItem = next;
    returnFocus = itemElement(next);
    fillCard(next);
    whenCardReady(() => {
      placeCard(true);         // card size adjusts to the new photo and title
      cardInner.style.opacity = "";
    });
  }, 200);
}

document.getElementById("card-close").addEventListener("click", () => closeLightbox(true));
document.getElementById("card-prev").addEventListener("click", () => step(-1));
document.getElementById("card-next").addEventListener("click", () => step(1));
backdrop.addEventListener("click", () => closeLightbox(true));
card.addEventListener("click", () => closeLightbox(true));

/* ---------- Keyboard ----------
   Esc: close the card (or reset filters when no card is open)
   ← →: previous / next item while the card is open
   Tab: stays on the card controls while it is open */
document.addEventListener("keydown", (e) => {
  if (aboutIsOpen() && e.key === "Escape") {
    closeAbout();
    return;
  }

  if (openItem) {
    if (e.key === "Escape") closeLightbox(true);
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);

    if (e.key === "Tab") {
      const focusable = cardControls.querySelectorAll("button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    return;
  }

  if (e.key === "Escape") resetFilters();
});

/* ---------- 8b. Hover note on images ---------- */
const note = document.getElementById("item-note");
const noteTitle = document.getElementById("item-note-title");
const noteMeta = document.getElementById("item-note-meta");

function showNote(item, el) {
  if (!isClassified(item) || el.classList.contains("is-hidden") || openItem) return;

  noteTitle.textContent = item.title || item.text.replace(/\n/g, " ");
  noteMeta.textContent = [...item.type, ...[].concat(item.blame)].join(" · ");
  note.style.setProperty("--cat-color", HOVER_COLORS[item.type[0]]);
  note.hidden = false;

  // Stuck onto the lower part of the image, like a Post-it.
  // If there's no room at the bottom, it sticks onto the top edge instead.
  const overlap = Math.min(30, el.offsetHeight * 0.3);
  const below = el.offsetTop + el.offsetHeight - overlap;
  const top = below + note.offsetHeight > canvasSize.height - 10
    ? el.offsetTop - note.offsetHeight + overlap
    : below;
  const left = Math.min(
    el.offsetLeft + Math.min(24, el.offsetWidth * 0.15),
    canvasSize.width - note.offsetWidth - 10
  );

  note.style.left = left + "px";
  note.style.top = top + "px";
  requestAnimationFrame(() => note.classList.add("is-visible"));
}

function hideNote() {
  note.classList.remove("is-visible");
  note.hidden = true;
}

/* ---------- 8c. About page ---------- */
const about = document.getElementById("about");
const aboutButton = document.getElementById("about-open");

function aboutIsOpen() {
  return !about.hidden;
}

function openAbout() {
  closeLightbox(false);
  hideNote();
  about.hidden = false;
  aboutButton.setAttribute("aria-expanded", "true");
  aboutButton.textContent = "CLOSE";
  requestAnimationFrame(() => about.classList.add("is-open"));
}

function closeAbout() {
  if (!aboutIsOpen()) return;
  about.classList.remove("is-open");
  about.hidden = true;
  aboutButton.setAttribute("aria-expanded", "false");
  aboutButton.textContent = "ABOUT";
}

aboutButton.addEventListener("click", () => (aboutIsOpen() ? closeAbout() : openAbout()));

// The key on the About page uses the same tags as the site
TYPES.forEach((t) => document.getElementById("about-types").appendChild(makePill(t, "type")));
BLAMES.forEach((b) => document.getElementById("about-blames").appendChild(makePill(b, "blame")));

/* ---------- 8d. TEXT / IMAGE switch ---------- */
const modeButtons = document.querySelectorAll(".mode-button");

const MORPH_TIME = 800; // ms — how long items take to travel to their new place

function setMode(mode) {
  if ((mode === "image") === imageMode) return;
  closeLightbox(false);
  closeAbout();
  hideNote();

  // 1. Remember where every item is now
  const before = {};
  archive.querySelectorAll(".item").forEach((el) => {
    before[el.dataset.id] = rectOf(el);
  });

  // 2. Rebuild the archive in the other view
  imageMode = mode === "image";
  ITEMS.forEach((item) => {
    delete item.dx; // photo offsets only apply in the image view
    delete item.dy;
  });
  archive.innerHTML = "";
  buildArchive();
  fitCanvas();
  applyFilters();   // keeps the current filters

  // 3. Morph: each item starts at its old place and size, then travels to the new one,
  //    so you can follow which sentence becomes which photo (and back).
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    archive.querySelectorAll(".item").forEach((el) => {
      const from = before[el.dataset.id];
      const to = rectOf(el);
      el.style.transition = "none";
      el.style.transformOrigin = "top left";
      if (from && to.width && to.height) {
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const sx = from.width / to.width;
        const sy = from.height / to.height;
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      } else {
        el.style.opacity = "0"; // item that only exists in this view: fade in
      }
    });

    archive.offsetWidth; // apply the start positions first

    archive.querySelectorAll(".item").forEach((el) => {
      const delay = Math.round(Math.random() * 150); // slightly out of sync, on purpose
      el.style.transition =
        `transform ${MORPH_TIME}ms cubic-bezier(0.7, 0, 0.2, 1) ${delay}ms, ` +
        `opacity ${MORPH_TIME}ms ease ${delay}ms`;
      el.style.transform = "";
      el.style.opacity = "";
    });

    setTimeout(() => {
      archive.querySelectorAll(".item").forEach((el) => {
        el.style.transition = ""; // back to the normal hover/filter transitions
        el.style.transformOrigin = "";
      });
    }, MORPH_TIME + 200);
  }

  modeButtons.forEach((btn) =>
    btn.setAttribute("aria-pressed", String(btn.dataset.mode === mode))
  );
}

modeButtons.forEach((btn) => btn.addEventListener("click", () => setMode(btn.dataset.mode)));
modeButtons.forEach((btn) =>
  btn.setAttribute("aria-pressed", String((btn.dataset.mode === "image") === imageMode))
);

/* ---------- 9. Fit the canvas to the window ----------
   1. The whole Figma frame is scaled so its HEIGHT fits the window
      (item sizes and text stay exactly proportional to Figma).
   2. If the window is wider than the Figma frame (e.g. a MacBook browser window),
      the items spread out horizontally to fill the extra width,
      so there are no empty white bars on the sides.
   Items are never squeezed closer together, so no text gets covered. */
const DESIGN_WIDTH = 1516;
const DESIGN_HEIGHT = 984;
const HEADER_HEIGHT = 130;   // title + filters area
const MAX_SPREAD = 1.25;     // spread at most 25% (very wide monitors get white bars instead)
const canvasSize = { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };
const layout = { spreadX: 1, spreadY: 1 };

// Places one item; dx/dy are set when a photo is smaller than its box (image-only version)
function positionItem(item, el) {
  if (!el) return;
  const box = imageMode && item.img ? item.img : item;
  el.style.left = u(box.x * layout.spreadX + (item.dx || 0));
  el.style.top = u(HEADER_HEIGHT + (box.y - HEADER_HEIGHT) * layout.spreadY + (item.dy || 0));
}

function fitCanvas() {
  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT
  );

  // How much extra room the window has, in Figma pixels
  const spreadX = Math.min(MAX_SPREAD, window.innerWidth / scale / DESIGN_WIDTH);
  const spreadY = Math.min(
    MAX_SPREAD,
    (window.innerHeight / scale - HEADER_HEIGHT) / (DESIGN_HEIGHT - HEADER_HEIGHT)
  );

  const canvasWidth = DESIGN_WIDTH * spreadX;
  const canvasHeight = HEADER_HEIGHT + (DESIGN_HEIGHT - HEADER_HEIGHT) * spreadY;

  layout.spreadX = spreadX;
  layout.spreadY = spreadY;
  ITEMS.forEach((item) => positionItem(item, archive.querySelector(`[data-id="${item.id}"]`)));

  canvasSize.width = canvasWidth;
  canvasSize.height = canvasHeight;

  // Keep an open card centered when the window is resized
  if (openItem) placeCard(false);

  const root = document.documentElement.style;
  root.setProperty("--canvas-width", canvasWidth);
  root.setProperty("--canvas-height", canvasHeight);
  root.setProperty("--scale", scale);
  gatherItems(); // keep a filtered group centred after a resize
}

window.addEventListener("resize", fitCanvas);

/* ---------- Start ---------- */
buildFilters();
buildArchive();
fitCanvas();
applyFilters();


/* =========================================================
   10. CAPTCHA
   Shows once every time the page loads.
   ========================================================= */
const CAPTCHA_ANSWER = "im not frustrated"; // compared after cleaning, see below

const captcha = document.getElementById("captcha");
const sitePage = document.querySelector(".page");
const captchaSteps = [
  document.getElementById("captcha-step-1"),
  document.getElementById("captcha-step-2"),
  document.getElementById("captcha-step-3")
];
const captchaInput = document.getElementById("captcha-input");
const captchaError = document.getElementById("captcha-error");
const captchaCheckbox = document.getElementById("captcha-checkbox");
const captchaChoices = document.getElementById("captcha-choices");
const captchaResult = document.getElementById("captcha-result");
const captchaEnter = document.getElementById("captcha-enter");

// Lowercase, drop punctuation (incl. ' and ’), collapse spaces
function cleanAnswer(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function showCaptchaStep(number) {
  captchaSteps.forEach((step, i) => (step.hidden = i !== number - 1));
}

function openCaptcha() {
  captcha.hidden = false;
  sitePage.inert = true;              // archive visible but not clickable/focusable
  showCaptchaStep(1);
  captchaInput.focus();
}

function closeCaptcha() {
  captcha.hidden = true;
  sitePage.inert = false;
}

// STEP 1
captchaSteps[0].addEventListener("submit", (e) => {
  e.preventDefault();
  if (cleanAnswer(captchaInput.value) === CAPTCHA_ANSWER) {
    captchaError.textContent = "";
    showCaptchaStep(2);
    captchaCheckbox.focus();
  } else {
    captchaError.textContent = "Incorrect. Please try again.";
    captchaInput.select();
  }
});

captchaInput.addEventListener("input", () => (captchaError.textContent = ""));

// STEP 2
captchaCheckbox.addEventListener("change", () => {
  if (!captchaCheckbox.checked) return;
  setTimeout(() => {                  // short pause so the check is visible
    showCaptchaStep(3);
    document.getElementById("captcha-yes").focus();
  }, 400);
});

// STEP 3 — YES ends it. NO starts the whole check over (page reloads). Not again.
function answerSure(message) {
  captchaChoices.hidden = true;
  captchaResult.textContent = message;
  captchaResult.hidden = false;
  captchaEnter.hidden = false;
  captchaEnter.focus();
}

document.getElementById("captcha-yes").addEventListener("click", () =>
  answerSure("Verification failed. Frustration detected.")
);

document.getElementById("captcha-no").addEventListener("click", () => location.reload());

// NOT AGAIN. — the button shrinks into the site title at the top-left
captchaEnter.addEventListener("click", () => {
  const title = document.getElementById("reset-all");
  const from = captchaEnter.getBoundingClientRect();
  const to = title.getBoundingClientRect();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    closeCaptcha();
    return;
  }

  // A copy of the button flies, so the overlay can fade underneath it
  const flight = captchaEnter.cloneNode(true);
  flight.removeAttribute("id");
  flight.classList.add("title-flight");
  flight.style.left = from.left + "px";
  flight.style.top = from.top + "px";
  flight.style.width = from.width + "px";
  flight.style.height = from.height + "px";
  document.body.appendChild(flight);

  title.style.visibility = "hidden";
  captchaEnter.style.visibility = "hidden";
  captcha.classList.add("is-leaving");
  sitePage.inert = false;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const scale = to.width / from.width;
      flight.style.transform =
        `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})`;
    });
  });

  setTimeout(() => {
    title.style.visibility = "";
    flight.remove();
    closeCaptcha();
    captcha.classList.remove("is-leaving");
  }, 750);
});
document.getElementById("captcha-skip").addEventListener("click", closeCaptcha);

openCaptcha();