/** @format */

import React from 'react';
import format from 'date-fns/format';
import { emitEvent } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import EditIcon from '@material-ui/icons/Edit';

import Divider from 'components/Divider';
import Avatar from 'components/Avatar';

import EditProfilePicture from './EditProfilePicture';

const useStyles = makeStyles({
  profilePicture: {
    width: '150px',
    height: '150px'
  },
  profilePictureContainer: {
    position: 'relative'
  }
});

function BasicInformation ({ data }) {
  const classes = useStyles();

  const editLead = React.useCallback(() => {
    emitEvent('toggleLeadForm', data);
  }, [data]);

  const fullname = `${data.firstName}${data.middleName ? ` ${data.middleName} ` : ' '}${
    data.lastName
  }`;

  return (
    <Box p={2} display="flex">
      <Box className={classes.profilePictureContainer}>
        <Avatar
          firstName={data.firstName}
          lastName={data.lastName}
          src={data.profilePicture}
          className={classes.profilePicture}
        />
        <EditProfilePicture />
      </Box>
      <Box ml={2} flex="1" display="flex" justifyContent="center" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Typography variant="h5">{fullname}</Typography>
          <Box ml={1}>
            <IconButton size="small" onClick={editLead}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="caption">
          Created at {format(new Date(data.createdAt), 'PPpp')}
        </Typography>
        <Divider mt={1} mb={1} />
        <Typography>
          <strong>Gender</strong>: {data.gender}
        </Typography>
      </Box>
    </Box>
  );
}

export default React.memo(BasicInformation);
