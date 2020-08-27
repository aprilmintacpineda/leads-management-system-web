import React from 'react';

import LeadViewContext from '../../LeadViewContext';
import DataListSection from '../../components/DataListSection';
import ContactDetailForm from './ContactDetailForm';
import ContactDetailRow from './ContactDetailRow';

function ContactDetail () {
  const {
    data: { contactDetails }
  } = React.useContext(LeadViewContext);

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
