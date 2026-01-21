export default function prismaDatasourceTemplate(
  pascalName: string,
  kebabName: string,
  camelName: string
): string {
  return `
import { getPrisma } from '../../../store/prisma-client'; // if not importing, run 'npm run prisma:client'
import type { ${pascalName} } from '../models/${kebabName}.models';
import { PrismaDataSourceCrud } from './base-classes/prisma-data-source.crud';


export class ${pascalName}PrismaDataSource extends PrismaDataSourceCrud<${pascalName}> {
  constructor() {
    super(getPrisma().${camelName});
  }

  // TODO Add custom methods here
}
`;
}
