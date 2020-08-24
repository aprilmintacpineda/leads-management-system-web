import React from 'react';
import format from 'date-fns/format';
import { emitEvent, addEvent } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import EditIcon from '@material-ui/icons/Edit';

import Divider from 'components/Divider';
import Avatar from 'components/Avatar';

import LeadViewContext from '../LeadViewContext';

import EditProfilePicture from './EditProfilePicture';
import LeadStatus from './LeadStatus';

const useStyles = makeStyles({
  profilePicture: {
    width: '150px',
    height: '150px'
  },
  profilePictureContainer: {
    position: 'relative'
  }
});

function BasicInformation () {
  const classes = useStyles();
  const { data, setData } = React.useContext(LeadViewContext);

  const editLead = React.useCallback(() => {
    emitEvent('toggleLeadForm', data);
  }, [data]);

  React.useEffect(() => {
    const removeEvent = addEvent('leadEditSuccess', newData => {
      setData(newData);
    });

    return removeEvent;
  }, [setData]);

  const { firstName, middleName, lastName, profilePicture, createdAt, gender } = data;

  const fullname = `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName}`;

  return (
    <Box p={2} display="flex">
      <Box className={classes.profilePictureContainer}>
        <Avatar
          firstName={firstName}
          lastName={lastName}
          src={profilePicture}
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
          Created at {format(new Date(createdAt), 'PPpp')}
        </Typography>
        <Divider mt={1} mb={1} />
        <Typography>
          <strong>Gender</strong>: {gender}
        </Typography>
        <Box mt={2}>
          <LeadStatus />
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(BasicInformation);
