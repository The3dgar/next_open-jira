import { useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { EntriesServices } from '@/services';
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

  const addEntry = async (description: string) => {
    const { data } = await EntriesServices.postEntry(description);
    dispatch({ type: 'Entries add entry', payload: data });
  };

  const updateEntry = async (entry: Entry) => {
    try {
      const { data } = await EntriesServices.updateEntry(entry);
      dispatch({
        type: 'Entries update entry',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    try {
      const { data } = await EntriesServices.getEntries();
      dispatch({ type: 'Entries get entries', payload: data });
    } catch (error) {
      console.log('[refreshEntries] handler error');
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
      }}>
      {children}
    </EntriesContext.Provider>
  );
};
