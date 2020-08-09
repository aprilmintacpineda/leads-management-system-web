/** @format */

import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateStore } from 'fluxible-js';
import format from 'date-fns/format';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Divider from 'components/Divider';
import { getLead } from 'graphql/queries';

import Address from './Address';

const useStyles = makeStyles({
  profilePicture: {
    width: '150px',
    height: '150px'
  }
});

function LeadView ({
  match: {
    params: { id }
  }
}) {
  const classes = useStyles();

  const [{ data, status }, setState] = React.useState({
    data: null,
    status: 'initial'
  });

  const fetchLead = React.useCallback(async () => {
    const {
      data: { getLead: result }
    } = await API.graphql(graphqlOperation(getLead, { id }));

    setState({
      data: result,
      status: 'fetchSuccess'
    });
  }, [id]);

  React.useEffect(() => {
    if (status === 'initial') updateStore({ loading: true });
    else updateStore({ loading: false });
  }, [status]);

  React.useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  if (!data) return null;

  const fullname = `${data.firstName}${data.middlename ? ` ${data.middlename} ` : ' '}${
    data.lastName
  }`;

  return (
    <Paper>
      <Box p={2}>
        <Box display="flex">
          <Avatar src={data.profilePicture} className={classes.profilePicture} />
          <Box
            ml={2}
            flex="1"
            display="flex"
            justifyContent="center"
            flexDirection="column">
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
        <Address />
      </Box>
    </Paper>
  );
}

export default React.memo(LeadView);
