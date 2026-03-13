// canvas3d.js — Particle/mesh 3D background for landing page

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w, h, particles, mouse = { x: 0, y: 0 };
const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 130;
const PRIMARY = '#23314f';

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.z = Math.random() * 800 + 200;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.vz = (Math.random() - 0.5) * 0.5;
    this.baseR = Math.random() * 2 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
    if (this.x < -50) this.x = w + 50;
    if (this.x > w + 50) this.x = -50;
    if (this.y < -50) this.y = h + 50;
    if (this.y > h + 50) this.y = -50;
    if (this.z < 100) this.z = 1000;
    if (this.z > 1000) this.z = 100;
  }
  project() {
    const fov = 400;
    const scale = fov / (fov + this.z);
    return {
      sx: this.x * scale + w * (1 - scale) / 2,
      sy: this.y * scale + h * (1 - scale) / 2,
      scale
    };
  }
}

function init() {
  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

let animFrame;
function animate() {
  animFrame = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, w, h);

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];
    const pa = a.project();
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const pb = b.project();
      const dx = pa.sx - pb.sx;
      const dy = pa.sy - pb.sy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST) {
        const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.strokeStyle = hexToRgba(PRIMARY, alpha);
        ctx.lineWidth = pa.scale * 0.8;
        ctx.stroke();
      }
    }

    // Mouse connections
    const mdx = pa.sx - mouse.x;
    const mdy = pa.sy - mouse.y;
    const md = Math.sqrt(mdx * mdx + mdy * mdy);
    if (md < 180) {
      const alpha = (1 - md / 180) * 0.2;
      ctx.beginPath();
      ctx.moveTo(pa.sx, pa.sy);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = hexToRgba(PRIMARY, alpha);
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  // Draw particles
  for (const p of particles) {
    p.update();
    const { sx, sy, scale } = p.project();
    const r = p.baseR * scale * 1.5;
    const alpha = Math.min(scale * 0.7, 0.35);
    ctx.beginPath();
    ctx.arc(sx, sy, Math.max(r, 0.5), 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(PRIMARY, alpha);
    ctx.fill();
  }
}

window.addEventListener('resize', () => { resize(); });
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

init();
animate();