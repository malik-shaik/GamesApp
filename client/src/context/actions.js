import axios from "axios";
import {
  LOAD_USER,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_ERR,
} from "./types";

// **** Load User Action ****
export const loadUserAction = async (dispatch) => {
  const config = {
    headers: { "auth-token": localStorage.getItem("login-token") },
  };
  try {
    const res = await axios.get("/api/users/byId", config);
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (err) {
    console.log("Error:", err.response);
  }
};

// **** Signup Action ****
export const signupAction = async (data, dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/api/users/register", body, config);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (err) {
    const { status, data } = err.response;
    if (status === 400) dispatch({ type: SIGNUP_FAIL, payload: data.error });
  }
};

// **** Login Action ****
export async function loginAction(data, dispatch) {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/api/users/login", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    const { status, data } = err.response;
    if (status === 400) dispatch({ type: LOGIN_FAIL, payload: data.error });
  }
}

// **** Logout Action ****
export const logoutAction = (dispatch) => dispatch({ type: LOGOUT });

// **** Reset Error ****
export const resetErrorAction = (dispatch) => dispatch({ type: RESET_ERR });
