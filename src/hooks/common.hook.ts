import { useState } from 'react';

// useCommonConstructor
export const useCommonConstructor = (callBack = () => {}) => {
  const [init, setInit] = useState(false);
  if (!init) {
    callBack();
    setInit(true);
  }
};
