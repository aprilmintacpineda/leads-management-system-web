import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import RestrictToGroups from 'components/RestrictToGroups';

import Login from './guest/Login';

import LeadView from './auth/Lead/View';
import LeadList from './auth/Lead/List';
import UserList from './auth/User/List';
import UserView from './auth/User/View';
import Dashboard from './auth/Dashboard';

import FabWidget from './FabWidget';
import FetchLeadStatuses from './FetchLeadStatuses';
import ProfileMenu from './ProfileMenu';

function mapStates ({ authUser, isAuthenticated }) {
  return { authUser, isAuthenticated };
}

function Routes () {
  const { authUser, isAuthenticated } = useFluxibleStore(mapStates);

  if (authUser && isAuthenticated) {
    return (
      <BrowserRouter>
        <AppBar position="fixed">
          <Toolbar>
            <Box
              display="flex"
              flex="1"
              alignItems="center"
              justifyContent="space-between">
              <Typography>Leads Management System</Typography>
              <Box display="flex" alignItems="center">
                <RestrictToGroups allowedGroups={['Admin']}>
                  <Button color="inherit" component={Link} to="/user/list">
                    User list
                  </Button>
                  <Box mr={1} />
                </RestrictToGroups>
                <Button color="inherit" component={Link} to="/lead/list">
                  Lead list
                </Button>
                <Box mr={1} />
                <ProfileMenu />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <FabWidget />
        <Box mt={2}>
          <Container maxWidth="lg">
            <Switch>
              <Route path="/user/list" component={UserList} />
              <Route path="/user/profile" component={UserView} />
              <Route path="/lead/list" component={LeadList} />
              <Route path="/lead/view/:id" component={LeadView} />
              <Route path="/" exact component={Dashboard} />
            </Switch>
          </Container>
        </Box>
        <FetchLeadStatuses />
      </BrowserRouter>
    );
  }

  return <Login />;
}

export default React.memo(Routes);
