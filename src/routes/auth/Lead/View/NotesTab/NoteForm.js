import React from 'react';
import { store } from 'fluxible-js';
import { useParams } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

import validate from 'libs/validate';
import useForm from 'hooks/useForm';
import TextField from 'components/TextField';
import { createNote, updateNote } from 'graphql/mutations';

import NotesContext from './NotesContext';
import { unknownError } from 'fluxible/popup';

const formOptions = {
  initialFormValues: {
    body: ''
  },
  validators: {
    body: ({ body }) => validate(body, ['required'])
  },
  initialContext: {
    leadId: null,
    resultRecord: null
  },
  createMutation: createNote,
  updateMutation: updateNote,
  isGraphql: true,
  transformInput: ({ formValues, formContext: { leadId } }) => ({
    ...formValues,
    leadId,
    userId: store.authUser.id
  }),
  onSubmitSuccess: ({ data, setContext, operation }) => {
    if (operation === 'create') {
      setContext({
        resultRecord: data.createNote
      });
    } else {
      setContext({
        resultRecord: data.updateNote
      });
    }
  },
  onSubmitError: unknownError
};

const useStyles = makeStyles({
  noteBody: {
    '& textarea': {
      minHeight: '100px'
    }
  }
});

function NoteForm ({ targetDataToEdit = null, onCancel = null, onEditSuccess = null }) {
  const { setData } = React.useContext(NotesContext);
  const classes = useStyles();
  const { id: leadId } = useParams();

  const {
    formValues,
    formErrors,
    onChangeHandlers,
    submitHandler,
    setContext,
    status,
    resetForm,
    isSubmitting,
    operation,
    formContext: { resultRecord },
    setEditMode
  } = useForm(formOptions);

  React.useEffect(() => {
    if (targetDataToEdit) {
      setEditMode(({ formValues, formContext }) => ({
        formValues: {
          ...formValues,
          body: targetDataToEdit.body
        },
        formContext: {
          ...formContext,
          leadId
        },
        targetRecordId: targetDataToEdit.id
      }));
    } else {
      setContext({ leadId });
    }
  }, [targetDataToEdit, leadId, setEditMode, setContext]);

  React.useEffect(() => {
    if (status === 'submitSuccess') {
      setData(oldData => {
        if (operation === 'create') return [resultRecord].concat(oldData);

        return oldData.map(note => {
          if (note.id === resultRecord.id) return resultRecord;
          return note;
        });
      });

      if (onEditSuccess) onEditSuccess();
      resetForm();
    }
  }, [status, resetForm, operation, resultRecord, setData, onEditSuccess]);

  return (
    <Box>
      <TextField
        value={formValues.body}
        error={formErrors.body}
        onChange={onChangeHandlers.body}
        multiline
        className={classes.noteBody}
        disabled={isSubmitting}
      />
      <Box display="flex" alignItems="center">
        {onCancel ? (
          <Box mr={1}>
            <Button
              variant="contained"
              color="secondary"
              onClick={onCancel}
              disabled={isSubmitting}>
              Cancel
            </Button>
          </Box>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          onClick={submitHandler}
          disabled={isSubmitting}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(NoteForm);
