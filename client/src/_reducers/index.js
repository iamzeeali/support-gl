import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import activity from "./activityReducer";
import company from "./companyReducer";
import request from "./requestReducer";
import member from "./memberReducer";

export default combineReducers({
  auth,
  alert,
  activity,
  company,
  request,
  member
});
