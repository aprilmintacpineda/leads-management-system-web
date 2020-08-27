import React from 'react';
import { updateStore } from 'fluxible-js';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import RefreshIcon from '@material-ui/icons/Refresh';

import { PaginatorProvider, PaginatorContext } from 'components/PaginatorProvider';

function Body ({ renderRow, tableHead }) {
  const {
    data,
    limit: rowsPerPage,
    page,
    totalCount,
    refreshData,
    setLimit,
    setPage,
    isFetching
  } = React.useContext(PaginatorContext);

  const resultsList = React.useMemo(() => {
    if (!data) return null;

    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(row => renderRow(row));
  }, [data, page, rowsPerPage, renderRow]);

  const onChangeRowsPerPage = React.useCallback(
    ({ target: { value } }) => {
      setLimit(value);
    },
    [setLimit]
  );

  const onChangePage = React.useCallback(
    (_, value) => {
      setPage(value);
    },
    [setPage]
  );

  React.useEffect(() => {
    if (isFetching) updateStore({ loading: true });
    else updateStore({ loading: false });
  }, [isFetching]);

  if (!data) return null;

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>{tableHead}</TableHead>
          <TableBody>{resultsList}</TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between">
        <IconButton onClick={refreshData} disabled={isFetching}>
          <RefreshIcon />
        </IconButton>
        <TablePagination
          component="div"
          rowsPerPageOptions={[1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={totalCount}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={onChangePage}
          backIconButtonProps={{ disabled: isFetching || page === 0 }}
          nextIconButtonProps={{
            disabled: isFetching || (page + 1) * rowsPerPage >= totalCount
          }}
          SelectProps={{ disabled: isFetching }}
        />
      </Box>
    </Paper>
  );
}

function PaginatorTable ({
  query,
  queryName,
  renderRow,
  tableHead,
  filter = null,
  sort = null,
  ExtendedChild = null,
  PreExtendedChild = null
}) {
  return (
    <PaginatorProvider query={query} queryName={queryName} filter={filter} sort={sort}>
      {PreExtendedChild && <PreExtendedChild />}
      <Body renderRow={renderRow} tableHead={tableHead} />
      {ExtendedChild && <ExtendedChild />}
    </PaginatorProvider>
  );
}

export default React.memo(PaginatorTable);
