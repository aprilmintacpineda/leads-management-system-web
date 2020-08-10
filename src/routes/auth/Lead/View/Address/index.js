/** @format */

import React from 'react';
import { emitEvent } from 'fluxible-js';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { countryToFlag } from 'libs/helpers';
import countries from 'countries.json';

import AddressForm from './AddressForm';

const useStyles = makeStyles(theme => {
  return {
    addressRow: {
      padding: theme.spacing(2),
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  };
});

function Address ({ data: { addresses } }) {
  const classes = useStyles();

  const toggle = React.useCallback(() => {
    emitEvent('toggleAddressForm');
  }, []);

  const addressList = React.useMemo(() => {
    if (!addresses.length) {
      return (
        <Box p={2}>
          <Typography>Lead does not have addresses</Typography>
        </Box>
      );
    }

    return addresses.map(
      ({ id, type, country: _country, state: _state, line1, line2 }) => {
        const { name: country, code2, states } = countries.find(
          ({ name }) => name === _country
        );
        const { name: state } = states.find(({ name }) => name === _state);

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
          <Box key={id} className={classes.addressRow}>
            <Box display="flex" alignItems="center">
              <Box mr={1}>
                <Icon fontSize="small" />
              </Box>
              <Box mr={2}>
                <Typography variant="caption">{type}</Typography>
              </Box>
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography>
              {countryToFlag(code2)} {country}, {state}
            </Typography>
            <Typography>{line1}</Typography>
            <Typography>{line2}</Typography>
          </Box>
        );
      }
    );
  }, [addresses, classes]);

  return (
    <>
      <Box mt={7} p={2} display="flex" alignItem="center">
        <Typography variant="h4">Addresses</Typography>
        <Box ml={1}>
          <Button variant="contained" color="primary" onClick={toggle}>
            Add address
          </Button>
        </Box>
      </Box>
      {addressList}
      <AddressForm />
    </>
  );
}

export default React.memo(Address);
