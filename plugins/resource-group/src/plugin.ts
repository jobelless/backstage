import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const resourceGroupPlugin = createPlugin({
  id: 'resource-group',
  routes: {
    root: rootRouteRef,
  },
});

export const ResourceGroupPage = resourceGroupPlugin.provide(
  createRoutableExtension({
    name: 'ResourceGroupPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

export const ResourceGroupViewPage = resourceGroupPlugin.provide(
  createRoutableExtension({
    name: 'ResourceGroupViewPage',
    component: () =>
      import('./components/ExampleFetchComponent').then(m => m.ExampleFetchComponent),
    mountPoint: rootRouteRef,
  }),
);
