import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current Request
export const getCurrentRequest = id => async dispatch => {
  try {
    const res = await axios.get(`/api/activityLog/${id}`);

    dispatch({
      type: types.GET_REQUEST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get user's Requests
export const getRequests = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog");
    dispatch({
      type: types.GET_REQUESTS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get all Requests
export const getAllRequests = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/all");
    dispatch({
      type: types.GET_REQUESTS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

// Add Request
export const addRequest = (formData, history) => async dispatch => {
  console.log(formData);
  try {
    dispatch({
      type: types.ADD_REQUEST,
      sendingPayload: true
    });
    const res = await axios.post("/api/activityLog", formData);
    dispatch({
      type: types.ADD_REQUEST,
      payload: res.data,
      sendingPayload: false
    });

    dispatch(setAlert("Request Sent!", "success"));

    history.push("/request");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get user's company emails
export const getEmails = () => async dispatch => {
  try {
    const res = await axios.get("/api/email");
    dispatch({
      type: types.GET_EMAILS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get all emails
export const getAllEmails = () => async dispatch => {
  try {
    const res = await axios.get("/api/email/all");
    dispatch({
      type: types.GET_EMAILS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

// Add Email
export const addEmail = (formData, history) => async dispatch => {
  console.log(formData);
  try {
    const res = await axios.post("/api/email", formData);
    dispatch({
      type: types.ADD_EMAIL,
      payload: res.data,
      sendingPayload: false
    });
    dispatch(addRequest(formData, history));
  } catch (err) {
    const errors = err.response.data.errors.email;
    console.log(errors);

    if (errors) {
      dispatch(
        setAlert(errors.message ? "Email already Exists!" : errors, "danger")
      );
    }

    dispatch({
      type: types.REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Email (update active to false)
export const deleteEmail = (formData, id, history) => async dispatch => {
  if (window.confirm("Are you sure?")) {
    // alert(formData.active)

    try {
      let activeOb = {
        active: formData.active
      };
      const res = await axios.patch(`/api/email/${id}`, activeOb);
      dispatch({
        type: types.ADD_EMAIL,
        payload: res.data,
        sendingPayload: false
      });
      dispatch(addRequest(formData, history));
    } catch (err) {
      const errors = err.response.data.errors.email;

      if (errors) {
        dispatch(
          setAlert(errors.message ? "Email already Exists!" : errors, "danger")
        );
      }

      dispatch({
        type: types.REQUEST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Edit Request
export const editRequest = (formData, history, id) => async dispatch => {
  console.log(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.patch(`/api/activityLog/${id}`, formData, config);

    dispatch({
      type: types.GET_REQUEST,
      payload: res.data
    });

    dispatch(setAlert("Request Updated", "success"));
    dispatch({ type: types.CLEAR_REQUEST });

    history.push("/request");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Request
export const deleteRequest = id => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/activityLog/${id}`);
      dispatch({
        type: types.DELETE_REQUEST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

//Set Current Request
export const setCurrentRequest = request => async dispatch => {
  console.log(request);
  dispatch({
    type: types.SET_CURRENT_REQUEST,
    payload: request
  });
};

// Clear Request
export const clearRequest = () => async dispatch => {
  dispatch({ type: types.CLEAR_REQUEST });
};

//Filter Request
export const filterRequest = text => async dispatch => {
  dispatch({ type: types.FILTER_REQUEST, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: types.CLEAR_FILTER });
};
