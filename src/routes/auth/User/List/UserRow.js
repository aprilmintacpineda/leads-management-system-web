import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { emitEvent } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import BlockIcon from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SendIcon from '@material-ui/icons/Send';
import GroupIcon from '@material-ui/icons/Group';

import Avatar from 'components/Avatar';
import TimeAgo from 'components/TimeAgo';
import { TableRow, TableCell } from 'components/Table';
import { PaginatorContext } from 'components/PaginatorProvider';

import { unknownError, alertMessage } from 'fluxible/popup';
import {
  resendTempPass,
  disableUserAccount,
  enableUserAccount,
  updateUser
} from 'graphql/mutations';

function UserRow ({
  user: {
    id,
    firstName,
    middleName,
    lastName,
    profilePicture,
    createdAt,
    isDisabled,
    status,
    email,
    groups
  }
}) {
  const [loading, setLoading] = React.useState(false);
  const { setData } = React.useContext(PaginatorContext);

  const enableAccount = React.useCallback(async () => {
    try {
      setLoading(true);
      await API.graphql(graphqlOperation(enableUserAccount, { id }));

      const {
        data: { updateUser: updatedUserData }
      } = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id,
            isDisabled: false
          }
        })
      );

      setData(oldData =>
        oldData.map(user => {
          if (user.id === id) return updatedUserData;
          return user;
        })
      );

      alertMessage({
        title: 'Success',
        message: 'Temporary password was successfully resent to the user\'s email.'
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      unknownError();
    }
  }, [id, setData]);

  const disableAccount = React.useCallback(async () => {
    try {
      setLoading(true);
      await API.graphql(graphqlOperation(disableUserAccount, { id }));

      const {
        data: { updateUser: updatedUserData }
      } = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id,
            isDisabled: true
          }
        })
      );

      setData(oldData =>
        oldData.map(user => {
          if (user.id === id) return updatedUserData;
          return user;
        })
      );

      alertMessage({
        title: 'Success',
        message: 'Temporary password was successfully resent to the user\'s email.'
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      unknownError();
    }
  }, [id, setData]);

  const resendTempPassword = React.useCallback(async () => {
    try {
      setLoading(true);
      await API.graphql(graphqlOperation(resendTempPass, { email }));

      alertMessage({
        title: 'Success',
        message: 'Temporary password was successfully resent to the user\'s email.'
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      unknownError();
    }
  }, [email]);

  const changeUserGroup = React.useCallback(() => {
    emitEvent('changeUserGroup', { id, groups });
  }, [id, groups]);

  return (
    <TableRow key={id} hover>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <Avatar src={profilePicture} firstName={firstName} lastName={lastName} />
          </Box>
          {firstName}
        </Box>
      </TableCell>
      <TableCell>{middleName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>
        {groups ? groups.join(',') : <Typography color="error">No groups</Typography>}
      </TableCell>
      <TableCell>
        <TimeAgo pastTime={createdAt} />
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          {isDisabled ? (
            <Tooltip title="Enable account">
              <span>
                <IconButton
                  size="small"
                  onClick={enableAccount}
                  color="primary"
                  disabled={loading}>
                  <CheckCircleOutlineIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          ) : (
            <Tooltip title="Disable account">
              <span>
                <IconButton
                  size="small"
                  onClick={disableAccount}
                  color="primary"
                  disabled={loading}>
                  <BlockIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {!isDisabled ? (
            <>
              {status === 'FORCE_CHANGE_PASSWORD' ? (
                <Tooltip title="Resend temporary password">
                  <span>
                    <IconButton
                      size="small"
                      onClick={resendTempPassword}
                      color="primary"
                      disabled={loading}>
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              ) : null}
              <Tooltip title="Change user groups">
                <span>
                  <IconButton
                    size="small"
                    onClick={changeUserGroup}
                    color="primary"
                    disabled={loading}>
                    <GroupIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </>
          ) : null}
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default React.memo(UserRow);
