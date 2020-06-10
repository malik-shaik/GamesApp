import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_ERR,
  LOAD_USER,
} from "./types";

// **** Global State ****
export const userData = {
  error: null,
  isAuthenticated: false,
  token: localStorage.getItem("login-token"),
};

// **** Reducer ****
export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return { ...state, error: payload };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOAD_USER:
      localStorage.setItem("login-token", payload.token);
      return { ...state, ...payload.user, isAuthenticated: true };

    case RESET_ERR:
      return { ...state, error: null };

    case LOGOUT:
      localStorage.removeItem("login-token");
      return { error: null, isAuthenticated: false };

    default:
      return state;
  }
};
