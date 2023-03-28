import React from 'react';
import { Progress, Table, TableColumn } from '@backstage/core-components';

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
  }
}

type DenseTableProps = {
  resourceGroups: ResourceGroup[];
  loading: boolean
};

export const ResourceTable = ({ resourceGroups, loading }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'Location', field: 'location' },
    { title: 'Type', field: 'type' },
  ];

  if (loading) {
    return <Progress />;
  }

  return (
    <Table
      title="Resource Groups"
      options={{ search: false, paging: false }}
      columns={columns}
      data={resourceGroups}
    />
  )
};

