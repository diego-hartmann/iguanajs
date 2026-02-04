import path from 'path';
import { ensureDir } from '../../utils/dir';
import { writeFileIfNotExists } from '../../utils/create-file';
import { runPrettierOn } from '../../../shared';
import { toCase } from '../../utils/case';
import repositoryTemplate from './templates/repository';
import serviceTemplate from './templates/service';
import serviceSpecTemplate from './templates/service-spec';
import controllerTemplate from './templates/controller';
import routesTemplate from './templates/routes';
import routesSpecTemplate from './templates/routes-spec';
import schemaTemplate from './templates/schema';
import typesTemplate from './templates/types';
import injectFeatureIntoServerRoutes from '../../utils/inject-feature-into-routes';
import smokeTestTemplate from './templates/smoke-test';
import prismaModelTemplate from './templates/datasource/prisma.model';
import ROOT from '../../../utils/ROOT';
import mapperTemplate from './templates/mapper';

export default async function createFeature(
  nameInput: string,
  isEntityInDatabase: boolean,
  hasEndpoints: boolean
) {
  const { kebab, pascal, camel } = toCase(nameInput);

  const pluralKebab = `${kebab}s`;

  const baseDir = path.join(ROOT, 'src', 'features');
  const smokeTestsDir = path.join(ROOT, 'tests', 'api');

  const dirs = {
    controllers: path.join(baseDir, 'controllers'),
    schema: path.join(baseDir, 'validations'),
    types: path.join(baseDir, 'types'),
    repositories: path.join(baseDir, 'repositories'),
    mappers: path.join(baseDir, 'mappers'),
    services: path.join(baseDir, 'services'),
    routes: path.join(baseDir, 'routes'),
    smokeTests: path.join(smokeTestsDir, 'smoke'),
    // stores
    dataSources: path.join(baseDir, 'data-sources'),
    //
    prisma: path.join(ROOT, 'prisma/models')
  };

  Object.values(dirs).forEach(ensureDir);

  const files = {
    types: path.join(dirs.types, `${kebab}.types.ts`),
    schema: path.join(dirs.schema, `${kebab}.schema.ts`),
    repository: path.join(dirs.repositories, `${kebab}.repository.ts`),
    mapper: path.join(dirs.mappers, `${kebab}.mapper.ts`),
    service: path.join(dirs.services, `${kebab}.service.ts`),
    serviceSpec: path.join(dirs.services, `${kebab}.service.spec.ts`),
    controller: path.join(dirs.controllers, `${kebab}.controller.ts`),
    routes: path.join(dirs.routes, `${kebab}.routes.ts`),
    routesSpec: path.join(dirs.routes, `${kebab}.routes.spec.ts`),
    smokeTest: path.join(dirs.smokeTests, `${kebab}.smoke.spec.ts`),
    // postgres
    prismaModel: path.join(dirs.prisma, `${kebab}.prisma`)
  };

  console.log('\n🦎  Writing basic files...');
  writeFileIfNotExists(files.service, serviceTemplate(pascal, kebab, isEntityInDatabase));
  writeFileIfNotExists(files.serviceSpec, serviceSpecTemplate(pascal, kebab));
  writeFileIfNotExists(files.types, typesTemplate(pascal, isEntityInDatabase));

  if (isEntityInDatabase) {
    console.log('\n🦎  Writing files for Prisma (PostgresDB)...');
    writeFileIfNotExists(files.repository, repositoryTemplate(pascal, camel));
    writeFileIfNotExists(files.prismaModel, prismaModelTemplate(pascal));
    writeFileIfNotExists(files.mapper, mapperTemplate(pascal, kebab));
  }

  if (hasEndpoints) {
    console.log('\n🦎  Writing files for HTTP Endpoints...');
    writeFileIfNotExists(files.controller, controllerTemplate(pascal, kebab, isEntityInDatabase));
    writeFileIfNotExists(files.routes, routesTemplate(pascal, kebab, camel, pluralKebab));
    writeFileIfNotExists(files.routesSpec, routesSpecTemplate(kebab, camel, pluralKebab));
    writeFileIfNotExists(files.smokeTest, smokeTestTemplate(pascal, camel));
    writeFileIfNotExists(files.schema, schemaTemplate(pascal));

    injectFeatureIntoServerRoutes({
      kebab,
      pluralKebab,
      pluralCamel: camel
    });
  }

  console.log(`\n🦎  Applying prettier in ${nameInput}s files...`);
  runPrettierOn([baseDir]);
}
