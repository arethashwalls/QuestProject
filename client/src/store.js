import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {};
const middleware = [thunk];

// const enhanceComposer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);
export default store;
