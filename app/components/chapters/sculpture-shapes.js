// Chapter shapes as grayscale "depth maps" drawn on a GRID×GRID canvas: bright = closer.
const gray = (v) => `rgb(${(v * 255) | 0},${(v * 255) | 0},${(v * 255) | 0})`;

export const SHAPES = {
  // Three stacked isometric slabs: the foundation.
  foundation(c, G) {
    const cx = G / 2;
    const w = G * 0.34;
    const h = G * 0.17;
    const th = G * 0.07;
    const face = (pts, v) => {
      c.beginPath();
      pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.closePath();
      c.fillStyle = gray(v);
      c.fill();
    };
    for (let k = 0; k < 3; k++) {
      const s = 1 - k * 0.2;
      const y = G * 0.66 - k * G * 0.17;
      const W = w * s;
      const H = h * s;
      face([[cx - W, y], [cx, y + H], [cx, y + H + th], [cx - W, y + th]], 0.45 + k * 0.08);
      face([[cx, y + H], [cx + W, y], [cx + W, y + th], [cx, y + H + th]], 0.3 + k * 0.08);
      face([[cx, y - H], [cx + W, y], [cx, y + H], [cx - W, y]], 0.7 + k * 0.12);
    }
  },

  // Lightning bolt inside a gauge: performance.
  craft(c, G) {
    const cx = G / 2;
    const cy = G / 2;
    c.lineCap = 'round';
    c.lineWidth = G * 0.03;
    c.strokeStyle = gray(0.35);
    c.beginPath();
    c.arc(cx, cy, G * 0.4, Math.PI * 0.75, Math.PI * 2.25);
    c.stroke();
    c.strokeStyle = gray(0.85);
    c.beginPath();
    c.arc(cx, cy, G * 0.4, Math.PI * 0.75, Math.PI * 1.9);
    c.stroke();
    const s = G * 0.28;
    const bolt = [[0.15, -1], [-0.55, 0.12], [-0.05, 0.12], [-0.2, 1], [0.55, -0.18], [0.05, -0.18], [0.3, -1]];
    c.beginPath();
    bolt.forEach(([x, y], i) => (i ? c.lineTo(cx + x * s, cy + y * s) : c.moveTo(cx + x * s, cy + y * s)));
    c.closePath();
    const g = c.createRadialGradient(cx, cy, 0, cx, cy, s);
    g.addColorStop(0, gray(1));
    g.addColorStop(1, gray(0.55));
    c.fillStyle = g;
    c.fill();
  },

  // Tilted rocket: shipping products.
  building(c, G) {
    const s = G * 0.33;
    c.translate(G / 2, G / 2);
    c.rotate(Math.PI / 5);
    const flame = c.createRadialGradient(0, 0.85 * s, 0, 0, 0.85 * s, 0.45 * s);
    flame.addColorStop(0, gray(0.9));
    flame.addColorStop(1, gray(0));
    c.fillStyle = flame;
    c.beginPath();
    c.ellipse(0, 0.85 * s, 0.22 * s, 0.45 * s, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = gray(0.45);
    c.beginPath();
    c.moveTo(-0.3 * s, 0.1 * s);
    c.lineTo(-0.6 * s, 0.7 * s);
    c.lineTo(-0.3 * s, 0.55 * s);
    c.fill();
    c.beginPath();
    c.moveTo(0.3 * s, 0.1 * s);
    c.lineTo(0.6 * s, 0.7 * s);
    c.lineTo(0.3 * s, 0.55 * s);
    c.fill();
    const body = c.createLinearGradient(-0.32 * s, 0, 0.32 * s, 0);
    body.addColorStop(0, gray(0.35));
    body.addColorStop(0.45, gray(1));
    body.addColorStop(1, gray(0.5));
    c.fillStyle = body;
    c.beginPath();
    c.moveTo(0, -1 * s);
    c.bezierCurveTo(0.3 * s, -0.75 * s, 0.32 * s, -0.4 * s, 0.32 * s, -0.25 * s);
    c.lineTo(0.3 * s, 0.6 * s);
    c.lineTo(-0.3 * s, 0.6 * s);
    c.lineTo(-0.32 * s, -0.25 * s);
    c.bezierCurveTo(-0.32 * s, -0.4 * s, -0.3 * s, -0.75 * s, 0, -1 * s);
    c.fill();
    c.fillStyle = gray(0.15);
    c.beginPath();
    c.arc(0, -0.25 * s, 0.13 * s, 0, Math.PI * 2);
    c.fill();
    c.lineWidth = 0.05 * s;
    c.strokeStyle = gray(0.9);
    c.stroke();
  },

  // Ringed planet: what comes next.
  next(c, G) {
    const cx = G / 2;
    const cy = G / 2;
    const r = G * 0.27;
    const ring = (a0, a1) => {
      c.beginPath();
      c.ellipse(cx, cy, G * 0.47, G * 0.11, -0.35, a0, a1);
      c.stroke();
    };
    c.lineWidth = G * 0.03;
    c.strokeStyle = gray(0.6);
    ring(Math.PI, Math.PI * 2);
    const g = c.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
    g.addColorStop(0, gray(1));
    g.addColorStop(1, gray(0.25));
    c.fillStyle = g;
    c.beginPath();
    c.arc(cx, cy, r, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = gray(0.85);
    ring(0, Math.PI);
  },
};
