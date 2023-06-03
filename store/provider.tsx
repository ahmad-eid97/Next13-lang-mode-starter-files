"use client";

import { store } from "./store";
import { Provider } from 'react-redux';

// COMPONENT PROPS TYPES
interface Cprops {
  children: React.ReactNode
}

export function StoreProvider({ children }: Cprops) {
  return (
    <Provider store={store} >
      {children}
    </Provider>
  )
}