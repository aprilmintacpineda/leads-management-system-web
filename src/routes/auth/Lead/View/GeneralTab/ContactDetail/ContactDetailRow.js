import React from 'react';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import PhoneIcon from '@material-ui/icons/Phone';

import { deleteContactDetail } from 'graphql/mutations';

import LeadViewContext from '../../LeadViewContext';
import DataListRow from '../../components/DataListRow';

function ContactDetailRow ({ contactDetail }) {
  const { setData } = React.useContext(LeadViewContext);

  const afterDelete = React.useCallback(
    targetId => {
      setData(oldData => ({
        ...oldData,
        contactDetails: oldData.contactDetails.filter(({ id }) => id !== targetId)
      }));
    },
    [setData]
  );

  let Icon = null;

  switch (contactDetail.category) {
    case 'Email':
      Icon = AlternateEmailIcon;
      break;
    case 'Mobile':
      Icon = SmartphoneIcon;
      break;
    default:
      Icon = PhoneIcon;
      break;
  }

  return (
    <DataListRow
      Icon={Icon}
      data={contactDetail}
      title={contactDetail.category}
      deleteQuery={deleteContactDetail}
      editEventName="toggleContactDetailForm"
      afterDelete={afterDelete}>
      <Box display="flex" alignItems="center">
        <Typography>{contactDetail.value}</Typography>
        <Box ml={1}>
          <Chip size="small" label={contactDetail.type} />
        </Box>
      </Box>
      <Typography>{contactDetail.description}</Typography>
    </DataListRow>
  );
}

export default React.memo(ContactDetailRow);
