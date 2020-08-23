import React from 'react';
import { addEvent } from 'fluxible-js';
import { API, graphqlOperation } from 'aws-amplify';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import useForm from 'hooks/useForm';
import validate from 'libs/validate';
import TextField from 'components/TextField';
import { createCognitoUser, createUser } from 'graphql/mutations';
import { alertMessage, unknownError } from 'fluxible/popup';

const formOptions = {
  initialFormValues: {
    email: '',
    firstName: '',
    middleName: '',
    lastName: ''
  },
  formContext: {
    resultRecord: null
  },
  validators: {
    email: ({ email }) => validate(email, ['required', 'email']),
    firstName: ({ firstName }) => validate(firstName, ['required', 'maxLength:255']),
    middleName: ({ middleName }) => validate(middleName, ['maxLength:255']),
    lastName: ({ lastName }) => validate(lastName, ['required', 'maxLength:255'])
  },
  onSubmit: async ({ formValues, setContext }) => {
    const cognitoRecord = await API.graphql(
      graphqlOperation(createCognitoUser, {
        email: formValues.email
      })
    );

    const id = JSON.parse(cognitoRecord.data.createCognitoUser).User.Username;

    const user = await API.graphql(
      graphqlOperation(createUser, {
        input: {
          id,
          firstName: formValues.firstName,
          middleName: formValues.middleName,
          lastName: formValues.lastName,
          status: 'FORCE_CHANGE_PASSWORD',
          isDisabled: false,
          email: formValues.email
        }
      })
    );

    setContext({ resultRecord: user.data.createUser });
  },
  onSubmitError: unknownError
};

function InviteUserForm () {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    formValues,
    formErrors,
    formContext: { resultRecord },
    onChangeHandlers,
    submitHandler,
    resetForm
  } = useForm(formOptions);

  const toggle = React.useCallback(() => {
    setIsOpen(isVisible => !isVisible);
  }, []);

  React.useEffect(() => {
    const removeEvent = addEvent('toggleInviteUserForm', toggle);
    return removeEvent;
  }, [toggle]);

  React.useEffect(() => {
    if (resultRecord) {
      alertMessage({
        title: 'Success',
        message:
          'User was successfully invited into the system. A temporary password was sent to the user. The user will be asked to change this password on the first login.'
      });

      toggle();
    }
  }, [resultRecord, toggle]);

  return (
    <Dialog
      open={isOpen}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      onExit={resetForm}>
      <form onSubmit={submitHandler}>
        <DialogTitle>Invite User</DialogTitle>
        <DialogContent>
          <TextField
            value={formValues.email}
            error={formErrors.email}
            onChange={onChangeHandlers.email}
            label="Email"
          />
          <TextField
            value={formValues.firstName}
            error={formErrors.firstName}
            onChange={onChangeHandlers.firstName}
            label="First name"
          />
          <TextField
            value={formValues.middleName}
            error={formErrors.middleName}
            onChange={onChangeHandlers.middleName}
            label="Middle name (optional)"
          />
          <TextField
            value={formValues.lastName}
            error={formErrors.lastName}
            onChange={onChangeHandlers.lastName}
            label="Last name"
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default React.memo(InviteUserForm);
