import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const heroPath = join(root, "public/images/hero/rafting-rapidos.jpg");
const logoPath = join(root, "public/images/logo-turismo-dabar.png");
const ogOut = join(root, "public/images/og-image.jpg");
const iconOut = join(root, "src/app/icon.png");
const appleIconOut = join(root, "src/app/apple-icon.png");
const favicon32Out = join(root, ".tmp-favicon-32.png");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOgImage() {
  const background = await sharp(heroPath)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "right" })
    .modulate({ brightness: 0.88, saturation: 1.08 })
    .toBuffer();

  const logo = await sharp(logoPath)
    .resize(360, 100, { fit: "inside" })
    .png()
    .toBuffer();

  const overlaySvg = Buffer.from(`
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="overlay" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#071a30" stop-opacity="0.93"/>
          <stop offset="50%" stop-color="#071a30" stop-opacity="0.72"/>
          <stop offset="100%" stop-color="#071a30" stop-opacity="0.25"/>
        </linearGradient>
      </defs>
      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#overlay)"/>
      <text x="72" y="360" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="#fbfaf7">
        La Gira de Estudios que recordarán
      </text>
      <text x="72" y="420" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="#fcd34d">
        para toda la vida.
      </text>
      <text x="72" y="500" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="#e7e5e4">
        Bariloche y Sur de Chile · Todo incluido · Soporte 24/7
      </text>
      <text x="72" y="560" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#b15c47">
        turismodabar.cl
      </text>
    </svg>
  `);

  await sharp(background)
    .composite([
      { input: overlaySvg, top: 0, left: 0 },
      { input: logo, top: 72, left: 72 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(ogOut);
}

async function generateSquareIcon(size, outputPath) {
  const logo = await sharp(logoPath)
    .resize(Math.round(size * 0.78), Math.round(size * 0.22), {
      fit: "inside",
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 251, g: 250, b: 247, alpha: 1 },
    },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toFile(outputPath);
}

async function generateFavicon() {
  await generateSquareIcon(32, favicon32Out);
  await sharp(favicon32Out).png().toFile(join(root, "src/app/favicon.ico"));
}

async function main() {
  await mkdir(dirname(ogOut), { recursive: true });
  await generateOgImage();
  await generateSquareIcon(512, iconOut);
  await generateSquareIcon(180, appleIconOut);
  await generateFavicon();
  console.log("SEO assets generated successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
