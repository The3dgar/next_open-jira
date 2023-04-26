import { useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  const addEntry = async (description: string) => {
    try {
      const { data } = await EntriesServices.postEntry(description);
      dispatch({ type: 'Entries add entry', payload: data });
    } catch (error) {
      console.log('[addEntry] handler error');
    }
  };

  const updateEntry = async (entry: Entry, showSnackbar = false) => {
    try {
      const { data } = await EntriesServices.updateEntry(entry);
      dispatch({
        type: 'Entries update entry',
        payload: data,
      });

      if (showSnackbar) {
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
      }
    } catch (error) {
      console.log('[updateEntry] handler error');
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

  const deleteEntry = async (entry: Entry) => {
    try {
      const { data } = await EntriesServices.deleteEntry(entry._id);

      dispatch({ type: 'Entries delete entry', payload: data });
      enqueueSnackbar('Entrada eliminada', {
        variant: 'info',
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } catch (error) {
      console.log('[deleteEntry] handler error');
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
        deleteEntry,
      }}>
      {children}
    </EntriesContext.Provider>
  );
};
