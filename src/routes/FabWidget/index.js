import React from 'react';

import RestrictToGroups from 'components/RestrictToGroups';

import FabButton from './FabButton';
import LeadForm from './LeadForm';
import InviteUserForm from './InviteUserForm';
import LeadStatuses from './LeadStatuses';

function Widget () {
  return (
    <>
      <FabButton />
      <LeadForm />
      <RestrictToGroups allowedGroups={['Admin']}>
        <InviteUserForm />
        <LeadStatuses />
      </RestrictToGroups>
    </>
  );
}

export default React.memo(Widget);
