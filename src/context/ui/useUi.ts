import React from 'react';
import { UIContext } from './UIContext';

export const useUi = () => {
  const context = React.useContext(UIContext);

  if (!context) {
    throw 'UI Provider must be defined';
  }

  return context;
};
