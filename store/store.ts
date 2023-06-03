// REDUX STUFF
import { configureStore } from "@reduxjs/toolkit";
// REDUCERS ( SLICES )
import commonReducer from './slices/common/commonSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;