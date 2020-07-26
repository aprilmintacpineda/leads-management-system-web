/** @format */

import React from 'react';

function LeadView ({
  match: {
    params: { id }
  }
}) {
  console.log(id);
  return <h1>Lead View</h1>;
}

export default React.memo(LeadView);
