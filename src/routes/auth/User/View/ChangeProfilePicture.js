import React from 'react';
import { updateStore } from 'fluxible-js';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Avatar from 'components/Avatar';
import ChangeProfilePictureForm from 'components/ChangeProfilePictureForm';

import { updateUser } from 'graphql/mutations';

function mapStates ({ authUser }) {
  return { authUser };
}

const useStyles = makeStyles({
  profilePicture: {
    width: '150px',
    height: '150px'
  },
  container: {
    position: 'relative'
  }
});

function onSubmitSuccess ({ data: { updateUser: authUser } }) {
  updateStore({ authUser });
}

function ChangeProfilePicture () {
  const {
    authUser: { id: targetRecordId, firstName, lastName, profilePicture }
  } = useFluxibleStore(mapStates);
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Avatar
        firstName={firstName}
        lastName={lastName}
        src={profilePicture}
        className={classes.profilePicture}
      />
      <ChangeProfilePictureForm
        updateMutation={updateUser}
        mutationName="updateUser"
        targetRecordId={targetRecordId}
        savePath="/uploads/users/profilePictures/"
        title="Change your profile picture"
        onSubmitSuccess={onSubmitSuccess}
      />
    </Box>
  );
}

export default React.memo(ChangeProfilePicture);
