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

//Get all Requests
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

// Add Request
export const addRequest = (formData, history) => async dispatch => {
  console.log(formData);
  try {
    const res = await axios.post("/api/activityLog", formData);
    dispatch({
      type: types.ADD_REQUEST,
      payload: res.data
    });

    dispatch(setAlert("Request Created", "success"));

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

// Edit Request
export const editRequest = (formData, history, id) => async dispatch => {
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
