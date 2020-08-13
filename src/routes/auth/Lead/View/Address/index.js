/** @format */

import React from 'react';

import Box from '@material-ui/core/Box';

import DataListSection from '../components/DataListSection';
import AddressForm from './AddressForm';
import AddressRow from './AddressRow';

function Address ({ data: { addresses } }) {
  const renderRow = React.useCallback(
    address => <AddressRow key={address.id} address={address} />,
    []
  );

  return (
    <Box mt={7}>
      <DataListSection
        toggleEventName="toggleAddressForm"
        dataList={addresses}
        renderRow={renderRow}
        emptyMessage="Lead does not have addresses"
        title="Addresses"
        btnLabel="Add address"
      />
      <AddressForm />
    </Box>
  );
}

export default React.memo(Address);
