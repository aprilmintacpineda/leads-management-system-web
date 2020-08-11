/** @format */

import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { emitEvent } from 'fluxible-js';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { countryToFlag } from 'libs/helpers';
import countries from 'countries.json';
import { alertDialog } from 'fluxible/popup';
import { deleteAddress } from 'graphql/mutations';

const useStyles = makeStyles(theme => {
  return {
    addressRow: {
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    },
    blurry: {
      opacity: 0.5
    }
  };
});

function AddressRow ({ address }) {
  const { id, type, country: _country, state: _state, line1, line2 } = address;
  const [isDeleting, setIsDeleting] = React.useState(false);
  const classes = useStyles();

  const { state, country } = React.useMemo(() => {
    const country = countries.find(({ name }) => name === _country);
    const state = country.states.find(({ name }) => name === _state);

    return {
      state,
      country
    };
  }, [_country, _state]);

  const onConfirm = React.useCallback(async () => {
    try {
      setIsDeleting(true);

      await API.graphql(
        graphqlOperation(deleteAddress, {
          input: { id }
        })
      );

      emitEvent('deletedAddress', id);
    } catch (error) {
      console.error('deleteAddress', error);
      setIsDeleting(false);
    }
  }, [id]);

  const confirmDelete = React.useCallback(() => {
    alertDialog({
      title: 'Delete address',
      message: 'Are you sure you want to delete that address?',
      onConfirm
    });
  }, [onConfirm]);

  const editAddress = React.useCallback(() => {
    emitEvent('toggleAddressForm', address);
  }, [address]);

  let Icon = null;

  switch (type) {
    case 'Work':
      Icon = BusinessCenterIcon;
      break;
    case 'Province':
      Icon = LocationCityIcon;
      break;
    default:
      // Province
      Icon = HomeIcon;
      break;
  }

  return (
    <Box
      className={clsx(classes.addressRow, {
        [classes.blurry]: isDeleting
      })}>
      {isDeleting ? <LinearProgress /> : null}
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <Icon fontSize="small" />
          </Box>
          <Box mr={2}>
            <Typography variant="caption">{type}</Typography>
          </Box>
          <IconButton size="small" disabled={isDeleting} onClick={editAddress}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" disabled={isDeleting} onClick={confirmDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography>
          {countryToFlag(country.code2)} {country.name}, {state.name}
        </Typography>
        <Typography>{line1}</Typography>
        <Typography>{line2}</Typography>
      </Box>
    </Box>
  );
}

export default React.memo(AddressRow);
