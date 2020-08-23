import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import withStyles from '@material-ui/core/styles/withStyles';

export const TableCell = withStyles(
  ({
    palette: {
      primary: { contrastText, dark }
    }
  }) => ({
    head: {
      backgroundColor: dark,
      color: contrastText
    }
  })
)(MuiTableCell);

export const TableRow = withStyles(({ palette: { action: { hover } } }) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: hover
    },
    '& td': {
      cursor: 'pointer'
    }
  }
}))(MuiTableRow);
