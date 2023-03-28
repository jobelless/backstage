import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { MicrosoftGraphOrgEntityProvider } from '@backstage/plugin-catalog-backend-module-msgraph';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import {
  defaultGroupTransformer,
  defaultUserTransformer,
  defaultOrganizationTransformer,
} from '@backstage/plugin-catalog-backend-module-msgraph';
import { GroupEntity, UserEntity } from '@backstage/catalog-model';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);

  builder.addEntityProvider(
    MicrosoftGraphOrgEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { hours: 1 },
        timeout: { minutes: 50 },
        initialDelay: { seconds: 15 },
      }),
      groupTransformer: myGroupTransformer,
      userTransformer: myUserTransformer,
      organizationTransformer: myOrganizationTransformer,
    }),
  );

  builder.addProcessor(new ScaffolderEntitiesProcessor());
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}

// This group transformer completely replaces the built in logic with custom logic.
export async function myGroupTransformer(
  group: MicrosoftGraph.Group,
  groupPhoto?: string,
): Promise<GroupEntity | undefined> {
  return {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'Group',
    metadata: {
      name: group.id!,
      annotations: {},
    },
    spec: {
      type: 'aad',
      children: [],
    },
  };
}

// This user transformer makes use of the built in logic, but also sets the description field
export async function myUserTransformer(
  graphUser: MicrosoftGraph.User,
  userPhoto?: string,
): Promise<UserEntity | undefined> {
  const backstageUser = await defaultUserTransformer(graphUser, userPhoto);

  if (backstageUser) {
    backstageUser.metadata.description = 'Loaded from Azure Active Directory';
  }

  console.log({ graphUser, userPhoto })

  return backstageUser;
}

// Example organization transformer that removes the organization group completely
export async function myOrganizationTransformer(
  graphOrganization: MicrosoftGraph.Organization,
): Promise<GroupEntity | undefined> {
  return undefined;
}