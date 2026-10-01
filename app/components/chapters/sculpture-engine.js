// Framework-free particle sculpture. Named imports keep only what we use in the lazy chunk.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  MathUtils,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import { CHAPTERS } from '@/utils/data/chapters';
import { SHAPES } from './sculpture-shapes';

const PORTRAIT_SRC = '/image/portrait.jpg';
const MORPH_MS = 1000;

const VERTEX = /* glsl */ `
  attribute float aLuma;
  attribute float aSeed;
  uniform float uTime, uProgress, uSize, uDepth, uVignette, uWave, uPush, uInvert;
  uniform vec2 uMouse;
  varying float vL;
  varying float vInk;
  void main() {
    vec3 p = position;
    float vig = mix(1.0, smoothstep(1.05, 0.5, length(p.xy)), uVignette);
    // Tone (brightness) drives color and relief. Ink drives dot size and opacity:
    // a photo on paper needs ink where it is dark, a shape needs ink where it exists.
    float l = aLuma * vig;
    float ink = mix(aLuma, 1.0 - aLuma, uInvert) * vig;
    // Brightness becomes relief; a slow wave keeps it breathing.
    p.z = l * uDepth + sin(p.x * 3.0 + uTime * uWave + aSeed * 6.2831) * 0.025;
    // Cursor pushes particles away and toward the viewer.
    vec2 toM = p.xy - uMouse;
    float push = smoothstep(0.4, 0.0, length(toM));
    p.xy += normalize(toM + 1e-5) * push * uPush;
    p.z += push * 0.35;
    // Assemble from a random cloud.
    vec3 cloud = vec3((aSeed - 0.5) * 7.0, (fract(aSeed * 7.13) - 0.5) * 5.0, (fract(aSeed * 3.71) - 0.5) * 6.0);
    float prog = smoothstep(0.0, 1.0, clamp(uProgress * 1.4 - aSeed * 0.4, 0.0, 1.0));
    p = mix(cloud, p, prog);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = ink < 0.06 ? 0.0 : uSize * (0.3 + ink) / -mv.z;
    vL = l;
    vInk = ink;
  }`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA, uColorB;
  uniform float uAlpha;
  varying float vL;
  varying float vInk;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.15, d) * (0.6 + vInk * 0.4) * uAlpha;
    gl_FragColor = vec4(mix(uColorA, uColorB, vL), a);
  }`;

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ onReady(count), onFps(fps), onCamera(on), onToast(key) }} hooks
 */
export function createSculpture(canvas, hooks) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isNarrow = () => innerWidth < 768;
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(new Color(css('--paper')));
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.z = 5;

  // One point per sample pixel, laid out on a [-1, 1] grid.
  const GRID = isNarrow() ? 120 : 180;
  const COUNT = GRID * GRID;
  const positions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  const luma = new Float32Array(COUNT);
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const i = y * GRID + x;
      positions[i * 3] = (x / (GRID - 1) - 0.5) * 2;
      positions[i * 3 + 1] = (0.5 - y / (GRID - 1)) * 2;
      seeds[i] = Math.random();
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));
  const lumaAttr = new BufferAttribute(luma, 1).setUsage(DynamicDrawUsage);
  geometry.setAttribute('aLuma', lumaAttr);

  const first = CHAPTERS[0];
  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: reduced ? 1 : 0 },
    uMouse: { value: new Vector2(9, 9) },
    uSize: { value: 20 },
    uDepth: { value: first.depth },
    uWave: { value: first.wave },
    uPush: { value: first.push },
    uVignette: { value: 1 },
    uInvert: { value: 1 },
    uColorA: { value: new Color(css('--sculpt-lo')) },
    uColorB: { value: new Color(css('--sculpt-hi')) },
    uAlpha: { value: 1 },
  };
  const material = new ShaderMaterial({ uniforms, transparent: true, depthWrite: false, vertexShader: VERTEX, fragmentShader: FRAGMENT });
  const points = new Points(geometry, material);
  scene.add(points);

  const look = Object.assign(new Vector2(0, 0), { scale: 1, side: 1 });
  const base = { s: 1, x: 0, y: 0 };
  let visW = 1;
  let visH = 1;
  function resize() {
    const W = innerWidth;
    const H = innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    visH = 2 * camera.position.z * Math.tan(MathUtils.degToRad(camera.fov / 2));
    visW = visH * camera.aspect;
    const s = isNarrow() ? Math.min(visW * 0.46, visH * 0.3) : Math.min(visH * 0.46, visW * 0.27);
    base.s = s;
    base.x = isNarrow() ? 0 : visW * 0.22;
    base.y = isNarrow() ? visH * 0.2 : 0;
    // Size points so neighbours just touch: grid spacing in px * camera distance.
    const spacingPx = (2 / GRID) * s * (H / visH);
    uniforms.uSize.value = spacingPx * camera.position.z * renderer.getPixelRatio() * 1.15;
  }
  resize();

  // Sampling: source -> GRID×GRID pixels -> brightness per particle.
  const sample = document.createElement('canvas');
  sample.width = sample.height = GRID;
  const sctx = sample.getContext('2d', { willReadFrequently: true });
  function writeLuma(contrast, bias, out = luma) {
    const { data } = sctx.getImageData(0, 0, GRID, GRID);
    for (let i = 0; i < COUNT; i++) {
      const l = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255;
      out[i] = Math.min(1, Math.max(0, (l - 0.5) * contrast + 0.5 + bias));
    }
    if (out === luma) lumaAttr.needsUpdate = true;
    return out;
  }

  // Rasterize each chapter shape once into its own brightness map.
  const maps = {};
  for (const [id, draw] of Object.entries(SHAPES)) {
    sctx.save();
    sctx.fillStyle = '#000';
    sctx.fillRect(0, 0, GRID, GRID);
    draw(sctx, GRID);
    sctx.restore();
    maps[id] = writeLuma(1, 0, new Float32Array(COUNT));
  }

  // Morph: blend particle brightness from the current map to the next one.
  const morphFrom = new Float32Array(COUNT);
  let morphTarget = null;
  let morphStart = 0;
  function morphTo(map) {
    if (!map) return;
    morphFrom.set(luma);
    morphTarget = map;
    morphStart = performance.now();
    if (reduced) {
      luma.set(map);
      lumaAttr.needsUpdate = true;
      morphTarget = null;
    }
  }
  function stepMorph(t) {
    if (!morphTarget) return;
    const p = Math.min(1, (t - morphStart) / MORPH_MS);
    const e = p * p * (3 - 2 * p);
    for (let i = 0; i < COUNT; i++) luma[i] = morphFrom[i] + (morphTarget[i] - morphFrom[i]) * e;
    lumaAttr.needsUpdate = true;
    if (p === 1) morphTarget = null;
  }

  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  let stream = null;
  function sampleVideo() {
    const s = Math.min(video.videoWidth, video.videoHeight);
    sctx.save();
    sctx.translate(GRID, 0);
    sctx.scale(-1, 1); // selfie mirror
    sctx.drawImage(video, (video.videoWidth - s) / 2, (video.videoHeight - s) / 2, s, s, 0, 0, GRID, GRID);
    sctx.restore();
    writeLuma(1.3, 0);
  }

  // Motion targets the render loop eases toward.
  let currentId = 'intro';
  const target = { depth: first.depth, wave: first.wave, push: first.push, alpha: 1, scale: 1, side: 1, vig: 1, inv: 1 };
  const isPhoto = (id) => Boolean(stream) || id === 'intro';
  function showChapterSource(id, animate) {
    target.vig = stream ? 0.5 : id === 'intro' ? 1 : 0;
    target.inv = isPhoto(id) ? 1 : 0;
    if (stream) return;
    if (animate) morphTo(maps[id]);
    else if (maps[id]) {
      luma.set(maps[id]);
      lumaAttr.needsUpdate = true;
    }
  }

  const portrait = new Image();
  portrait.onload = () => {
    sctx.drawImage(portrait, 0, 0, portrait.naturalWidth, portrait.naturalHeight, 0, 0, GRID, GRID);
    maps.intro = writeLuma(1.3, 0, new Float32Array(COUNT));
    if (currentId === 'intro' && !stream) {
      luma.set(maps.intro);
      lumaAttr.needsUpdate = true;
    }
  };
  portrait.src = PORTRAIT_SRC;

  let introStart = performance.now();
  let introDur = 2400;
  let introFrom = 0;
  function replayIntro(dur, from = 0) {
    if (reduced) return;
    introFrom = from;
    introStart = performance.now();
    introDur = dur;
  }

  // Pointer: follows the cursor while inside; idles with a slow sway once it leaves,
  // since browsers never report the cursor outside the page.
  const ndc = new Vector2(0, 0);
  const repel = new Vector2(9, 9);
  const away = new Vector2(9, 9);
  const sway = new Vector2();
  let pointerInside = false;
  const onPointerMove = (e) => {
    pointerInside = e.pointerType === 'mouse';
    ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    repel.set((ndc.x * visW) / 2 - points.position.x, (ndc.y * visH) / 2 - points.position.y).divideScalar(points.scale.x);
  };
  const onLeave = () => {
    pointerInside = false;
  };
  addEventListener('pointermove', onPointerMove);
  document.documentElement.addEventListener('pointerleave', onLeave);
  addEventListener('blur', onLeave);
  addEventListener('resize', resize);

  let raf = 0;
  let frames = 0;
  let fpsT = 0;
  let lastSample = 0;
  function loop(t) {
    raf = requestAnimationFrame(loop);
    const k = reduced ? 1 : 0.05;
    uniforms.uAlpha.value += (target.alpha - uniforms.uAlpha.value) * k;
    uniforms.uVignette.value += (target.vig - uniforms.uVignette.value) * k;
    uniforms.uInvert.value += (target.inv - uniforms.uInvert.value) * k;
    uniforms.uDepth.value += (target.depth - uniforms.uDepth.value) * k;
    uniforms.uWave.value += (target.wave - uniforms.uWave.value) * k;
    uniforms.uPush.value += (target.push - uniforms.uPush.value) * k;
    look.scale += (target.scale - look.scale) * k;
    look.side += (target.side - look.side) * k * 0.8;
    points.scale.setScalar(base.s * look.scale);
    points.position.set(base.x * look.side, base.y, 0);
    stepMorph(t);
    if (!reduced) {
      uniforms.uTime.value = t / 1000;
      uniforms.uProgress.value = introFrom + (1 - introFrom) * Math.min(1, (t - introStart) / introDur);
      if (pointerInside) look.lerp(ndc, 0.08);
      else look.lerp(sway.set(Math.sin(t / 2600) * 0.6, Math.cos(t / 3400) * 0.35), 0.02);
      points.rotation.y += (look.x * 0.35 - points.rotation.y) * 0.06;
      points.rotation.x += (-look.y * 0.2 - points.rotation.x) * 0.06;
      uniforms.uMouse.value.lerp(pointerInside ? repel : away, 0.15);
    }
    if (stream && video.readyState >= 2 && t - lastSample > 33) {
      sampleVideo();
      lastSample = t;
    }
    renderer.render(scene, camera);
    frames++;
    if (t - fpsT > 1000) {
      hooks.onFps(frames);
      frames = 0;
      fpsT = t;
    }
  }
  raf = requestAnimationFrame(loop);
  hooks.onReady(COUNT);

  async function startCam() {
    if (!navigator.mediaDevices?.getUserMedia) {
      hooks.onToast('cameraHttps');
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 } }, audio: false });
      video.srcObject = stream;
      await video.play();
      morphTarget = null;
      target.vig = 0.5;
      target.inv = 1;
      replayIntro(1800);
      hooks.onCamera(true);
      hooks.onToast('cameraOnToast');
    } catch {
      stream = null;
      hooks.onToast('cameraBlocked');
    }
  }
  function stopCam(silent = false) {
    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    video.srcObject = null;
    showChapterSource(currentId, false);
    replayIntro(1800);
    hooks.onCamera(false);
    if (!silent) hooks.onToast('cameraOffToast');
  }

  return {
    setChapter(id) {
      if (id === currentId) return;
      const ch = CHAPTERS.find((c) => c.id === id);
      if (!ch) return;
      currentId = id;
      Object.assign(target, { depth: ch.depth, wave: ch.wave, push: ch.push, alpha: ch.alpha, scale: ch.scale, side: ch.side === 'left' ? -1 : 1 });
      showChapterSource(id, true);
      replayIntro(1100, 0.55); // partial re-assemble pulse
    },
    toggleCamera: () => (stream ? stopCam() : startCam()),
    dispose() {
      cancelAnimationFrame(raf);
      if (stream) stopCam(true);
      removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      removeEventListener('blur', onLeave);
      removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
