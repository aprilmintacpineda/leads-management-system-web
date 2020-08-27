import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(10)
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    width: '500px'
  }
}));

function Form ({
  title,
  subtitle,
  submitLabel,
  onSubmit,
  isSubmitting,
  children,
  extendedChild = null
}) {
  const classes = useStyles();

  return (
    <form onSubmit={onSubmit}>
      <Box className={classes.wrapper}>
        <Paper>
          <Box p={2} className={classes.container}>
            <Box className={classes.titleContainer}>
              <Typography variant="h4">{title}</Typography>
              <Typography>{subtitle}</Typography>
            </Box>
            <Divider mt={1} mb={1} />
            {children}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={isSubmitting}>
              {submitLabel}
            </Button>
            {extendedChild}
          </Box>
        </Paper>
      </Box>
    </form>
  );
}

export default React.memo(Form);
