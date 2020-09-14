import { combineReducers } from "redux";
import auth from "../reducers/auth";
import alert from "../reducers/alert";
import location from "../reducers/location";
import loading from "../reducers/loading";

export default combineReducers({
  auth,
  alert,
  location,
  loading,
});
