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
import { createContactDetail, updateContactDetail } from 'graphql/mutations';

import LeadViewContext from '../../LeadViewContext';

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
  updateMutation: updateContactDetail,
  createMutation: createContactDetail,
  isGraphql: true,
  onSubmitSuccess: ({ data, setContext, operation }) => {
    if (operation === 'update') {
      setContext({
        resultRecord: data.updateContactDetail
      });
    } else {
      setContext({
        resultRecord: data.createContactDetail
      });
    }
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
  const { setData } = React.useContext(LeadViewContext);

  const {
    formValues,
    formErrors,
    formContext: { resultRecord },
    onChangeHandlers,
    submitHandler,
    setContext,
    isSubmitting,
    operation,
    resetForm,
    setEditMode
  } = useForm(formOptions);

  const toggle = React.useCallback(() => {
    setIsOpen(isVisible => !isVisible);
  }, []);

  React.useEffect(() => {
    const removeListener = addEvent('toggleContactDetailForm', contactDetail => {
      if (contactDetail) {
        const { id, category, type, description, value } = contactDetail;

        setEditMode(({ formValues, formContext }) => ({
          targetRecordId: id,
          formValues: {
            ...formValues,
            category,
            type,
            description,
            value
          },
          formContext: {
            ...formContext,
            leadId
          }
        }));
      } else {
        setContext({ leadId });
      }

      toggle();
    });

    return removeListener;
  }, [toggle, leadId, setEditMode, setContext]);

  React.useEffect(() => {
    if (resultRecord) {
      setData(oldData => {
        let contactDetails = oldData.contactDetails;

        if (operation === 'update') {
          contactDetails = contactDetails.map(contactDetail => {
            if (contactDetail.id === resultRecord.id) return resultRecord;
            return contactDetail;
          });
        } else {
          contactDetails = [resultRecord].concat(contactDetails);
        }

        return {
          ...oldData,
          contactDetails
        };
      });

      toggle();
    }
  }, [resultRecord, toggle, operation, setData]);

  return (
    <Dialog
      open={isOpen}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      onExit={resetForm}>
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
