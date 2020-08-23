import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    }
  },
  palette: {
    primary: {
      main: '#00695C'
    },
    warning: {
      main: '#EF6C00'
    },
    success: {
      main: '#2E7D32'
    }
  }
});
