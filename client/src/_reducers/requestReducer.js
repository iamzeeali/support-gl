import * as types from "../_actions/types";

const initialState = {
  request: null,
  requests: [],
  companyRequests: [],
  emails: [],
  email: null,
  error: {},
  filtered: null,
  loading: true,
  companyRequestLoading: true,
  sendingLoader: false,
  open: null,
  openStatus: null,
  companyOpenStatus: null,
  thirtyDaysRequestsCount: null,
  companyThirtyDaysRequestsCount: null,
  openStatusCount: null,
  companyOpenStatusCount: null
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
    case types.GET_OPEN_STATUS_COUNT:
      return {
        ...state,
        openStatusCount: payload.data,
        loading: false
      };
    case types.GET_OPEN_STATUS:
      return {
        ...state,
        requests: payload,
        loading: false
      };
    case types.GET_30_DAYS_REQUESTS:
      return {
        ...state,
        requests: payload,
        loading: false
      };
    case types.GET_30_DAYS_REQUESTS_COUNT:
      return {
        ...state,
        thirtyDaysRequestsCount: payload,
        loading: false
      };
    //*************************COMPANY******************************** */
    case types.GET_COMPANY_REQUESTS:
      return {
        ...state,
        companyRequests: payload,
        companyRequestLoading: false
      };
    case types.GET_COMPANY_OPEN_STATUS_COUNT:
      return {
        ...state,
        companyOpenStatusCount: payload.data,
        loading: false
      };
    case types.GET_COMPANY_OPEN_STATUS:
      return {
        ...state,
        companyRequests: payload,
        loading: false
      };
    case types.GET_COMPANY_30_DAYS_REQUESTS:
      return {
        ...state,
        companyRequests: payload,
        loading: false
      };
    case types.GET_COMPANY_30_DAYS_REQUESTS_COUNT:
      return {
        ...state,
        companyThirtyDaysRequestsCount: payload,
        loading: false
      };
    //***************************************END COMPANY****************************** */
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
        companyRequests: [],
        emails: [],
        email: null,
        error: {},
        filtered: null,
        loading: true,
        sendingLoader: false,
        open: null,
        openStatus: null,
        companyOpenStatus: null,
        thirtyDaysRequestsCount: null,
        companyThirtyDaysRequestsCount: null,
        openStatusCount: null,
        companyOpenStatusCount: null
      };
    case types.GET_EMAILS:
      return {
        ...state,
        emails: payload,
        loading: false
      };
    case types.ADD_EMAIL:
      return {
        ...state,
        email: payload,
        loading: false
      };
    case types.DELETE_EMAIL:
      return {
        ...state,
        email: payload,
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
