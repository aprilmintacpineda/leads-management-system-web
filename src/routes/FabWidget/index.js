/** @format */

import React from 'react';

import FabButton from './FabButton';
import LeadForm from './LeadForm';

function Widget () {
  return (
    <>
      <FabButton />
      <LeadForm />
    </>
  );
}

export default React.memo(Widget);
