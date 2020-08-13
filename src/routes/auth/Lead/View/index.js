/** @format */

import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateStore, addEvent } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { getLead } from 'graphql/queries';

import Address from './Address';
import ContactDetail from './ContactDetail';
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
        addresses: result.addresses.items.reverse(),
        contactDetails: result.contactDetails.items.reverse()
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

  React.useEffect(() => {
    const listeners = [
      addEvent('addedNewAddress', ({ resultRecord, operation }) => {
        setState(oldState => {
          let addresses = oldState.data.addresses;

          if (operation === 'update') {
            addresses = addresses.map(address => {
              if (address.id === resultRecord.id) return resultRecord;
              return address;
            });
          } else {
            addresses = [resultRecord].concat(addresses);
          }

          return {
            ...oldState,
            data: {
              ...oldState.data,
              addresses
            }
          };
        });
      }),
      addEvent('deletedAddress', targetId => {
        setState(oldState => ({
          ...oldState,
          data: {
            ...oldState.data,
            addresses: oldState.data.addresses.filter(({ id }) => id !== targetId)
          }
        }));
      }),
      addEvent('leadEditSuccess', data => {
        setState(oldState => ({
          ...oldState,
          data
        }));
      }),
      addEvent('deletedContactDetail', targetId => {
        setState(oldState => ({
          ...oldState,
          data: {
            ...oldState.data,
            contactDetails: oldState.data.contactDetails.filter(
              ({ id }) => id !== targetId
            )
          }
        }));
      }),
      addEvent('addedNewContactDetail', ({ resultRecord, operation }) => {
        setState(oldState => {
          let contactDetails = oldState.data.contactDetails;

          if (operation === 'update') {
            contactDetails = contactDetails.map(contactDetail => {
              if (contactDetail.id === resultRecord.id) return resultRecord;
              return contactDetail;
            });
          } else {
            contactDetails = [resultRecord].concat(contactDetails);
          }

          return {
            ...oldState,
            data: {
              ...oldState.data,
              contactDetails
            }
          };
        });
      })
    ];

    return () => {
      listeners.forEach(removeListenerCallback => {
        removeListenerCallback();
      });
    };
  }, []);

  if (!data) return null;

  return (
    <Box mb={2}>
      <Paper>
        <BasicInformation data={data} />
        <Address data={data} />
        <ContactDetail data={data} />
      </Paper>
    </Box>
  );
}

export default React.memo(LeadView);
