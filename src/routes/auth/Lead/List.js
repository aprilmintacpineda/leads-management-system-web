/** @format */

import React from 'react';
import { useHistory } from 'react-router-dom';

import PaginatorTable from 'components/PaginatorTable';
import { TableRow, TableCell } from 'components/Table';

import { searchLeads } from 'graphql/queries';

function LeadList () {
  const history = useHistory();

  const renderRow = React.useCallback(
    ({ id, firstName, middleName, lastName, gender }) => (
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
    ),
    [history]
  );

  const tableHead = React.useMemo(
    () => (
      <TableRow>
        <TableCell>First name</TableCell>
        <TableCell>Middle name</TableCell>
        <TableCell>Last name</TableCell>
        <TableCell>Gender</TableCell>
      </TableRow>
    ),
    []
  );

  return (
    <PaginatorTable
      query={searchLeads}
      queryName="searchLeads"
      renderRow={renderRow}
      tableHead={tableHead}
    />
  );
}

export default React.memo(LeadList);
