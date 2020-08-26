import React from 'react';
import format from 'date-fns/format';
import { emitEvent, addEvent } from 'fluxible-js';
import { useParams } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import EditIcon from '@material-ui/icons/Edit';

import Divider from 'components/Divider';
import Avatar from 'components/Avatar';
import ChangeProfilePictureForm from 'components/ChangeProfilePictureForm';

import LeadViewContext from '../LeadViewContext';

import LeadStatus from './LeadStatus';
import { updateLead } from 'graphql/mutations';

const useStyles = makeStyles({
  profilePicture: {
    width: '150px',
    height: '150px'
  },
  profilePictureContainer: {
    position: 'relative'
  }
});

function onSubmitSuccess ({ data: { updateLead: resultRecord } }) {
  emitEvent('leadEditSuccess', resultRecord);
}

function BasicInformation () {
  const classes = useStyles();
  const { data, setData } = React.useContext(LeadViewContext);
  const { id: targetRecordId } = useParams();

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
        <ChangeProfilePictureForm
          updateMutation={updateLead}
          mutationName="updateLead"
          targetRecordId={targetRecordId}
          savePath="/uploads/leads/profilePictures/"
          title="Change lead profile picture"
          onSubmitSuccess={onSubmitSuccess}
        />
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
