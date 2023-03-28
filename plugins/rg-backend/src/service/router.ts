import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import request from './request'

export interface RouterOptions {
  logger: Logger;
}


export async function createRouter(options: RouterOptions): Promise<express.Router> {

  const router = Router();
  router.use(express.json());
  router.use(errorHandler());

  router.post('/getSubscriptions', async (req, response) => {
    request(req, response, {
      url: '/subscriptions',
      method: 'GET',
    })
  })

  router.post('/getResourceGroups', async (req, response) => {
    request(req, response, {
      url: `/subscriptions/${req.body.subscriptionId}/resourcegroups`,
      method: 'GET',

    })
  })

  router.post('/getLocations', async (req, response) => {
    request(req, response, {
      url: `/subscriptions/${req.body.subscriptionId}/locations`,
      method: 'GET',

    })
  })

  router.post('/createResourceGroup', async (req, response) => {
    request(req, response, {
      url: `/subscriptions/${req.body.subscriptionId}/resourcegroups/${req.body.resourceName}`,
      method: 'PUT',
      data: req.body.data
    })
  })

  router.post('/deleteResourceGroup', async (req, response) => {
    request(req, response, {
      url: `/subscriptions/${req.body.subscriptionId}/resourcegroups/${req.body.resourceName}`,
      method: 'DELETE',
    })
  })

  return router;
}


