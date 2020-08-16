/** @format */

import React from 'react';
import { updateStore } from 'fluxible-js';

import Box from '@material-ui/core/Box';

import { searchNotes } from 'graphql/queries';
import usePaginator from 'hooks/usePaginator';

import NoteForm from './NoteForm';
import NotesList from './NotesList';
import NotesContext from './NotesContext';

const paginatorOptions = {
  query: searchNotes,
  queryName: 'searchNotes',
  sort: {
    field: 'createdAt',
    direction: 'desc'
  }
};

function NotesTab () {
  const { data, setData, isFetching } = usePaginator(paginatorOptions);

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

export default React.memo(NotesTab);
