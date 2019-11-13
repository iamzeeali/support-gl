import * as types from "../_actions/types";

const initialState = {
  request: null,
  requests: [],
  emails: [],
  error: {},
  filtered: null,
  loading: true,
  sendingLoader: false,
  open: null
};

export default function(state = initialState, action) {
  const { type, payload, sendingPayload } = action;

  switch (type) {
    case types.GET_REQUEST:
      return {
        ...state,
        request: payload.data,
        loading: false
      };
    case types.GET_REQUESTS:
      return {
        ...state,
        requests: payload,
        loading: false
      };
    case types.ADD_REQUEST:
      return {
        ...state,
        request: payload,
        sendingLoader: sendingPayload
      };
    case types.SET_CURRENT_REQUEST:
      return {
        ...state,
        request: action.payload,
        open: action.payload.openStatus
      };
    case types.CLEAR_REQUEST:
      return {
        ...state,
        request: null,
        requests: [],
        loading: false
      };
    case types.GET_EMAILS:
      return {
        ...state,
        emails: payload,
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
    case types.DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(
          request => request._id !== action.payload
        ),
        loading: false
      };
    case types.REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
