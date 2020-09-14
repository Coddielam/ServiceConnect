import axios from "axios";
export const setLocation = () => async (dispatch) => {
  try {
    dispatch({
      type: "START_LOADING",
      payload: {
        className: "inline",
      },
    });
    const response = await axios.get("http://ip-api.com/json/?fields=57599");
    const data = response.data;
    dispatch({
      type: "GET_LOCATION_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "FINISH_LOADING",
    });
  } catch (err) {
    console.error(err.response);
    //  TODO: dispatch a setAlert to display a alert message saying the service was not available
  }
};
