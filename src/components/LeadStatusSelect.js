import React from 'react';
import { emitEvent } from 'fluxible-js';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

import RefreshIcon from '@material-ui/icons/Refresh';

import Select from './Select';

function mapStates ({ leadStatuses }) {
  return { leadStatuses };
}

function LeadStatusSelect ({ disabled, ...selectProps }) {
  const {
    leadStatuses: { data, status }
  } = useFluxibleStore(mapStates);

  const refresh = React.useCallback(() => {
    emitEvent('refetchLeadStatuses');
  }, []);

  const options = React.useMemo(() => {
    return data
      .filter(({ deletedAt }) => !deletedAt)
      .map(({ id, name }) => (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      ));
  }, [data]);

  const isDisabled = status === 'fetching' || disabled;

  return (
    <Box display="flex" alignItems="center">
      <Select {...selectProps} disabled={isDisabled}>
        {options}
      </Select>
      <IconButton size="small" onClick={refresh} disabled={isDisabled}>
        <RefreshIcon />
      </IconButton>
    </Box>
  );
}

export default React.memo(LeadStatusSelect);
