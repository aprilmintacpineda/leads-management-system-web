import React from 'react';
import { emitEvent } from 'fluxible-js';
import format from 'date-fns/format';
import { API, graphqlOperation } from 'aws-amplify';

import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import RestoreIcon from '@material-ui/icons/Restore';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { LeadStatusContext } from './index';
import { unknownError } from 'fluxible/popup';
import { updateLeadStatus } from 'graphql/mutations';

function LeadStatus ({ status }) {
  const { id, name, deletedAt } = status;
  const { selectedField, selectField } = React.useContext(LeadStatusContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const onDelete = React.useCallback(async () => {
    try {
      setIsLoading(true);

      const {
        data: { updateLeadStatus: deletedRecord }
      } = await API.graphql(
        graphqlOperation(updateLeadStatus, {
          input: {
            id,
            deletedAt: deletedAt ? null : new Date()
          }
        })
      );

      emitEvent('editStatusSuccess', deletedRecord);
      setIsLoading(false);
    } catch (error) {
      unknownError();
      setIsLoading(false);
    }
  }, [id, deletedAt]);

  const onClick = React.useCallback(() => {
    selectField(status);
  }, [status, selectField]);

  const isSelected = selectedField && selectedField.id === id;

  if (deletedAt) {
    return (
      <Box mr={1} mb={1}>
        <Chip
          disabled={isLoading}
          color="secondary"
          label={
            <Tooltip title={<>Deleted {format(new Date(deletedAt), 'PP')}</>}>
              <span>{name}</span>
            </Tooltip>
          }
          clickable={false}
          deleteIcon={
            <Tooltip title="Restore">
              <RestoreIcon />
            </Tooltip>
          }
          onDelete={onDelete}
        />
      </Box>
    );
  }

  return (
    <Box mr={1} mb={1}>
      <Chip
        disabled={isLoading}
        color={isSelected ? 'primary' : 'default'}
        avatar={isSelected ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        onClick={onClick}
        label={name}
        onDelete={onDelete}
      />
    </Box>
  );
}

export default React.memo(LeadStatus);
