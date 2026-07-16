// ============================================================
// F&N Projects — content + deterministic generative geometry
// Ported 1:1 from the Claude Design source (renderVals()).
// ============================================================

// Deterministic pseudo-random used across the generative motifs
export function rand(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Hero "skyline comb" — 48 bars of varying heights along the bottom edge
export function makeCombBars() {
  const combBars = [];
  for (let i = 0; i < 48; i++) {
    const base = 34 + Math.pow(rand(i + 1), 1.4) * 88;
    const h = Math.round(base + (i % 2 === 0 ? 12 : 0));
    combBars.push({
      h,
      tone: i % 5 === 0 ? "var(--color-canvas-soft)" : "var(--color-canvas)",
    });
  }
  return combBars;
}

// "Ashlar" diagonal stone steps transitioning canvas -> green services band
const STONES = [
  "#d9d5cb",
  "#c9c4b8",
  "#b7b2a4",
  "#8f9a86",
  "#5f7a5c",
  "#3c6042",
  "#1d7549",
  "#135f38",
  "#0b4a2b",
];
export function makeDiagSteps() {
  const diagSteps = [];
  const N = 17;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const left = Math.round(3 + t * 92); // percent
    const top = Math.round(6 + t * 126);
    const tone =
      STONES[Math.min(STONES.length - 1, Math.floor(t * STONES.length))];
    diagSteps.push({ left, top, tone });
  }
  return diagSteps;
}

// Pixel dissolve grid transitioning canvas -> green contact band
export function makePixelGrid() {
  const cols = 30;
  const rows = 7;
  const pixelGrid = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const b = r / (rows - 1);
      const jitter = (rand(r * 100 + c) - 0.5) * 0.55;
      let op = Math.max(0, Math.min(1, b + jitter));
      if (r === rows - 1) op = 1;
      pixelGrid.push({ op: Math.round(op * 100) / 100, r, c });
    }
  }
  return pixelGrid;
}

export const PIXEL_COLS = 30;
export const PIXEL_ROWS = 7;

export const services = [
  {
    no: "01",
    name: "Kitchens",
    desc: "Bespoke joinery, stone benchtops and integrated appliances, detailed to millimetre tolerances.",
  },
  {
    no: "02",
    name: "Bathrooms",
    desc: "Calm, waterproofed-right ensuites and family bathrooms with considered tiling and tapware.",
  },
  {
    no: "03",
    name: "Full renovations",
    desc: "Whole-home transformations managed end to end, from first sketch to final handover.",
  },
  {
    no: "04",
    name: "Outdoor living",
    desc: "Pavilions, decks and alfresco spaces that extend the home into the garden.",
  },
  {
    no: "05",
    name: "Custom builds",
    desc: "Ground-up new homes built to architectural drawings and finished without compromise.",
  },
];

export const projects = [
  {
    title: "Marble Waterfall Kitchen",
    category: "Kitchen",
    location: "Ascot, QLD",
    desc: "A sculptural stone island anchors an open-plan kitchen framed by full-height glazing to the treetops.",
    img: "/projects/web/kitchen1.jpg",
  },
  {
    title: "Book-matched Island",
    category: "Joinery",
    location: "Hamilton, QLD",
    desc: "Dramatic veined marble carried across a full waterfall island edge and integrated cabinetry.",
    img: "/projects/web/dining1.jpg",
  },
  {
    title: "Stone Walk-in Shower",
    category: "Bathroom",
    location: "New Farm, QLD",
    desc: "Fluted glass and cove-lit natural stone create a calm, spa-like wet area.",
    img: "/projects/web/bathroom1.jpg",
  },
  {
    title: "Arched Ensuite Retreat",
    category: "Bathroom",
    location: "Teneriffe, QLD",
    desc: "Softly arched thresholds and microcement walls make for a serene, light-filled ensuite.",
    img: "/projects/web/bathroom2.jpg",
  },
  {
    title: "Twin Vanity Bathroom",
    category: "Bathroom",
    location: "Bulimba, QLD",
    desc: "A curved timber double vanity topped with book-matched stone and twin undermount basins.",
    img: "/projects/web/bathroom3.jpg",
  },
  {
    title: "Cellar & Dining",
    category: "Dining",
    location: "Paddington, QLD",
    desc: "An entertainer's island runs alongside a glass-fronted wine cellar and long dining table.",
    img: "/projects/web/dining2.jpg",
  },
  {
    title: "Poolside Terrace",
    category: "Outdoor Living",
    location: "Pullenvale, QLD",
    desc: "Frameless glass frames a tropical pool garden and sun deck stepped into the hillside.",
    img: "/projects/web/garden.jpg",
  },
];

export const testimonials = [
  {
    quote:
      "They finished our renovation on time and it looks better than we imagined.",
    name: "Sarah & Michael T.",
    project: "Full home renovation, Bulimba",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The detailing in the kitchen joinery is faultless. Genuinely craftsman-level work.",
    name: "James P.",
    project: "Kitchen renovation, New Farm",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Calm, communicative and precise from first sketch to handover. We'd build with them again.",
    name: "Priya & Dan R.",
    project: "Custom build, Brookfield",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
];

export const footerServices = [
  "Kitchens",
  "Bathrooms",
  "Full renovations",
  "Outdoor living",
  "Custom builds",
];

export const stats = [
  { value: 10, suffix: " yrs", label: "Building across Brisbane" },
  { value: 50, suffix: "+", label: "Projects completed" },
  { value: 100, suffix: "%", label: "Council-approved handover" },
];
