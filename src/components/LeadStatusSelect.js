import React from 'react';
import { emitEvent } from 'fluxible-js';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import RefreshIcon from '@material-ui/icons/Refresh';

import Select from './Select';

function mapStates ({ leadStatuses }) {
  return { leadStatuses };
}

function LeadStatusSelect ({
  disabled,
  includeDeleted = false,
  allowAll = false,
  ...selectProps
}) {
  const {
    leadStatuses: { data, status }
  } = useFluxibleStore(mapStates);

  const refresh = React.useCallback(() => {
    emitEvent('refetchLeadStatuses');
  }, []);

  const options = React.useMemo(() => {
    let filteredData = data;

    if (!includeDeleted)
      filteredData = data.filter(({ deletedAt }) => !deletedAt && !includeDeleted);

    return filteredData.map(({ id, name }) => (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    ));
  }, [data, includeDeleted]);

  const isDisabled = status === 'fetching' || disabled;

  return (
    <Box display="flex" alignItems="center">
      <Select {...selectProps} label="Status" disabled={isDisabled}>
        {allowAll ? <MenuItem value="all">All</MenuItem> : null}
        {options}
      </Select>
      <Tooltip title="Refresh statuses">
        <span>
          <IconButton size="small" onClick={refresh} disabled={isDisabled}>
            <RefreshIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}

export default React.memo(LeadStatusSelect);
