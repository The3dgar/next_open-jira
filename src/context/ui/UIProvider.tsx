import { useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidebarOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

interface Props {
  children: React.ReactNode;
}
export const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI open sidebar' });
  const closeSideMenu = () => dispatch({ type: 'UI close sidebar' });
  const setAddingEntry = (value: boolean) => {
    dispatch({ type: 'UI adding entry', payload: value });
  };

  const startDragging = () => dispatch({ type: 'UI start dragging' });
  const endDragging = () => dispatch({ type: 'UI end dragging' });

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setAddingEntry,
        startDragging,
        endDragging,
      }}>
      {children}
    </UIContext.Provider>
  );
};
