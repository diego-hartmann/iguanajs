export default function typesTemplate(pascalName: string, isDatabaseEntity: boolean): string {
  if (!isDatabaseEntity) {
    return `// Domain type (non-DB entity)
export interface ${pascalName} {
  // TODO: add fields here
}
`;
  }

  return `// Domain type (stable, independent from DB/HTTP)
export interface ${pascalName} {
  id: string;
  // TODO: add fields here
}

// Input types (domain layer)
export type ${pascalName}Create = Omit<${pascalName}, 'id'>;
export type ${pascalName}Update = Partial<Omit<${pascalName}, 'id'>>;
`;
}
