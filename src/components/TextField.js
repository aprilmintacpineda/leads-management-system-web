import React from 'react';

import MuiTextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function TextField ({ error, ...props }) {
  return (
    <MuiTextField
      helperText={
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      }
      error={Boolean(error)}
      fullWidth
      margin="dense"
      variant="outlined"
      {...props}
    />
  );
}

export default React.memo(TextField);
