/** @format */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Login from './guest/Login';

import LeadView from './auth/Lead/View';
import LeadList from './auth/Lead/List';
import Dashboard from './auth/Dashboard';

import FabWidget from './FabWidget';

function mapStates ({ authUser }) {
  return { authUser };
}

function Routes () {
  const { authUser } = useFluxibleStore(mapStates);

  if (authUser) {
    return (
      <BrowserRouter>
        <AppBar position="fixed">
          <Toolbar>
            <Typography>Leads Management System</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <FabWidget />
        <Box mt={2}>
          <Container maxWidth="lg">
            <Switch>
              <Route path="/lead/list" component={LeadList} />
              <Route path="/lead/view/:id" component={LeadView} />
              <Route path="/" exact component={Dashboard} />
            </Switch>
          </Container>
        </Box>
      </BrowserRouter>
    );
  }

  return <Login />;
}

export default React.memo(Routes);
