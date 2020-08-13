/** @format */

import React from 'react';

import DataListSection from '../components/DataListSection';
import ContactDetailForm from './ContactDetailForm';

function ContactDetail ({ data: { contactDetails } }) {
  const renderRow = React.useCallback(contactDetail => {
    console.log('contactDetail', contactDetail);
    return null;
  }, []);

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
