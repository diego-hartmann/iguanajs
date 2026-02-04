export default function repositoryTemplate(
  pascalName: string,
  camelName: string
): string {
  return `import type { ${pascalName}Model, ${pascalName}CreateInput, ${pascalName}UpdateInput } from '../../../prisma/generated/prisma/models/${pascalName}';
import { getPrisma } from '../../../store/prisma-client';
import { PrismaCrudRepository } from '../data-sources/base-classes/prisma-crud.repository';

export class ${pascalName}Repository extends PrismaCrudRepository<
  ${pascalName}Model,
  ${pascalName}CreateInput,
  ${pascalName}UpdateInput
> {
  constructor() {
    super(getPrisma().${camelName});
  }

  // TODO Add custom methods here (e.g. findByEmail, search, etc)
}
`;
}
