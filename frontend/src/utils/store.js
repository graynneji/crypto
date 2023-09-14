// store.js
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authActions';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,

//   },
// });

// export default store;

//new store
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../app/apiSlice";
import logReducer from '../utils/authActions';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: logReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})