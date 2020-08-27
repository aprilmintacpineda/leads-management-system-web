import React from 'react';
import { addEvent } from 'fluxible-js';

import { PaginatorContext } from 'components/PaginatorProvider';
import ChangeUserGroupForm from './ChangeUserGroupForm';

function ExtendedChild () {
  const { setData } = React.useContext(PaginatorContext);

  React.useEffect(() => {
    const removeEvent = addEvent('inviteUserSuccess', user => {
      setData(oldData => [user].concat(oldData));
    });

    return removeEvent;
  }, [setData]);

  return <ChangeUserGroupForm />;
}

export default React.memo(ExtendedChild);
