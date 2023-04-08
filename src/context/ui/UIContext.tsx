import { createContext } from 'react';

interface ContextProps {
  sidebarOpen: boolean,
  openSideMenu: () => void,
  closeSideMenu: () => void
}

export const UIContext = createContext({} as ContextProps)