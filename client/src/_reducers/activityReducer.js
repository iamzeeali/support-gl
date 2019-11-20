import * as types from "../_actions/types";

const initialState = {
  activity: null,
  activities: [],
  subActivities: [],
  error: {},
  filtered: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ACTIVITY:
      return {
        ...state,
        activity: payload,
        loading: false
      };
    case types.GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
        loading: false
      };
    case types.POPULATE_SUBACTIVITIES:
      return {
        ...state,
        subActivities: state.activities.find(
          activity => activity.activityName === payload
        ).subActivities,
        loading: false
      };
    case types.ADD_ACTIVITY:
      return {
        ...state,
        activity: payload,
        loading: false
      };
    case types.SET_CURRENT_ACTIVITY:
      return {
        ...state,
        activity: action.payload
      };
    case types.CLEAR_ACTIVITY:
      return {
        ...state,
        activity: null,
        activities: [],
        loading: false
      };

    // case types.FILTER_ACTIVITY:
    //   return {
    //     ...state,
    //     filtered: state.activities.filter(activity => {
    //       const regex = new RegExp(`${action.payload}`, "gi");
    //       return (
    //         staff.firstName.match(regex) ||
    //         staff.lastName.match(regex) ||
    //         staff.email.match(regex) ||
    //         staff.mobile.match(regex) ||
    //         staff.username.match(regex)
    //       );
    //     })
    //   };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case types.DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          activity => activity._id !== action.payload
        ),
        loading: false
      };
    case types.ACTIVITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
