/** @format */

import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App () {
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

export default React.memo(App);
