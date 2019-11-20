import * as types from "../_actions/types";

const initialState = {
  member: null,
  members: [],
  error: {},
  filtered: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_MEMBER:
      return {
        ...state,
        member: payload,
        loading: false
      };
    case types.GET_MEMEBERS:
      return {
        ...state,
        members: payload,
        loading: false
      };
    case types.ADD_MEMBER:
      return {
        ...state,
        member: payload,
        loading: false
      };
    case types.SET_CURRENT_MEMBER:
      return {
        ...state,
        member: action.payload
      };
    case types.CLEAR_MEMBER:
      return {
        ...state,
        member: null,
        members: [],
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
    case types.DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter(member => member._id !== action.payload),
        loading: false
      };
    case types.MEMBER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
