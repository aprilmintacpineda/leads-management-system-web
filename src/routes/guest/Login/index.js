import React from 'react';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { updateStore } from 'fluxible-js';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import { getUser } from 'graphql/queries';
import getInitialStore from 'fluxible/getInitialStore';

import LoginForm from './LoginForm';
import ChangePasswordForm from './ChangePasswordForm';
import ForgotPassword from './ForgotPassword';

function mapStates ({ authUser }) {
  return { authUser };
}

function Login () {
  const [{ cognitoUser, step }, setState] = React.useState({
    cognitoUser: null,
    step: 'loginForm'
  });

  const { authUser } = useFluxibleStore(mapStates);

  const authenticate = React.useCallback(async () => {
    try {
      updateStore({ loading: true });
      const authUser = await Auth.currentAuthenticatedUser();

      const {
        data: { getUser: userData }
      } = await API.graphql(
        graphqlOperation(getUser, {
          id: authUser.username
        })
      );

      updateStore({
        loading: false,
        isAuthenticated: true,
        authUser: {
          email: authUser.attributes.email,
          ...userData
        }
      });
    } catch (error) {
      updateStore({ loading: false });
      Auth.signOut();

      updateStore({
        ...getInitialStore(),
        isAuthenticated: true
      });
    }
  }, []);

  const onLoginSuccess = React.useCallback(
    cognitoUser => {
      if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setState({
          cognitoUser,
          step: 'changePassword'
        });
      } else {
        authenticate();
      }
    },
    [authenticate]
  );

  const resetStep = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      step: 'loginForm'
    }));
  }, []);

  const onForgotPassword = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      step: 'forgotPassword'
    }));
  }, []);

  React.useEffect(() => {
    if (authUser) {
      authenticate();
    } else {
      Auth.signOut();

      updateStore({
        ...getInitialStore(),
        isAuthenticated: true
      });
    }
  }, [authUser, authenticate]);

  if (authUser) return null;
  if (step === 'forgotPassword')
    return <ForgotPassword onSuccess={resetStep} resetLogin={resetStep} />;
  if (step === 'loginForm')
    return <LoginForm onSuccess={onLoginSuccess} onForgotPassword={onForgotPassword} />;
  return <ChangePasswordForm onSuccess={authenticate} cognitoUser={cognitoUser} />;
}

export default React.memo(Login);
