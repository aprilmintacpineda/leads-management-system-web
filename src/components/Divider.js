import React from 'react';

import MuiDivider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

function Divider (boxProps) {
  return (
    <Box {...boxProps}>
      <MuiDivider />
    </Box>
  );
}

export default React.memo(Divider);
