export default function repositoryTemplate(pascalName: string, kebabName: string): string {
  return `import type { ${pascalName} } from '../models/${kebabName}.models';
import { ${pascalName}PrismaDataSource } from '../data-sources/${kebabName}.prisma';
import { CrudRepository } from './base-classes/crud.repository';

export class ${pascalName}Repository extends CrudRepository<${pascalName}> {
  constructor() {
    super(new ${pascalName}PrismaDataSource())
  }
}
`;
}
