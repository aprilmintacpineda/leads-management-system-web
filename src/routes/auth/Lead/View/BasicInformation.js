/** @format */

import React from 'react';
import format from 'date-fns/format';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Divider from 'components/Divider';

const useStyles = makeStyles({
  profilePicture: {
    width: '150px',
    height: '150px'
  }
});

function BasicInformation ({ data }) {
  const classes = useStyles();

  const fullname = `${data.firstName}${data.middlename ? ` ${data.middlename} ` : ' '}${
    data.lastName
  }`;

  return (
    <Box p={2} display="flex">
      <Avatar src={data.profilePicture} className={classes.profilePicture} />
      <Box ml={2} flex="1" display="flex" justifyContent="center" flexDirection="column">
        <Typography variant="h5">{fullname}</Typography>
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
