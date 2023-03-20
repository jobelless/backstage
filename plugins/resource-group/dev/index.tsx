import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { resourceGroupPlugin, ResourceGroupPage } from '../src/plugin';

createDevApp()
  .registerPlugin(resourceGroupPlugin)
  .addPage({
    element: <ResourceGroupPage />,
    title: 'Root Page',
    path: '/resource-group'
  })
  .render();
