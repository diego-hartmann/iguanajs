import fs from 'node:fs';
import path from 'node:path';

const FEATURES_DIR = path.resolve('src/features/controllers');

if (!fs.existsSync(FEATURES_DIR)) {
  console.log('No features directory found.');
  process.exit(0);
}

const features = fs
  .readdirSync(FEATURES_DIR, { withFileTypes: true })
  .filter((dirent) => dirent.isFile() && dirent.name !== '.gitkeep')
  .map((dirent) => dirent.name.split('.')[0])
  .sort();

if (features.length === 0) {
  console.log(`Features: 0`);
  process.exit(0);
}

console.log(`Features: ${features.length}`);
for (const feature of features) {
  console.log(`- ${feature}`);
}
