import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Avatar from 'components/Avatar';
import TimeAgo from 'components/TimeAgo';
import OwnerOnly from 'components/OwnerOnly';

import { deleteNote } from 'graphql/mutations';
import { alertDialog, unknownError } from 'fluxible/popup';

import NoteForm from '../NoteForm';
import NotesContext from '../NotesContext';

const useStyles = makeStyles({
  blurry: {
    opacity: 0.5
  }
});

function Note ({ data }) {
  const [mode, setMode] = React.useState('read');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const classes = useStyles();
  const { setData } = React.useContext(NotesContext);

  const confirmDelete = React.useCallback(async () => {
    try {
      setIsDeleting(true);

      await API.graphql(
        graphqlOperation(deleteNote, {
          input: {
            id: data.id
          }
        })
      );

      setData(oldData => oldData.filter(({ id }) => id !== data.id));
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      unknownError();
    }
  }, [data, setData]);

  const onDelete = React.useCallback(() => {
    alertDialog({
      message: 'Are you sure you want to delete that note?',
      onConfirm: confirmDelete
    });
  }, [confirmDelete]);

  const readMode = React.useCallback(() => {
    setMode('read');
  }, []);

  const editMode = React.useCallback(() => {
    setMode('edit');
  }, []);

  const {
    id,
    body,
    createdAt,
    user: { id: ownerId, firstName, middleName, lastName, profilePicture }
  } = data;

  const fullName = `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName}`;
  const isReadMode = mode === 'read';

  return (
    <Box key={id} display="flex" mb={2} className={isDeleting ? classes.blurry : null}>
      <Avatar src={profilePicture} firstName={firstName} lastName={lastName} />
      <Box ml={2} flex="1">
        <Box display="flex" alignItems="center">
          <Typography>
            <strong>{fullName}</strong>
          </Typography>
          {isReadMode ? (
            <OwnerOnly ownerId={ownerId}>
              <Box ml={2}>
                <IconButton size="small" disabled={isDeleting} onClick={editMode}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={onDelete} disabled={isDeleting}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </OwnerOnly>
          ) : null}
        </Box>
        <Typography variant="caption">
          <TimeAgo pastTime={createdAt} />
        </Typography>
        {isReadMode ? (
          <Typography>{body}</Typography>
        ) : (
          <NoteForm
            targetDataToEdit={data}
            onCancel={readMode}
            onEditSuccess={readMode}
          />
        )}
      </Box>
    </Box>
  );
}

export default React.memo(Note);
