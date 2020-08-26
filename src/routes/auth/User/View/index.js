import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import BasicInformation from './BasicInformation';
import ChangeProfilePicture from './ChangeProfilePicture';

function UserView () {
  return (
    <Paper>
      <Box p={2} display="flex">
        <ChangeProfilePicture />
        <Box mr={2} />
        <BasicInformation />
      </Box>
    </Paper>
  );
}

export default React.memo(UserView);
