import React from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';

import PaginatorTable from 'components/PaginatorTable';
import Avatar from 'components/Avatar';
import { TableRow, TableCell } from 'components/Table';
import TextField from 'components/TextField';
import LeadStatusSelect from 'components/LeadStatusSelect';

import { searchLeads } from 'graphql/queries';

function LeadList () {
  const [{ searchString, selectedStatus, filter }, setState] = React.useState({
    searchString: '',
    selectedStatus: 'all',
    filter: null
  });

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

  const searchStringOnChange = React.useCallback(
    ({ target: { value: searchString } }) => {
      setState(oldState => ({
        ...oldState,
        searchString
      }));
    },
    []
  );

  const selectedStatusOnChange = React.useCallback(
    ({ target: { value: selectedStatus } }) => {
      setState(oldState => ({
        ...oldState,
        selectedStatus
      }));
    },
    []
  );

  const setFilter = React.useCallback(() => {
    setState(oldState => {
      const filter = {};
      const searchString = oldState.searchString.trim().toLowerCase();
      const selectedStatus =
        oldState.selectedStatus !== 'all' ? oldState.selectedStatus : null;

      if (searchString) {
        filter.or = [
          {
            firstName: {
              matchPhrase: searchString
            }
          },
          {
            middleName: {
              matchPhrase: searchString
            }
          },
          {
            lastName: {
              matchPhrase: searchString
            }
          }
        ];
      }

      if (selectedStatus) filter.leadStatusId = { eq: selectedStatus };

      return {
        ...oldState,
        filter: searchString || selectedStatus ? filter : null
      };
    });
  }, []);

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
    <>
      <Box mb={1} display="flex" alignItems="center">
        <Box width={300}>
          <TextField
            value={searchString}
            onChange={searchStringOnChange}
            label="Search by name..."
          />
        </Box>
        <Box width={300} ml={1}>
          <LeadStatusSelect
            label="Status"
            allowAll
            value={selectedStatus}
            onChange={selectedStatusOnChange}
          />
        </Box>
        <IconButton size="small" color="primary" onClick={setFilter}>
          <SearchIcon />
        </IconButton>
      </Box>
      <PaginatorTable
        query={searchLeads}
        queryName="searchLeads"
        renderRow={renderRow}
        tableHead={tableHead}
        filter={filter}
      />
    </>
  );
}

export default React.memo(LeadList);
