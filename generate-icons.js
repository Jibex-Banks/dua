// Run with: node generate-icons.js
// Generates PWA icons using canvas
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const iconsDir = path.join(__dirname, 'public', 'icons');

if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size / 2;

  // Deep blue background circle
  const gradient = ctx.createRadialGradient(r, r, 0, r, r, r);
  gradient.addColorStop(0, '#1e40af');
  gradient.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();

  // Moon symbol
  const moonSize = size * 0.45;
  const mx = r;
  const my = r - size * 0.04;
  ctx.fillStyle = '#f8faff';
  ctx.beginPath();
  ctx.arc(mx, my, moonSize / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e40af';
  ctx.beginPath();
  ctx.arc(mx + moonSize * 0.22, my - moonSize * 0.05, moonSize * 0.4, 0, Math.PI * 2);
  ctx.fill();

  // Star
  const starX = mx + moonSize * 0.32;
  const starY = my + moonSize * 0.35;
  const starR = size * 0.045;
  ctx.fillStyle = '#f8faff';
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x = starX + starR * Math.cos(angle);
    const y = starY + starR * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.png`), buffer);
  console.log(`Generated icon-${size}.png`);
});
