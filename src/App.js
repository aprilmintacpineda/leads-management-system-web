/** @format */

import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
      <Button variant="contained" color="primary">
        Test button
      </Button>
      <Typography color="warning.main">Test typography</Typography>
    </>
  );
}

export default React.memo(App);
