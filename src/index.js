import 'react-image-crop/dist/ReactCrop.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { initializeStore } from 'fluxible-js';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Amplify from 'aws-amplify';

import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme';
import awsExports from './aws-exports';
import getInitialStore from './fluxible/getInitialStore';

Amplify.configure(awsExports);

initializeStore({
  initialStore: getInitialStore(),
  persist: {
    syncStorage: window.localStorage,
    restore ({ authUser }) {
      return { authUser };
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
