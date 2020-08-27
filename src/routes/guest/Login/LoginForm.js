import React from 'react';

import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import TextField from 'components/TextField';
import { alertMessage, unknownError } from 'fluxible/popup';
import useForm from 'hooks/useForm';
import validate from 'libs/validate';
import Form from './Form';

const formOptions = {
  initialContext: {
    cognitoUser: null
  },
  initialFormValues: {
    email: '',
    password: ''
  },
  validators: {
    email ({ email }) {
      return validate(email, ['required', 'email']);
    },
    password ({ password }) {
      return validate(password, ['required']);
    }
  },
  async onSubmit ({ formValues, setContext }) {
    const cognitoUser = await Auth.signIn(formValues.email, formValues.password);
    setContext({ cognitoUser });
  },
  onSubmitError ({ code }) {
    if (code === 'UserNotFoundException' || code === 'NotAuthorizedException') {
      alertMessage({
        message: 'The credentials may be incorrect or the account may have been disabled.'
      });
    } else {
      unknownError();
    }
  }
};

function LoginForm ({ onSuccess, onForgotPassword }) {
  const {
    formContext: { cognitoUser },
    formValues,
    formErrors,
    onChangeHandlers,
    isSubmitting,
    submitHandler
  } = useForm(formOptions);

  React.useEffect(() => {
    if (cognitoUser) onSuccess(cognitoUser);
  }, [cognitoUser, onSuccess]);

  return (
    <Form
      onSubmit={submitHandler}
      submitLabel="Login"
      title="Leads Management System"
      subtitle="Login to your account"
      isSubmitting={isSubmitting}
      extendedChild={
        <Box mt={1}>
          <Button onClick={onForgotPassword}>Forgot password</Button>
        </Box>
      }>
      <TextField
        value={formValues.email}
        error={formErrors.email}
        onChange={onChangeHandlers.email}
        label="Your email"
        type="email"
        disabled={isSubmitting}
      />
      <TextField
        value={formValues.password}
        error={formErrors.password}
        onChange={onChangeHandlers.password}
        label="Your password"
        type="password"
        disabled={isSubmitting}
      />
    </Form>
  );
}

export default React.memo(LoginForm);
