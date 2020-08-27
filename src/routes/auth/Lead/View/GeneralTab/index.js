import React from 'react';

import Address from './Address';
import ContactDetail from './ContactDetail';

function GeneralTab () {
  return (
    <>
      <Address />
      <ContactDetail />
    </>
  );
}

export default React.memo(GeneralTab);
