import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { frontendPlugin, FrontendPage } from '../src/plugin';

createDevApp()
  .registerPlugin(frontendPlugin)
  .addPage({
    element: <FrontendPage />,
    title: 'Root Page',
    path: '/frontend'
  })
  .render();
