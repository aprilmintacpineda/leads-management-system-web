/** @format */

import React from 'react';
import { addEvent } from 'fluxible-js';
import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import TextField from 'components/TextField';
import Select from 'components/Select';

import validate from 'libs/validate';
import { sanitizeInput } from 'libs/inputs';

import useForm from 'hooks/useForm';
import { createLead } from 'graphql/mutations';

const formOptions = {
  initialContext: {
    record: null
  },
  initialFormValues: {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: ''
  },
  isGraphql: true,
  createMutation: createLead,
  validators: {
    firstName: ({ firstName }) => validate(firstName, ['required', 'maxLength:255']),
    middleName: ({ middleName }) => validate(middleName, ['maxLength:255']),
    lastName: ({ lastName }) => validate(lastName, ['required', 'maxLength:255']),
    gender: ({ gender }) => validate(gender, ['required', 'options:Male,Female'])
  },
  transformInput ({ formValues }) {
    return Object.keys(formValues).reduce(
      (accumulator, field) => ({
        ...accumulator,
        [field]: sanitizeInput(formValues[field])
      }),
      {}
    );
  },
  onSubmitSuccess ({ data, setContext }) {
    setContext({
      record: data.createLead
    });
  }
};

function LeadForm () {
  const {
    formValues,
    formErrors,
    onChangeHandlers,
    isSubmitting,
    submitHandler,
    formContext: { record },
    resetForm
  } = useForm(formOptions);
  const [isOpen, setIsOpen] = React.useState(false);
  const history = useHistory();

  const toggle = React.useCallback(() => {
    setIsOpen(isVisible => !isVisible);
  }, []);

  React.useEffect(() => {
    const removeListener = addEvent('toggleLeadForm', toggle);
    return removeListener;
  }, [toggle]);

  React.useEffect(() => {
    if (record) {
      toggle();
      history.push(`/lead/${record.id}`);
    }
  }, [record, toggle, history, resetForm]);

  return (
    <Dialog
      open={isOpen}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      onExited={resetForm}>
      <form onSubmit={submitHandler}>
        <DialogTitle>Add lead</DialogTitle>
        <DialogContent>
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
            label="Middle name (optional)"
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
          <Select
            label="Gender"
            value={formValues.gender}
            error={formErrors.gender}
            onChange={onChangeHandlers.gender}
            disabled={isSubmitting}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={toggle} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button color="primary" disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default React.memo(LeadForm);
