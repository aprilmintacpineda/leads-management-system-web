/** @format */

import React from 'react';
import { emitEvent } from 'fluxible-js';

import Fab from '@material-ui/core/Fab';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import makeStyles from '@material-ui/core/styles/makeStyles';

import OpenIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  fabBtn: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  },
  paper: {
    overflow: 'hidden'
  }
});

function FabButton () {
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles();
  const anchorRef = React.useRef(null);

  const toggle = React.useCallback(() => {
    setIsOpen(isVisible => !isVisible);
  }, []);

  const addLead = React.useCallback(() => {
    emitEvent('toggleLeadForm');
  }, []);

  const inviteUser = React.useCallback(() => {
    emitEvent('toggleInviteUserForm');
  }, []);

  return (
    <>
      <Fab
        ref={anchorRef}
        color="primary"
        size="medium"
        className={classes.fabBtn}
        onClick={toggle}>
        {isOpen ? <CloseIcon /> : <OpenIcon />}
      </Fab>
      <Popper anchorEl={anchorRef.current} open={isOpen} placement="top-end">
        <ClickAwayListener onClickAway={toggle}>
          <Box mb={1}>
            <Paper className={classes.paper}>
              <MenuItem onClick={addLead}>Add lead</MenuItem>
              <MenuItem onClick={inviteUser}>Invite user</MenuItem>
            </Paper>
          </Box>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

export default React.memo(FabButton);
