import React from 'react';
import { emitEvent } from 'fluxible-js';
import { graphqlOperation, API } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

import { updateLeadStatus, createLeadStatus } from 'graphql/mutations';
import { searchLeadStatuss } from 'graphql/queries';

import useForm from 'hooks/useForm';
import validate from 'libs/validate';
import TextField from 'components/TextField';
import { unknownError, alertDialog } from 'fluxible/popup';
import { LeadStatusContext } from './index';

const formOptions = {
  initialFormValues: {
    name: ''
  },
  initialContext: {
    resultRecord: null
  },
  validators: {
    name: ({ name }) => validate(name, ['required', 'maxLength:50'])
  },
  isGraphql: true,
  updateMutation: updateLeadStatus,
  createMutation: createLeadStatus,
  onSubmitSuccess: ({ data, setContext, operation }) => {
    if (operation === 'update') {
      setContext({
        resultRecord: data.updateLeadStatus
      });
    } else {
      setContext({
        resultRecord: data.createLeadStatus
      });
    }
  },
  onBeforeSaveConfirm: async ({
    formValues,
    operation,
    targetRecordId,
    onConfirm,
    onCancel
  }) => {
    const filter = {
      name: {
        matchPhrase: formValues.name.toLowerCase()
      }
    };

    if (operation === 'update') filter.id = { ne: targetRecordId };

    const {
      data: {
        searchLeadStatuss: { items }
      }
    } = await API.graphql(graphqlOperation(searchLeadStatuss, { filter }));

    if (items.length) {
      alertDialog({
        title: 'Possible duplicates',
        message: (
          <>
            <Box mb={2}>
              There are some statuses with similar names, are you sure you want to
              proceed?
            </Box>
            <Box display="flex" flexWrap="wrap">
              {items.map(({ id, name }) => (
                <Chip key={id} label={name} clickable={false} />
              ))}
            </Box>
          </>
        ),
        onConfirm,
        onCancel
      });
    } else {
      onConfirm();
    }
  },
  onSubmitError: unknownError
};

function LeadStatusForm () {
  const {
    formValues,
    formErrors,
    formContext: { resultRecord },
    onChangeHandlers,
    submitHandler,
    resetForm,
    setEditMode,
    operation,
    isSubmitting
  } = useForm(formOptions);

  const isUpdateOperation = operation === 'update';

  const { isOpen, selectedField, selectField } = React.useContext(LeadStatusContext);

  React.useEffect(() => {
    if (resultRecord) {
      if (isUpdateOperation) {
        emitEvent('editStatusSuccess', resultRecord);
      } else {
        emitEvent('addStatusSuccess', resultRecord);
        resetForm();
      }
    }
  }, [resultRecord, resetForm, isUpdateOperation]);

  React.useEffect(() => {
    if (!isOpen) {
      resetForm();
      selectField(null);
    }
  }, [isOpen, resetForm, selectField]);

  React.useEffect(() => {
    if (selectedField) {
      if (!isUpdateOperation) {
        setEditMode(() => ({
          targetRecordId: selectedField.id,
          formValues: {
            name: selectedField.name
          },
          formContext: {
            resultRecord: null
          }
        }));
      }
    } else if (isUpdateOperation) {
      resetForm();
    }
  }, [selectedField, setEditMode, resetForm, isUpdateOperation]);

  return (
    <form onSubmit={submitHandler}>
      <Box display="flex" alignItems="center">
        <TextField
          value={formValues.name}
          error={formErrors.name}
          onChange={onChangeHandlers.name}
          label={isUpdateOperation ? 'Edit status' : 'Add status'}
          disabled={isSubmitting}
        />
        <Box ml={1}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}>
            {isUpdateOperation ? 'Save' : 'Add'}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default React.memo(LeadStatusForm);
