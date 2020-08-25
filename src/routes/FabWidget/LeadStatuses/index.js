import React from 'react';
import { addEvent } from 'fluxible-js';
import useFluxibleStore from 'react-fluxible/lib/useFluxibleStore';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import LeadStatusForm from './LeadStatusForm';
import LeadStatus from './LeadStatus';

function mapStates ({ leadStatuses }) {
  return { leadStatuses };
}

export const LeadStatusContext = React.createContext();

function Main () {
  const { isOpen, toggle } = React.useContext(LeadStatusContext);
  const {
    leadStatuses: { data: leadStatuses }
  } = useFluxibleStore(mapStates);

  const leadStatusesChips = React.useMemo(() => {
    return leadStatuses.map(status => <LeadStatus key={status.id} status={status} />);
  }, [leadStatuses]);

  return (
    <Dialog open={isOpen} fullWidth disableBackdropClick disableEscapeKeyDown>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Lead statuses settings
          <IconButton size="small" onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexWrap="wrap">
          {leadStatusesChips}
        </Box>
        <Box mt={1}>
          <LeadStatusForm />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function LeadStatuses () {
  const [{ isOpen, selectedField }, setState] = React.useState({
    isOpen: false,
    selectedField: null
  });

  const toggle = React.useCallback(() => {
    setState(oldState => ({
      ...oldState,
      isOpen: !oldState.isOpen
    }));
  }, []);

  const selectField = React.useCallback(targetField => {
    setState(oldState => {
      if (
        targetField &&
        oldState.selectedField &&
        oldState.selectedField.id === targetField.id
      ) {
        return {
          ...oldState,
          selectedField: null
        };
      }

      return {
        ...oldState,
        selectedField: targetField
      };
    });
  }, []);

  React.useEffect(() => {
    const removeEvent = addEvent('toggleLeadStatusesForm', toggle);
    return removeEvent;
  }, [toggle]);

  return (
    <LeadStatusContext.Provider
      value={{
        isOpen,
        selectedField,
        selectField,
        toggle
      }}>
      <Main />
    </LeadStatusContext.Provider>
  );
}

export default React.memo(LeadStatuses);
