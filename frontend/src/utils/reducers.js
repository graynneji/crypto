// reducers.js
import { TOGGLE_LOG_REG, SET_ERROR } from './authActions';

const initialState = {
  toggleLogReg: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOG_REG:
      return {
        ...state,
        toggleLogReg: !state.toggleLogReg,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;