/** @format */

import React from 'react';

import Typography from '@material-ui/core/Typography';

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';

import DataListRow from '../components/DataListRow';

import { countryToFlag } from 'libs/helpers';
import countries from 'countries.json';
import { deleteAddress } from 'graphql/mutations';

function AddressRow ({ address }) {
  const { type, country: _country, state: _state, line1, line2 } = address;

  const { state, country } = React.useMemo(() => {
    const country = countries.find(({ name }) => name === _country);
    const state = country.states.find(({ name }) => name === _state);

    return {
      state,
      country
    };
  }, [_country, _state]);

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
    <DataListRow
      Icon={Icon}
      title={type}
      data={address}
      deleteQuery={deleteAddress}
      editEventName="toggleAddressForm"
      deleteEventName="deletedAddress">
      <Typography>
        {countryToFlag(country.code2)} {country.name}, {state.name}
      </Typography>
      <Typography>{line1}</Typography>
      <Typography>{line2}</Typography>
    </DataListRow>
  );
}

export default React.memo(AddressRow);
