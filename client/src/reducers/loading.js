const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
        className: payload.className,
      };
    case "FINISH_LOADING":
      return {
        ...state,
        isLoading: false,
        className: "",
      };
    default:
      return state;
  }
}
