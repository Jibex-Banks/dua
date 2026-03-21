// Pure Node.js PNG icon generator — no external deps
// Run: node gen-icons-pure.js
const fs = require('fs');
const path = require('path');

function crc32(buf) {
  let crc = 0xffffffff;
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function adler32(buf) {
  let a = 1, b = 0;
  for (let i = 0; i < buf.length; i++) { a = (a + buf[i]) % 65521; b = (b + a) % 65521; }
  return (b << 16) | a;
}

function write32BE(buf, offset, val) {
  buf[offset] = (val >>> 24) & 0xff;
  buf[offset+1] = (val >>> 16) & 0xff;
  buf[offset+2] = (val >>> 8) & 0xff;
  buf[offset+3] = val & 0xff;
}

function chunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  write32BE(buf, 0, len);
  buf.write(type, 4, 'ascii');
  data.copy(buf, 8);
  const crcData = Buffer.alloc(4 + len);
  buf.copy(crcData, 0, 4, 8 + len);
  write32BE(buf, 8 + len, crc32(crcData));
  return buf;
}

function deflateStore(data) {
  // zlib format: CMF, FLG, BFINAL|BTYPE, LEN, NLEN, data, Adler32
  const cmf = 0x78, flg = 0x01;
  const out = Buffer.alloc(2 + 1 + 2 + 2 + data.length + 4);
  let o = 0;
  out[o++] = cmf; out[o++] = flg;
  out[o++] = 0x01; // BFINAL=1, BTYPE=00 (no compression)
  const len = data.length;
  out[o++] = len & 0xff; out[o++] = (len >> 8) & 0xff;
  out[o++] = (~len) & 0xff; out[o++] = ((~len) >> 8) & 0xff;
  data.copy(out, o); o += len;
  const a = adler32(data);
  out[o++] = (a >> 24) & 0xff; out[o++] = (a >> 16) & 0xff;
  out[o++] = (a >> 8) & 0xff; out[o++] = a & 0xff;
  return out;
}

function makePNG(size) {
  const r = size / 2;
  // RGBA pixels
  const pixels = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - r, dy = y - r;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > r) { pixels.push(0,0,0,0); continue; }

      // Gradient: center #2563eb → edge #0f172a
      const t = dist / r;
      const R = Math.round(37 + (15-37)*t);
      const G = Math.round(99 + (23-99)*t);
      const B = Math.round(235 + (42-235)*t);

      // Moon: circle at center-left, cutout top-right
      const moonR = r * 0.38;
      const moonCX = r - moonR * 0.1, moonCY = r - moonR * 0.1;
      const cutCX = moonCX + moonR * 0.5, cutCY = moonCY - moonR * 0.1;
      const inMoon = Math.hypot(x-moonCX, y-moonCY) < moonR;
      const inCut  = Math.hypot(x-cutCX,  y-cutCY)  < moonR * 0.78;

      if (inMoon && !inCut) {
        pixels.push(248, 250, 255, 255); // white-ish moon
      } else {
        pixels.push(R, G, B, 255);
      }
    }
  }

  // Build raw PNG scanlines (filter byte 0 per row)
  const rowSize = size * 4;
  const rawData = Buffer.alloc(size * (1 + rowSize));
  for (let y = 0; y < size; y++) {
    rawData[y * (1 + rowSize)] = 0; // filter none
    for (let x = 0; x < rowSize; x++) {
      rawData[y * (1 + rowSize) + 1 + x] = pixels[y * rowSize + x];
    }
  }

  const sig = Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr = Buffer.alloc(13);
  write32BE(ihdr, 0, size); write32BE(ihdr, 4, size);
  ihdr[8]=8; ihdr[9]=2; ihdr[10]=0; ihdr[11]=0; ihdr[12]=0; // 8-bit RGB... wait need RGBA
  // Use color type 6 (RGBA)
  ihdr[9] = 6;
  const idat = deflateStore(rawData);
  const iend = Buffer.alloc(0);

  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', iend)]);
}

const dir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

for (const size of [192, 512]) {
  const buf = makePNG(size);
  fs.writeFileSync(path.join(dir, `icon-${size}.png`), buf);
  console.log(`Written icon-${size}.png (${buf.length} bytes)`);
}
