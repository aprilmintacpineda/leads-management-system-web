/** @format */

import React from 'react';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { updateStore } from 'fluxible-js';

import { getUser } from 'graphql/queries';
import getInitialStore from 'fluxible/getInitialStore';

import LoginForm from './LoginForm';
import ChangePasswordForm from './ChangePasswordForm';

function Login () {
  React.useEffect(() => {
    Auth.signOut();
    updateStore(getInitialStore());
  }, []);

  const [{ cognitoUser, step }, setState] = React.useState({
    cognitoUser: null,
    step: 'loginForm'
  });

  const authenticate = React.useCallback(async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const {
      data: { getUser: userData }
    } = await API.graphql(
      graphqlOperation(getUser, {
        id: authUser.username
      })
    );

    updateStore({
      authUser: {
        email: authUser.attributes.email,
        ...userData
      }
    });
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

  if (step === 'loginForm') return <LoginForm onSuccess={onLoginSuccess} />;

  return <ChangePasswordForm onSuccess={authenticate} cognitoUser={cognitoUser} />;
}

export default React.memo(Login);
