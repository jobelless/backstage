import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const frontendPlugin = createPlugin({
  id: 'frontend',
  routes: {
    root: rootRouteRef,
  },
  featureFlags: [{ name: 'show-frontend-plugin' }],
});

export const FrontendPage = frontendPlugin.provide(
  createRoutableExtension({
    name: 'FrontendPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
