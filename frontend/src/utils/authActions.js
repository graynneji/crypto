// authActions.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isToggleLogReg: null,
  },
  reducers: {
    toggleLogReg: (state) => {
      state.isToggleLogReg = !state.isToggleLogReg;
    },
  },
});

export const { toggleLogReg } = authSlice.actions;
export default authSlice.reducer;
