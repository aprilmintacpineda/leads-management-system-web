import React from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import PaginatorTable from 'components/PaginatorTable';
import Avatar from 'components/Avatar';
import { TableRow, TableCell } from 'components/Table';

import { searchLeads } from 'graphql/queries';

function LeadList () {
  const history = useHistory();

  const renderRow = React.useCallback(
    ({
      id,
      firstName,
      middleName,
      lastName,
      gender,
      profilePicture,
      leadStatus: { name: statusName }
    }) => (
      <TableRow
        key={id}
        hover
        onClick={() => {
          history.push(`/lead/view/${id}`);
        }}>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Box mr={1}>
              <Avatar src={profilePicture} firstName={firstName} lastName={lastName} />
            </Box>
            {firstName}
          </Box>
        </TableCell>
        <TableCell>{middleName}</TableCell>
        <TableCell>{lastName}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{statusName}</TableCell>
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
        <TableCell>Status</TableCell>
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
