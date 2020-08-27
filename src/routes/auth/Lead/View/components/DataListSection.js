import React from 'react';

import { emitEvent } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function DataListSection ({
  toggleEventName,
  dataList,
  renderRow,
  emptyMessage,
  title,
  btnLabel
}) {
  const toggle = React.useCallback(() => {
    emitEvent(toggleEventName);
  }, [toggleEventName]);

  const rows = React.useMemo(() => {
    if (!dataList.length) {
      return (
        <Box p={2}>
          <Typography>{emptyMessage}</Typography>
        </Box>
      );
    }

    return dataList.map(renderRow);
  }, [dataList, renderRow, emptyMessage]);

  return (
    <>
      <Box p={2} display="flex" alignItems="center">
        <Typography variant="h4">{title}</Typography>
        <Box ml={1}>
          <Button variant="contained" color="primary" onClick={toggle}>
            {btnLabel}
          </Button>
        </Box>
      </Box>
      {rows}
    </>
  );
}

export default React.memo(DataListSection);
