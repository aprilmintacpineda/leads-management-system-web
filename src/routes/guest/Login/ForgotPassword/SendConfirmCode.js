import React from 'react';

import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import validate from 'libs/validate';
import useForm from 'hooks/useForm';
import TextField from 'components/TextField';
import { alertMessage, unknownError } from 'fluxible/popup';

import Form from '../Form';

const formOptions = {
  initialFormValues: {
    email: ''
  },
  validators: {
    email: ({ email }) => validate(email, ['required', 'email'])
  },
  onSubmit: async ({ formValues: { email } }) => {
    await Auth.forgotPassword(email);
  },
  onSubmitSuccess: () => {
    alertMessage({
      title: 'Success',
      message: 'Your confirmation code has been sent to your email.'
    });
  },
  onSubmitError: ({ code }) => {
    if (code === 'LimitExceededException') {
      alertMessage({
        title: 'Failed',
        message:
          'You have exceeded the maximum attempt of password resets. Please try again after some time.'
      });
    } else {
      unknownError();
    }
  }
};

function SendConfirmCode ({ onSuccess, resetLogin }) {
  const {
    formValues,
    formErrors,
    submitHandler,
    onChangeHandlers,
    isSubmitting,
    status
  } = useForm(formOptions);

  React.useEffect(() => {
    if (status === 'submitSuccess') onSuccess(formValues.email);
  }, [status, onSuccess, formValues.email]);

  return (
    <Form
      title="Forgot password"
      submitLabel="Send confirmation code"
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
        value={formValues.email}
        error={formErrors.email}
        label="Your email"
        onChange={onChangeHandlers.email}
      />
    </Form>
  );
}

export default React.memo(SendConfirmCode);
