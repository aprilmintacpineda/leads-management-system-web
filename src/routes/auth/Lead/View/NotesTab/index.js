/** @format */

import React from 'react';
import { store } from 'fluxible-js';
import { useParams } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

import validate from 'libs/validate';
import useForm from 'hooks/useForm';
import TextField from 'components/TextField';
import { createNote } from 'graphql/mutations';

const formOptions = {
  initialFormValues: {
    body: ''
  },
  validators: {
    body: ({ body }) => validate(body, ['required'])
  },
  initialContext: {
    leadId: null
  },
  createMutation: createNote,
  isGraphql: true,
  transformInput: ({ formValues, formContext: { leadId } }) => ({
    ...formValues,
    leadId,
    userId: store.authUser.id
  })
};

const useStyles = makeStyles({
  noteBody: {
    '& textarea': {
      minHeight: '100px'
    }
  }
});

function NotesTab () {
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
    isSubmitting
  } = useForm(formOptions);

  React.useEffect(() => {
    setContext({ leadId });
  }, [leadId, setContext]);

  React.useEffect(() => {
    if (status === 'submitSuccess') resetForm();
  }, [status, resetForm]);

  return (
    <>
      <Typography>Notes</Typography>
      <Box p={2}>
        <TextField
          value={formValues.body}
          error={formErrors.body}
          onChange={onChangeHandlers.body}
          multiline
          className={classes.noteBody}
          disabled={isSubmitting}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={submitHandler}
          disabled={isSubmitting}>
          Submit
        </Button>
      </Box>
    </>
  );
}

export default React.memo(NotesTab);
