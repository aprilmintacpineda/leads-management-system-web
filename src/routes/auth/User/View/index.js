import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Avatar from 'components/Avatar';

import BasicInformation from './BasicInformation';

function mapStates ({ authUser }) {
  return { authUser };
}

const useStyles = makeStyles({
  profilePicture: {
    width: '150px',
    height: '150px'
  }
});

function UserView () {
  const {
    authUser: { firstName, lastName, profilePicture }
  } = useFluxibleStore(mapStates);
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2} display="flex">
        <Avatar
          firstName={firstName}
          lastName={lastName}
          src={profilePicture}
          className={classes.profilePicture}
        />
        <Box mr={2} />
        <BasicInformation />
      </Box>
    </Paper>
  );
}

export default React.memo(UserView);
