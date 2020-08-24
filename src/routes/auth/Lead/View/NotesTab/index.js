import React from 'react';
import { useParams } from 'react-router-dom';
import { updateStore } from 'fluxible-js';

import Box from '@material-ui/core/Box';

import { searchNotes } from 'graphql/queries';
import { PaginatorProvider, PaginatorContext } from 'components/PaginatorProvider';

import NoteForm from './NoteForm';
import NotesList from './NotesList';
import NotesContext from './NotesContext';

const sort = {
  field: 'createdAt',
  direction: 'desc'
};

function Body () {
  const { data, setData, isFetching } = React.useContext(PaginatorContext);

  React.useEffect(() => {
    if (isFetching) updateStore({ loading: true });
    else updateStore({ loading: false });
  }, [isFetching]);

  if (!data) return null;

  return (
    <NotesContext.Provider value={{ data, setData }}>
      <Box p={2}>
        <NotesList />
      </Box>
      <Box p={2}>
        <NoteForm />
      </Box>
    </NotesContext.Provider>
  );
}

function NotesTab () {
  const { id: leadId } = useParams();

  return (
    <PaginatorProvider
      query={searchNotes}
      queryName="searchNotes"
      sort={sort}
      filter={{
        leadId: {
          eq: leadId
        }
      }}>
      <Body />
    </PaginatorProvider>
  );
}

export default React.memo(NotesTab);
