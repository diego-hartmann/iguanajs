export default function prismaModelTemplate(pascalName: string): string {
  const featureName = pascalName.toUpperCase();
  return `\n
// #region -------------------------- ${featureName} -------------------------------
model ${pascalName} {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // TODO: add/change fields
}
 // #endregion
`;
}
