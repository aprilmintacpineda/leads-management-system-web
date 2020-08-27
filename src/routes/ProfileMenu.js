import React from 'react';
import { Auth } from 'aws-amplify';
import { updateStore } from 'fluxible-js';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Avatar from 'components/Avatar';

function mapStates ({ authUser }) {
  return { authUser };
}

const useStyles = makeStyles({
  popper: {
    zIndex: 9999
  }
});

function ProfileMenu () {
  const anchorRef = React.useRef();
  const [profileMenuIsOpen, setProfileMenuIsOpen] = React.useState(false);
  const { authUser } = useFluxibleStore(mapStates);
  const classes = useStyles();

  const toggle = React.useCallback(() => {
    setProfileMenuIsOpen(isVisible => !isVisible);
  }, []);

  const logout = React.useCallback(() => {
    Auth.signOut();
    updateStore({ authUser: null });
  }, []);

  return (
    <>
      <IconButton ref={anchorRef} size="small" onClick={toggle}>
        <Avatar
          firstName={authUser.firstName}
          lastName={authUser.lastName}
          src={authUser.profilePicture}
        />
      </IconButton>
      <Popper
        className={classes.popper}
        anchorEl={anchorRef.current}
        open={profileMenuIsOpen}
        placement="bottom-end">
        <ClickAwayListener onClickAway={toggle}>
          <Box mb={1}>
            <Paper>
              <MenuItem component={Link} to="/user/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Paper>
          </Box>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

export default React.memo(ProfileMenu);
