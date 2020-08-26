import React from 'react';
import { Auth } from 'aws-amplify';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import useForm from 'hooks/useForm';
import validate from 'libs/validate';
import TextField from 'components/TextField';
import { alertMessage, unknownError } from 'fluxible/popup';

const formOptions = {
  initialFormValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  },
  validators: {
    currentPassword: ({ currentPassword }) => validate(currentPassword, ['required']),
    newPassword: ({ newPassword, confirmPassword }) =>
      validate(newPassword, ['required', `matches:${confirmPassword},passwords`]),
    confirmPassword: ({ confirmPassword, newPassword }) =>
      validate(confirmPassword, ['required', `matches:${newPassword},passwords`])
  },
  validatorChains: {
    newPassword: ['confirmPassword'],
    confirmPassword: ['newPassword']
  },
  onSubmit: async ({ formValues: { currentPassword, newPassword } }) => {
    const currentUser = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(currentUser, currentPassword, newPassword);
  },
  onSubmitError: unknownError,
  onSubmitSuccess: () => {
    alertMessage({
      title: 'Success',
      message: 'You have successfully changed your password.'
    });
  }
};

function ChangePasswordForm ({ resetForm }) {
  const { formValues, formErrors, submitHandler, onChangeHandlers, status } = useForm(
    formOptions
  );

  React.useEffect(() => {
    if (status === 'submitSuccess') resetForm();
  }, [status, resetForm]);

  return (
    <form onSubmit={submitHandler}>
      <TextField
        type="password"
        label="Current password"
        value={formValues.currentPassword}
        error={formErrors.currentPassword}
        onChange={onChangeHandlers.currentPassword}
      />
      <TextField
        type="password"
        label="New password"
        value={formValues.newPassword}
        error={formErrors.newPassword}
        onChange={onChangeHandlers.newPassword}
      />
      <TextField
        type="password"
        label="Confirm password"
        value={formValues.confirmPassword}
        error={formErrors.confirmPassword}
        onChange={onChangeHandlers.confirmPassword}
      />
      <Box display="flex">
        <Button color="secondary" onClick={resetForm}>
          Cancel
        </Button>
        <Box ml={2} />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default React.memo(ChangePasswordForm);
