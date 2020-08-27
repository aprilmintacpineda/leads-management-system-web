import React from 'react';

import NotesContext from '../NotesContext';
import Note from './Note';

function NotesList () {
  const { data } = React.useContext(NotesContext);
  return data.map(data => <Note key={data.id} data={data} />);
}

export default React.memo(NotesList);
