import React from 'react';
import { updateStore } from 'fluxible-js';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import TextField from 'components/TextField';

import useForm from 'hooks/useForm';
import validate from 'libs/validate';
import { updateUser } from 'graphql/mutations';

const formOptions = {
  initialFormValues: {
    firstName: '',
    middleName: '',
    lastName: ''
  },
  validators: {
    firstName: ({ firstName }) => validate(firstName, ['required', 'maxLength:255']),
    middleName: ({ middleName }) => validate(middleName, ['maxLength:255']),
    lastName: ({ lastName }) => validate(lastName, ['required', 'maxLength:255'])
  },
  updateMutation: updateUser,
  isGraphql: true,
  onSubmitSuccess: ({ data: { updateUser: authUser } }) => {
    updateStore({ authUser });
  }
};

function mapStates ({ authUser }) {
  return { authUser };
}

function BasicInformationForm ({ resetForm }) {
  const {
    formValues,
    formErrors,
    onChangeHandlers,
    isSubmitting,
    setEditMode,
    submitHandler,
    status
  } = useForm(formOptions);

  const {
    authUser: { id: targetRecordId, firstName, middleName, lastName }
  } = useFluxibleStore(mapStates);

  React.useEffect(() => {
    setEditMode(() => ({
      formValues: {
        firstName,
        middleName,
        lastName
      },
      targetRecordId
    }));
  }, [firstName, middleName, lastName, targetRecordId, setEditMode]);

  React.useEffect(() => {
    if (status === 'submitSuccess') resetForm();
  }, [status, resetForm]);

  return (
    <form onSubmit={submitHandler}>
      <Box>
        <TextField
          value={formValues.firstName}
          error={formErrors.firstName}
          label="First name"
          onChange={onChangeHandlers.firstName}
          disabled={isSubmitting}
        />
        <TextField
          value={formValues.middleName}
          error={formErrors.middleName}
          label="Middle name"
          onChange={onChangeHandlers.middleName}
          disabled={isSubmitting}
        />
        <TextField
          value={formValues.lastName}
          error={formErrors.lastName}
          label="Last name"
          onChange={onChangeHandlers.lastName}
          disabled={isSubmitting}
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
      </Box>
    </form>
  );
}

export default React.memo(BasicInformationForm);
