/** @format */

import React from 'react';

import DataListSection from '../components/DataListSection';
import ContactDetailForm from './ContactDetailForm';
import ContactDetailRow from './ContactDetailRow';

function ContactDetail ({ data: { contactDetails } }) {
  const renderRow = React.useCallback(
    contactDetail => (
      <ContactDetailRow key={contactDetail.id} contactDetail={contactDetail} />
    ),
    []
  );

  return (
    <>
      <DataListSection
        dataList={contactDetails}
        renderRow={renderRow}
        toggleEventName="toggleContactDetailForm"
        emptyMessage="Lead does not have any contact details"
        title="Contact details"
        btnLabel="Add contact detail"
      />
      <ContactDetailForm />
    </>
  );
}

export default React.memo(ContactDetail);
