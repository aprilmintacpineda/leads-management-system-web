import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import RestrictToGroups from 'components/RestrictToGroups';

function FallbackComponent () {
  return (
    <Box display="flex" flex="1" alignItems="center" justifyContent="center">
      <Typography variant="h5">
        The resource you are trying to access does not exist or you might not have the
        correct privilege to access it.
      </Typography>
    </Box>
  );
}

function withGroupRestrictions (allowedGroups, WrappedComponent) {
  return props => (
    <RestrictToGroups
      allowedGroups={allowedGroups}
      fallbackComponent={<FallbackComponent />}>
      <WrappedComponent {...props} />
    </RestrictToGroups>
  );
}

export default withGroupRestrictions;
