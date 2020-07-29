/** @format */

import React from 'react';
import { updateStore } from 'fluxible-js';
import { API, graphqlOperation } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import MuiTableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import RefreshIcon from '@material-ui/icons/Refresh';

import withStyles from '@material-ui/core/styles/withStyles';

import { searchLeads } from 'graphql/queries';

const TableCell = withStyles(({ palette: { primary: { contrastText, dark } } }) => ({
  head: {
    backgroundColor: dark,
    color: contrastText
  }
}))(MuiTableCell);

const TableRow = withStyles(({ palette: { action: { hover } } }) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: hover
    },
    '& td': {
      cursor: 'pointer'
    }
  }
}))(MuiTableRow);

function LeadList () {
  const history = useHistory();
  const [
    {
      data,
      nextToken,
      status,
      rowsPerPage,
      nextRowsPerPage,
      page,
      maxPageReached,
      totalCount,
      refresh
    },
    setState
  ] = React.useState({
    data: null,
    nextToken: null,
    status: 'initial',
    rowsPerPage: 10,
    nextRowsPerPage: null,
    page: -1,
    maxPageReached: -1,
    totalCount: 0,
    refresh: false
  });

  const fetchData = React.useCallback(async () => {
    try {
      updateStore({ loading: true });

      setState(oldState => ({
        ...oldState,
        status: 'fetching'
      }));

      const {
        data: { searchLeads: result }
      } = await API.graphql(
        graphqlOperation(searchLeads, {
          limit: nextRowsPerPage || rowsPerPage,
          nextToken: refresh ? null : nextToken
        })
      );

      setState(oldState => {
        const currentPage = oldState.refresh ? -1 : oldState.page;
        const newPage = currentPage + 1;

        return {
          ...oldState,
          status: 'fetchSuccess',
          data: (currentPage === -1 ? [] : oldState.data || []).concat(result.items),
          nextToken: result.nextToken,
          page: newPage,
          maxPageReached: newPage,
          totalCount: oldState.totalCount || result.total,
          refresh: false,
          nextRowsPerPage: null,
          rowsPerPage: oldState.nextRowsPerPage || oldState.rowsPerPage
        };
      });

      updateStore({ loading: false });
    } catch (error) {
      console.log(error);

      setState(oldState => ({
        ...oldState,
        status: 'fetchError'
      }));
    }
  }, [nextToken, rowsPerPage, nextRowsPerPage, refresh]);

  const refreshData = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      status: 'initial',
      refresh: true
    }));
  }, []);

  const onChangeRowsPerPage = React.useCallback(({ target: { value } }) => {
    setState(oldState => ({
      ...oldState,
      status: 'initial',
      nextRowsPerPage: value,
      refresh: true
    }));
  }, []);

  const onChangePage = React.useCallback(
    (_, newPage) => {
      if (newPage > page && newPage > maxPageReached) {
        fetchData();
      } else {
        setState(oldState => ({
          ...oldState,
          page: newPage
        }));
      }
    },
    [page, fetchData, maxPageReached]
  );

  React.useEffect(() => {
    if (status === 'initial') fetchData();
  }, [status, fetchData]);

  const resultsList = React.useMemo(() => {
    if (!data) return null;

    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(({ id, firstName, middleName, lastName, gender }) => (
        <TableRow
          key={id}
          hover
          onClick={() => {
            history.push(`/lead/view/${id}`);
          }}>
          <TableCell>{firstName}</TableCell>
          <TableCell>{middleName}</TableCell>
          <TableCell>{lastName}</TableCell>
          <TableCell>{gender}</TableCell>
        </TableRow>
      ));
  }, [data, history, page, rowsPerPage]);

  if (!data) return null;

  const fetching = status === 'fetching';

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Middle name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{resultsList}</TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between">
        <IconButton onClick={refreshData} disabled={fetching}>
          <RefreshIcon />
        </IconButton>
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={totalCount}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={onChangePage}
          backIconButtonProps={{ disabled: fetching || page === 0 }}
          nextIconButtonProps={{
            disabled: fetching || (page + 1) * rowsPerPage >= totalCount
          }}
          SelectProps={{ disabled: fetching }}
        />
      </Box>
    </Paper>
  );
}

export default React.memo(LeadList);
