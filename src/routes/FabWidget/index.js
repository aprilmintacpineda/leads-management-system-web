/** @format */

import React from 'react';

import FabButton from './FabButton';
import LeadForm from './LeadForm';
import InviteUserForm from './InviteUserForm';

function Widget () {
  return (
    <>
      <FabButton />
      <LeadForm />
      <InviteUserForm />
    </>
  );
}

export default React.memo(Widget);
