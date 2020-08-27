import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { addEvent } from 'fluxible-js';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import Select from 'components/Select';
import { PaginatorContext } from 'components/PaginatorProvider';

import validate from 'libs/validate';
import { unknownError, alertMessage } from 'fluxible/popup';
import { updateUser, updateUserGroups } from 'graphql/mutations';
import useForm from 'hooks/useForm';

const formOptions = {
  initialFormValues: {
    groups: []
  },
  initialContent: {
    targetUserId: null,
    resultRecord: null
  },
  validators: {
    groups: ({ groups }) => validate(groups, ['options:Admin'])
  },
  onSubmit: async ({
    formValues: { groups },
    formContext: { targetUserId },
    setContext
  }) => {
    await API.graphql(
      graphqlOperation(updateUserGroups, {
        groups: JSON.stringify(groups),
        id: targetUserId
      })
    );

    const {
      data: { updateUser: resultRecord }
    } = await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: targetUserId,
          groups: !groups.length ? null : groups
        }
      })
    );

    setContext({ resultRecord });
  },
  onSubmitError: unknownError
};

function ChangeUserGroupForm () {
  const [isOpen, setIsOpen] = React.useState(false);
  const { setData } = React.useContext(PaginatorContext);

  const {
    formValues,
    formErrors,
    formContext: { resultRecord },
    setForm,
    onChangeHandlers,
    resetForm,
    submitHandler
  } = useForm(formOptions);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    const removeEvent = addEvent('changeUserGroup', ({ id: targetUserId, groups }) => {
      setForm({
        formValues: { groups: groups || [] },
        formContext: {
          targetUserId,
          resultRecord: null
        }
      });

      setIsOpen(true);
    });

    return removeEvent;
  }, [setForm]);

  React.useEffect(() => {
    if (resultRecord) {
      setData(oldData =>
        oldData.map(user => {
          if (user.id !== resultRecord.id) return user;
          return resultRecord;
        })
      );

      close();

      alertMessage({
        title: 'Success',
        message: 'The groups of the user has been successfully updated.'
      });
    }
  }, [resultRecord, close, setData]);

  return (
    <Dialog
      open={isOpen}
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      onExit={resetForm}>
      <form onSubmit={submitHandler}>
        <DialogTitle>Change {'user\'s'} group</DialogTitle>
        <DialogContent>
          <Select
            multiple
            label="Groups"
            value={formValues.groups}
            error={formErrors.groups}
            onChange={onChangeHandlers.groups}>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={close}>
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

export default React.memo(ChangeUserGroupForm);
