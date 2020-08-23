import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

function mapStates ({ authUser }) {
  return { authUser };
}

function RestrictToGroups ({ allowedGroups, children, fallbackComponent = null }) {
  const { authUser } = useFluxibleStore(mapStates);

  const isAllowed = React.useMemo(
    () =>
      authUser.groups &&
      authUser.groups.find(userGroup => allowedGroups.includes(userGroup)),
    [allowedGroups, authUser]
  );

  if (!isAllowed) return fallbackComponent;
  return children;
}

export default React.memo(RestrictToGroups);
