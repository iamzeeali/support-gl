import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./_reducers";

const initialState = {};

const middleware = [thunk];

const devTools =
  process.env.NODE_ENV == "production"
    ? "window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function(){}"
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, devTools);

export default store;
