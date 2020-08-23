import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateStore } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { getLead } from 'graphql/queries';
import TabNavigation from 'components/TabNavigation';

import LeadViewContext from './LeadViewContext';
import BasicInformation from './BasicInformation';
import GeneralTab from './GeneralTab';
import NotesTab from './NotesTab';

const tabs = [
  {
    Component: GeneralTab,
    label: 'General'
  },
  {
    Component: NotesTab,
    label: 'Notes'
  }
];

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
        addresses: result.addresses.items.reverse(),
        contactDetails: result.contactDetails.items.reverse()
      },
      status: 'fetchSuccess'
    });
  }, [id]);

  const setData = React.useCallback(arg => {
    setState(oldState => ({
      ...oldState,
      data: arg.constructor === Function ? arg(oldState.data) : arg
    }));
  }, []);

  React.useEffect(() => {
    if (status === 'initial') updateStore({ loading: true });
    else updateStore({ loading: false });
  }, [status]);

  React.useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  if (!data) return null;

  return (
    <LeadViewContext.Provider value={{ data, setData }}>
      <Box mb={2}>
        <Paper>
          <Box mb={7}>
            <BasicInformation />
          </Box>
          <TabNavigation tabs={tabs} />
        </Paper>
      </Box>
    </LeadViewContext.Provider>
  );
}

export default React.memo(LeadView);
