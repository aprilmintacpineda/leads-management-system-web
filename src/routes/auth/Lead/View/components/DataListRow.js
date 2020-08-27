import React from 'react';
import clsx from 'clsx';
import { updateStore, emitEvent } from 'fluxible-js';
import { API, graphqlOperation } from 'aws-amplify';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { alertDialog } from 'fluxible/popup';

const useStyles = makeStyles(theme => {
  return {
    vCenter: {
      display: 'flex',
      alignItems: 'center'
    },
    addressRow: {
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    },
    blurry: {
      opacity: 0.5
    }
  };
});

function DataListRow ({
  data,
  Icon,
  title,
  deleteQuery,
  editEventName,
  afterDelete,
  children
}) {
  const classes = useStyles();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { id } = data;

  const onConfirm = React.useCallback(async () => {
    try {
      setIsDeleting(true);
      updateStore({ loading: true });

      await API.graphql(
        graphqlOperation(deleteQuery, {
          input: { id }
        })
      );

      afterDelete(id);
      updateStore({ loading: false });
    } catch (error) {
      console.error('DataListRow onConfirm', error);
      setIsDeleting(false);
    }
  }, [id, afterDelete, deleteQuery]);

  const confirmDelete = React.useCallback(() => {
    alertDialog({
      title: 'Delete',
      message: 'Are you sure you want to delete the record?',
      onConfirm
    });
  }, [onConfirm]);

  const editRecord = React.useCallback(() => {
    emitEvent(editEventName, data);
  }, [data, editEventName]);

  return (
    <Box
      className={clsx(classes.addressRow, {
        [classes.blurry]: isDeleting
      })}>
      <Box p={2}>
        <Box className={classes.vCenter}>
          <Box mr={1} className={classes.vCenter}>
            <Icon fontSize="small" />
          </Box>
          <Box mr={2} className={classes.vCenter}>
            <Typography variant="caption">{title}</Typography>
          </Box>
          <IconButton size="small" disabled={isDeleting} onClick={editRecord}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" disabled={isDeleting} onClick={confirmDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

export default React.memo(DataListRow);
