import React from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import TextField from 'components/TextField';
import useForm from 'hooks/useForm';
import validate from 'libs/validate';

import Form from '../Form';
import { alertMessage, unknownError } from 'fluxible/popup';

const formOptions = {
  initialFormValues: {
    confirmCode: '',
    newPassword: '',
    confirmPassword: ''
  },
  initialContext: {
    email: ''
  },
  validators: {
    confirmCode: ({ confirmCode }) => validate(confirmCode, ['required']),
    newPassword: ({ newPassword, confirmPassword }) =>
      validate(newPassword, ['required', `matches:${confirmPassword},passwords`]),
    confirmPassword: ({ confirmPassword, newPassword }) =>
      validate(confirmPassword, ['required', `matches:${newPassword},passwords`])
  },
  validatorChains: {
    newPassword: ['confirmPassword'],
    confirmPassword: ['newPassword']
  },
  onSubmit: async ({
    formValues: { newPassword, confirmCode },
    formContext: { email }
  }) => {
    const response = await Auth.forgotPasswordSubmit(email, confirmCode, newPassword);
    console.log(response);
  },
  onSubmitError: ({ code }) => {
    if (code === 'CodeMismatchException') {
      alertMessage({
        title: 'Failed',
        message: 'Incorrect confirmation code.'
      });
    } else {
      unknownError();
    }
  },
  onSubmitSuccess: () => {
    alertMessage({
      title: 'Success',
      message: 'You have successfully reset your password.'
    });
  }
};

function ConfirmCode ({ resetLogin, email }) {
  const {
    formValues,
    formErrors,
    onChangeHandlers,
    setContext,
    submitHandler,
    isSubmitting,
    status
  } = useForm(formOptions);

  React.useEffect(() => {
    setContext({ email });
  }, [setContext, email]);

  React.useEffect(() => {
    if (status === 'submitSuccess') resetLogin();
  }, [status, resetLogin]);

  return (
    <Form
      title="Forgot password"
      submitLabel="Change password"
      onSubmit={submitHandler}
      isSubmitting={isSubmitting}
      extendedChild={
        <Box mt={1}>
          <Button onClick={resetLogin} disabled={isSubmitting}>
            Cancel
          </Button>
        </Box>
      }>
      <TextField
        value={formValues.confirmCode}
        error={formErrors.confirmCode}
        label="Confirmation code"
        onChange={onChangeHandlers.confirmCode}
      />
      <TextField
        type="password"
        value={formValues.newPassword}
        error={formErrors.newPassword}
        label="New password"
        onChange={onChangeHandlers.newPassword}
      />
      <TextField
        type="password"
        value={formValues.confirmPassword}
        error={formErrors.confirmPassword}
        label="Confirm password"
        onChange={onChangeHandlers.confirmPassword}
      />
    </Form>
  );
}

export default React.memo(ConfirmCode);
