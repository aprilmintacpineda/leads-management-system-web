import React from 'react';
import { useParams } from 'react-router-dom';

import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';

import { updateLead } from 'graphql/mutations';
import { unknownError } from 'fluxible/popup';
import useForm from 'hooks/useForm';
import LeadStatusSelect from 'components/LeadStatusSelect';
import validate from 'libs/validate';

import LeadViewContext from '../LeadViewContext';

const formOptions = {
  initialFormValues: {
    leadStatusId: ''
  },
  validators: {
    leadStatusId: ({ leadStatusId }) => validate(leadStatusId, ['required', 'leadStatus'])
  },
  formContext: {
    resultRecord: null
  },
  isGraphql: true,
  updateMutation: updateLead,
  onSubmitError: unknownError,
  onSubmitSuccess: ({ data: { updateLead: resultRecord }, setContext }) => {
    setContext({ resultRecord });
  }
};

function LeadStatus () {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    data: {
      leadStatus: { name: statusName, id }
    },
    setData
  } = React.useContext(LeadViewContext);
  const { id: leadId } = useParams();

  const {
    formValues,
    formContext: { resultRecord },
    formErrors,
    onChangeHandlers,
    submitHandler,
    setEditMode
  } = useForm(formOptions);

  const toggle = React.useCallback(() => {
    setIsOpen(isVisible => !isVisible);
  }, []);

  const resetForm = React.useCallback(() => {
    setEditMode(() => ({
      formValues: {
        leadStatusId: id
      },
      formContext: {
        resultRecord: null
      },
      targetRecordId: leadId
    }));
  }, [setEditMode, id, leadId]);

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  React.useEffect(() => {
    if (resultRecord) {
      setData(resultRecord);
      toggle();
    }
  }, [resultRecord, setData, toggle]);

  return (
    <>
      <Chip
        label={statusName}
        clickable={false}
        onDelete={toggle}
        deleteIcon={<EditIcon />}
      />
      <Dialog
        open={isOpen}
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        onExit={resetForm}>
        <form onSubmit={submitHandler}>
          <DialogTitle>Change lead status</DialogTitle>
          <DialogContent>
            <LeadStatusSelect
              value={formValues.leadStatusId}
              error={formErrors.leadStatusId}
              onChange={onChangeHandlers.leadStatusId}
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
    </>
  );
}

export default React.memo(LeadStatus);
