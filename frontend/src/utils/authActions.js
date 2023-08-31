// authActions.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isToggleLogReg: null,
    accessToken: null,
    userId: null, // Add userId to the initial state
    user: null,
  },
  reducers: {
    toggleLogReg: (state) => {
      state.isToggleLogReg = !state.isToggleLogReg;
    },
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId; // Store userId from the response
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
});

export const { toggleLogReg, login, setUser } = authSlice.actions;
export default authSlice.reducer;
