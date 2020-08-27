import React from 'react';
import { addEvent, updateStore, store } from 'fluxible-js';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import { API, graphqlOperation } from 'aws-amplify';

import { searchLeadStatuss } from 'graphql/queries';

function mapStates ({ leadStatuses }) {
  return { leadStatuses };
}

function FetchLeadStatuses () {
  const { leadStatuses } = useFluxibleStore(mapStates);

  const fetchData = React.useCallback(async () => {
    try {
      updateStore({
        leadStatuses: {
          ...leadStatuses,
          status: 'fetching'
        }
      });

      const {
        data: {
          searchLeadStatuss: { items: data }
        }
      } = await API.graphql(
        graphqlOperation(searchLeadStatuss, {
          limit: 9999,
          sort: {
            field: 'name',
            direction: 'asc'
          }
        })
      );

      updateStore({
        leadStatuses: {
          ...leadStatuses,
          data,
          status: 'fetchSuccess'
        }
      });
    } catch (error) {
      console.error(error);

      updateStore({
        leadStatuses: {
          ...leadStatuses,
          status: 'fetchError'
        }
      });
    }
  }, [leadStatuses]);

  React.useEffect(() => {
    if (leadStatuses.status === 'initial') fetchData();
  }, [leadStatuses.status, fetchData]);

  React.useEffect(() => {
    const removeEvent = addEvent('refetchLeadStatuses', () => {
      if (store.leadStatuses.status !== 'fetching') fetchData();
    });

    return removeEvent;
  }, [fetchData]);

  React.useEffect(() => {
    const removeEvents = [
      addEvent('addStatusSuccess', newStatus => {
        updateStore({
          leadStatuses: {
            ...store.leadStatuses,
            data: [newStatus].concat(store.leadStatuses.data)
          }
        });
      }),
      addEvent('editStatusSuccess', updatedStatus => {
        updateStore({
          leadStatuses: {
            ...store.leadStatuses,
            data: store.leadStatuses.data.map(leadStatus => {
              if (leadStatus.id === updatedStatus.id) return updatedStatus;
              return leadStatus;
            })
          }
        });
      })
    ];

    return () => {
      removeEvents.forEach(removeEvent => {
        removeEvent();
      });
    };
  }, []);

  return null;
}

export default React.memo(FetchLeadStatuses);
