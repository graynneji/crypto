// authActions.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isToggleLogReg: null,
    // accessToken: null,
    // userId: null, // Add userId to the initial state
    token: null,
    userId: null,
    user: null,
  },
  // reducers: {
  //   toggleLogReg: (state) => {
  //     state.isToggleLogReg = !state.isToggleLogReg;
  //   },
  //   login: (state, action) => {
  //     state.accessToken = action.payload.accessToken;
  //     state.userId = action.payload.userId; // Store userId from the response
  //   },
  //   setUser: (state, action) => {
  //     state.user = action.payload
  //   }
  // },

  reducers: {
    setCredentials: (state, action)=>{
      const { others: { _id }, accessToken } = action.payload;

      state.userId = _id
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.userId = null
      state.token = null
    },
    toggleLogReg: (state) => {
      state.isToggleLogReg = !state.isToggleLogReg;
    },
    userInfo: (state, action)=>{
      state.user = action.payload
    }
  }
});

// export const { toggleLogReg, login, setUser } = authSlice.actions;
// export default authSlice.reducer;

//new exports for new 
export const {toggleLogReg, setCredentials, logOut, userInfo} = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state)=> state.auth.userId
export const selectCurrentToken = (state)=> state.auth.token