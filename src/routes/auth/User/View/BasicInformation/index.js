import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import format from 'date-fns/format';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import EditForm from './EditForm';
import ChangePasswordForm from './ChangePasswordForm';

function mapStates ({ authUser }) {
  return { authUser };
}

function BasicInformation () {
  const [mode, setMode] = React.useState('view');
  const {
    authUser: { firstName, middleName, lastName, email, createdAt }
  } = useFluxibleStore(mapStates);

  const editMode = React.useCallback(() => {
    setMode('edit');
  }, []);

  const changePasswordMode = React.useCallback(() => {
    setMode('changePassword');
  }, []);

  const resetMode = React.useCallback(() => {
    setMode('view');
  }, []);

  const fullName = `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName}`;

  switch (mode) {
    case 'edit':
      return <EditForm resetForm={resetMode} />;
    case 'changePassword':
      return <ChangePasswordForm resetForm={resetMode} />;
    default:
      return (
        <Box>
          <Typography>{fullName}</Typography>
          <Typography>{email}</Typography>
          <Typography variant="caption">
            Invited last {format(new Date(createdAt), 'PP')}
          </Typography>
          <Box display="flex" alignItems="center">
            <Button color="primary" onClick={editMode}>
              Edit
            </Button>
            <Box ml={1} />
            <Button color="primary" onClick={changePasswordMode}>
              Change password
            </Button>
          </Box>
        </Box>
      );
  }
}

export default React.memo(BasicInformation);
