import { UIState } from './UIProvider';

type UIActionType = { type: 'UI open sidebar' } | { type: 'UI close sidebar' };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI open sidebar':
      return {
        ...state,
        sidebarOpen: true
      };
    case 'UI close sidebar':
      return {
        ...state,
        sidebarOpen: false
      };

    default:
      return state;
  }
};