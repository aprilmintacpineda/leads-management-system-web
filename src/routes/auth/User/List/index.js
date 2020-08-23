import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import PaginatorTable from 'components/PaginatorTable';
import { TableRow, TableCell } from 'components/Table';

import { searchUsers } from 'graphql/queries';
import withGroupRestrictions from 'hocs/withGroupRestrictions';

import UserRow from './UserRow';
import ExtendedChild from './ExtendedChild';

function mapStates ({ authUser }) {
  return { authUser };
}

function UserList () {
  const renderRow = React.useCallback(user => <UserRow key={user.id} user={user} />, []);
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
        <TableCell>Groups</TableCell>
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
      ExtendedChild={ExtendedChild}
    />
  );
}

export default withGroupRestrictions(['Admin'], React.memo(UserList));
