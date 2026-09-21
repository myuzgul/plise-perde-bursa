const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 120" width="480" height="120">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C578" />
      <stop offset="60%" stop-color="#C5A059" />
      <stop offset="100%" stop-color="#9E782E" />
    </linearGradient>
    <linearGradient id="goldLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F2DFAB" />
      <stop offset="100%" stop-color="#C5A059" />
    </linearGradient>
  </defs>

  <!-- Arka Plan (Paper White) -->
  <rect width="480" height="120" fill="#FFFFFF" />

  <!-- Logo İkonu: Zarif Plise Perde Akordiyon Katmanları -->
  <g transform="translate(25, 20)">
    <!-- Sol Dikey Profil (Midnight Ink) -->
    <rect x="0" y="2" width="4" height="76" rx="2" fill="#151523" />

    <!-- Akordiyon Plise Kıvrımları (Gold Geçişli) -->
    <!-- Dilim 1 -->
    <path d="M 4 8 L 22 22 L 4 36 Z" fill="url(#goldGrad)" opacity="0.95" />
    <path d="M 22 22 L 36 12 L 22 4 Z" fill="url(#goldLight)" />
    <!-- Dilim 2 -->
    <path d="M 4 28 L 22 42 L 4 56 Z" fill="url(#goldGrad)" opacity="0.9" />
    <path d="M 22 42 L 36 32 L 22 24 Z" fill="url(#goldLight)" />
    <!-- Dilim 3 -->
    <path d="M 4 48 L 22 62 L 4 76 Z" fill="url(#goldGrad)" opacity="0.85" />
    <path d="M 22 62 L 36 52 L 22 44 Z" fill="url(#goldLight)" />

    <!-- Üst & Alt Kılavuz İpleri -->
    <line x1="2" y1="4" x2="38" y2="4" stroke="#DFCE9E" stroke-width="1.5" stroke-linecap="round" />
    <line x1="2" y1="76" x2="38" y2="76" stroke="#DFCE9E" stroke-width="1.5" stroke-linecap="round" />
    <!-- Sağ Taşıyıcı Profil -->
    <rect x="36" y="2" width="4" height="76" rx="2" fill="url(#goldGrad)" />
  </g>

  <!-- Tipografi / Marka Metni -->
  <g transform="translate(85, 30)">
    <!-- "PLİSE PERDE" in Midnight Ink & Gold -->
    <text x="0" y="34" font-family="'SharpGrotesk', 'Roobert', 'Inter', system-ui, sans-serif" font-size="34" font-weight="900" letter-spacing="0.5" fill="#151523">
      PLİSE <tspan fill="#C5A059">PERDE</tspan>
    </text>

    <!-- "BURSA" Rozeti (Pill) / Alt Başlığı -->
    <g transform="translate(0, 44)">
      <rect x="0" y="0" width="76" height="18" rx="9" fill="#151523" />
      <text x="38" y="13" font-family="'Roobert', 'Inter', system-ui, sans-serif" font-size="10.5" font-weight="800" letter-spacing="3" fill="#E5C578" text-anchor="middle">
        BURSA
      </text>

      <!-- İnce Çizgi ve Slogan -->
      <line x1="86" y1="9" x2="150" y2="9" stroke="#d7d7db" stroke-width="1.2" />
      <text x="160" y="13" font-family="'Roobert', 'Inter', system-ui, sans-serif" font-size="10.5" font-weight="600" letter-spacing="1" fill="#49495a">
        ÖZEL ÖLÇÜ ATÖLYESİ
      </text>
    </g>
  </g>
</svg>`;

const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// 1. Save SVG
const svgPath = path.join(publicImagesDir, 'logo.svg');
fs.writeFileSync(svgPath, svgLogo, 'utf8');
console.log('Saved logo.svg with TeePublic style');

// 2. Render JPG & PNG using sharp
async function convert() {
  const svgBuffer = Buffer.from(svgLogo);

  await sharp(svgBuffer)
    .resize(480, 120)
    .jpeg({ quality: 95 })
    .toFile(path.join(publicImagesDir, 'logo.jpg'));
  console.log('Saved logo.jpg');

  await sharp(svgBuffer)
    .resize(480, 120)
    .png({ quality: 95 })
    .toFile(path.join(publicImagesDir, 'logo.png'));
  console.log('Saved logo.png');
}

convert().catch(err => {
  console.error('Sharp conversion error:', err);
});
