import React from 'react';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

function mapStates ({ authUser }) {
  return { authUser };
}

function OwnerOnly ({ ownerId, children }) {
  const {
    authUser: { id }
  } = useFluxibleStore(mapStates);
  if (ownerId === id) return children;
  return null;
}

export default React.memo(OwnerOnly);
