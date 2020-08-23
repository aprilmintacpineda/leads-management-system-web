import React from 'react';
import { useParams } from 'react-router-dom';
import { addEvent } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import validate from 'libs/validate';
import { countryToFlag } from 'libs/helpers';

import TextField from 'components/TextField';
import Autocomplete from 'components/Autocomplete';
import Select from 'components/Select';

import useForm from 'hooks/useForm';
import { createAddress, updateAddress } from 'graphql/mutations';
import { unknownError } from 'fluxible/popup';
import countries from 'countries.json';

import LeadViewContext from '../../LeadViewContext';

const formOptions = {
  initialFormValues: {
    type: '',
    country: null,
    state: null,
    line1: '',
    line2: ''
  },
  validators: {
    type: ({ type }) => validate(type, ['required', 'options:Work,Home,Province']),
    country: ({ country }) => validate(country, ['required']),
    state: ({ state }) => validate(state, ['required']),
    line1: ({ line1 }) => validate(line1, ['required'])
  },
  initialContext: {
    leadId: null,
    resultRecord: null
  },
  transformInput: ({ formValues, formContext }) => {
    return {
      ...formValues,
      country: formValues.country.name,
      state: formValues.state.name,
      leadId: formContext.leadId
    };
  },
  onSubmitSuccess: ({ data, setContext, operation }) => {
    if (operation === 'update') {
      setContext({
        resultRecord: data.updateAddress
      });
    } else {
      // create
      setContext({
        resultRecord: data.createAddress
      });
    }
  },
  onSubmitError: unknownError,
  isGraphql: true,
  createMutation: createAddress,
  updateMutation: updateAddress
};

function AddressForm () {
  const [isOpen, setIsOpen] = React.useState(false);
  const { setData } = React.useContext(LeadViewContext);

  const { id: leadId } = useParams();

  const {
    previousFormValues,
    formValues,
    formErrors,
    formContext: { resultRecord },
    isSubmitting,
    setContext,
    autocompleteHandlers,
    resetForm,
    onChangeHandlers,
    submitHandler,
    setEditMode,
    operation,
    setField
  } = useForm(formOptions);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    const removeListener = addEvent('toggleAddressForm', targetAddress => {
      if (targetAddress) {
        const {
          id,
          type,
          line1,
          line2 = '',
          country: _country,
          state: _state
        } = targetAddress;

        setEditMode(({ formValues, formContext }) => {
          const country = countries.find(({ name }) => name === _country);
          const state = country.states.find(({ name }) => name === _state);

          return {
            targetRecordId: id,
            formValues: {
              ...formValues,
              type,
              country,
              state,
              line1,
              line2
            },
            formContext: {
              ...formContext,
              leadId
            }
          };
        });
      } else {
        setContext({ leadId });
      }

      setIsOpen(true);
    });

    return removeListener;
  }, [setEditMode, leadId, setContext]);

  React.useEffect(() => {
    if (
      (formValues.country &&
        previousFormValues.country &&
        formValues.country.name !== previousFormValues.country.name) ||
      (!formValues.country && previousFormValues.country)
    )
      setField('state', null);
  }, [previousFormValues, formValues, setField]);

  React.useEffect(() => {
    if (resultRecord) {
      setData(oldData => {
        let addresses = oldData.addresses;

        if (operation === 'update') {
          addresses = addresses.map(address => {
            if (address.id === resultRecord.id) return resultRecord;
            return address;
          });
        } else {
          addresses = [resultRecord].concat(addresses);
        }

        return {
          ...oldData,
          addresses
        };
      });

      close();
    }
  }, [close, resultRecord, operation, setData]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      onExit={resetForm}>
      <form onSubmit={submitHandler}>
        <DialogTitle>Add address</DialogTitle>
        <DialogContent>
          <Select
            value={formValues.type}
            error={formErrors.type}
            onChange={onChangeHandlers.type}
            label="Type"
            disabled={isSubmitting}>
            <MenuItem value="Home">Home</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Province">Province</MenuItem>
          </Select>
          <Autocomplete
            fullWidth
            options={countries}
            optionLabelKey="name"
            onChange={autocompleteHandlers.country}
            label="Country"
            error={formErrors.country}
            value={formValues.country}
            disabled={isSubmitting}
            renderOption={option => (
              <Box display="flex" alignItems="center">
                <span>{countryToFlag(option.code2)}</span>
                <Box ml={1}>{option.name}</Box>
              </Box>
            )}
          />
          <Autocomplete
            fullWidth
            options={formValues.country?.states || []}
            optionLabelKey="name"
            onChange={autocompleteHandlers.state}
            label="State"
            error={formErrors.state}
            value={formValues.state}
            disabled={!formValues.country || isSubmitting}
          />
          <TextField
            value={formValues.line1}
            error={formErrors.line1}
            onChange={onChangeHandlers.line1}
            label="Line 1"
            disabled={isSubmitting}
          />
          <TextField
            value={formValues.line2}
            error={formErrors.line2}
            onChange={onChangeHandlers.line2}
            label="Line 2"
            disabled={isSubmitting}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={close} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default React.memo(AddressForm);
