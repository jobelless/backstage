import React from 'react';
import { Progress, Table, TableColumn } from '@backstage/core-components';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';

type ResourceGroup = {
  "id": string
  "name": string
  "type": string
  "location": string
  "tags": {
    "backstage-hackathon": string
  },
  "properties": {
    "provisioningState": string
  },
  subscription: {
    "id": string,
    "authorizationSource": string,
    "managedByTenants": [],
    "subscriptionId": string,
    "tenantId": string,
    "displayName": string,
    "state": string,
    "subscriptionPolicies": {
      "locationPlacementId": string,
      "quotaId": string,
      "spendingLimit": string,
    }
  }

}

type DenseTableProps = {
  resourceGroups: ResourceGroup[];
  loading: boolean
  deleteResourceGroup(resourceName: string): void
};

export const ResourceTable = ({ resourceGroups, loading, deleteResourceGroup }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'Location', field: 'location' },
    { title: 'Type', field: 'type' },
    { title: 'Subscription', field: 'subscription.displayName' },
    { title: '', field: 'action' },
  ];

  const data = resourceGroups.map(rg => {
    return {
      action: (
        <IconButton onClick={() => deleteResourceGroup(rg.name)}>
          <DeleteOutlineIcon />
        </IconButton>
      ),
      ...rg
    };
  });


  if (loading) {
    return <Progress />;
  }

  return (
    <Table
      title="Resource Groups"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  )
};

