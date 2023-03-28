import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { MsalProvider, useMsal } from "@azure/msal-react";
import * as msal from "@azure/msal-browser";
import { ResourceTable } from './ResourceGroups';

const msalConfig = {
  auth: {
    clientId: '95b9d489-247d-4e17-8869-ac3350f2b4de',
    authority: 'https://login.microsoftonline.com/common'
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
const request = {
  scopes: ['https://management.azure.com/user_impersonation']
}


const Example: React.FC = () => {
  const { instance } = useMsal();
  const config = useApi(configApiRef);
  const backendUrl = config.getString('backend.baseUrl');
  const [msalToken, setMSALToken] = useState<msal.AuthenticationResult | undefined>(undefined)
  const [resourceGroups, setResourceGroups] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [subscriptionId, setSubscriptionId] = useState<string>('')
  const [locations, setLocations] = useState<any[]>([])

  const login = useCallback(async () => {
    await instance.loginPopup(request)
      .then((tokenResponse: msal.AuthenticationResult) => setMSALToken(tokenResponse))
      .catch(error => console.log("popuperror: ", error));
  }, [instance])

  useEffect(() => {
    login()
    setLoading(true)
  }, [login])

  useEffect(() => {
    if (msalToken) {
      fetch(`${backendUrl}/api/rg/getSubscriptions`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ accessToken: msalToken.accessToken })
      })
        .then(res => res.json())
        .then(res => {
          setSubscriptions(res.value)
          setSubscriptionId(res.value[0]?.subscriptionId || '')
        })
    }
  }, [msalToken, config, backendUrl])

  useEffect(() => {
    if (msalToken && subscriptionId) {
      fetch(`${backendUrl}/api/rg/getResourceGroups`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ accessToken: msalToken.accessToken, subscriptionId })
      })
        .then(res => res.json())
        .then(res => {
          setResourceGroups(res.value)
          setLoading(false)
        })

      fetch(`${backendUrl}/api/rg/getLocations`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ accessToken: msalToken.accessToken, subscriptionId })
      })
        .then(res => res.json())
        .then(res => {
          setLocations(res.value)
          setLoading(false)
        })
    }
  }, [msalToken, subscriptionId, backendUrl])

  const createResourceGroup = () => {
    fetch(`${backendUrl}/api/rg/createResourceGroup`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        accessToken: msalToken!.accessToken,
        subscriptionId, resourceName: "test-only", data: {
          location: "eastus2"
        }
      })
    })
  }

  const deleteResourceGroup = () => {
    fetch(`${backendUrl}/api/rg/deleteResourceGroup`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        accessToken: msalToken!.accessToken,
        subscriptionId, resourceName: "test-only"
      })
    })
  }


  console.log({ subscriptions, resourceGroups, locations })

  return (
    <Page themeId="tool">
      <Header title="Welcome to resource-group!" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Plugin title">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="Information card">
              <Typography variant="body1">
                All content should be wrapped in a card like this.
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={createResourceGroup}>Create</Button>
            <Button variant="outlined" onClick={deleteResourceGroup}>Delete</Button>
            <ResourceTable resourceGroups={resourceGroups} loading={loading} />
          </Grid>
        </Grid>
      </Content>
    </Page>
  )
}

export const ExampleComponent: React.FC = () => {


  return (
    <MsalProvider instance={msalInstance}>
      <Example />
    </MsalProvider>


  )
};