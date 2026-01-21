import fs from 'fs';

export function writeFileIfNotExists(filePath: string, content: string) {
  if (fs.existsSync(filePath)) {
    console.log(`⚠️ Skipping existing file: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });

  const featuresPath = 'src/features';
  const testsPath = 'tests/api/smoke';
  const prismaPath = 'prisma/models';

  const source = filePath.includes(featuresPath);
  const test = filePath.includes(testsPath);
  const prisma = filePath.includes(prismaPath);

  let loggedPathFinal = filePath;
  if (source) {
    loggedPathFinal = 'src/features' + filePath.split(featuresPath)[1];
  } else if (test) {
    loggedPathFinal = 'tests/api/smoke' + filePath.split(testsPath)[1];
  } else if (prisma) {
    loggedPathFinal = 'prisma/models' + filePath.split(prismaPath)[1];
  }

  console.log(`✏️  ${loggedPathFinal}`);
}
