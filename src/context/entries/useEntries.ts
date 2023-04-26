import React from 'react';
import { EntriesContext } from './EntriesContext';

export const useEntries = () => {
  const context = React.useContext(EntriesContext);

  if (!context) {
    throw 'Entries Provider must be defined';
  }

  return context;
};
