import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import PaginatorTable from 'components/PaginatorTable';
import { TableRow, TableCell } from 'components/Table';

import { searchUsers } from 'graphql/queries';

import UserRow from './UserRow';

function mapStates ({ authUser }) {
  return { authUser };
}

function UserList () {
  const renderRow = React.useCallback(user => <UserRow user={user} />, []);
  const { authUser } = useFluxibleStore(mapStates);

  const filter = React.useMemo(
    () => ({
      id: {
        ne: authUser.id
      }
    }),
    [authUser.id]
  );

  const tableHead = React.useMemo(
    () => (
      <TableRow>
        <TableCell>First name</TableCell>
        <TableCell>Middle name</TableCell>
        <TableCell>Last name</TableCell>
        <TableCell>Invited</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    ),
    []
  );

  return (
    <PaginatorTable
      query={searchUsers}
      queryName="searchUsers"
      renderRow={renderRow}
      tableHead={tableHead}
      filter={filter}
    />
  );
}

export default React.memo(UserList);
