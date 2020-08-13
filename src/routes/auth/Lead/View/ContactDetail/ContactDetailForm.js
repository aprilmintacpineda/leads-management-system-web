/** @format */

import React from 'react';
import { addEvent } from 'fluxible-js';
import { useParams } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import Select from 'components/Select';
import TextField from 'components/TextField';

import validate from 'libs/validate';
import useForm from 'hooks/useForm';
import { unknownError } from 'fluxible/popup';
import { createContactDetail } from 'graphql/mutations';

const formOptions = {
  initialFormValues: {
    type: '',
    category: '',
    description: '',
    value: ''
  },
  validators: {
    type: ({ type }) =>
      validate(type, ['required', 'options:Work,Personal,Relative,Friend']),
    category: ({ category }) =>
      validate(category, ['required', 'options:Email,Mobile,Telephone']),
    description: ({ description }) => validate(description, ['maxLength:255']),
    value: ({ value }) => validate(value, ['required'])
  },
  initialContext: {
    leadId: null,
    resultRecord: null
  },
  createMutation: createContactDetail,
  isGraphql: true,
  onSubmitSuccess: ({ data, setContext }) => {
    setContext({ resultRecord: data.createContactDetail });
  },
  onSubmitError: () => {
    unknownError();
  },
  transformInput: ({ formValues, formContext }) => ({
    ...formValues,
    leadId: formContext.leadId
  })
};

function ContactDetailForm () {
  const [isOpen, setIsOpen] = React.useState(false);
  const { id: leadId } = useParams();

  const {
    formValues,
    formErrors,
    formContext: { resultRecord },
    onChangeHandlers,
    submitHandler,
    setContext,
    isSubmitting
  } = useForm(formOptions);

  const toggle = React.useCallback(() => {
    setIsOpen(isVisible => !isVisible);
  }, []);

  React.useEffect(() => {
    const removeListener = addEvent('toggleContactDetailForm', contactDetail => {
      console.log(contactDetail);
      toggle();
    });

    return removeListener;
  }, [toggle]);

  React.useEffect(() => {
    if (resultRecord) toggle();
  }, [resultRecord, toggle]);

  React.useEffect(() => {
    setContext({ leadId });
  }, [setContext, leadId]);

  return (
    <Dialog open={isOpen} disableBackdropClick disableEscapeKeyDown fullWidth>
      <form onSubmit={submitHandler}>
        <DialogTitle>Add contact detail</DialogTitle>
        <DialogContent>
          <Select
            value={formValues.category}
            error={formErrors.category}
            onChange={onChangeHandlers.category}
            label="Category"
            disabled={isSubmitting}>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
            <MenuItem value="Telephone">Telephone</MenuItem>
          </Select>
          <Select
            value={formValues.type}
            error={formErrors.type}
            onChange={onChangeHandlers.type}
            label="Type"
            disabled={isSubmitting}>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Relative">Relative</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
          </Select>
          <TextField
            label="Value"
            value={formValues.value}
            onChange={onChangeHandlers.value}
            error={formErrors.value}
            disabled={isSubmitting}
          />
          <TextField
            label="Description (optional)"
            value={formValues.description}
            onChange={onChangeHandlers.description}
            error={formErrors.description}
            disabled={isSubmitting}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={toggle} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default React.memo(ContactDetailForm);
