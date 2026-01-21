import path from 'path';
import fs from 'fs';
import ROOT from '../../utils/ROOT';

export default function injectFeatureIntoServerRoutes(args: {
  kebab: string;
  pluralKebab: string;
  pluralCamel: string;
}) {
  const routesPath = path.join(ROOT, 'src', 'server', 'routes.ts');

  if (!fs.existsSync(routesPath)) {
    console.warn('⚠️  src/server/routes.ts not found. Skipping auto-injection.');
    return;
  }

  const importStart = '//#region AUTO-IMPORTS';
  const importEnd = '//#endregion AUTO-IMPORTS';
  const routesStart = '//#region AUTO-ROUTES';
  const routesEnd = '//#endregion AUTO-ROUTES-END';

  const fileContent = fs.readFileSync(routesPath, 'utf8');

  if (
    !fileContent.includes(importStart) ||
    !fileContent.includes(importEnd) ||
    !fileContent.includes(routesStart) ||
    !fileContent.includes(routesEnd)
  ) {
    console.warn('⚠️  Markers not found in server/routes.ts. Skipping auto-injection.');
    return;
  }

  const routerConst = `${args.pluralCamel}Routes`; // ex: tasksRoutes
  const importLine = `import { ${routerConst} } from '../features/routes/${args.kebab}.routes';`;
  const routeLine = `routes.use('/${args.pluralKebab}', ${routerConst});`;

  let updated = fileContent;

  // IMPORTS block
  const importBlockStart = updated.indexOf(importStart) + importStart.length;
  const importBlockEnd = updated.indexOf(importEnd);
  const importBlock = updated.slice(importBlockStart, importBlockEnd);

  if (!importBlock.includes(importLine)) {
    const newImportBlock = `${importBlock.trimEnd()}\n${importLine}\n`;
    updated =
      updated.slice(0, importBlockStart) + '\n' + newImportBlock + updated.slice(importBlockEnd);
  }

  // ROUTES block
  const routesBlockStart = updated.indexOf(routesStart) + routesStart.length;
  const routesBlockEnd = updated.indexOf(routesEnd);
  const routesBlock = updated.slice(routesBlockStart, routesBlockEnd);

  if (!routesBlock.includes(routeLine)) {
    const newRoutesBlock = `${routesBlock.trimEnd()}\n${routeLine}\n`;
    updated =
      updated.slice(0, routesBlockStart) + '\n' + newRoutesBlock + updated.slice(routesBlockEnd);
  }

  console.log(`\n🦎  Adding ${args.kebab}'s routes to Router...`);
  console.log(`🧩  src/server/routes.ts`);
  fs.writeFileSync(routesPath, updated, 'utf8');
}
