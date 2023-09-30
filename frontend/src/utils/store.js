
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