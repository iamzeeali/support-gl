import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import activity from "./activityReducer";

export default combineReducers({
  auth,
  alert,
  activity
});
