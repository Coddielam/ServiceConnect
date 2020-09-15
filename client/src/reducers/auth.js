const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,

  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: payload, // user object
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
      };

    case "AUTH_ERROR":
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
