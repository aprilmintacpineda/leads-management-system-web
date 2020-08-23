import React from 'react';

import MuiSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

let count = 0;

function Select ({ label, error, children, ...selectProps }) {
  const labelId = React.useMemo(() => {
    count++;
    return `${label.replace(/\s/g, '_')}-${count.toString()}`;
  }, [label]);

  return (
    <FormControl fullWidth margin="dense" variant="outlined" error={Boolean(error)}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect labelId={labelId} label={label} {...selectProps}>
        {children}
      </MuiSelect>
      <FormHelperText error margin="dense">
        {error}
      </FormHelperText>
    </FormControl>
  );
}

export default React.memo(Select);
