import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
  entries: Entry[];
  addEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);
