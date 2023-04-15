import { useReducer } from 'react';
import { v4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: React.ReactNode;
}

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: v4(),
      description,
      status: 'pending',
      createdAt: Date.now(),
    };

    dispatch({ type: 'Entries add entry', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: 'Entries update entry', payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry
      }}>
      {children}
    </EntriesContext.Provider>
  );
};
