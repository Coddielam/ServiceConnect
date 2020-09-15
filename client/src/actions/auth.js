import axios from "axios";
import { setAlert } from "../actions/alert";
import setAuthToken from "../utils/setAuthToken";

export const register = ({ name, email, password, location }) => async (
  dispatch
) => {
  dispatch({
    type: "START_LOADING",
    payload: {
      className: "full-page",
    },
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, location });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: "REGISTER_SUCCESS",
      // token string
      payload: res.data,
    });
    dispatch(loadUser());

    dispatch({
      type: "FINISH_LOADING",
    });
  } catch (err) {
    // express-validator validation errors
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "invalid")));
    }
    dispatch({
      type: "REGISTER_FAIL",
    });

    dispatch({
      type: "FINISH_LOADING",
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  dispatch({
    type: "START_LOADING",
    payload: {
      className: "full-page",
    },
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    // res.data will be a json string
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });

    dispatch(loadUser());

    dispatch({
      type: "FINISH_LOADING",
    });
  } catch (err) {
    // validation errros
    dispatch({
      type: "START_LOADING",
      payload: {
        className: "full-page",
      },
    });

    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "invalid")));

    dispatch({
      type: "LOGIN_FAIL",
    });

    dispatch({
      type: "FINISH_LOADING",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  // check if there's a token in localStorage
  if (localStorage.token) {
    // if there is - attach it to global header in x-auth-token
    setAuthToken(localStorage.token);
  }

  try {
    // make request to /api/auth to get the user document
    const res = await axios.get("/api/auth");
    // update state
    dispatch({
      type: "USER_LOADED",
      payload: res.data, // will be the user object
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};
