const initialState = {
  city: "",
  state: "",
  country: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_LOCATION_SUCCESS":
      return {
        ...state,
        city: payload.city,
        state: payload.regionName,
        country: payload.country,
      };
    default:
      return state;
  }
}
