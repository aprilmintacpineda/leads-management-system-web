import React from 'react';

import DataListSection from '../../components/DataListSection';
import AddressForm from './AddressForm';
import AddressRow from './AddressRow';

import LeadViewContext from '../../LeadViewContext';

function Address () {
  const {
    data: { addresses }
  } = React.useContext(LeadViewContext);

  const renderRow = React.useCallback(
    address => <AddressRow key={address.id} address={address} />,
    []
  );

  return (
    <>
      <DataListSection
        toggleEventName="toggleAddressForm"
        dataList={addresses}
        renderRow={renderRow}
        emptyMessage="Lead does not have addresses"
        title="Addresses"
        btnLabel="Add address"
      />
      <AddressForm />
    </>
  );
}

export default React.memo(Address);
