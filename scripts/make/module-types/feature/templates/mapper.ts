export default function mapperTemplate(pascalName: string, kebabName: string): string {
  return `import type {
  ${pascalName}Model,
  ${pascalName}CreateInput,
  ${pascalName}UpdateInput
} from '../../../prisma/generated/prisma/models/${pascalName}';

import type {
  ${pascalName},
  ${pascalName}Create,
  ${pascalName}Update
} from '../models/${kebabName}.models';

export class ${pascalName}Mapper {
  toDomain(row: ${pascalName}Model): ${pascalName} {
    return {
      id: row.id
      // TODO map other fields
    };
  }

  toCreateInput(data: ${pascalName}Create): ${pascalName}CreateInput {
    return {
      ...(data) // TODO apply necessary transformations
    };
  }

  toUpdateInput(data: ${pascalName}Update): ${pascalName}UpdateInput {
    return {
      ...(data) // TODO apply necessary transformations
    };
  }
}
`;
}
