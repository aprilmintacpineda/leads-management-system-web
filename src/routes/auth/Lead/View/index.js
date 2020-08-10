/** @format */

import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateStore } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { getLead } from 'graphql/queries';

import Address from './Address';
import BasicInformation from './BasicInformation';

function LeadView ({
  match: {
    params: { id }
  }
}) {
  const [{ data, status }, setState] = React.useState({
    data: null,
    status: 'initial'
  });

  const fetchLead = React.useCallback(async () => {
    const {
      data: { getLead: result }
    } = await API.graphql(graphqlOperation(getLead, { id }));

    setState({
      data: {
        ...result,
        addresses: result.addresses.items
      },
      status: 'fetchSuccess'
    });
  }, [id]);

  React.useEffect(() => {
    if (status === 'initial') updateStore({ loading: true });
    else updateStore({ loading: false });
  }, [status]);

  React.useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  if (!data) return null;

  return (
    <Box mb={2}>
      <Paper>
        <BasicInformation data={data} />
        <Address data={data} />
      </Paper>
    </Box>
  );
}

export default React.memo(LeadView);
