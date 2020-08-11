/** @format */

import React from 'react';
import { emitEvent } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AddressForm from './AddressForm';
import AddressRow from './AddressRow';

function Address ({ data: { addresses } }) {
  const toggle = React.useCallback(() => {
    emitEvent('toggleAddressForm');
  }, []);

  const addressList = React.useMemo(() => {
    if (!addresses.length) {
      return (
        <Box p={2}>
          <Typography>Lead does not have addresses</Typography>
        </Box>
      );
    }

    return addresses.map(address => <AddressRow key={address.id} address={address} />);
  }, [addresses]);

  return (
    <>
      <Box mt={7} p={2} display="flex" alignItems="center">
        <Typography variant="h4">Addresses</Typography>
        <Box ml={1}>
          <Button variant="contained" color="primary" onClick={toggle}>
            Add address
          </Button>
        </Box>
      </Box>
      {addressList}
      <AddressForm />
    </>
  );
}

export default React.memo(Address);
