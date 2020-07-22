/** @format */

import React from 'react';

import { updateStore } from 'fluxible-js';
import { Auth } from 'aws-amplify';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Form from './Form';

function validatePassword (password) {
  if (!password) return 'Required.';
  return '';
}

function ChangePasswordForm ({ cognitoUser, onSuccess }) {
  const [{ isSubmitting, newPassword }, setState] = React.useState({
    newPassword: {
      input: '',
      error: ''
    },
    isSubmitting: false
  });

  const submit = React.useCallback(async () => {
    updateStore({ loading: true });

    try {
      await Auth.completeNewPassword(cognitoUser, newPassword.input);
      onSuccess();
    } catch (error) {
      console.log(error);
      updateStore({ loading: true });
    }
  }, [cognitoUser, newPassword.input, onSuccess]);

  const newPasswordChanged = React.useCallback(({ target: { value } }) => {
    setState(oldState => ({
      ...oldState,
      newPassword: {
        input: value,
        error: validatePassword(value)
      }
    }));
  }, []);

  return (
    <Form
      onSubmit={submit}
      title="Change your password"
      subtitle="You need to change your temporary password."
      isSubmitting={isSubmitting}
      submitLabel="Change password">
      <TextField
        value={newPassword.input}
        onChange={newPasswordChanged}
        label="New password"
        error={Boolean(newPassword.error)}
        helperText={
          <Typography variant="caption" color="error">
            {newPassword.error}
          </Typography>
        }
        variant="outlined"
        fullWidth
        margin="dense"
        type="password"
      />
    </Form>
  );
}

export default React.memo(ChangePasswordForm);
