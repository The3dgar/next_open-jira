import { UIState } from './UIProvider';

type UIActionType =
  | { type: 'UI open sidebar' }
  | { type: 'UI close sidebar' }
  | { type: 'UI adding entry'; payload: boolean }
  | { type: 'UI start dragging' }
  | { type: 'UI end dragging' };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI open sidebar':
      return {
        ...state,
        sidebarOpen: true,
      };
    case 'UI close sidebar':
      return {
        ...state,
        sidebarOpen: false,
      };
    case 'UI adding entry':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case 'UI start dragging':
      return {
        ...state,
        isDragging: true,
      };
    case 'UI end dragging':
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};
