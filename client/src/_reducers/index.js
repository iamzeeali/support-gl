import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import activity from "./activityReducer";
import company from "./companyReducer";
import request from "./requestReducer";

export default combineReducers({
  auth,
  alert,
  activity,
  company,
  request
});
