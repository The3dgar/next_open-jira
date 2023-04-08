import { useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidebarOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpen: false,
};

interface Props {
  children: React.ReactNode;
}
export const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI open sidebar' });
  const closeSideMenu = () => dispatch({ type: 'UI close sidebar' });
  return (
    <UIContext.Provider
      value={{ ...state, openSideMenu, closeSideMenu }}>
      {children}
    </UIContext.Provider>
  );
};
