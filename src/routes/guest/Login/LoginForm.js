/** @format */

import React from 'react';

import { Auth } from 'aws-amplify';
import { updateStore } from 'fluxible-js';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { alertMessage } from '../../../fluxible/popup';
import Form from './Form';

function validateEmail (email) {
  if (!email) return 'Required.';
  if (
    email.length > 320 ||
    // eslint-disable-next-line
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  )
    return 'Invalid email.';

  return '';
}

function validatePassword (password) {
  if (!password) return 'Required.';
  return '';
}

function LoginForm ({ onSuccess }) {
  const [{ email, password, isSubmitting }, setState] = React.useState({
    email: {
      input: '',
      error: ''
    },
    password: {
      input: '',
      error: ''
    },
    isSubmitting: false
  });

  const emailChanged = React.useCallback(({ target: { value } }) => {
    setState(oldState => ({
      ...oldState,
      email: {
        input: value,
        error: validateEmail(value)
      }
    }));
  }, []);

  const passwordChanged = React.useCallback(({ target: { value } }) => {
    setState(oldState => ({
      ...oldState,
      password: {
        input: value,
        error: validatePassword(value)
      }
    }));
  }, []);

  const submit = React.useCallback(async () => {
    const emailError = validateEmail(email.input);
    const passwordError = validatePassword(password.input);

    if (emailError || passwordError) {
      setState(oldState => ({
        ...oldState,
        email: {
          input: oldState.email.input,
          error: emailError
        },
        password: {
          input: oldState.password.input,
          error: passwordError
        }
      }));

      return;
    }

    setState(oldState => ({
      ...oldState,
      isSubmitting: true
    }));

    updateStore({ loading: true });

    try {
      const cognitoUser = await Auth.signIn(email.input, password.input);
      onSuccess(cognitoUser);
      updateStore({ loading: false });
    } catch (error) {
      console.log(error);

      updateStore({ loading: false });
      alertMessage({ message: 'Incorrect credentials.' });

      setState(oldState => ({
        ...oldState,
        isSubmitting: false
      }));
    }
  }, [email.input, password.input, onSuccess]);

  return (
    <Form
      onSubmit={submit}
      submitLabel="Login"
      title="Leads Management System"
      subtitle="Login to your account"
      isSubmitting={isSubmitting}>
      <TextField
        value={email.input}
        helperText={
          <Typography variant="caption" color="error">
            {email.error}
          </Typography>
        }
        error={Boolean(email.error)}
        onChange={emailChanged}
        label="Your email"
        fullWidth
        margin="dense"
        variant="outlined"
        type="email"
        disabled={isSubmitting}
      />
      <TextField
        value={password.input}
        helperText={
          <Typography variant="caption" color="error">
            {password.error}
          </Typography>
        }
        error={Boolean(password.error)}
        onChange={passwordChanged}
        label="Your password"
        fullWidth
        margin="dense"
        variant="outlined"
        type="password"
        disabled={isSubmitting}
      />
    </Form>
  );
}

export default React.memo(LoginForm);
