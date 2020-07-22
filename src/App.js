/** @format */

import React from 'react';

import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import makeStyles from '@material-ui/core/styles/makeStyles';

import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Routes from './routes';
import { closePopup } from './fluxible/popup';

const useStyles = makeStyles({
  linearProgress: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    right: 0
  }
});

function mapStates ({ loading, popup }) {
  return { loading, popup };
}

function App () {
  const classes = useStyles();
  const { loading, popup } = useFluxibleStore(mapStates);

  return (
    <>
      {loading ? (
        <Box className={classes.linearProgress}>
          <LinearProgress />
        </Box>
      ) : null}
      <Routes />
      <Dialog open={popup.isOpen} onClose={closePopup} disableBackdropClick fullWidth>
        <Box p={2}>
          <Typography>{popup.message}</Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button color="primary" variant="contained" onClick={closePopup}>
              Okay
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default React.memo(App);
