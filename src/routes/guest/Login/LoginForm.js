/** @format */

import React from 'react';

import { Auth } from 'aws-amplify';

import TextField from '../../../components/TextField';
import { alertMessage, unknownError } from '../../../fluxible/popup';
import useForm from '../../../hooks/useForm';
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
    },
    password ({ password }) {
      if (!password) return 'Required.';
      return '';
    }
  },
  async onSubmit ({ formValues, setContext }) {
    const cognitoUser = await Auth.signIn(formValues.email, formValues.password);
    setContext({ cognitoUser });
  },
  onSubmitError ({ code }) {
    if (code === 'UserNotFoundException' || code === 'NotAuthorizedException')
      alertMessage({ message: 'Incorrect credentials.' });
    else unknownError();
  }
};

function LoginForm ({ onSuccess }) {
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
      isSubmitting={isSubmitting}>
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
