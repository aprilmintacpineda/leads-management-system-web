import React from 'react';

import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import makeStyles from '@material-ui/core/styles/makeStyles';

import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Routes from './routes';
import { closePopup } from './fluxible/popup';

const useStyles = makeStyles(({ palette: { primary: { dark } } }) => ({
  linearProgress: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    right: 0,
    zIndex: 9999
  },
  barColorPrimary: {
    backgroundColor: dark
  }
}));

function mapStates ({ loading, popup }) {
  return { loading, popup };
}

function App () {
  const classes = useStyles();
  const { loading, popup } = useFluxibleStore(mapStates);

  const handleClose = React.useCallback(() => {
    if (popup.onClose) popup.onClose();
    closePopup();
  }, [popup]);

  const handleConfirm = React.useCallback(() => {
    if (popup.onConfirm) popup.onConfirm();
    closePopup();
  }, [popup]);

  return (
    <>
      {loading ? (
        <Box className={classes.linearProgress}>
          <LinearProgress classes={{ barColorPrimary: classes.barColorPrimary }} />
        </Box>
      ) : null}
      <Routes />
      <Dialog open={popup.isOpen} onClose={closePopup} disableBackdropClick fullWidth>
        {popup.title ? <DialogTitle>{popup.title}</DialogTitle> : null}
        <DialogContent>{popup.message}</DialogContent>
        <DialogActions>
          {popup.type === 'dialog' ? (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button color="secondary" onClick={handleConfirm}>
                Confirm
              </Button>
            </>
          ) : (
            <Button color="primary" onClick={handleClose}>
              Okay
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(App);
