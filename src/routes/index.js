/** @format */

import React from 'react';

import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Login from './guest/Login';

function mapStates ({ authUser }) {
  return { authUser };
}

function Routes () {
  const { authUser } = useFluxibleStore(mapStates);

  if (authUser) {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <Typography>Leads Management System</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <h1>Hello world</h1>
      </>
    );
  }

  return <Login />;
}

export default React.memo(Routes);
